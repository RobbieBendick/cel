import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  const location = useLocation();
  const isImmersive =
    /^\/designs\/.+/.test(location.pathname) || location.pathname === '/sketchbook';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component='main' sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      {!isImmersive && <Footer />}
    </Box>
  );
}
