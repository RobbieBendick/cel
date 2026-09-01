import { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ImageGallery } from './ImageGallery';
import type { Collection } from '../content';

interface CollectionPageProps {
  collection: Collection;
  variant?: 'masonry' | 'grid';
  filters?: string[];
}

export function CollectionPage({
  collection,
  variant = 'grid',
  filters,
}: CollectionPageProps) {
  const [active, setActive] = useState('All');

  const visibleWorks = useMemo(() => {
    if (!filters || active === 'All') return collection.works;
    return collection.works.filter(
      work => work.subtitle.toLowerCase() === active.toLowerCase(),
    );
  }, [active, collection.works, filters]);

  return (
    <Box
      sx={{
        minHeight: '100%',
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 5 },
        maxWidth: 1440,
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: { xs: 3, md: 4 },
          mb: { xs: 5, md: 7 },
        }}
      >
        <Box sx={{ maxWidth: 640 }}>
          <Typography
            component='p'
            sx={{
              mb: 1.5,
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'text.secondary',
            }}
          >
            {collection.subtitle || 'Gallery'}
          </Typography>
          <Typography
            component='h1'
            variant='h2'
            sx={{
              fontSize: { xs: '2.4rem', md: '3.4rem' },
              lineHeight: 1.05,
            }}
          >
            {collection.title}
          </Typography>
          {collection.description && (
            <Typography
              sx={{
                mt: 2,
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.7,
              }}
            >
              {collection.description}
            </Typography>
          )}
        </Box>

        {filters && filters.length > 0 && (
          <Box
            role='group'
            aria-label='Filter photographs'
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.75,
              pb: 0.5,
            }}
          >
            {['All', ...filters].map(label => {
              const selected = active === label;
              return (
                <Box
                  key={label}
                  component='button'
                  type='button'
                  aria-pressed={selected}
                  onClick={() => setActive(label)}
                  sx={theme => ({
                    appearance: 'none',
                    border: 0,
                    cursor: 'pointer',
                    px: { xs: 1.4, sm: 1.75 },
                    py: 0.85,
                    borderRadius: 999,
                    fontFamily: 'inherit',
                    fontWeight: selected ? 600 : 500,
                    fontSize: { xs: '0.62rem', sm: '0.72rem' },
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: selected
                      ? theme.palette.background.default
                      : theme.palette.text.secondary,
                    backgroundColor: selected
                      ? theme.palette.text.primary
                      : 'transparent',
                    transition:
                      'color 0.2s ease, background-color 0.2s ease',
                    '&:hover': {
                      color: selected
                        ? theme.palette.background.default
                        : theme.palette.text.primary,
                      backgroundColor: selected
                        ? theme.palette.text.primary
                        : alpha(theme.palette.text.primary, 0.08),
                    },
                    '&:focus-visible': {
                      outline: `1px solid ${theme.palette.text.primary}`,
                      outlineOffset: 3,
                    },
                  })}
                >
                  {label}
                </Box>
              );
            })}
          </Box>
        )}
      </Box>

      {visibleWorks.length > 0 ? (
        <ImageGallery
          key={active}
          cascadeKey={active}
          works={visibleWorks}
          variant={variant}
        />
      ) : (
        <Typography sx={{ color: 'text.secondary' }}>
          Nothing in this category yet.
        </Typography>
      )}
    </Box>
  );
}
