import styled from '@emotion/styled';
import { Typography, Box } from '@mui/material';
export const MainTitle = styled(Typography)({
  width: '12ch',
  fontSize: '61px',
  lineHeight: '70px'
});

export const HeaderFlex = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'space-between'
  /* marginLeft: '101px', */
});

export const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 70px'
});

export const BestGuess = styled(Box)({
  marginTop: '90px',
  lineHeight: '40px',
  letterSpacing: '.25px'
});
