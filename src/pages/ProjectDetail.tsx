import { useEffect } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import { designs, getWorkBySlug } from '../content';

function isFullWidth(index: number) {
  return index % 3 === 0;
}

export function ProjectDetail() {
  const { slug } = useParams();
  const work = getWorkBySlug(designs, slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!work) {
    return <Navigate to='/' replace />;
  }

  return (
    <Box
      sx={{
        px: { xs: 2, md: 5 },
        py: { xs: 3, md: 5 },
        maxWidth: 1440,
        mx: 'auto',
      }}
    >
      <Link
        component={RouterLink}
        to='/'
        underline='none'
        sx={{
          display: 'inline-block',
          mb: { xs: 3, md: 4 },
          fontSize: '0.78rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'text.secondary',
          '&:hover': { color: 'text.primary' },
        }}
      >
        ← Illustrations / Projects
      </Link>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.35fr) minmax(280px, 0.85fr)' },
          gap: { xs: 3, md: 5 },
          alignItems: 'start',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: { xs: 1.5, md: 2 },
            order: { xs: 2, md: 1 },
          }}
        >
          {work.gallery.map((src, index) => {
            const full = isFullWidth(index);
            return (
              <Box
                key={`${src}-${index}`}
                sx={{
                  gridColumn: full ? '1 / -1' : 'auto',
                  borderRadius: { xs: '16px', md: '24px' },
                  overflow: 'hidden',
                  bgcolor: 'background.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  component='img'
                  src={src}
                  alt={`${work.title} ${index + 1}`}
                  sx={{
                    display: 'block',
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '100%',
                    maxHeight: full
                      ? { xs: '58vh', md: 'calc(100dvh - 200px)' }
                      : { xs: '30vh', md: '38vh' },
                    objectFit: 'contain',
                  }}
                />
              </Box>
            );
          })}
        </Box>

        <Box
          sx={theme => ({
            order: { xs: 1, md: 2 },
            position: { md: 'sticky' },
            top: { md: 96 },
            bgcolor:
              theme.palette.mode === 'dark'
                ? theme.palette.background.secondary
                : theme.palette.background.paper,
            borderRadius: { xs: '24px', md: '32px' },
            p: { xs: 3, md: 4 },
            boxShadow:
              theme.palette.mode === 'dark'
                ? 'none'
                : '0 12px 40px rgba(28, 25, 21, 0.06)',
            border: `1px solid ${theme.palette.divider}`,
          })}
        >
          {work.year && (
            <Typography
              sx={{
                fontSize: '0.72rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                mb: 1.5,
              }}
            >
              {work.year}
              {work.subtitle ? ` · ${work.subtitle}` : ''}
            </Typography>
          )}
          <Typography
            component='h1'
            sx={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 500,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              mb: 2,
            }}
          >
            {work.title}
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.98rem', md: '1.05rem' },
              lineHeight: 1.75,
              whiteSpace: 'pre-wrap',
            }}
          >
            {work.story ||
              'Add a story in designs.json to talk through the thought process behind this project.'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
