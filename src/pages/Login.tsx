import React, { SyntheticEvent, useState } from 'react';
import { Box, FormLabel, Grid, Paper } from '@mui/material';
import BgPattern from '../images/SignBg.png';
import WhiteBigLogo from '../images/WhiteBigLogo.png';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FlexBox, GreenButton } from '../style/Styles';
import MainLogo from '../images/LogoColor.png';
import LogoText from '../images/LogoText.png';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });
      let accessToken = response.data.accessToken;
      let userLogged = 'true';
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userLogged', userLogged);
      const userResponse = await axios.get('/user/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      localStorage.setItem('userData', JSON.stringify(userResponse.data));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        square
        sx={{ alignSelf: 'center', boxShadow: 'none' }}>
        <FlexBox
          sx={{
            width: '170px',
            position: 'absolute',
            top: '40px',
            left: '70px',
          }}
          onClick={() => navigate('/')}>
          <Box
            component='img'
            src={MainLogo}
            sx={{ width: '30px', height: '40px' }}></Box>
          <Box
            component='img'
            src={LogoText}
            sx={{ mt: '1.2rem', ml: '10px' }}></Box>
        </FlexBox>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography component='h3' variant='h3'>
            Sign in
          </Typography>
          <Typography
            variant='body1'
            sx={{ maxWidth: '420px', textAlign: 'center' }}>
            Welcome back to Geotagger. We are glad that you are back.
          </Typography>
          <Box
            component='form'
            noValidate
            /* onSubmit={handleSubmit} */
            sx={{ mt: 1 }}>
            <FormLabel sx={{ fontSize: '0.75rem' }}>Email</FormLabel>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel sx={{ fontSize: '0.75rem' }}>Password</FormLabel>
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
            />

            <GreenButton
              type='submit'
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => loginUser(e)}>
              Sign In
            </GreenButton>
            <FlexBox sx={{ justifyContent: 'space-between' }}>
              <Typography variant='body1'>
                Do you want to create an account?
              </Typography>
              <Typography
                onClick={() => navigate('/signup')}
                variant='body1'
                sx={{ cursor: 'pointer' }}>
                Sign Up
              </Typography>
            </FlexBox>
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          position: ' relative',
          backgroundImage: `url(${BgPattern})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box
        component='img'
        src={WhiteBigLogo}
        sx={{
          position: 'absolute',
          right: '25%',
          top: 0,
          bottom: 0,
          margin: 'auto',
          width: '200px',
          height: '294px',
        }}></Box>
    </Grid>
  );
};

export default SignIn;
