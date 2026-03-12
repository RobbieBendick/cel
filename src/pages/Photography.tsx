import { Box, Container, Typography } from '@mui/material';
import { ImageGallery } from '../components/ImageGallery';

const photographyImages = [
  'carolina-wren.png',
  'entodon.png',
  'fire-and-ice.png',
  'gorilla-1.png',
  'gorilla-2.png',
  'great-tailed-grackle.png',
  'great-white-pelican.png',
  'grey-crowned-crane.png',
  'hen-of-the-wood.png',
  'kitty.png',
  'misty-land.png',
  'mossy-log.png',
  'northern-mockingbird.png',
  'oddity.png',
  'pink-flowers.png',
  'snake-1.png',
  'sunset.png',
  'wary.png',
].map(name => `/photography/${name}`);

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
