import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography } from '@mui/material';
import Footer from '../components/Footer';
import { FlexBox, ImageBox, OutlinedButton } from '../style/Styles';
import Avatar from '../images/Icons/Avatar.png';
import { LocationCard } from '../components/Card';

const Profile = () => {
  const [guessNum, setGuessNum] = useState(3);
  const [locationNum, setLocationNum] = useState(9);
  const userInfo = JSON.parse(localStorage.getItem('userInfo')!);

  const location = userInfo.location;
  const myGuessed = userInfo.guess.sort((a: any, b: any) => {
    a.distance - b.distance;
  });
  return (
    <div>
      <Navbar />
      <FlexBox>
        <Box
          component='img'
          src={userInfo.image ? userInfo.image : Avatar}
          sx={{ width: '64px', height: '64px' }}></Box>
        <Typography variant='h4' color='secondary'>
          {userInfo.firstName} {userInfo.lastName}
        </Typography>
      </FlexBox>
      <Typography
        variant='h5'
        color='secondary'
        sx={{ mt: '64px', mb: '32px' }}>
        My best guesses
      </Typography>
      <FlexBox sx={{ justifyContent: 'center', gap: '20px' }}>
        {myGuessed.slice(0, guessNum).map((guess: any) => {
          return (
            <ImageBox>
              <LocationCard
                id={guess.locationId}
                image={guess.image}
                distance={guess.distance}
                imageGuessed={true}></LocationCard>
            </ImageBox>
          );
        })}
      </FlexBox>
      <FlexBox sx={{ justifyContent: 'center' }}>
        <OutlinedButton onClick={() => setGuessNum(guessNum + 3)}>
          load more
        </OutlinedButton>
      </FlexBox>
      <Typography
        variant='h5'
        color='secondary'
        sx={{ mt: '43px', mb: '32px' }}>
        My uploads
      </Typography>
      <FlexBox
        sx={{
          justifyContent: 'center',
          gap: '20px',
          flexDirection: { xs: 'column', md: 'row' },
        }}>
        {location.slice(0, locationNum).map((locate: any) => {
          return (
            <ImageBox>
              <LocationCard id={locate.id} image={locate.image}></LocationCard>
            </ImageBox>
          );
        })}
      </FlexBox>
      <FlexBox sx={{ justifyContent: 'center' }}>
        <OutlinedButton onClick={() => setLocationNum(locationNum + 3)}>
          load more
        </OutlinedButton>
      </FlexBox>
      <Footer />
    </div>
  );
};

export default Profile;
