import { Email, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, FormLabel, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BlankButton, FlexBox, GreenButton } from '../style/Styles';
import UpdateUserInfo from '../components/updateUser';

const ProfileSettings = () => {
  const [newEmail, setNewEmail] = useState('');
  const [firstNameChange, setFirstNameChange] = useState('');
  const [lastNameChange, setLastNameChange] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const changeUserInfo = async () => {
    try {
      await axios.patch('/auth/user', { firstName: firstNameChange, lastName: lastNameChange, email: newEmail }, { headers: { Authorization: `Bearer $(localStorage.getItem('accessToken))` } });
      await UpdateUserInfo();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ height: '100vh', width: '510px', justifyContent: 'center', display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h4" color="secondary" sx={{ mr: '5px' }}>
          Profile
        </Typography>

        <Typography variant="h4" color="primary">
          settings
        </Typography>
      </Box>
      <Typography variant="body1" color="secondary" sx={{ mt: '32px' }}>
        Change your information
      </Typography>
      <div style={{ marginTop: '21px' }}>
        <InputLabel sx={{ fontSize: '0.75rem' }}>Mail</InputLabel>
        <Input required fullWidth name="firstName" id="firstName" value={newEmail} placeholder={'email@example.com'} autoComplete="current-password" onChange={(e) => setNewEmail(e.target.value)} />
      </div>
      <FlexBox sx={{ justifyContent: 'space-between' }}>
        <div style={{ marginTop: '21px' }}>
          <InputLabel sx={{ fontSize: '0.75rem' }}>First Name</InputLabel>
          <Input sx={{ width: '252px' }} required name="firstName" id="firstName" autoComplete="current-password" placeholder="John" onChange={(e) => setFirstNameChange(e.target.value)} />
        </div>
        <div style={{ marginTop: '21px' }}>
          <InputLabel sx={{ fontSize: '0.75rem' }}>Last Name</InputLabel>
          <Input sx={{ width: '252px' }} required name="lastName" id="lastName" placeholder="Doe" onChange={(e) => setLastNameChange(e.target.value)} />
        </div>
      </FlexBox>

      <FlexBox sx={{ mt: '32px', gap: '10px' }}>
        <BlankButton sx={{ backgroundColor: '#233D4D', width: '100%' }} onClick={() => navigate('/change-password')}>
          change password
        </BlankButton>
        <BlankButton sx={{ backgroundColor: '#619B8A', width: '100%' }} onClick={() => navigate('/change-image')}>
          change image
        </BlankButton>
      </FlexBox>
      <FlexBox sx={{ mt: '32px' }}>
        <GreenButton sx={{ mr: 3 }} onClick={() => changeUserInfo()}>
          submit
        </GreenButton>
        <Typography variant="body1" onClick={() => navigate('/profile')} sx={{ cursor: 'pointer' }}>
          Cancel
        </Typography>
      </FlexBox>
    </Box>
  );
};

export default ProfileSettings;
