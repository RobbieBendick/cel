import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

interface ImageGalleryProps {
  images: string[];
  aspectRatio?: string;
}

export function ImageGallery({ images, aspectRatio = '4/3' }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const goPrev = useCallback(() => {
    setLightboxIndex(i =>
      i === null ? null : i <= 0 ? images.length - 1 : i - 1,
    );
  }, [images.length]);

  const goNext = useCallback(() => {
    setLightboxIndex(i =>
      i === null ? null : i >= images.length - 1 ? 0 : i + 1,
    );
  }, [images.length]);

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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {images.map((src, index) => (
          <Box
            key={src}
            component="figure"
            role="button"
            tabIndex={0}
            onClick={() => setLightboxIndex(index)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLightboxIndex(index);
              }
            }}
            sx={{
              margin: 0,
              borderRadius: 3,
              overflow: 'hidden',
              aspectRatio,
              bgcolor: 'background.paper',
              boxShadow: theme => theme.shadows[2],
              cursor: 'pointer',
              position: 'relative',
              '&:hover img': {
                transform: 'scale(1.03)',
              },
              '&:hover .gallery-hover-overlay': {
                opacity: 1,
              },
            }}
          >
            <Box
              component="img"
              src={src}
              alt=""
              loading="lazy"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
              }}
            />
            <Box
              className="gallery-hover-overlay"
              sx={theme => ({
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                bgcolor: 'rgba(0,0,0,0.5)',
                opacity: 0,
                transition: 'opacity 0.25s ease',
                color: theme.palette.common.white,
              })}
            >
              <ZoomInRoundedIcon sx={{ fontSize: 48 }} />
              <Typography variant="body2" fontWeight={500}>
                Click to view
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {lightboxIndex !== null && (
        <Box
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={() => setLightboxIndex(null)}
          sx={theme => ({
            position: 'fixed',
            inset: 0,
            zIndex: theme.zIndex.modal,
            bgcolor: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <Box
            component="img"
            src={images[lightboxIndex]}
            alt=""
            onClick={e => e.stopPropagation()}
            sx={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
          />
          <IconButton
            onClick={e => {
              e.stopPropagation();
              goPrev();
            }}
            sx={theme => ({
              position: 'absolute',
              left: 16,
              color: theme.palette.common.white,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
            })}
            aria-label="Previous image"
          >
            <ChevronLeftRoundedIcon sx={{ fontSize: 48 }} />
          </IconButton>
          <IconButton
            onClick={e => {
              e.stopPropagation();
              goNext();
            }}
            sx={theme => ({
              position: 'absolute',
              right: 16,
              color: theme.palette.common.white,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
            })}
            aria-label="Next image"
          >
            <ChevronRightRoundedIcon sx={{ fontSize: 48 }} />
          </IconButton>
        </Box>
      )}
    </>
  );
}
