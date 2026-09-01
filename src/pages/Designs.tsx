import { Box, Container, Typography } from '@mui/material';
import { ImageGallery } from '../components/ImageGallery';
import { illustrationImages } from '../data/illustrationImages';

export function Designs() {
  return (
    <Box
      sx={theme => ({
        minHeight: '100vh',
        background: theme.palette.background.default,
        py: { xs: 4, md: 6 },
      })}
    >
      <Container maxWidth='lg'>
        <Typography
          component='h1'
          variant='h3'
          sx={theme => ({
            fontStyle: 'italic',
            fontWeight: 500,
            mb: 4,
            letterSpacing: '-0.02em',
            background: `linear-gradient(135deg, ${theme.palette.textGradient.start} 0%, ${theme.palette.textGradient.mid} 50%, ${theme.palette.textGradient.end} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          })}
        >
          Celeste King
        </Typography>
        <ImageGallery images={illustrationImages} aspectRatio='1' />
      </Container>
    </Box>
  );
}
