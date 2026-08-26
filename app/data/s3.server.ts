import { AwsV4Signer } from "aws4fetch";

export async function getPresignedDownloadUrl(
  imageKey: string,
  mode: string,
): Promise<string> {
  const spaceName = process.env.SPACES_BUCKET_NAME!;
  const region = process.env.SPACES_REGION ?? "sfo3"; // e.g., 'nyc3'
  // console.log(
  //   "getPresignedDownloadUrl called with imageKey:",
  //   imageKey,
  //   "and mode:",
  //   mode,
  // );

  // Extract just the path after the domain
  const fileKey = new URL(imageKey).pathname.substring(1); // "1782878401047-mitsubishi3.jpeg"

  // if it is a supply or plant item, we need to prepend the folder path to the fileKey
  let folderPath: string;

  if (mode === "supplies") {
    folderPath = "pictures/supplies";
  } else if (mode === "plants") {
    folderPath = "pictures/plants";
  } else {
    throw new Error(`Invalid mode: ${mode}`);
  }

  const fileName = fileKey.split("/").pop(); // Extract the file name from the path
  const fullKey = `${folderPath}/${fileName}`; // Construct the full key with the folder path

  const url = `https://${spaceName}.${region}.digitaloceanspaces.com/${fullKey}`;

  // Initialize the signer with DigitalOcean details
  const signer = new AwsV4Signer({
    url,
    method: "GET",
    service: "s3", // Keeps S3 protocol for DO compliance
    region,
    accessKeyId: process.env.SPACES_KEY!,
    secretAccessKey: process.env.SPACES_SECRET!,
    signQuery: true, // Forces signature parameters into the URL string
  });
  // console.log("Signer initialized for URL:", url);

  // Generate the signed request metadata
  const signedRequest = await signer.sign();

  // Return the string directly to match your type definition
  return signedRequest.url.toString();
}

export async function deleteDOFile(imageKey: string): Promise<void> {
  console.log("deleteDOFile called with imageKey:", imageKey);
  let url: string; // Declare url here to ensure it's in scope for the signer
  const spaceName = process.env.SPACES_BUCKET_NAME!;
  const region = process.env.SPACES_REGION!;

  const fileKey = new URL(imageKey).pathname.substring(1);
  console.log("------deleteDOFile, fileKey extracted:", fileKey);

  if (!fileKey) {
    throw new Error("Invalid file key");
  } else if (fileKey.includes("default-plant-image.jpg")) {
    return; // Do not delete the default plant image
  } else {
    url = `https://${spaceName}.${region}.digitaloceanspaces.com/${fileKey}`;
  }

  const signer = new AwsV4Signer({
    url,
    method: "DELETE",
    service: "s3",
    region,
    accessKeyId: process.env.SPACES_KEY!,
    secretAccessKey: process.env.SPACES_SECRET!,
    signQuery: true,
  });

  const signedRequest = await signer.sign();
  const response = await fetch(signedRequest.url, { method: "DELETE" });

  if (!response.ok) {
    throw new Error(`Failed to delete file: ${response.statusText}`);
  }
}
