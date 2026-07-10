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
  // fileUpload: z
  //   .instanceof(File, { message: " picture is required" })
  //   .refine((File) => File.size > 0, "File cannot be empty")
  //   .refine(
  //     (File) => File.size <= 10 * 1024 * 1024,
  //     "File size must be under 10MB",
  //   )
  //   .refine(
  //     (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
  //     "Only JPEG, PNG, and WebP images are allowed",
  //   ),
});

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
  const formData = await request.formData();
  const formDataObj = Object.fromEntries(formData);
  console.log("SS-addSupply-0 in supplies.server, formDataObj: ", formDataObj);

  if (formDataObj) {
    if (
      formDataObj.fileUpload instanceof File &&
      formDataObj.fileUpload.size > 0
    ) {
      console.log("fileUpload: ", formDataObj.fileUpload);
    } else {
      console.error("no file uploaded or fileUpload is not a File instance");
    }
  }

  // b. Validate the input data against the Zod schema using safeParse
  const result = ProfileSchema.safeParse(formDataObj);
  if (!result.success) {
    const formattedErrors = z.treeifyError(result.error);
    console.error("1. Validation error details:", formattedErrors);
    return { success: false, errors: formattedErrors };
  }

  const validatedData = result.data;
  console.log(
    "1. SS-addSupply-0 in supplies.server, validatedData: ",
    validatedData,
  );
  //  https://lee-rae-site.sfo3.digitaloceanspaces.com/bear-471x322.png

  // c. Handle file upload and save to DB
  const fileUpload = validatedData.fileUpload as File;
  const uploadedFilePath = await uploadFileHandler(fileUpload);

  const imageLocation = `https://lee-rae-site.sfo3.digitaloceanspaces.com/${uploadedFilePath.url}`;
  const supplyData = {
    ...validatedData,
    imageLocation: imageLocation,
  };

  console.log("2. SS-addSupply-1 in supplies.server, supplyData: ", supplyData);

  try {
    const db = await getDb();
    console.log(
      "3. SS-addSupply-2 in supplies.server, about to insert supplyData: ",
      supplyData,
    );
    const insertResults = await db.collection("rr7-supplies").insertOne({
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
