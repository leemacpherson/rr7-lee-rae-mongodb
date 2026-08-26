import { redirect, type ActionFunctionArgs, useNavigate } from "react-router";

import Modal from "~/components/util/Modal";
import PlantForm from "~/components/PlantForm";
import { getDb } from "~/data/db.server";

// try zod instead of my validation server
// import { validateSupplyInput } from "~/data/validation.server";
import { z } from "zod";

import uploadFileHandler from "~/data/upload-file-utility.server.mjs";

interface Plant {
  _id: string;
  description: string;
  plantName: string;
  plantType: string;
  imageLocation: string;
  location: string;
  amount: number;
  date: string;
  fileUpload: string;
}

interface AddItemProps {
  request: Request;
}

interface PlantFormProps {
  params?: any;
}

// 1. Define the validation schema using Zod
const ProfileSchema = z.object({
  location: z.string().max(100, "location must be at most 100 characters long"),
  description: z
    .string()
    .max(100, "Description must be at most 100 characters long"),
  plantType: z
    .string()
    .max(20, "Plant type must be at most 20 characters long")
    .min(2, "Plant type must be at least 2 characters long"),
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
  "https://lee-rae-site.sfo3.digitaloceanspaces.com/pictures/plants/default-plant-image.jpg";

export default function addItem() {
  const navigate = useNavigate();

  function closeHandler() {
    // navigate programmatically
    navigate("..");
  }

  return (
    <>
      <Modal>
        <PlantForm />
      </Modal>
      <h2>This is addItem after modal</h2>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const mode = "plants"; // Tells the uploadFileHandler to save the file in the plants folder in DO Spaces

  // // a. Access the submitted body payload from the request
  let fileAttached = false;
  let imageLocation = defaultImageLocation; // Default image location
  const formData = await request.formData();
  const formDataObj = Object.fromEntries(formData);
  console.log("0. plants addItem's action, formDataObj: ", formDataObj);

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
    const uploadedFilePath = await uploadFileHandler(fileUpload, mode);
    imageLocation = `https://lee-rae-site.sfo3.digitaloceanspaces.com/${uploadedFilePath.url}`;
  } else {
    imageLocation =
      "https://lee-rae-site.sfo3.digitaloceanspaces.com/pictures/plants/default-plant-image.jpg";
  }

  const plantData = {
    ...validatedData,
    imageLocation: imageLocation,
  };

  console.log("4. SS-addPlant-1 in addItem's action, plantData: ", plantData);

  try {
    const db = await getDb();
    console.log(
      "5. Plant addItem's action, about to insert plantData: ",
      plantData,
    );
    const insertResults = await db.collection("rr7-plants").insertOne({
      location: plantData.location,
      amount: plantData.amount,
      plantType: plantData.plantType,
      imageLocation: plantData.imageLocation,
      description: plantData.description,
      createdAt: new Date(),
      date: plantData.date,
    });

    console.log(`Inserted with ID: ${insertResults.insertedId}`);
    return redirect("/plants");
  } catch (error) {
    console.error("Error saving the plant item to the database: ", error);
    return {
      success: false,
      errors: [{ message: "Error saving plant item to the database" }],
    };
  }
}
