import axios from '../api/axios';
import imageUploadS3 from '../components/ImageUpload';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { FlexBox, GreenButton } from '../style/Styles';
import UpdateUserInfo from '../components/updateUser';
import { ImageUploader } from '../api/uploadS3';
const ChangeImage = () => {
  const navigate = useNavigate();
  const inputImage = useRef<HTMLInputElement>(null!);
  const [image, setImage] = useState(null!);

  const uploadImage = async () => {
    try {
      const s3Options = { headers: { 'Content-Type': 'image/png' } };
      const url = await ImageUploader();
      await axios.put(url, inputImage.current.files[0], s3Options);
      const imageUrl = url.split('?')[0];
      setImage(imageUrl);
    } catch (error) {}
  };

  const changeProfileImage = async () => {
    try {
      const response = await axios.patch(
        '/auth/change-image',
        {
          image: image
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
      );
      if (response.status === 200) {
        await UpdateUserInfo();
        navigate('/profile');
      }
    } catch (error) {}
  };
  const imageUpload = async () => {
    setImage(await imageUploadS3(inputImage));
  };
  return (
    <Box sx={{ height: '100vh', width: '503px', justifyContent: 'center', display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h4" color="secondary" sx={{ mr: '5px' }}>
          Profile
        </Typography>

        <Typography variant="h4" color="primary">
          settings
        </Typography>
      </Box>
      <Typography variant="body1" color="secondary" sx={{ mt: '32px' }}>
        Change your profile image
      </Typography>
      <FlexBox sx={{ justifyContent: 'center' }}>
        <input accept="image/*" id="upload-file" multiple type="file" ref={inputImage} style={{ display: 'none' }} onChange={() => imageUpload()} />
        <label htmlFor="upload-file">
          <Avatar
            onClick={() => {
              inputImage.current.click();
            }}
            sx={{
              mt: '40px',
              width: '4rem',
              height: '4rem'
            }}></Avatar>
        </label>
        <GreenButton onClick={() => uploadImage()}>upload new image</GreenButton>
      </FlexBox>
      <FlexBox sx={{ margin: '2rem 0' }}>
        <GreenButton sx={{ mr: 3 }} onClick={() => changeProfileImage()}>
          submit
        </GreenButton>
        <Typography variant="body1" onClick={() => navigate('profile-settings')} sx={{ cursor: 'pointer' }}>
          Cancel
        </Typography>
      </FlexBox>
    </Box>
  );
};

export default ChangeImage;
