import { Box, Container, Typography } from '@mui/material';
import { ImageGallery } from '../components/ImageGallery';
import { photographyImages } from '../data/photographyImages';

export function Photography() {
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
        <ImageGallery images={photographyImages} aspectRatio="4/3" />
      </Container>
    </Box>
  );
}
