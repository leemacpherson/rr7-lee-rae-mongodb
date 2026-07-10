import { AwsV4Signer } from "aws4fetch";

export async function getPresignedDownloadUrl(
  imageKey: string,
): Promise<string> {
  const spaceName = process.env.SPACES_BUCKET_NAME!;
  const region = process.env.SPACES_REGION!; // e.g., 'nyc3'

  // Extract just the path after the domain
  const fileKey = new URL(imageKey).pathname.substring(1); // "1782878401047-mitsubishi3.jpeg"

  const url = `https://${spaceName}.${region}.digitaloceanspaces.com/${fileKey}`;

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

  // Generate the signed request metadata
  const signedRequest = await signer.sign();

  // Return the string directly to match your type definition
  return signedRequest.url.toString();
}

export async function deleteDOFile(imageKey: string): Promise<void> {
  console.log("deleteDOFile called with imageKey:", imageKey);
  const spaceName = process.env.SPACES_BUCKET_NAME!;
  const region = process.env.SPACES_REGION!;

  const fileKey = new URL(imageKey).pathname.substring(1);

  const url = `https://${spaceName}.${region}.digitaloceanspaces.com/${fileKey}`;

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
