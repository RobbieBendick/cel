import './App.css';
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import React, { useState, useMemo, useEffect } from 'react';
import type { PaletteMode } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ColorModeContext } from './ColorModeContext';
import { BindRoutes } from './bind-routes';

declare module '@mui/material/styles' {
  interface Palette {
    gradient: { start: string; mid: string; end: string };
    textGradient: { start: string; mid: string; end: string };
    surface: { pill: string; cardOverlay: string };
  }
  interface PaletteOptions {
    gradient?: { start: string; mid: string; end: string };
    textGradient?: { start: string; mid: string; end: string };
    surface?: { pill: string; cardOverlay: string };
  }
  interface TypeBackground {
    default: string;
    paper: string;
    secondary: string;
  }
}

const charcoal = '#1C1C1C';
const iceBlue = '#D6EFFF';

const getDesignTokens = (mode: PaletteMode) => {
  const textPrimary = mode === 'light' ? grey[900] : '#fff';

  return {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#5BA3D0',
              light: iceBlue,
            },
            divider: alpha(textPrimary, 0.2),
            background: {
              default: '#e8f4fc',
              paper: '#f2f9ff',
              secondary: '#dceffa',
            },
            text: {
              primary: grey[900],
              secondary: grey[700],
            },
            gradient: {
              start: '#dceffa',
              mid: '#eef7fc',
              end: '#d6efff',
            },
            textGradient: {
              start: '#e8f6ff',
              mid: '#5BA3D0',
              end: '#2d7aa5',
            },
            surface: {
              pill: 'rgba(255, 255, 255, 0.9)',
              cardOverlay: alpha(charcoal, 0.6),
            },
          }
        : {
            primary: {
              main: iceBlue,
              light: '#e8f6ff',
            },
            divider: alpha(textPrimary, 0.15),
            background: {
              default: '#1b2026',
              paper: '#232a32',
              secondary: '#2c343d',
            },
            text: {
              primary: '#fff',
              secondary: 'rgba(255, 255, 255, 0.75)',
            },
            gradient: {
              start: '#252d36',
              mid: '#1b2026',
              end: '#141920',
            },
            textGradient: {
              start: iceBlue,
              mid: '#9ec9e8',
              end: '#5BA3D0',
            },
            surface: {
              pill: alpha('#2e2e2e', 0.9),
              cardOverlay: 'rgba(0, 0, 0, 0.65)',
            },
          }),
    },
  };
};

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Retrieve the color mode from localStorage if available, otherwise use prefersDarkMode
  const storedColorMode = localStorage.getItem('colorMode');
  const initialMode =
    storedColorMode === 'dark' || storedColorMode === 'light'
      ? storedColorMode
      : prefersDarkMode
        ? 'dark'
        : 'light';

  const [mode, setMode] = useState<PaletteMode>(initialMode);
  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('colorMode', newMode);
      },
    }),
    [mode],
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BindRoutes />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
