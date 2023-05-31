import styled from '@emotion/styled';
import { AppBar, Button, Toolbar, Box, Card, Menu } from '@mui/material';
import theme from './theme';

export const FlexBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
});

export const StyledNavBar = styled(AppBar)({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  color: theme.palette.secondary.main
}) as typeof AppBar;

export const StyledToolbar = styled(Toolbar)({
  backgroundColor: 'transparent',
  color: theme.palette.secondary.main,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
}) as typeof Toolbar;

export const MyMenu = styled(Menu)({
  marginTop: '3.7rem',
  boxShadow: 'unset'
});

export const MyMenuBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100vw - 35px)',
  margin: '0'
});

export const MyMenuItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '14px 0',
  padding: '0 35px'
});

export const GreenButton = styled(Button)({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px 38px',
  border: '1px solid',
  textTransform: 'uppercase',
  transition: 'all .3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  }
});
export const BlankButton = styled(Button)({
  color: 'white',
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px 38px',
  border: '1px solid',
  textTransform: 'uppercase',
  transition: 'all .3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    color: 'white',
    backgroundColor: theme.palette.primary.light
  }
});

export const OutlinedButton = styled(Button)({
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px 38px',
  border: '1px solid #669F89',
  textTransform: 'uppercase'
});

export const CardOver = styled(Card)({
  maxWidth: '420px',
  maxHeight: '235px',
  margin: '0 19px',
  borderRadius: '4px'
});

export const BoxOverlay = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  top: 0,
  width: '100%',
  bgcolor: 'rgba(8, 118, 76, 0.6) ',
  color: 'white',
  padding: '10px'
});

export const ImageBox = styled(Box)({
  width: '420px',
  height: '255px'
});
