import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledNavBar, StyledToolbar, GreenButton, FlexBox, MyMenuBox, MyMenuItem, MyMenu, BlankButton } from '../style/Styles';
import Logo from '../images/LogoColor.png';
import LogoName from '../images/LogoText.png';
import { useNavigate } from 'react-router-dom';
import Avatar from '../images/Icons/Avatar.png';
import AddIcon from '../images/Icons/AddIcon.png';
import { useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Paper } from '@mui/material';
const Navbar = () => {
  const windowWidth = useRef(window.innerWidth);
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const userLogged = localStorage.getItem('userLogged');
  /* const userLogged = 'true'; */

  const logout: any = () => {
    if (!localStorage.getItem('userLogged')) return;

    localStorage.removeItem('userLogged');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
  };
  return (
    <Box sx={{ flexGrow: 1, margin: { xs: '', md: '46px 70px ' } }}>
      <StyledNavBar position="static">
        <StyledToolbar>
          <IconButton id="hamburger-menu" size="large" edge="start" aria-label="menu" onClick={(e) => setOpen(true)} sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, order: 2 }}>
            <MenuIcon />
          </IconButton>
          <FlexBox onClick={() => navigate('/')}>
            <Box
              component="img"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '32px',
                width: '22px'
              }}
              src={Logo}
              alt="no logo here"></Box>
            <Box
              component="img"
              sx={{
                display: 'flex',
                height: '30px',
                width: '140px',
                marginLeft: '10px',
                marginTop: '1rem'
              }}
              src={LogoName}></Box>
          </FlexBox>

          {userLogged ? (
            <FlexBox
              sx={{
                display: { xs: 'none', md: 'flex' }
              }}>
              <FlexBox>
                <Typography variant="body1" sx={{ mr: '48px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                  Home
                </Typography>
                <Typography variant="body1" sx={{ mr: '48px', cursor: 'pointer' }} onClick={() => navigate('/profile-settings')}>
                  Profile settings
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mr: '48px', cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/');
                    logout();
                  }}>
                  Logout
                </Typography>
              </FlexBox>
              <FlexBox>
                <IconButton onClick={() => navigate('/profile')}>
                  <img src={Avatar} />
                </IconButton>
                <IconButton onClick={() => navigate('/add-location')}>
                  <img src={AddIcon} />
                </IconButton>
              </FlexBox>
            </FlexBox>
          ) : (
            <FlexBox
              sx={{
                display: { xs: 'none', md: 'flex' }
              }}>
              <Typography onClick={() => navigate('/login')} variant="body2" sx={{ cursor: 'pointer' }}>
                Sign in
              </Typography>
              <Typography variant="body1" sx={{ m: '0 16px' }}>
                or
              </Typography>
              <GreenButton onClick={() => navigate('/signup')}>SIGN UP</GreenButton>
            </FlexBox>
          )}
        </StyledToolbar>

        <MyMenu
          id="demo-positioned-menu"
          aria-labelledby="hambruger-menu"
          open={open}
          /* onClose={(e) => setOpen(false)} */
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
          {userLogged ? (
            <MyMenuBox>
              <MyMenuItem>
                <Box></Box>
                <IconButton onClick={(e) => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </MyMenuItem>
              <MyMenuItem onClick={() => navigate('/')}>Home</MyMenuItem>
              <MyMenuItem onClick={() => navigate('/profile-settings')}>Profile settings</MyMenuItem>
              <MyMenuItem
                onClick={() => {
                  navigate('/');
                  logout();
                }}>
                Logout
              </MyMenuItem>
            </MyMenuBox>
          ) : (
            <MyMenuBox>
              <MyMenuItem>
                <Box></Box>
                <IconButton onClick={(e) => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </MyMenuItem>
              <MyMenuItem onClick={() => navigate('/')}>Home</MyMenuItem>
              <MyMenuItem>
                <GreenButton sx={{ width: '100%' }} onClick={() => navigate('/signup')}>
                  sign up
                </GreenButton>
              </MyMenuItem>
              <MyMenuItem
                onClick={() => {
                  navigate('/login');
                }}>
                <Button sx={{ width: '100%', color: '#619B8A', border: '2px solid #619B8A' }}>sign in</Button>
              </MyMenuItem>
            </MyMenuBox>
          )}
        </MyMenu>
      </StyledNavBar>
    </Box>
  );
};

export default Navbar;
