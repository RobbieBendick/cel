import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { worksByYear, type Work } from '../content';

interface ProjectGalleryProps {
  works: Work[];
}

export function ProjectGallery({ works }: ProjectGalleryProps) {
  const groups = useMemo(() => worksByYear(works), [works]);

  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Box className='gallery-scope' sx={{ px: { xs: 2, md: 5 }, maxWidth: 1440, mx: 'auto' }}>
        {groups.map(group => (
          <Box
            key={group.year}
            className='gallery-year-block'
            sx={{
              mb: { xs: 5, md: 7 },
              transition: 'opacity 0.2s ease',
              '.gallery-scope:has(.gallery-card:hover) &:not(:has(.gallery-card:hover))':
                {
                  opacity: 0.42,
                },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: { xs: 3, md: 4 },
              }}
            >
              <Typography
                component='h2'
                sx={{
                  fontSize: { xs: '1.5rem', md: '1.75rem' },
                  fontWeight: 500,
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {group.year}
              </Typography>
              <Box
                sx={theme => ({
                  flex: 1,
                  height: '1px',
                  bgcolor: theme.palette.text.primary,
                  opacity: 0.85,
                })}
              />
            </Box>

            <Box
              className='gallery-grid'
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, minmax(0, 1fr))',
                  md: 'repeat(4, minmax(0, 1fr))',
                },
                gap: { xs: 2.5, md: 3.5 },
              }}
            >
              {group.works.map(work => (
                <Box
                  key={work.slug}
                  className='gallery-card'
                  component={RouterLink}
                  to={`/designs/${work.slug}`}
                  sx={theme => ({
                    m: 0,
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    cursor: 'pointer',
                    transition:
                      'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease',
                    '@media (hover: hover)': {
                          '.gallery-scope:has(.gallery-card:hover) &:not(:hover)': {
                        opacity: 0.42,
                      },
                      '&:hover': {
                        transform: 'translateY(-10px)',
                      },
                      '&:hover .gallery-card-frame': {
                        boxShadow:
                          theme.palette.mode === 'dark'
                            ? '0 22px 48px rgba(0, 0, 0, 0.55)'
                            : '0 22px 48px rgba(28, 25, 21, 0.16)',
                      },
                      '&:hover img': {
                        transform: 'scale(1.08)',
                      },
                      '&:hover .gallery-card-title': {
                        color: theme.palette.primary.main,
                      },
                    },
                    '@media (prefers-reduced-motion: reduce)': {
                      transition: 'none',
                      '&:hover': { transform: 'none' },
                      '&:hover img': { transform: 'none' },
                    },
                    '&:focus-visible': {
                      outline: `1px solid ${theme.palette.text.primary}`,
                      outlineOffset: 4,
                    },
                  })}
                >
                  <Box
                    className='gallery-card-frame'
                    sx={{
                      aspectRatio: '1',
                      borderRadius: { xs: '20px', md: '32px' },
                      overflow: 'hidden',
                      bgcolor: 'background.secondary',
                      transition:
                        'box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    <Box
                      component='img'
                      src={work.src}
                      alt={work.title}
                      loading='lazy'
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition:
                          'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 1.5, textAlign: 'center', px: 0.5 }}>
                    <Typography
                      className='gallery-card-title'
                      component='h3'
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '0.92rem', md: '1rem' },
                        lineHeight: 1.3,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {work.title}
                    </Typography>
                    {work.subtitle && (
                      <Typography
                        sx={{
                          mt: 0.35,
                          fontSize: { xs: '0.78rem', md: '0.85rem' },
                          color: 'text.secondary',
                          lineHeight: 1.4,
                        }}
                      >
                        {work.subtitle}
                      </Typography>
                    )}
                    {work.description && (
                      <Typography
                        sx={{
                          mt: 0.2,
                          fontSize: { xs: '0.78rem', md: '0.85rem' },
                          color: 'text.secondary',
                          lineHeight: 1.4,
                        }}
                      >
                        {work.description}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
