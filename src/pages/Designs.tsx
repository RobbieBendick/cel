import { Box, Container, Typography } from '@mui/material';
import { ImageGallery } from '../components/ImageGallery';

const illustrationImages = [
  'acuity.png',
  'bard.png',
  'consume.png',
  'cycle-of-life.png',
  'frog.png',
  'norse-wolves.png',
  'sad-devil-girl.png',
  'two-faced.png',
  'valhala.png',
  'vexa.png',
  'vision-design-process.png',
].map(name => `/illustrations/${name}`);

export function Designs() {
  return (
    <Box
      sx={theme => ({
        minHeight: '100vh',
        background: theme.palette.background.default,
        py: { xs: 4, md: 6 },
      })}
    >
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h3"
          sx={{
            fontStyle: 'italic',
            fontWeight: 500,
            mb: 4,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #b8b8e8 0%, rgb(111, 111, 190) 50%, rgb(41, 41, 87) 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          Celeste King
        </Typography>
        <ImageGallery images={illustrationImages} aspectRatio="1" />
      </Container>
    </Box>
  );
}
