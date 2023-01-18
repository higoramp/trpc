import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "sa-east-1",
});

export const getUploadImageUrl = async () => {
  const bucketParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: `image-${Math.ceil(Math.random() * 10 ** 10)}`,
  };

  const command = new PutObjectCommand(bucketParams);
  // Create the presigned URL.
  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 3600,
  });
  const url = bucketParams.Key;
  return { signedUrl, url };
};
