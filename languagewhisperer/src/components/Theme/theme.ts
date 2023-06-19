import { createTheme } from '@mui/material';

const Theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#212121',
    },
    primary: {
      main: '#01579B',
    },
    secondary: {
      main: '#11B6FF',
    },
    success: {
      main: '#81C784',
    },
    error: {
      main: '#F66B69',
    },
    warning: {
      main: '#FFAB40',
    },
    grey: {
      900: '#212121',
      800: '#424242',
      700: '#616161',
      600: '#949494',
      500: '#ACB0B9',
    },
    divider: 'rgba(255, 255, 255, 0.2)',
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          background: '#212121',
        },
        root: {
          '& input': {
            background: '#212121',
          },
          background: '#212121',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'transparent',
          height: '100%',
          fontSize: '14px',
        },
        html: { height: '100%' },
        '*': {
          '&::-webkit-scrollbar': {
            width: '1rem',
            height: '1rem',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundClip: 'content-box',
            borderRadius: '0.5rem',
            backgroundColor: '#66666655',
          },
          '&::-webkit-scrollbar-button': {
            width: 0,
            height: 0,
            display: 'none',
          },
          '&::-webkit-scrollbar-corner': {
            backgroundColor: 'transparent',
          },
          '&:hover': {
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#666666ff',
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontWeight: 700,
          fontSize: '24px',
        },
        h2: {
          fontWeight: 700,
          fontSize: '18px',
        },
        h3: {
          fontWeight: 700,
          fontSize: '16px',
        },
        h4: {
          fontWeight: 700,
          fontSize: '14px',
        },
        body1: {
          fontWeight: 400,
          fontSize: '16px',
        },
        body2: {
          fontWeight: 400,
          fontSize: '14px',
        },
        button: {
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: '14px',
        },
        caption: {
          fontWeight: 400,
          fontSize: '12px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&$focused': {
            color: '#42a5f5',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&$expanded': {
            margin: undefined,
            '&:before': {
              opacity: undefined,
            },
          },
          '&$expanded + &': {
            '&:before': undefined,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          '&:not($expanded)': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          '&$focused, &$focusVisible': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
          },
          '&$expanded': {
            minHeight: undefined,
          },
        },
        content: {
          '&$expanded': {
            margin: undefined,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          background: '#212121',
        },
        root: {
          background: '#212121',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          background: '#212121',
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'transparent',
          },
        },
        {
          props: { variant: 'text' },
          style: {
            border: 'none',
            background: 'transparent',
          },
        },
      ],
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          border: '1px solid #01579B',
          background: '#01579B',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#11B6FF',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#01579B',
          },
        },
      },
    },
  },
});

export default Theme;
