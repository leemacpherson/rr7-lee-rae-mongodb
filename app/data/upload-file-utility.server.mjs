import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

// import { type ActionFunctionArgs } from "react-router";

export default async function uploadFileHandler(fileUpload) {
  // Custom logic to stream the file to your storage provider
  // Initialize the S3 client using environment variables

  const accessKeyId = process.env.SPACES_KEY;
  const secretAccessKey = process.env.SPACES_SECRET;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error("Missing S3 credentials in environment variables");
  }

  let result = "test";

  const s3Client = new S3Client({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://sfo3.digitaloceanspaces.com",
    region: "sfo3", // Required dummy value for SDK compatibility
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    }, // Typescript infers strings perfectly here
    // requestStreamBufferSize: 64 * 1024, // Fixes the stream hashing blocker
  });

  try {
    // 1. Convert the Web File into a web ReadableStream
    const fileStream = fileUpload.stream(); // This is a standard Web Stream from the File object

    // 1a. make a unique file name for the uploaded file
    const timestamp = Date.now();
    const fileKey = `${timestamp}-${fileUpload.name}`;

    // 2. Set up your upload payload properties
    const uploadParams = {
      Bucket: process.env.SPACES_BUCKET_NAME,
      Key: fileKey, // The full path or filename for the object in the bucket.
      Body: fileStream, // The AWS SDK accepts standard Web Streams natively
      ContentType: fileUpload.type, // Retains original mime type (e.g. image/png)
      ContentLength: fileUpload.size, // Retains original file size
      // ACL: "public-read", // Makes the file publicly accessible
    };
    console.log("Upload parameters prepared:", uploadParams);

    // 3. Use Upload to auto-buffer, chunk, and hash web streams natively.
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: {
        Bucket: "lee-rae-site",
        Key: fileKey,
        Body: uploadParams.Body, // Keeps your raw Web ReadableStream intact!
        ContentType: uploadParams.ContentType,
        ContentLength: uploadParams.ContentLength,
        // Note: Remove ACL: 'public-read' if you still get Access Denied crashes
      },
    });

    // 4. Track progress and handle completion
    parallelUploads3.on("httpUploadProgress", (progress) => {
      console.log(
        `Upload progress: ${progress.loaded} bytes uploaded out of ${progress.total} bytes`,
      );
    });

    // 5. Trigger the actual upload execution
    await parallelUploads3.done();

    return { success: true, url: fileKey }; // Return the file key or URL for further processing
  } catch (error) {
    console.error("S3 upload failure:");
    console.log("Error details:", error);

    return { error: "Upload failed. Please try again." };
  }
}
