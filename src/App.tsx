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
    surface: { pill: string; cardOverlay: string };
  }
  interface PaletteOptions {
    gradient?: { start: string; mid: string; end: string };
    surface?: { pill: string; cardOverlay: string };
  }
  interface TypeBackground {
    default: string;
    paper: string;
    secondary: string;
  }
}

const palette = {
  lavender: 'rgb(111, 111, 190)',
  mid: 'rgb(41, 41, 87)',
  dark: 'rgb(33, 33, 59)',
  deeper: 'rgb(18, 18, 33)',
  deepest: 'rgb(12, 12, 22)',
};

const getDesignTokens = (mode: PaletteMode) => {
  const textPrimary = mode === 'light' ? grey[900] : '#fff';

  return {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: palette.lavender,
            },
            divider: alpha(textPrimary, 0.3),
            background: {
              default: '#f8f7fc',
              paper: '#fff',
              secondary: '#ebe9f5',
            },
            text: {
              primary: grey[900],
              secondary: grey[700],
            },
            gradient: {
              start: '#f0eff8',
              mid: '#ffffff',
              end: '#e8e6f2',
            },
            surface: {
              pill: 'rgba(255, 255, 255, 0.9)',
              cardOverlay: 'rgba(41, 41, 87, 0.6)',
            },
          }
        : {
            primary: {
              main: palette.lavender,
            },
            divider: alpha(textPrimary, 0.2),
            background: {
              default: palette.deepest,
              paper: palette.deeper,
              secondary: palette.dark,
            },
            text: {
              primary: '#fff',
              secondary: 'rgba(255, 255, 255, 0.7)',
            },
            gradient: {
              start: palette.mid,
              mid: palette.deeper,
              end: palette.deepest,
            },
            surface: {
              pill: 'rgba(33, 33, 59, 0.85)',
              cardOverlay: 'rgba(0, 0, 0, 0.6)',
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
