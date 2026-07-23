import { useContext } from 'react';
import { alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, Link, IconButton } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { ColorModeContext } from '../ColorModeContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Designs', path: '/designs' },
  { label: 'Photography', path: '/photography' },
] as const;

export function Navbar() {
  const location = useLocation();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={theme => ({
        backgroundColor: alpha(theme.palette.background.paper, 0.88),
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
      })}
    >
      <Toolbar
        disableGutters
        sx={{
          px: { xs: 2, sm: 3 },
          py: 1,
          minHeight: { xs: 56, sm: 64 },
          display: 'flex',
          maxWidth: { md: 1500 },
          mx: { md: 'auto' },
          width: { md: '100%' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 56 }}>
          <Link
            component={RouterLink}
            to='/'
            underline='none'
            color='inherit'
            sx={theme => ({
              display: 'flex',
              alignItems: 'center',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              fontSize: '1.25rem',
              background: `linear-gradient(135deg, ${theme.palette.textGradient.start} 0%, ${theme.palette.textGradient.mid} 50%, ${theme.palette.textGradient.end} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            })}
          >
            Cel
          </Link>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          {navLinks.map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                component={RouterLink}
                to={path}
                underline='none'
                sx={theme => ({
                  px: { xs: 1.5, sm: 2 },
                  py: 1.25,
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                  color: isActive
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  transition: 'color 0.25s ease',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                  '&:hover > span::after': {
                    width: '100%',
                  },
                })}
              >
                <Box
                  component='span'
                  sx={theme => ({
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: -4,
                      height: 2,
                      backgroundColor: theme.palette.primary.main,
                      width: isActive ? '100%' : 0,
                      transition: 'width 0.3s ease',
                    },
                  })}
                >
                  {label}
                </Box>
              </Link>
            );
          })}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            minWidth: 56,
          }}
        >
          <IconButton
            onClick={colorMode.toggleColorMode}
            aria-label={
              colorMode.mode === 'dark'
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
            size='small'
            sx={theme => ({
              color: theme.palette.text.secondary,
              '&:hover': {
                color: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            })}
          >
            {colorMode.mode === 'dark' ? (
              <LightModeRoundedIcon fontSize='small' />
            ) : (
              <DarkModeRoundedIcon fontSize='small' />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
