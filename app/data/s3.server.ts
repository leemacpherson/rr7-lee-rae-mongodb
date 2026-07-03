import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl as awsGetSignedUrl } from "@aws-sdk/s3-request-presigner";

// 1. Initialize the S3 Client pointed at DigitalOcean Spaces
export const s3Client = new S3Client({
  endpoint: `https://${process.env.SPACES_REGION}.digitaloceanspaces.com`,
  region: process.env.SPACES_REGION, // e.g., "nyc3"
  credentials: {
    accessKeyId: process.env.SPACES_KEY || "",
    secretAccessKey: process.env.SPACES_SECRET || "",
  },
  // This lineforces the SDK to sign URLs using legacy,
  // broadly S3-compatible methods instead of strict modern AWS features.
  forcePathStyle: false,
  // CRUCIAL FOR AWS SDK V3 + DIGITALOCEAN:
  // This downgrades the URL signer to use standard payload hashes that DigitalOcean recognizes.
  signer: {
    sign: async (request, options) => {
      request.headers["X-Amz-Content-Sha256"] = "UNSIGNED-PAYLOAD";
      return request;
    },
  },
});

// 2. Clear wrapper to generate temporary viewing URLs
export async function getPresignedDownloadUrl(
  imageKey: string,
): Promise<string> {
  // Extract just the path after the domain
  const fileKey = new URL(imageKey).pathname.substring(1); // "1782878401047-mitsubishi3.jpeg"

  const command = new GetObjectCommand({
    Bucket: process.env.SPACES_BUCKET_NAME, // Your Space name
    Key: fileKey, // e.g., "images/photo-123.jpg"
  });
  // 3. Send the command to DigitalOcean
  const response = await s3Client.send(command);

  // The actual file data is inside response.Body
  // In Node.js/Runtimes, you usually convert this stream to a string, buffer, or arrayBuffer
  if (!response.Body) {
    throw new Error("S3 response body is empty");
  }
  const byteArray = await response.Body.transformToByteArray();
  console.log(
    `.   next step is to return awsGetSignedUrl.   aaaaaaaaa.  S3 response for ${fileKey}:`,
    byteArray.slice(0, 20), // Log first 20 bytes for brevity
  );

  // Generates a URL valid for 1 hour (3600 seconds)
  // 1. Generate the URL as you normally do
  const rawUrl = await awsGetSignedUrl(s3Client, command, { expiresIn: 3600 });

  // 2. Clean the URL to satisfy the browser's ORB security
  const url = new URL(rawUrl);
  url.searchParams.delete("x-amz-checksum-mode");

  const cleanUrl = url.toString();
  // This will output a valid URL without the ORB-triggering checksum query parameter!

  console.log(
    `.   next step is to return awsGetSignedUrl.   bbbbbbbbb.  Cleaned signed URL for ${fileKey}:`,
    cleanUrl,
  );

  return cleanUrl;

  // return awsGetSignedUrl(s3Client, command, { expiresIn: 3600 });
}
