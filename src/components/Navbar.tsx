import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, Link, IconButton } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { ColorModeContext } from '../ColorModeContext';
import { site } from '../content';

const navLinks = [
  { label: 'Illustrations/Projects', path: '/' },
  { label: 'Photography', path: '/photography' },
  { label: 'Sketchbook', path: '/sketchbook' },
  { label: 'About Me', path: '/about' },
] as const;

const TOP_THRESHOLD = 8;

function MenuIcon() {
  return (
    <Box
      component='svg'
      viewBox='0 0 24 24'
      sx={{ width: 22, height: 22, display: 'block' }}
      aria-hidden
    >
      <path
        fill='currentColor'
        d='M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1'
      />
    </Box>
  );
}

function CloseIcon() {
  return (
    <Box
      component='svg'
      viewBox='0 0 24 24'
      sx={{ width: 22, height: 22, display: 'block' }}
      aria-hidden
    >
      <path
        fill='currentColor'
        d='M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4'
      />
    </Box>
  );
}

function pathIsActive(pathname: string, path: string) {
  return path === '/'
    ? pathname === '/' || pathname.startsWith('/designs/')
    : pathname === path || pathname.startsWith(`${path}/`);
}

export function Navbar() {
  const location = useLocation();
  const colorMode = useContext(ColorModeContext);
  const barRef = useRef<HTMLDivElement>(null);
  const [barHeight, setBarHeight] = useState(88);
  const [atTop, setAtTop] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const revealed = atTop || hovered || menuOpen;

  useLayoutEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const update = () => setBarHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY <= TOP_THRESHOLD;
      setAtTop(top);
      if (!top && !menuOpen && !window.matchMedia('(hover: hover)').matches) {
        setHovered(false);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname, menuOpen]);

  const links = navLinks.map(({ label, path }) => {
    const isActive = pathIsActive(location.pathname, path);
    return (
      <Link
        key={path}
        component={RouterLink}
        to={path}
        underline='none'
        sx={theme => ({
          px: 1.5,
          py: 0.65,
          borderRadius: 999,
          fontWeight: isActive ? 600 : 500,
          fontSize: '0.7rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: isActive
            ? theme.palette.background.default
            : theme.palette.text.secondary,
          backgroundColor: isActive
            ? theme.palette.text.primary
            : 'transparent',
          transition: 'color 0.2s ease, background-color 0.2s ease',
          '&:hover': {
            color: isActive
              ? theme.palette.background.default
              : theme.palette.text.primary,
            backgroundColor: isActive
              ? theme.palette.text.primary
              : alpha(theme.palette.text.primary, 0.08),
          },
        })}
      >
        {label}
      </Link>
    );
  });

  return (
    <>
      <Box aria-hidden sx={{ height: barHeight }} />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme => theme.zIndex.appBar,
          height: 0,
          pointerEvents: 'none',
        }}
      >
        <Box
          onMouseEnter={() => {
            if (window.matchMedia('(hover: hover)').matches) setHovered(true);
          }}
          onMouseLeave={() => {
            if (window.matchMedia('(hover: hover)').matches) setHovered(false);
          }}
          sx={{
            pointerEvents: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: revealed ? barHeight + 72 : { xs: 110, sm: 100 },
          }}
        >
          <Box
            sx={theme => ({
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              transform: revealed ? 'translateY(0)' : 'translateY(-100%)',
              transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',
              },
              filter:
                theme.palette.mode === 'dark'
                  ? 'drop-shadow(0 8px 18px rgba(0, 0, 0, 0.35))'
                  : 'drop-shadow(0 8px 18px rgba(28, 25, 21, 0.08))',
            })}
          >
            <AppBar
              ref={barRef}
              position='static'
              elevation={0}
              sx={theme => ({
                backgroundColor: alpha(theme.palette.background.default, 0.92),
                backdropFilter: 'blur(16px)',
                borderBottom: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
              })}
            >
              <Toolbar
                disableGutters
                sx={{
                  px: { xs: 2, md: 5 },
                  py: 0.5,
                  minHeight: { xs: 64, sm: 72 },
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: 1440,
                  mx: 'auto',
                  width: '100%',
                }}
              >
                <Link
                  component={RouterLink}
                  to='/'
                  underline='none'
                  color='inherit'
                  sx={{
                    fontFamily: '"Fraunces", serif',
                    fontWeight: 500,
                    fontSize: { xs: '1.25rem', sm: '1.4rem' },
                    letterSpacing: '-0.03em',
                    lineHeight: 1.2,
                  }}
                >
                  {site.shortName}
                </Link>

                <Box
                  sx={{
                    display: { xs: 'none', sm: 'flex' },
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                  }}
                >
                  {links}
                </Box>

                <Box
                  sx={{
                    ml: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.25,
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
                        color: theme.palette.text.primary,
                        backgroundColor: alpha(theme.palette.text.primary, 0.06),
                      },
                    })}
                  >
                    {colorMode.mode === 'dark' ? (
                      <LightModeRoundedIcon fontSize='small' />
                    ) : (
                      <DarkModeRoundedIcon fontSize='small' />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => setMenuOpen(open => !open)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    size='small'
                    sx={theme => ({
                      display: { xs: 'inline-flex', sm: 'none' },
                      color: theme.palette.text.primary,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.text.primary, 0.06),
                      },
                    })}
                  >
                    {menuOpen ? <CloseIcon /> : <MenuIcon />}
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>

            <Box
              sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                opacity: atTop ? 0 : 1,
                pointerEvents: atTop ? 'none' : 'auto',
                transition: 'opacity 0.25s ease',
              }}
            >
              <Box
                aria-hidden
                onClick={() => setHovered(true)}
                sx={theme => ({
                  height: revealed ? 0 : 27,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: alpha(theme.palette.background.default, 0.92),
                  backdropFilter: 'blur(16px)',
                  borderBottom: revealed
                    ? 'none'
                    : `1px solid ${theme.palette.divider}`,
                  transition: 'height 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  '@media (prefers-reduced-motion: reduce)': {
                    transition: 'none',
                  },
                })}
              />
              <Box
                component='button'
                type='button'
                aria-label={revealed ? 'Hide navigation' : 'Show navigation'}
                aria-expanded={revealed}
                onClick={() => setHovered(open => !open)}
                sx={theme => ({
                  appearance: 'none',
                  position: 'absolute',
                  left: { xs: 16, md: 40 },
                  top: revealed ? 0 : 27,
                  width: 56,
                  height: 56,
                  padding: 0,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Fraunces", serif',
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  letterSpacing: '0.14em',
                  lineHeight: 1,
                  color: theme.palette.text.primary,
                  backgroundColor: alpha(theme.palette.background.default, 0.92),
                  backdropFilter: 'blur(16px)',
                  transition:
                    'top 0.5s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.2s ease',
                  '@media (prefers-reduced-motion: reduce)': {
                    transition: 'background-color 0.2s ease',
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.background.paper,
                  },
                  '&:focus-visible': {
                    outline: `1px solid ${theme.palette.text.primary}`,
                    outlineOffset: 3,
                  },
                })}
              >
                CXK
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {menuOpen && (
        <Box
          role='dialog'
          aria-modal='true'
          aria-label='Menu'
          sx={theme => ({
            display: { xs: 'flex', sm: 'none' },
            position: 'fixed',
            top: barHeight,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: theme.zIndex.appBar - 1,
            flexDirection: 'column',
            justifyContent: 'center',
            px: 3,
            pb: 8,
            backgroundColor: alpha(theme.palette.background.default, 0.96),
            backdropFilter: 'blur(18px)',
          })}
        >
          {navLinks.map(({ label, path }) => {
            const isActive = pathIsActive(location.pathname, path);
            return (
              <Link
                key={path}
                component={RouterLink}
                to={path}
                underline='none'
                sx={{
                  display: 'block',
                  py: 1.75,
                  fontFamily: '"Fraunces", serif',
                  fontSize: '2rem',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.15,
                  color: isActive ? 'text.primary' : 'text.secondary',
                  borderBottom: theme => `1px solid ${theme.palette.divider}`,
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {label}
              </Link>
            );
          })}
        </Box>
      )}
    </>
  );
}
