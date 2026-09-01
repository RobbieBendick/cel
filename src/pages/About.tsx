import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { about, site } from '../content';
import type { AboutFocus } from '../content';

function PracticeRow({ item }: { item: AboutFocus }) {
  const row = (
    <Box
      sx={theme => ({
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr auto',
          md: 'minmax(160px, 0.28fr) minmax(0, 1fr) auto',
        },
        columnGap: { xs: 2, md: 4 },
        rowGap: 0.5,
        alignItems: 'baseline',
        py: { xs: 2.5, md: 3.25 },
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: 'inherit',
        textDecoration: 'none',
        transition: 'opacity 0.2s ease',
        '&:hover': item.href
          ? { opacity: 1 }
          : undefined,
        '@media (hover: hover)': item.href
          ? {
              '.practice-list:has(a:hover) &:not(:hover)': { opacity: 0.38 },
              '&:hover .practice-arrow': { transform: 'translateX(8px)' },
            }
          : undefined,
      })}
    >
      <Typography
        sx={{
          fontFamily: '"Fraunces", serif',
          fontSize: { xs: '1.35rem', md: '1.7rem' },
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
        }}
      >
        {item.title}
      </Typography>
      <Typography
        sx={{
          color: 'text.secondary',
          fontSize: { xs: '0.95rem', md: '1.02rem' },
          lineHeight: 1.6,
          gridColumn: { xs: '1 / -1', md: 'auto' },
        }}
      >
        {item.text}
      </Typography>
      {item.href ? (
        <Typography
          className='practice-arrow'
          aria-hidden
          sx={{
            justifySelf: 'end',
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            lineHeight: 1,
            transition: 'transform 0.25s ease',
            display: { xs: 'none', md: 'block' },
          }}
        >
          →
        </Typography>
      ) : (
        <span />
      )}
    </Box>
  );

  if (!item.href) return row;

  return (
    <Box
      component={RouterLink}
      to={item.href}
      sx={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      {row}
    </Box>
  );
}

export function About() {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 5 },
        pt: { xs: 4, md: 6 },
        pb: { xs: 8, md: 12 },
        maxWidth: 1440,
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.05fr) minmax(0, 0.95fr)' },
          gap: { xs: 4, md: 8 },
          alignItems: 'start',
          mb: { xs: 7, md: 10 },
        }}
      >
        <Box
          sx={{
            order: { xs: 2, md: 1 },
            position: { md: 'sticky' },
            top: { md: 96 },
            maxWidth: 560,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'text.secondary',
              mb: 2,
            }}
          >
            {about.eyebrow}
          </Typography>
          <Typography
            component='h1'
            sx={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 500,
              fontSize: { xs: '3rem', sm: '4.2rem', md: '5.2rem' },
              lineHeight: 0.92,
              letterSpacing: '-0.045em',
              mb: 1.5,
            }}
          >
            {about.headline}
          </Typography>
          {about.role && (
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.15rem' },
                mb: 4,
              }}
            >
              {about.role}
            </Typography>
          )}
          {about.bio.map(paragraph => (
            <Typography
              key={paragraph}
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1.02rem', md: '1.12rem' },
                lineHeight: 1.7,
                mb: 2,
              }}
            >
              {paragraph}
            </Typography>
          ))}
          {site.home.availability && (
            <Typography
              sx={{
                mt: 3,
                fontSize: '0.92rem',
                letterSpacing: '0.04em',
                color: 'text.secondary',
              }}
            >
              {site.home.availability}
            </Typography>
          )}

          <Box sx={{ mt: { xs: 4, md: 5 } }}>
            <Typography
              sx={{
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                mb: 1,
              }}
            >
              {about.cta}
            </Typography>
            <Link
              href={`mailto:${site.email}`}
              underline='none'
              sx={{
                display: 'inline-block',
                fontFamily: '"Fraunces", serif',
                fontSize: { xs: '1.35rem', md: '1.75rem' },
                letterSpacing: '-0.03em',
                color: 'text.primary',
                lineHeight: 1.2,
                borderBottom: theme => `1px solid ${theme.palette.text.primary}`,
                '&:hover': { opacity: 0.6 },
              }}
            >
              {site.email}
            </Link>
            {site.instagramUrl && (
              <Box sx={{ mt: 2 }}>
                <Link
                  href={site.instagramUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  underline='none'
                  sx={{
                    fontSize: '0.95rem',
                    color: 'text.secondary',
                    '&:hover': { color: 'text.primary' },
                  }}
                >
                  Instagram
                </Link>
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ order: { xs: 1, md: 2 } }}>
          <Box
            sx={{
              overflow: 'hidden',
              borderRadius: { xs: '20px', md: '28px' },
              bgcolor: 'background.secondary',
              aspectRatio: { xs: '4 / 5', md: '4 / 5' },
              maxHeight: { md: 'calc(100svh - 140px)' },
            }}
          >
            <Box
              component='img'
              src={about.portraitSrc}
              alt={about.portraitAlt}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>
        </Box>
      </Box>

      {about.focus.length > 0 && (
        <Box
          className='practice-list'
          sx={theme => ({
            borderTop: `1px solid ${theme.palette.divider}`,
          })}
        >
          {about.focus.map(item => (
            <PracticeRow key={item.title} item={item} />
          ))}
        </Box>
      )}
    </Box>
  );
}
