import { createTheme, responsiveFontSizes } from '@mui/material';
import { light } from '@mui/material/styles/createPalette';

const theme = createTheme({
  palette: {
    primary: {
      main: '#619B8A',
    },
    secondary: {
      main: '#233D4D',
    },
  },

  typography:
    /*  {
    fontFamily:['Roboto', 'Poppins'].join(',')
  }, */
    {
      h1: {
        fontWeight: 'light',
        fontSize: '6rem',
      },
      h2: {
        fontWeight: 'light',
        fontSize: '3.75rem',
      },
      h3: {
        fontWeight: 'regular',
        fontSize: '3rem',
      },
      h4: {
        fontWeight: 'regular',
        fontSize: ' 2.125rem',
      },
      h5: {
        fontWeight: 'regular',
        fontSize: '1.5rem',
      },
      body1: {
        fontWeight: 'regular',
        fontSize: '1rem',
      },
      body2: {
        fontWeight: 'bold',
      },
      caption: {
        fontWeight: 'normal',
        fontSize: '0.75rem',
      },
    },
});

export default responsiveFontSizes(theme);
