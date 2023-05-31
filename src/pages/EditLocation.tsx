import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import imageUploadS3 from '../components/ImageUpload';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { Box, Typography } from '@mui/material';
import Geocode from 'react-geocode';
import Piran from '../images/Cards/Piran.jpg';
import { FlexBox, GreenButton } from '../style/Styles';

const EditLocation = () => {
  const navigate = useNavigate();
  const inputImage = useRef<HTMLInputElement>(null!);
  const [image, setImage] = useState<string>(null!);
  const [gotData, setGotData] = useState<any>(null);
  const [location, setLocation] = useState(null);
  const [anyData, setAnyData] = useState(false);
  const { id } = useParams();

  const locationData = async () => {
    try {
      const response = await axios.get(`/location/${id}`);
      if (response.status === 200) {
        const { data } = response;
        setGotData(data);
        Geocode.fromLatLng(data.latitude, data.longitude).then(
          (response) => {
            const address = response.results[0].formatted_address;

            setLocation(address);
          },
          (error) => {
            console.error(error);
          }
        );
        setAnyData(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveData = async () => {
    try {
      if (image) {
        const response = await axios.patch(
          `/location/${id}`,
          { image },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          }
        );
      }
      navigate('/location');
    } catch (error) {
      console.log(error);
    }
  };

  const imageUpload = async () => {
    setImage(await imageUploadS3(inputImage));
  };

  useEffect(() => {
    locationData();
  }, []);

  return (
    <div>
      <Navbar />
      <Box sx={{ m: '0 auto' }}>
        <Typography variant="h4" color="secondary">
          Edit
        </Typography>
        <Typography variant="h4" color="primary">
          location
        </Typography>
      </Box>

      <input accept="image/*" id="upload-file" multiple type="file" ref={inputImage} style={{ display: 'none' }} onChange={() => imageUpload()} />
      <Box
        sx={{
          width: '860px',
          height: '280px',
          borderRadius: '4px',
          m: '0 auto'
        }}
        component="img"
        src={gotData.image ? gotData.image : Piran}></Box>
      <Typography variant="body1" color="secondary" sx={{ m: '24px 0px' }}>
        Location: {location}
      </Typography>
      <FlexBox>
        <GreenButton
          onClick={() => {
            inputImage.current.click();
          }}>
          upload image
        </GreenButton>
        <Box>
          <GreenButton onClick={() => saveData()}>save</GreenButton>
          <Typography variant="body1" color="secondary" sx={{ display: 'flex', alignItems: 'center' }} onClick={() => navigate('/')}>
            Cancel
          </Typography>
        </Box>
      </FlexBox>
      <Footer />
    </div>
  );
};

export default EditLocation;
