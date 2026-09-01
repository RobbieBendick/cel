import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ImageLightbox } from './ImageLightbox';
import { worksByYear, type Work } from '../content';

interface ImageGalleryProps {
  works: Work[];
  variant?: 'masonry' | 'grid';
  cascadeKey?: string;
}

export function ImageGallery({
  works,
  variant = 'grid',
  cascadeKey = 'all',
}: ImageGalleryProps) {
  const groups = useMemo(() => worksByYear(works), [works]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setLightboxIndex(null);
  }, [works]);

  const goPrev = useCallback(() => {
    setLightboxIndex(i =>
      i === null ? null : i <= 0 ? works.length - 1 : i - 1,
    );
  }, [works.length]);

  const goNext = useCallback(() => {
    setLightboxIndex(i =>
      i === null ? null : i >= works.length - 1 ? 0 : i + 1,
    );
  }, [works.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, goPrev, goNext]);

  return (
    <>
      <Box className='gallery-scope'>
      {groups.map((group, groupIndex) => {
        const startIndex = groups
          .slice(0, groupIndex)
          .reduce((sum, item) => sum + item.works.length, 0);

        return (
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
              className='gallery-cascade'
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: { xs: 3, md: 4 },
                '--cascade': startIndex,
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
                alignItems: 'stretch',
              }}
            >
              {group.works.map((work, cardIndex) => {
                const index = works.findIndex(item => item.src === work.src);
                const cascade = startIndex + cardIndex;
                return (
                  <Box
                    key={`${cascadeKey}-${work.src}`}
                    className='gallery-card'
                    component='figure'
                    role='button'
                    tabIndex={0}
                    onClick={() => setLightboxIndex(index)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setLightboxIndex(index);
                      }
                    }}
                    sx={theme => ({
                      margin: 0,
                      cursor: 'pointer',
                      transition:
                        'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease',
                      '@media (hover: hover)': {
                        '.gallery-scope:has(.gallery-card:hover) &:not(:hover)': {
                          opacity: 0.42,
                        },
                        '&:hover': {
                          transform: 'translateY(-8px)',
                        },
                        '&:hover .gallery-card-frame': {
                          boxShadow:
                            theme.palette.mode === 'dark'
                              ? '0 22px 48px rgba(0, 0, 0, 0.55)'
                              : '0 22px 48px rgba(28, 25, 21, 0.16)',
                        },
                        '&:hover img': {
                          transform: 'scale(1.06)',
                        },
                      },
                      '@media (prefers-reduced-motion: reduce)': {
                        transition: 'opacity 0.2s ease',
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
                      className='gallery-cascade'
                      sx={{
                        '--cascade': cascade,
                        height: '100%',
                      }}
                    >
                    <Box
                      className='gallery-card-frame'
                      sx={{
                        overflow: 'hidden',
                        bgcolor: 'background.secondary',
                        aspectRatio: variant === 'grid' ? '4 / 5' : 'auto',
                        borderRadius: { xs: '20px', md: '32px' },
                        transition:
                          'box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <Box
                        component='img'
                        src={work.src}
                        alt={work.title}
                        loading='eager'
                        sx={{
                          width: '100%',
                          height: variant === 'grid' ? '100%' : 'auto',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          display: 'block',
                          transition:
                            'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      />
                    </Box>
                    <Box sx={{ mt: 1.5, px: 0.25 }}>
                      <Typography
                        component='h3'
                        sx={{
                          fontFamily: '"Fraunces", serif',
                          fontWeight: 500,
                          fontSize: '1.05rem',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.25,
                        }}
                      >
                        {work.title}
                      </Typography>
                      {work.subtitle && (
                        <Typography
                          variant='body2'
                          sx={{
                            mt: 0.5,
                            color: 'text.secondary',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            fontSize: '0.68rem',
                          }}
                        >
                          {work.subtitle}
                        </Typography>
                      )}
                    </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
      </Box>

      {lightboxIndex !== null && (
        <ImageLightbox
          works={works}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}

