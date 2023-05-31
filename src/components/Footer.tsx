import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react';
import theme from '../style/theme';
import MainLogo from '../images/WhiteBigLogo.png';

export const FooterDiv = styled(Box)({
  height: '60px',
  background: theme.palette.primary.main,
  boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.15)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 70px',
  position: 'sticky'
});

const Footer = () => {
  return (
    <FooterDiv>
      <Typography sx={{ display: { xs: 'none', md: 'block' } }} variant="h5" color="#fff">
        Geotagger
      </Typography>
      <Box component="img" sx={{ display: { xs: 'block', md: 'none' }, width: '19px', height: '28px', color: 'white' }} src={MainLogo}></Box>
      <Typography sx={{ typography: { xs: 'caption', sm: 'body1' } }} color="#fff">
        All Rights Reserved | skillupmentor.com
      </Typography>
    </FooterDiv>
  );
};

export default Footer;
