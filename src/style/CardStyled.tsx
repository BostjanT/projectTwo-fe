import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ImageBox = styled(Box)({
  display: 'flex',
  position: 'relative',
  cursor: 'pointer',
});

export const ImageIcons = styled(Box)({
  display: 'flex',
  alignSelf: 'start',
  justifyContent: 'space-between',
  width: '95%',

  position: 'absolute',
  left: '2.27%',
  right: '84.79%',
  top: '5.14%',
  bottom: '72%',
});

export const Lock = styled(Box)({
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, 50%)',
});

export const Distance = styled(Box)({
  position: 'absolute',
  left: '50%',
  top: '30%',
  transform: 'translate(-50%, 50%)',

  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '24px',
  lineHeight: '36px',
  color: 'white',
});
