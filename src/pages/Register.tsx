import React, { SyntheticEvent, useRef, useState } from 'react';
import {
  Box,
  FormLabel,
  Grid,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
} from '@mui/material';
import BgPattern from '../images/SignBg.png';
import WhiteBigLogo from '../images/WhiteBigLogo.png';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { FlexBox, GreenButton } from '../style/Styles';
import MainLogo from '../images/LogoColor.png';
import LogoText from '../images/LogoText.png';
import UserImage from '../images/Icons/Avatar.png';
import { useNavigate } from 'react-router-dom';
import { VisibilityOff } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';
import axios from '../api/axios';
import imageUploadS3 from '../components/ImageUpload';

const SignIn = () => {
  const navigate = useNavigate();
  const inputImage = useRef<HTMLInputElement>(null!);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [image, setImage] = useState(null!);

  const registerUser = async () => {
    if (password === rePassword) {
      await axios.post('/auth/signup', {
        email,
        firstName,
        lastName,
        password,
        rePassword,
        image,
      });
      navigate('/login');
    } else {
      console.log('Unable to register!');
    }
  };

  const imageUpload = async () => {
    setImage(await imageUploadS3(inputImage));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: SyntheticEvent) => {
    e.preventDefault();
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
            Sign up
          </Typography>
          <Typography
            variant='body1'
            sx={{ maxWidth: '420px', textAlign: 'center' }}>
            Your name will appear on posts and your public profle.
          </Typography>

          <input
            accept='image/*'
            id='upload-file'
            multiple
            type='file'
            ref={inputImage}
            style={{ display: 'none' }}
            onChange={() => imageUpload()}
          />
          <label htmlFor='upload-file'>
            <Avatar
              sx={{
                mt: '40px',
                width: '4rem',
                height: '4rem',
              }}
              onClick={() => {
                inputImage.current.click();
              }}></Avatar>
          </label>
          <Box component='form' noValidate sx={{ mt: 1 }}>
            <FormLabel sx={{ fontSize: '0.75rem' }}>Email</FormLabel>
            <Input
              required
              fullWidth
              name='email'
              id='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <FlexBox sx={{ justifyContent: 'space-between', mt: 2 }}>
              <div style={{ marginRight: '1rem' }}>
                <InputLabel sx={{ fontSize: '0.75rem' }}>First Name</InputLabel>
                <Input
                  required
                  name='firstName'
                  id='firstName'
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <InputLabel sx={{ fontSize: '0.75rem' }}>Last Name</InputLabel>
                <Input
                  required
                  name='lastName'
                  id='lastName'
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </FlexBox>

            <div style={{ marginTop: '21px' }}>
              <FormLabel sx={{ fontSize: '0.75rem' }}>Password</FormLabel>
              <Input
                required
                fullWidth
                name='password'
                type={showPassword ? 'text' : 'password'}
                id='password'
                autoComplete='current-password'
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <div style={{ marginTop: '25px' }}>
              <FormLabel sx={{ fontSize: '0.75rem' }}>
                Confirm Password
              </FormLabel>
              <Input
                required
                fullWidth
                name='password'
                type={showPassword ? 'text' : 'password'}
                id='password'
                autoComplete='current-password'
                onChange={(e) => setRePassword(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>

            <GreenButton
              type='submit'
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={() => registerUser()}>
              Sign In
            </GreenButton>
            <FlexBox sx={{ justifyContent: 'space-between' }}>
              <Typography variant='body1'>Already have an account?</Typography>
              <Typography
                onClick={() => navigate('/login')}
                variant='body1'
                sx={{ cursor: 'pointer' }}>
                Sign In
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
