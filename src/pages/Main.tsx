import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography } from '@mui/material';
import { FlexBox, GreenButton, ImageBox, OutlinedButton } from '../style/Styles';
import { MainTitle, HeaderFlex, BestGuess, Container } from '../style/MainStyle';
import WorldMap from '../images/worldMap.png';
import Piran from '../images/Cards/Piran.jpg';
import Bohinj from '../images/Cards/Bohinj.jpg';
import Ljubljana from '../images/Cards/Ljubljana.jpg';
import Footer from '../components/Footer';
import { LocationCard } from '../components/Card';

import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Main = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState([]);
  const [guess, setGuess] = useState([]);
  const [guessNum, setGuessNum] = useState(3);
  const [locationNum, setLocationNum] = useState(9);

  const userLogged = localStorage.getItem('userLogged');
  /* const userLogged = 'true'; */
  const userInfo = JSON.parse(localStorage.getItem('userInfo')!);

  const retrieveData = async () => {
    try {
      const response = await axios.get(`location?limit=${locationNum}`);
      const { data } = response;

      const myGuessed = userInfo.guess.sort((a: any, b: any) => {
        a.distance - b.distance;
      });
      const getLocationId = userInfo.guess.map((guess: any) => guess.locationId);
      const filterLocation = data.filter((location: any) => !getLocationId.includes(location.id) && location.userId !== userInfo.id);
      setGuess(myGuessed);
      setLocation(filterLocation);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  if (userLogged !== 'true') {
    return (
      <>
        <Navbar />
        <FlexBox sx={{ marginTop: '56px', flexDirection: { xs: 'column', md: 'row' } }}>
          <HeaderFlex sx={{ marginLeft: { xs: '35px', md: '101px' }, marginRight: { xs: '35px', sm: '0' }, textAlign: { xs: 'center', sm: 'left' } }}>
            <MainTitle color="primary" sx={{ typography: { xs: 'h4', md: '61px' }, textAlign: { xs: 'center', sm: 'left' }, width: { xs: 'auto', sm: '12ch' } }}>
              Explore the world with Geotagger
            </MainTitle>
            <Typography color="secondary" variant="body1" sx={{ maxWidth: { sm: '419px' }, margin: '32px 0 18px 0' }}>
              Geotagger is website that allows you to post picture and tag it on the map. Other user than try to locate it via Google Maps.
            </Typography>
            <GreenButton sx={{ margin: { xs: '0 auto', sm: '0' } }} onClick={() => navigate('/signup')}>
              SIGN UP
            </GreenButton>
          </HeaderFlex>

          <Box
            component="img"
            src={WorldMap}
            sx={{
              maxWidth: { xs: '380px', md: '1142px' },
              height: { xs: '215px', md: '643px' },
              marginLeft: '-136px',
              zIndex: '-10'
            }}></Box>
        </FlexBox>
        <Box sx={{ margin: '0 auto', textAlign: 'center' }}>
          <Typography variant="h4" color="primary" sx={{ mb: '29px' }}>
            Try yourself at Geotagger!
          </Typography>
          <Typography variant="body1" color="secondary" sx={{ maxWidth: '587px', margin: '0 auto' }}>
            Try to guess the location of image by selecting position on the map. When you guess it, it gives you the error distance.
          </Typography>
        </Box>

        <FlexBox
          sx={{
            justifyContent: 'center',
            margin: { xs: '35px', md: '74px 72px' },
            flexDirection: { xs: 'column', md: 'row' }
          }}>
          <ImageBox sx={{ mr: '18px' }} onClick={() => navigate('/signup')}>
            <LocationCard id={'1'} image={Piran} imageIsMine={false} imageLocked={true}></LocationCard>
          </ImageBox>
          <ImageBox sx={{ mr: '18px' }} onClick={() => navigate('/signup')}>
            <LocationCard id={'2'} image={Bohinj} imageIsMine={false} imageLocked={true} />
          </ImageBox>
          <ImageBox onClick={() => navigate('/signup')}>
            <LocationCard id={'3'} image={Ljubljana} imageIsMine={false} imageLocked={true}></LocationCard>
          </ImageBox>
        </FlexBox>
        <FlexBox sx={{ justifyContent: 'center', m: '80px 0 108px' }}>
          <GreenButton onClick={() => navigate('/signup')}>sign up</GreenButton>
        </FlexBox>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <Container>
          <BestGuess>
            <Typography variant="h4" color="primary">
              Personal best guesses
            </Typography>
            <Typography variant="body1" color="secondary" sx={{ mt: '21px', mb: '32px' }}>
              Your personal best guesses appear here. Go on and try to beat your personal records or set a new one!{' '}
            </Typography>
          </BestGuess>
          <FlexBox
            sx={{
              justifyContent: 'center',
              gap: '20px',
              flexDirection: { xs: 'column', md: 'row' }
            }}>
            <ImageBox>
              <LocationCard id={'1'} image={Piran} distance={220} imageGuessed={true}></LocationCard>
            </ImageBox>
            <ImageBox>
              <LocationCard id={'1'} image={Piran} distance={220} imageGuessed={true}></LocationCard>
            </ImageBox>
            <ImageBox>
              <LocationCard id={'1'} image={Piran} distance={220} imageGuessed={true}></LocationCard>
            </ImageBox>
          </FlexBox>

          <FlexBox sx={{ justifyContent: 'center', gap: '20px' }}>
            {guess.slice(0, guessNum).map((guess) => {
              return (
                <ImageBox>
                  <LocationCard id={guess.locationId} image={guess.image} distance={guess.distance} imageGuessed={true}></LocationCard>
                </ImageBox>
              );
            })}
          </FlexBox>
          <FlexBox sx={{ justifyContent: 'center' }}>
            <OutlinedButton onClick={() => setGuessNum(guessNum + 3)}>load more</OutlinedButton>
          </FlexBox>
          <BestGuess>
            <Typography variant="h4" color="primary">
              New locations
            </Typography>
            <Typography variant="body1" color="secondary" sx={{ mt: '21px', mb: '32px' }}>
              New uploads from users. Try to guess all the locations by pressing on a picture.
            </Typography>
          </BestGuess>
          <FlexBox
            sx={{
              justifyContent: 'center',
              gap: '20px',
              flexDirection: { xs: 'column', md: 'row' }
            }}>
            {location.slice(0, locationNum).map((locate) => {
              return (
                <ImageBox>
                  <LocationCard id={locate.id} image={locate.image}></LocationCard>
                </ImageBox>
              );
            })}
          </FlexBox>
          <FlexBox sx={{ justifyContent: 'center' }}>
            <OutlinedButton onClick={() => setLocationNum(locationNum + 3)}>load more</OutlinedButton>
          </FlexBox>
        </Container>
        <Footer />
      </>
    );
  }
};

export default Main;
