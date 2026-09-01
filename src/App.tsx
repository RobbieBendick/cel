import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import type { PaletteMode } from '@mui/material';
import { ColorModeContext } from './ColorModeContext';
import { BindRoutes } from './bind-routes';
import { site } from './content';

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

const serif = '"Fraunces", "Times New Roman", serif';
const sans = '"Figtree", system-ui, sans-serif';

const getDesignTokens = (mode: PaletteMode) => {
  const light = mode === 'light';

  return {
    palette: {
      mode,
      primary: {
        main: light ? '#4e5d46' : '#c9b89a',
      },
      divider: light ? 'rgba(28, 25, 21, 0.12)' : 'rgba(243, 238, 230, 0.12)',
      background: {
        default: light ? '#f3eee6' : '#12100e',
        paper: light ? '#faf7f1' : '#1b1815',
        secondary: light ? '#e8e0d4' : '#241f1b',
      },
      text: {
        primary: light ? '#1c1915' : '#f3eee6',
        secondary: light ? 'rgba(28, 25, 21, 0.68)' : 'rgba(243, 238, 230, 0.68)',
      },
      gradient: {
        start: light ? '#efe8dc' : '#1b1815',
        mid: light ? '#f3eee6' : '#12100e',
        end: light ? '#e6ddd0' : '#0d0c0a',
      },
      textGradient: {
        start: light ? '#2b2823' : '#f7f1e8',
        mid: light ? '#4e5d46' : '#c9b89a',
        end: light ? '#3d4a38' : '#e8dcc6',
      },
      surface: {
        pill: light ? 'rgba(250, 247, 241, 0.9)' : 'rgba(27, 24, 21, 0.9)',
        cardOverlay: light ? 'rgba(18, 16, 14, 0.55)' : 'rgba(0, 0, 0, 0.62)',
      },
    },
    typography: {
      fontFamily: sans,
      h1: { fontFamily: serif, fontWeight: 500, letterSpacing: '-0.03em' },
      h2: { fontFamily: serif, fontWeight: 500, letterSpacing: '-0.03em' },
      h3: { fontFamily: serif, fontWeight: 500, letterSpacing: '-0.02em' },
      h4: { fontFamily: serif, fontWeight: 500 },
      h5: { fontFamily: serif, fontWeight: 500 },
      h6: { fontFamily: serif, fontWeight: 500 },
      subtitle1: { fontFamily: serif },
      subtitle2: { fontFamily: sans, fontWeight: 500, letterSpacing: '0.08em' },
      button: { fontFamily: sans, fontWeight: 600, textTransform: 'none' as const },
    },
    shape: { borderRadius: 2 },
  };
};

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
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
    document.title = site.artistName;
  }, [theme]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BindRoutes />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
