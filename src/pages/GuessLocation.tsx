import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Grid, Paper } from '@mui/material';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { Box, IconButton, InputLabel, OutlinedInput, Typography } from '@mui/material';
import Geocode from 'react-geocode';
import blankIMG from '../images/blankIMG.png';
import ClearIcon from '@mui/icons-material/Clear';
import { FlexBox, GreenButton } from '../style/Styles';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Leaderboard from '../components/Leaderboard';
import { userInfo } from 'os';

const GuessLocation = () => {
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [location, setLocation] = useState(null);
  const [locationInfo, setLocationInfo] = useState<any>(null!);
  const [guess, setGuess] = useState<any>(null!);
  const [distance, setDistance] = useState<any>(null!);

  const userData: any = JSON.parse(localStorage.getItem('userData')!);
  const { id } = useParams();

  Geocode.setApiKey(import.meta.env.VITE_REACT_APP_GOOGLE_KEY);
  Geocode.setLanguage('en');
  const isLoaded = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_KEY
  });

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

  const getLocation = async () => {
    try {
      const response = await axios.get(`/location/${id}`);
      if (response.status === 200) {
        const { data } = response;
        setLocationInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLocationGuess = async () => {
    try {
      const response = await axios.get(`location/guess/${id})`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
      if (response.status === 200) {
        const { data } = response;
        setGuess(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const guessLocation = async () => {
    try {
      const response = await axios.post(`/location/guess/${id}`, { latitude, longitude }, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocationGuess();
  }, []);

  return (
    <>
      <Box sx={{ height: 'calc(100vh - 108px)' }}>
        <Navbar />
        <FlexBox sx={{ margin: '0 70px', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '860px' }}>
            <FlexBox sx={{ mb: '1rem' }}>
              <Typography variant="h4" color="secondary" sx={{ mr: '5px' }}>
                Take a
              </Typography>
              <Typography variant="h4" color="primary">
                guess
              </Typography>
            </FlexBox>

            <Box
              sx={{
                width: '860px',
                height: '280px',
                borderRadius: '4px',
                margin: '0 auto'
              }}
              component="img"
              src={locationInfo.image ? locationInfo.image : blankIMG}></Box>

            <Box></Box>
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
            <div></div>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <FlexBox sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '28%', mt: '23px' }}>
                  <InputLabel sx={{ alignSelf: 'start' }}>Error distance</InputLabel>
                  <OutlinedInput fullWidth id="location" value={'No error here'}></OutlinedInput>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '68%', mt: '23px' }}>
                  <InputLabel sx={{ alignSelf: 'start' }}>Location</InputLabel>
                  <OutlinedInput fullWidth id="location" value={location ? location : ''}></OutlinedInput>
                </Box>
              </FlexBox>
              <GreenButton onClick={() => guessLocation()} sx={{ alignSelf: 'end', mt: 2, mb: '36px' }}>
                guess
              </GreenButton>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf: 'start', ml: '1rem' }}>
            <Typography variant="h4" color="secondary">
              Leaderboard
            </Typography>
             {guess.map((guess:any, i:number) => {
              const userMe = guess.user.id === userInfo.id
              const position = i + 1
              <Leaderboard 
              key={guess.id} 
              user={`${guess.user.firstName} ${guess.user.lastName}`} userLeader={position} 
              distance={guess.distance} 
              image={guess.user.image} 
              timeVoted={''} 
              userMe={userMe} />
            })}
          </Box>
        </FlexBox>
      </Box>
      <Footer />
    </>
  );
};

export default GuessLocation;
