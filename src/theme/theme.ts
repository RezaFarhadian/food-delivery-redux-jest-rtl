import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    lightPink: string;
    gray: string;
  }

  interface PaletteOptions {
    lightPink: string;
    gray: string;
  }

  interface PaletteColor {
    lightPink?: string;
    gray?: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#ef5350',
      main: '#d32f2f',
      dark: '#c62828'
    },
    lightPink: '#fff', // it's not quite pink for UI reasons, it just doesn't fit right w/ our current design system :)
    gray: 'rgb(118, 118, 118)'
  },
  typography: {
    fontFamily: `'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#fff"
        }
      }
    }
  }
});

export default theme;
