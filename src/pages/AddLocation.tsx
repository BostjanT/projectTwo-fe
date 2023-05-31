import { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import imageUploadS3 from '../components/ImageUpload';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { Box, IconButton, Input, InputLabel, OutlinedInput, Typography } from '@mui/material';
import Geocode from 'react-geocode';
import blankIMG from '../images/blankIMG.png';
import ClearIcon from '@mui/icons-material/Clear';
import { FlexBox, GreenButton } from '../style/Styles';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const AddLocation = () => {
  const navigate = useNavigate();
  const inputImage = useRef<HTMLInputElement>(null!);
  const [image, setImage] = useState<string>(null!);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [location, setLocation] = useState(null);

  Geocode.setApiKey(import.meta.env.VITE_REACT_APP_GOOGLE_KEY);
  Geocode.setLanguage('en');

  const isLoaded: any = useJsApiLoader(
    {
      googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_KEY
    }!
  );

  const imageUpload = async () => {
    setImage(await imageUploadS3(inputImage));
  };

  const center = { lat: 46.2839390379155, lng: 13.883356444585507 };

  const locationData = async (e: any) => {
    try {
      setLatitude(e.latLng.lat());
      setLongitude(e.latLng.lng());

      Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then((response) => {
        setLocation(response.results[0].formatted_Address),
          (error: any) => {
            console.error(error);
          };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createLocation = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('/location', { latitude, longitude, image }, { headers: { Authorization: `Bearer ${accessToken}` } });
    } catch (error) {
      console.log(error);
    }
  };
  /* if(isLoaded) {
    if I use this and put the return statement I get error, not valid JSX element.....
} */
  return (
    <>
      <Navbar />
      <Box sx={{ margin: '0 auto', width: '860px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <FlexBox sx={{ mb: '1rem' }}>
            <Typography variant="h4" color="secondary" sx={{ mr: '5px' }}>
              Add a new
            </Typography>
            <Typography variant="h4" color="primary">
              location.
            </Typography>
          </FlexBox>

          <input accept="image/*" id="upload-file" multiple type="file" ref={inputImage} style={{ display: 'none' }} onChange={() => imageUpload()} />
          <Box
            sx={{
              width: '860px',
              height: '280px',
              borderRadius: '4px',
              margin: '0 auto'
            }}
            component="img"
            src={image ? image : blankIMG}></Box>

          <FlexBox sx={{ alignSelf: 'flex-end', m: '23px 0' }}>
            <GreenButton
              sx={{ height: '40px' }}
              onClick={() => {
                inputImage.current.click();
              }}>
              upload image
            </GreenButton>
            <IconButton color="secondary" onClick={() => navigate(`/`)}>
              <ClearIcon
                sx={{
                  padding: '8px',
                  background: '#9B6161',
                  color: '#fff',
                  borderRadius: '4px'
                }}
              />
            </IconButton>
          </FlexBox>
          {/* END OF UPLOAD ICONS */}
          <GoogleMap
            center={center}
            zoom={12}
            options={{
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
              disableDefaultUI: true
            }}
            mapContainerStyle={{ height: '197px', width: '860px' }}
            onClick={(e) => locationData(e)}>
            <Marker position={{ lat: latitude, lng: longitude }} key={new Date().getTime().toString()} />
          </GoogleMap>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', mt: '23px' }}>
            <InputLabel sx={{ alignSelf: 'start' }}>Location</InputLabel>
            <OutlinedInput fullWidth id="location" value={location ? location : ''}></OutlinedInput>
          </Box>
          {/*  end of input location */}
          <GreenButton sx={{ alignSelf: 'end', mt: '1rem', mb: '50px' }} onClick={() => createLocation()}>
            add new
          </GreenButton>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default AddLocation;
