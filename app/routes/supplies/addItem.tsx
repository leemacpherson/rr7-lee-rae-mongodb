import {
  redirect,
  type ActionFunctionArgs,
  useActionData,
  useNavigate,
} from "react-router";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { parseFormData, type FileUpload } from "@remix-run/form-data-parser";
import { validateSupplyInput } from "~/data/validation.server";
// import { getDb } from "~/data/db.server";

// import ErrorPage from "~/components/ErrorPage";
import Modal from "~/components/util/Modal";
import SupplyForm from "~/components/SupplyForm";

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

export default function addItem() {
  const navigate = useNavigate();
  const actionData = useActionData();

  console.log("in addItem(), actionData holds ");

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
  // First, we parse the multipart form data, which includes both the file and other fields
  const formData = await parseFormData(request, {
    maxFileSize: 50 * 1024 * 1024, // 50MB in bytes
    maxTotalSize: 100 * 1024 * 1024, // 100MB total limit
  });
  const uploadedFileObject = formData.get("fileUpload"); // This will now be the return value of your handler
  console.log(
    "addItem.action-1 . in addItem action, just got request, parseFormData returned, uploadedPath is ",
    uploadedFileObject,
  );

  if (uploadedFileObject) {
    await uploadHandler(uploadedFileObject as FileUpload);
    console.log(`addItem.action-2 . Just returned from uploadHandler .`);
  }

  const supplyData = await supplyDataHandler(formData);
  console.log(
    "addItem.action-3 . supplyData returned from supplyDataHandler is ",
    supplyData,
  );

  // Proceed with other form values
  return { success: true };
}

const uploadHandler = async (fileUpload: FileUpload) => {
  // Custom logic to stream the file to your storage provider
  //   // Initialize the S3 client using environment variables

  const accessKeyId = process.env.SPACES_KEY;
  const secretAccessKey = process.env.SPACES_SECRET;

  console.log("Initializing S3 Client with credentials:");
  console.log("Access Key ID:", accessKeyId ? "Provided" : "Missing");
  console.log("Secret Access Key:", secretAccessKey ? "Provided" : "Missing");

  if (!accessKeyId || !secretAccessKey) {
    throw new Error("Missing S3 credentials in environment variables");
  }

  //   const s3Client = new S3Client({
  //     forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  //     endpoint: "https://sfo3.digitaloceanspaces.com",
  //     region: "us-east-1", // Required dummy value for SDK compatibility
  //     credentials: {
  //       accessKeyId: accessKeyId!,
  //       secretAccessKey: secretAccessKey!,
  //     }, // Typescript infers strings perfectly here
  //   });

  //   console.log("S3 Client initialized and contains:", s3Client.config);

  //   try {
  //     // 1. Convert the Web File into a web ReadableStream
  //     const fileStream = file.stream();

  //     // 2. Generate a unique key/filename for your bucket
  //     const fileKey = `${Date.now()}-${file.name}`;

  //     // 3. Set up your upload payload properties
  //     const uploadParams = {
  //       Bucket: process.env.SPACES_BUCKET_NAME!,
  //       Key: fileKey, // The full path or filename for the object in the bucket.
  //       Body: fileStream, // The AWS SDK accepts standard Web Streams natively
  //       ContentType: file.type, // Retains original mime type (e.g. image/png)
  //       ACL: "public-read" as const, // Makes the file publicly accessible
  //     };
  //     console.log("Upload parameters prepared:", uploadParams);
  //     // 4. Send the command to cloud storage
  //     await s3Client.send(new PutObjectCommand(uploadParams));

  //     // 5. Construct the public file URL string
  //     const publicUrl = `https://${uploadParams.Bucket}.sfo3.digitaloceanspaces.com/${fileKey}`;
  //     console.log("File successfully uploaded to S3:", publicUrl);

  //     // Save publicUrl or title metadata to a database here if needed

  //     return redirect("/supplies");
  //   } catch (error) {
  //     console.error("S3 upload failure:");
  //     // return { error: "Upload failed. Please try again." };
  //     return redirect("/supplies");
  //   }
};

const supplyDataHandler = async (formData: FormData) => {
  // Custom logic to validate and process other form fields
  let supplyData;
  supplyData = {
    supplyType: formData.get("supplyType") as string,
    description: formData.get("description") as string,
    units: formData.get("units") as string,
    location: formData.get("location") as string,
    amount: Number(formData.get("amount")),
    date: formData.get("date") as string,
    imageLocation: formData.get("fileUpload") as string, // This will be the value returned from uploadHandler
  };
  console.log(
    "addItem.supplyDataHandler-1 . calling validateSupplyInput with supplyData: ",
    supplyData,
  );

  if (supplyData) {
    validateSupplyInput(supplyData);
    try {
      console.log(
        "ACTION in addItem route, just returned from validateSupplyInput",
      );
      return supplyData;
    } catch (error) {
      console.log("in addItem, in the catch error ", error);
      return;
    }
  }
};

// ORIGINAL first version with file handline

//  try {
//     console.log(
//       "ACTION in addItem route, next step is run validateSupplyInput.  supplyData has ",
//       supplyData,
//     );

//
//   const db = await getDb();
//   console.log(
//     "in addItem action, just got db connection, now about to insertOne with supplyData: ",
//     supplyData,
//   );
//   let insertResults;
//   insertResults = await db.collection("rr7-supplies").insertOne({
//     units: supplyData.units,
//     amount: supplyData.amount,
//     supplyType: supplyData.supplyType,
//     location: supplyData.location,
//     imageLocation:
//       "https://helpwithapi.com/supplies/blue-pot-12h-8w-small.jpeg",
//     description: supplyData.description,
//     createdAt: new Date(),
//     date: supplyData.date,
//   });
//   console.log("in addItem action, insertOne results is ", insertResults);

//   return redirect("/supplies");

// }
