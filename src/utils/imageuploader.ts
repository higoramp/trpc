import { PutObjectCommand, DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "sa-east-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY || '',
    secretAccessKey: process.env.SECRET_KEY || '',
  },
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
  // Probably, not the best way to get the url...
  return { signedUrl, url: signedUrl.split('?')[0] };
};

export const deleteImage = async (imageUrl: string) => {
  const bucketParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: imageUrl.split('/').pop(),
  };
  const command = new DeleteObjectCommand(bucketParams);
  // Create the presigned URL.
  await s3.send(command);
  // Probably, not the best way to get the url...
};