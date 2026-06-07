import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { parseFormData } from "@remix-run/form-data-parser";
// import { type ActionFunctionArgs } from "react-router";

export default async function uploadFileHandler(fileUpload) {
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

  console.log("In file upload handler and it has ", fileUpload);

  let result = "test";

  const s3Client = new S3Client({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://sfo3.digitaloceanspaces.com",
    region: "us-east-1", // Required dummy value for SDK compatibility
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    }, // Typescript infers strings perfectly here
  });

  console.log("-------    -----S3 Client initialized and contains:");

  try {
    // 1. Convert the Web File into a web ReadableStream
    const fileStream = uploadFile.stream();

    // 2. Generate a unique key/filename for your bucket
    const fileKey = `${Date.now()}-${uploadFile.name}`;

    // 3. Set up your upload payload properties
    const uploadParams = {
      Bucket: process.env.SPACES_BUCKET_NAME,
      Key: fileKey, // The full path or filename for the object in the bucket.
      Body: fileStream, // The AWS SDK accepts standard Web Streams natively
      ContentType: uploadFile.type, // Retains original mime type (e.g. image/png)
      ACL: "public-read", // Makes the file publicly accessible
    };
    console.log("Upload parameters prepared:", uploadParams);
    //     // 4. Send the command to cloud storage
    //     await s3Client.send(new PutObjectCommand(uploadParams));

    //     // 5. Construct the public file URL string
    //     const publicUrl = `https://${uploadParams.Bucket}.sfo3.digitaloceanspaces.com/${fileKey}`;
    //     console.log("File successfully uploaded to S3:", publicUrl);

    //     // Save publicUrl or title metadata to a database here if needed

    return;
  } catch (error) {
    console.error("S3 upload failure:");
    // return { error: "Upload failed. Please try again." };
    return;
  }
}

export async function action({ request }) {
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
    console.log(`addItem.action-2 . Going to uploadFileHandler .`);
    await uploadFileHandler(uploadedFileObject);
    console.log(`addItem.action-3 . Just returned from uploadFileHandler .`);
  }
  return;
}
