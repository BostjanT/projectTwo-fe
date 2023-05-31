import axios from '../api/axios';
import { ImageUploader } from '../api/uploadS3';

const imageUploadS3 = async (imageUpload: any):Promise<any> => {
  try {
    const aws3 = { headers: { 'Content-Type': 'image/png' } };
    const url = await ImageUploader();
    await axios.put(url, imageUpload.current.file[0], aws3);
    const imageURL = url.split('?')[0];
    return imageURL;
  } catch (error) {
    console.log(error);
  }
};

export default imageUploadS3;
