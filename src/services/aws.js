const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();
module.exports = {
  IAM_USER_KEY: process.env.IAM_USER_KEY,
  IAM_USER_SECRET: process.env.IAM_USER_SECRET,
  BUCKET_NAME: process.env.BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  uploadToS3: async function (file, filename, acl = 'public-read') {
    const IAM_USER_KEY = this.IAM_USER_KEY;
    const IAM_USER_SECRET = this.IAM_USER_SECRET;
    const BUCKET_NAME = this.BUCKET_NAME;
    const AWS_REGION = this.AWS_REGION;

    const s3client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET
      }
    });

    const params = {
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: file.data,
      ACL: acl,
    };

    try {
      const data = await s3client.send(new PutObjectCommand(params));
      console.log(data);
      return { error: false, message: data };
    } catch (err) {
      console.log(err);
      return { error: true, message: err };
    }
  },
  deleteFileS3: async function (key) {
    const IAM_USER_KEY = this.IAM_USER_KEY;
    const IAM_USER_SECRET = this.IAM_USER_SECRET;
    const BUCKET_NAME = this.BUCKET_NAME;
    const AWS_REGION = this.AWS_REGION;

    const s3client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET
      }
    });

    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
    };

    try {
      const data = await s3client.send(new DeleteObjectCommand(params));
      console.log(data);
      return { error: false, message: data };
    } catch (err) {
      console.log(err);
      return { error: true, message: err };
    }
  }
};
