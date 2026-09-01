import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import type { Work } from '../content';

interface ImageLightboxProps {
  works: Work[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function ImageLightbox({
  works,
  index,
  onClose,
  onPrev,
  onNext,
}: ImageLightboxProps) {
  const active = works[index];
  if (!active) return null;

  return (
    <Box
      role='dialog'
      aria-modal='true'
      aria-label={active.title}
      onClick={onClose}
      sx={theme => ({
        position: 'fixed',
        inset: 0,
        zIndex: theme.zIndex.modal,
        bgcolor: theme.palette.mode === 'dark' ? '#0d0c0a' : '#f3eee6',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'stretch',
      })}
    >
      <IconButton
        onClick={e => {
          e.stopPropagation();
          onClose();
        }}
        aria-label='Close'
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
          color: 'text.primary',
        }}
      >
        <CloseRoundedIcon />
      </IconButton>

      <Box
        onClick={e => e.stopPropagation()}
        sx={{
          flex: { md: '1 1 68%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, md: 4 },
          minHeight: { xs: '58vh', md: '100%' },
          position: 'relative',
        }}
      >
        <Box
          component='img'
          src={active.src}
          alt={active.title}
          sx={{
            maxWidth: '100%',
            maxHeight: { xs: '56vh', md: '88vh' },
            objectFit: 'contain',
          }}
        />
        <IconButton
          onClick={e => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label='Previous image'
          sx={{
            position: 'absolute',
            left: { xs: 4, md: 16 },
            color: 'text.primary',
          }}
        >
          <ChevronLeftRoundedIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <IconButton
          onClick={e => {
            e.stopPropagation();
            onNext();
          }}
          aria-label='Next image'
          sx={{
            position: 'absolute',
            right: { xs: 4, md: 16 },
            color: 'text.primary',
          }}
        >
          <ChevronRightRoundedIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>

      <Box
        onClick={e => e.stopPropagation()}
        sx={theme => ({
          flex: { md: '0 0 32%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, md: 5 },
          py: { xs: 3, md: 6 },
          borderTop: {
            xs: `1px solid ${theme.palette.divider}`,
            md: 'none',
          },
          borderLeft: {
            xs: 'none',
            md: `1px solid ${theme.palette.divider}`,
          },
        })}
      >
        <Typography
          variant='caption'
          sx={{ mb: 2, letterSpacing: '0.14em', textTransform: 'uppercase' }}
        >
          {index + 1} / {works.length}
        </Typography>
        <Typography
          component='h3'
          sx={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 500,
            fontSize: { xs: '1.6rem', md: '2rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
          }}
        >
          {active.title}
        </Typography>
        {active.subtitle && (
          <Typography
            variant='body2'
            sx={{
              mt: 0.5,
              color: 'text.secondary',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
            }}
          >
            {active.subtitle}
          </Typography>
        )}
        {active.description && (
          <Typography
            variant='body1'
            sx={{
              mt: 2,
              color: 'text.secondary',
              lineHeight: 1.7,
              maxWidth: 420,
            }}
          >
            {active.description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
