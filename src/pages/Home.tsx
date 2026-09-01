import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { designs, featuredWorks, photography, site } from '../content';
import type { Collection, Work } from '../content';

function FeaturedFrame({ work }: { work: Work }) {
  return (
    <Box component='figure' sx={{ m: 0 }}>
      <Box
        sx={{
          overflow: 'hidden',
          bgcolor: 'background.paper',
          maxHeight: { xs: 520, md: 720 },
        }}
      >
        <Box
          component='img'
          src={work.src}
          alt={work.title}
          sx={{
            width: '100%',
            height: { xs: 420, md: 640 },
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          mt: 1.75,
          flexWrap: 'wrap',
        }}
      >
        <Typography sx={{ fontFamily: '"Fraunces", serif', fontSize: '1.1rem' }}>
          {work.title}
        </Typography>
        {work.subtitle && (
          <Typography
            variant='body2'
            sx={{
              color: 'text.secondary',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              alignSelf: 'center',
            }}
          >
            {work.subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

function CollectionTease({
  collection,
  to,
  work,
}: {
  collection: Collection;
  to: string;
  work: Work;
}) {
  return (
    <Box
      component={RouterLink}
      to={to}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        '&:hover img': { transform: 'scale(1.03)' },
      }}
    >
      <Box sx={{ overflow: 'hidden', bgcolor: 'background.paper' }}>
        <Box
          component='img'
          src={work.src}
          alt={collection.title}
          sx={{
            width: '100%',
            height: { xs: 280, md: 380 },
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.55s ease',
          }}
        />
      </Box>
      <Typography
        sx={{
          mt: 2,
          fontFamily: '"Fraunces", serif',
          fontSize: { xs: '1.6rem', md: '2rem' },
        }}
      >
        {collection.title}
      </Typography>
      {collection.subtitle && (
        <Typography
          variant='body2'
          sx={{ mt: 0.75, color: 'text.secondary', maxWidth: 360, lineHeight: 1.6 }}
        >
          {collection.description || collection.subtitle}
        </Typography>
      )}
    </Box>
  );
}

export function Home() {
  const hero = featuredWorks(photography, 1)[0];
  const photoTease =
    photography.works.find(work => work.src !== hero?.src) ?? photography.works[0];
  const designTease = featuredWorks(designs, 1)[0];
  const selected = [
    ...featuredWorks(photography, 3).filter(work => work.src !== hero?.src),
    ...featuredWorks(designs, 2),
  ].slice(0, 4);

  return (
    <Box sx={{ pb: { xs: 8, md: 12 } }}>
      <Container maxWidth='lg' sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 8 } }}>
        <Stack spacing={3} maxWidth={760}>
          <Typography
            sx={{
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'text.secondary',
            }}
          >
            {site.home.eyebrow}
          </Typography>
          <Typography
            component='h1'
            sx={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 500,
              fontSize: { xs: '2rem', sm: '3.8rem', md: '5rem' },
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              overflowWrap: 'break-word',
            }}
          >
            {site.home.headline}
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1.05rem', md: '1.2rem' },
              lineHeight: 1.7,
              maxWidth: 560,
            }}
          >
            {site.home.description}
          </Typography>
          <Stack direction='row' spacing={2} flexWrap='wrap' useFlexGap>
            <Button
              component={RouterLink}
              to='/photography'
              variant='contained'
              size='large'
              sx={{
                px: 3,
                py: 1.25,
                borderRadius: 0,
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none' },
              }}
            >
              Photography
            </Button>
            <Button
              component={RouterLink}
              to='/designs'
              variant='outlined'
              size='large'
              sx={{
                px: 3,
                py: 1.25,
                borderRadius: 0,
                color: 'text.primary',
                borderColor: 'divider',
              }}
            >
              Illustrations
            </Button>
          </Stack>
          <Typography variant='caption' sx={{ color: 'text.secondary', letterSpacing: '0.04em' }}>
            {site.home.availability}
          </Typography>
        </Stack>
      </Container>

      {hero && (
        <Container maxWidth='lg' sx={{ mb: { xs: 8, md: 12 } }}>
          <FeaturedFrame work={hero} />
        </Container>
      )}

      <Container maxWidth='lg' sx={{ mb: { xs: 8, md: 12 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 6 },
          }}
        >
          {photoTease && (
            <CollectionTease
              collection={photography}
              to='/photography'
              work={photoTease}
            />
          )}
          {designTease && (
            <CollectionTease collection={designs} to='/designs' work={designTease} />
          )}
        </Box>
      </Container>

      {selected.length > 0 && (
        <Container maxWidth='lg'>
          <Typography
            sx={{
              mb: 3,
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'text.secondary',
            }}
          >
            Selected work
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
              gap: { xs: 2, md: 3 },
            }}
          >
            {selected.map(work => {
              const to = photography.works.some(item => item.src === work.src)
                ? '/photography'
                : '/designs';
              return (
                <Box
                  key={work.src}
                  component={RouterLink}
                  to={to}
                  sx={{
                    m: 0,
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    '&:hover img': { transform: 'scale(1.03)' },
                  }}
                >
                  <Box sx={{ overflow: 'hidden', bgcolor: 'background.paper' }}>
                    <Box
                      component='img'
                      src={work.src}
                      alt={work.title}
                      sx={{
                        width: '100%',
                        height: { xs: 180, md: 240 },
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      mt: 1.25,
                      fontFamily: '"Fraunces", serif',
                      fontSize: '0.98rem',
                    }}
                  >
                    {work.title}
                  </Typography>
                  {work.subtitle && (
                    <Typography
                      variant='caption'
                      sx={{ color: 'text.secondary', letterSpacing: '0.06em' }}
                    >
                      {work.subtitle}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        </Container>
      )}
    </Box>
  );
}
