import AWS from 'aws-sdk';

const region = import.meta.env.VITE_REACT_APP_REGION;
const accessKeyId = import.meta.env.VITE_REACT_APP_ACCESS_KEY_ID;
const secretAccessKey = import.meta.env.VITE_REACT_APP_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
});

export const ImageUploader = async () => {
    const params = await s3.getSignedUrlPromise('putObject', {
        Bucket: 'My-Bucket-Name',
        Key: `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.png`
    });
    return params;
};
