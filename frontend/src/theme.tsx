import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#7538bf',
    },
    secondary: {
      main: '#747fac'
    },
    text: {
      primary: '#edf3f4',
      secondary: '#7538bf'
    },
    background: {
      default: '#0e1718',
      paper: '#162022'
    },

  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '10px'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0e1718'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          border: '1px solid #3e4f67'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#747fac'
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#3e4f67',
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0e1718'
        }
      }
    },
  }
})