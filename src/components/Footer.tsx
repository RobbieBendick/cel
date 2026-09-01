import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { site } from '../content';

const navLinks = [
  { label: 'Illustrations/Projects', path: '/' },
  { label: 'Photography', path: '/photography' },
  { label: 'Sketchbook', path: '/sketchbook' },
  { label: 'About Me', path: '/about' },
] as const;

export function Footer() {
  return (
    <Box
      component='footer'
      sx={theme => ({
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.secondary,
        mt: 'auto',
      })}
    >
      <Container maxWidth='lg' sx={{ py: { xs: 5, md: 6 } }}>
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
              color='text.primary'
              sx={{
                fontFamily: '"Fraunces", serif',
                fontWeight: 500,
                fontSize: '1.35rem',
                letterSpacing: '-0.03em',
              }}
            >
              {site.artistName}
            </Link>
            <Typography variant='body2' sx={{ mt: 1.25, maxWidth: 320, lineHeight: 1.6 }}>
              {site.footer.blurb}
            </Typography>
          </Box>

          <Stack direction='row' spacing={4} alignItems='center'>
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                component={RouterLink}
                to={path}
                underline='none'
                sx={{
                  fontWeight: 500,
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {label}
              </Link>
            ))}
          </Stack>

          <Stack direction='row' spacing={1} alignItems='center'>
            <Link
              href={site.instagramUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Instagram'
              sx={theme => ({
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                color: 'text.secondary',
                '&:hover': { color: theme.palette.text.primary },
              })}
            >
              <InstagramIcon fontSize='small' />
            </Link>
            <Link
              href={`mailto:${site.email}`}
              aria-label='Email'
              sx={theme => ({
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                color: 'text.secondary',
                '&:hover': { color: theme.palette.text.primary },
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
            mt: 5,
            pt: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            letterSpacing: '0.04em',
          })}
        >
          © {new Date().getFullYear()} {site.artistName}
        </Typography>
      </Container>
    </Box>
  );
}
