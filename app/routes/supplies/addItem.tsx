import { redirect, type ActionFunctionArgs, useNavigate } from "react-router";

import Modal from "~/components/util/Modal";
import SupplyForm from "~/components/SupplyForm";
import { getDb } from "~/data/db.server";

// try zod instead of my validation server
// import { validateSupplyInput } from "~/data/validation.server";
import { z } from "zod";

import uploadFileHandler from "~/data/upload-file-utility.server.mjs";

interface Supply {
  _id: string;
  description: string;
  units: string;
  type: string;
  imageLocation: string;
  location: string;
  amount: number;
  date: string;
  fileUpload: string;
}

interface AddItemProps {
  request: Request;
}

interface SupplyFormProps {
  params?: any;
}

// 1. Define the validation schema using Zod

const ProfileSchema = z.object({
  location: z.string().max(100, "location must be at most 100 characters long"),
  description: z
    .string()
    .max(100, "Description must be at most 100 characters long"),
  supplyType: z
    .string()
    .max(20, "Supply type must be at most 20 characters long")
    .min(2, "Supply type must be at least 2 characters long"),
  amount: z.coerce
    .number()
    .positive("Amount must be a positive number")
    .max(10000, "Amount must be less than 10,000"),
  date: z.string().refine((date) => {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate) && parsedDate <= Date.now();
  }, "Date must be a valid date in the past or present"),
  fileUpload: z.any().optional(),
});

// declare the default image location for the supply item
const defaultImageLocation =
  "https://lee-rae-site.sfo3.digitaloceanspaces.com/default-supply-image.png";

export default function addItem() {
  const navigate = useNavigate();

  function closeHandler() {
    // navigate programmatically
    navigate("..");
  }

  return (
    <>
      <Modal>
        <SupplyForm />
      </Modal>
      <h2>This is addItem after modal</h2>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  // a. Access the submitted body payload from the request
  let fileAttached = false;
  let imageLocation = defaultImageLocation; // Default image location
  const formData = await request.formData();
  const formDataObj = Object.fromEntries(formData);

  if (formDataObj) {
    if (
      formDataObj.fileUpload instanceof File &&
      formDataObj.fileUpload.size > 0
    ) {
      fileAttached = true;
    } else {
      fileAttached = false;
    }
  }

  // b. Validate the input data against the Zod schema using safeParse
  const result = ProfileSchema.safeParse(formDataObj);

  if (!result.success) {
    const formattedErrors = z.treeifyError(result.error);
    console.error("1. Validation error details");
    return { success: false, errors: formattedErrors };
  }

  const validatedData = result.data;

  // c. Handle file upload and save to DB
  if (fileAttached) {
    const fileUpload = validatedData.fileUpload as File;
    const uploadedFilePath = await uploadFileHandler(fileUpload);
    imageLocation = `https://lee-rae-site.sfo3.digitaloceanspaces.com/${uploadedFilePath.url}`;
  } else {
    imageLocation =
      "https://lee-rae-site.sfo3.digitaloceanspaces.com/default-supply-image.png";
  }

  const supplyData = {
    ...validatedData,
    imageLocation: imageLocation,
  };

  console.log(
    "4. SS-addSupply-1 in addItem's action, supplyData: ",
    supplyData,
  );

  try {
    const db = await getDb();
    console.log(
      "5. SS-addSupply-2 in addItem's action, about to insert supplyData: ",
      supplyData,
    );
    const insertResults = await db.collection("rr7-supplies").insertOne({
      location: supplyData.location,
      amount: supplyData.amount,
      supplyType: supplyData.supplyType,
      imageLocation: supplyData.imageLocation,
      description: supplyData.description,
      createdAt: new Date(),
      date: supplyData.date,
    });

    console.log(`Inserted with ID: ${insertResults.insertedId}`);
    return redirect("/supplies");
  } catch (error) {
    console.error("Error saving supply item to the database: ", error);
    return {
      success: false,
      errors: [{ message: "Error saving supply item to the database" }],
    };
  }
}
