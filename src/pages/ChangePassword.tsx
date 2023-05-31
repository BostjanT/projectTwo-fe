import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, FormLabel, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FlexBox, GreenButton } from '../style/Styles';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const changePassword = async () => {
    try {
      if (newPassword === reNewPassword) {
        await axios.patch(
          `/auth/change-password/${token}`,
          { newPassword: newPassword, retypeNewPassword: reNewPassword },
          { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ height: '100vh', width:'503px', justifyContent: 'center', display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h4" color="secondary" sx={{ mr: '5px' }}>
          Profile
        </Typography>

        <Typography variant="h4" color="primary">
          settings
        </Typography>
      </Box>
      <Typography variant="body1" color="secondary" sx={{ mt: '32px' }}>
        Change your password
      </Typography>
      <div style={{ marginTop: '21px' }}>
        <FormLabel sx={{ fontSize: '0.75rem' }}>Password</FormLabel>
        <Input
          required
          fullWidth
          name="password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <div style={{ marginTop: '21px' }}>
        <FormLabel sx={{ fontSize: '0.75rem' }}>Password</FormLabel>
        <Input
          required
          fullWidth
          name="password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          onChange={(e) => setNewPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <div style={{ marginTop: '21px' }}>
        <FormLabel sx={{ fontSize: '0.75rem' }}>Password</FormLabel>
        <Input
          required
          fullWidth
          name="password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          onChange={(e) => setReNewPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FlexBox sx={{ margin: '2rem 0' }}>
          <GreenButton sx={{ mr: 3 }} onClick={() => changePassword()}>
            submit
          </GreenButton>
          <Typography variant="body1" onClick={() => navigate('profile-settings')} sx={{ cursor: 'pointer' }}>
            Cancel
          </Typography>
        </FlexBox>
      </div>
    </Box>
  );
};

export default ChangePassword;
