import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { useNavigate } from 'react-router-dom';

const heroImages = [
  '/photography/oddity.png',
  '/photography/wary.png',
  '/photography/northern-mockingbird.png',
];

export function Home() {
  const navigate = useNavigate();
  return (
    <Box
      sx={theme => ({
        minHeight: '100vh',
        background: `radial-gradient(circle at top, ${theme.palette.gradient.start} 0, ${theme.palette.gradient.mid} 55%, ${theme.palette.gradient.end} 100%)`,
        color: 'text.primary',
        display: 'flex',
        alignItems: 'stretch',
      })}
    >
      <Container
        maxWidth='lg'
        sx={{
          py: { xs: 6, md: 10 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 6, md: 8 },
          alignItems: 'center',
        }}
      >
        {/* Hero text */}
        <Box sx={{ flex: { xs: '0 0 auto', md: '0 0 48%' } }}>
          <Stack spacing={3}>
            <Box
              sx={theme => ({
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.5,
                py: 0.75,
                borderRadius: 999,
                border: `1px solid ${theme.palette.divider}`,
                backdropFilter: 'blur(12px)',
                backgroundColor: theme.palette.background.paper,
                justifyContent: 'center',
              })}
            >
              <CameraAltRoundedIcon fontSize='small' color='primary' />
              <Typography
                variant='caption'
                sx={{ letterSpacing: 1.2, textTransform: 'uppercase' }}
              >
                Fine art & portrait photography
              </Typography>
            </Box>

            <Typography
              variant='h2'
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.04em',
                fontSize: { xs: '2.6rem', md: '3.5rem' },
                lineHeight: 1.1,
                color: 'text.primary',
              }}
            >
              Light, shadow,
              <br />
              and the stories in between.
            </Typography>
            <Box maxWidth={'100%'}>
              <Typography
                variant='body1'
                sx={{
                  maxWidth: 480,
                  mx: 'auto',
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                I make portraits and editorial work that lives in the quiet: the
                in-between, the still, the details that don’t shout but stay
                with you after you look away.
              </Typography>
            </Box>

            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
              flexWrap='wrap'
              justifyContent='center'
            >
              <Button
                variant='contained'
                size='large'
                sx={theme => ({
                  borderRadius: 999,
                  px: 3,
                  py: 1.2,
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: `0 18px 45px ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.4 : 0.35)}`,
                })}
                onClick={() => navigate('/designs')}
              >
                View designs
              </Button>

              <Button
                variant='outlined'
                size='large'
                sx={{
                  borderRadius: 999,
                  textTransform: 'none',
                  fontWeight: 500,
                  color: 'text.primary',
                }}
                onClick={() => navigate('/photography')}
              >
                View photography
              </Button>
            </Stack>

            <Typography variant='caption' sx={{ color: 'text.secondary' }}>
              Available for editorial, portrait, and gallery work worldwide.
            </Typography>
          </Stack>
        </Box>

        {/* Hero imagery grid */}
        <Box
          sx={{
            flex: { xs: '0 0 auto', md: '0 0 52%' },
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
              },
              gap: 2,
              alignItems: 'stretch',
            }}
          >
            {heroImages.map((src, index) => (
              <Box
                key={src}
                sx={{
                  gridColumn: {
                    xs: 'auto',
                    sm: index === 0 ? '1 / 3' : 'auto',
                  },
                }}
              >
                <Card
                  elevation={0}
                  sx={theme => ({
                    height: index === 0 ? 320 : 220,
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: `linear-gradient(135deg, ${theme.palette.background.secondary} 0%, ${theme.palette.background.paper} 100%)`,
                    boxShadow: theme.shadows[8],
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background:
                        'radial-gradient(circle at top, rgba(255,255,255,0.12), transparent 55%)',
                      mixBlendMode: 'screen',
                      pointerEvents: 'none',
                    },
                  })}
                >
                  <CardMedia
                    component='img'
                    src={src}
                    alt='Artist photography'
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter:
                        index === 1
                          ? 'grayscale(20%) contrast(1.05)'
                          : 'contrast(1.02)',
                      transformOrigin: 'center center',
                      transition: 'transform 600ms ease, filter 600ms ease',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        filter: 'contrast(1.08) saturate(1.05)',
                      },
                    }}
                  />

                  {index === 0 && (
                    <CardContent
                      sx={theme => ({
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        right: 16,
                        bgcolor: theme.palette.surface.cardOverlay,
                        borderRadius: 3,
                        color: theme.palette.common.white,
                        backdropFilter: 'blur(10px)',
                        p: 1.5,
                      })}
                    >
                      <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                        Latest series: City in Soft Focus
                      </Typography>
                      <Typography variant='caption' sx={{ opacity: 0.8 }}>
                        A study of quiet moments in restless places.
                      </Typography>
                    </CardContent>
                  )}
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
