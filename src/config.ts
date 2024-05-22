export const s3Config = {
  auth: {
    accessKeyId: process.env.YANDEX_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.YANDEX_S3_SECRET_ACCESS_KEY,
  },
  Bucket: process.env.YANDEX_S3_BUCKET_NAME,
};
