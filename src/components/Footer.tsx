import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const navLinks = [
  { label: 'Designs', path: '/designs' },
  { label: 'Photography', path: '/photography' },
] as const;

export function Footer() {
  return (
    <Box
      component='footer'
      sx={theme => ({
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        mt: 'auto',
      })}
    >
      <Container maxWidth='lg' sx={{ py: { xs: 4, md: 5 } }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 0 }}
          justifyContent='space-between'
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Box>
            <Link
              component={RouterLink}
              to='/'
              underline='none'
              color='inherit'
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.02em',
                fontSize: '1.125rem',
                background:
                  'linear-gradient(135deg, #b8b8e8 0%, rgb(111, 111, 190) 50%, rgb(41, 41, 87) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            >
              Cel
            </Link>
            <Typography variant='body2' sx={{ mt: 1, maxWidth: 280 }}>
              Fine art & portrait photography. Available for editorial,
              portrait, and gallery work worldwide.
            </Typography>
          </Box>

          <Stack direction='row' spacing={4} alignItems='center'>
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                component={RouterLink}
                to={path}
                underline='hover'
                sx={{
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {label}
              </Link>
            ))}
          </Stack>

          <Stack direction='row' spacing={2} alignItems='center'>
            <Link
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Instagram'
              sx={theme => ({
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 2,
                color: 'text.secondary',
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(0,0,0,0.04)',
                },
              })}
            >
              <InstagramIcon fontSize='small' />
            </Link>
            <Link
              href='mailto:hello@example.com'
              aria-label='Email'
              sx={theme => ({
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 2,
                color: 'text.secondary',
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(0,0,0,0.04)',
                },
              })}
            >
              <MailOutlineIcon fontSize='small' />
            </Link>
          </Stack>
        </Stack>

        <Typography
          variant='caption'
          sx={theme => ({
            display: 'block',
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            color: 'text.secondary',
            opacity: 0.8,
          })}
        >
          © {new Date().getFullYear()} Cel. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
