import { redirect, type ActionFunctionArgs, useNavigate } from "react-router";

import Modal from "~/components/util/Modal";
import SupplyForm from "~/components/SupplyForm";
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

// 1. Define the validation schema using Zod

const ProfileSchema = z.object({
  description: z
    .string()
    .max(100, "Description must be at most 100 characters long"),
  supplyType: z
    .string()
    .max(20, "Supply type must be at most 20 characters long"),
  amount: z.coerce
    .number()
    .positive("Amount must be a positive number")
    .max(10000, "Amount must be less than 10,000"),
  date: z.string().refine((date) => {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate) && parsedDate <= Date.now();
  }, "Date must be a valid date in the past or present"),
  fileUpload: z
    .instanceof(File, { message: " picture is required" })
    .refine((File) => File.size > 0, "File cannot be empty")
    .refine(
      (File) => File.size <= 10 * 1024 * 1024,
      "File size must be under 10MB",
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPEG, PNG, and WebP images are allowed",
    ),
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

// 2. SERVER ACTION: Handles streaming, schema validation
// and sending the new item to the database
export async function action({ request }: ActionFunctionArgs) {
  // create an empty array to hold validation errors
  let validationErrorList: { message: string }[] = [];
  // a. Access the submitted body payload from the request
  const formData = await request.formData();
  const formDataObj = Object.fromEntries(formData);

  if (formDataObj) {
    if (
      formDataObj.fileUpload instanceof File &&
      formDataObj.fileUpload.size > 0
    ) {
      console.log("fileUpload: ", formDataObj.fileUpload);
    } else {
      console.error("no file uploaded or fileUpload is not a File instance");
    }
    try {
      // const validationResult = validateSupplyInput(formDataObj);
    } catch (error) {
      console.error("Error validating supply input: ", error);
    }
  }

  // b. Validate the input data against the Zod schema
  try {
    const validatedData = ProfileSchema.parse(formDataObj);
    console.log("Validated data: ", validatedData);
  } catch (validationError) {
    if (validationError instanceof z.ZodError) {
      // ZodError exposes the issues array which contains detailed error info
      validationErrorList = validationError.issues.map((issue) => ({
        message: issue.message,
      }));
      console.error("Validation error: ", validationError.issues);
      return { success: false, errors: validationError.issues };
    }

    return {
      success: false,
      errors: [{ message: "Unexpected validation error" }],
    };
  }

  // c. If validation passes, proceed to save the new item to the database
  try {
    // Simulate database save with a delay
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // console.log("New supply item saved to the database");
    await uploadFileHandler(formDataObj.fileUpload);
  } catch (error) {
    console.error("Error saving supply item to the database: ", error);
    return {
      success: false,
      errors: [{ message: "Error saving supply item to the database" }],
    };
  }
  return { success: true };

  // --------------the section above is from the post-zod version
}
