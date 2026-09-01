import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AnimationEvent, CSSProperties } from 'react';
import { useMediaQuery } from '@mui/material';
import type { SketchPage } from '../content';
import './SketchbookBook.css';

type Flip = {
  dir: 'next' | 'prev';
  from: number;
  to: number;
};

function pairFor(pages: SketchPage[], spread: number) {
  return {
    left: pages[spread * 2] ?? null,
    right: pages[spread * 2 + 1] ?? null,
  };
}

function Leaf({
  page,
  side,
}: {
  page: SketchPage | null;
  side: 'left' | 'right';
}) {
  return (
    <div className={`leaf ${side}`}>
      {page ? (
        <>
          <div className='leaf-image'>
            <img src={page.src} alt={page.note || page.title} />
          </div>
          <p className='leaf-note'>{page.note || page.title || '\u00a0'}</p>
        </>
      ) : (
        <div className='leaf-blank'>blank</div>
      )}
    </div>
  );
}

const STACK_MAX = 12;
const STACK_STEP = 3;

function PageStack({
  side,
  count,
}: {
  side: 'left' | 'right';
  count: number;
}) {
  const layers = Math.min(Math.max(count, 0), STACK_MAX);
  return (
    <div
      className={`page-stack ${side}`}
      style={
        {
          '--stack-size': `${layers * STACK_STEP + (layers ? 6 : 0)}px`,
        } as CSSProperties
      }
      aria-hidden
    >
      {Array.from({ length: STACK_MAX }, (_, i) => {
        const visible = i < layers;
        const offset = visible ? (i + 1) * STACK_STEP : 0;
        return (
          <span
            key={i}
            className='page-stack-sheet'
            style={{
              opacity: visible ? 1 : 0,
              top: 3 + i * 1.05,
              bottom: 5 + i * 1.05,
              ...(side === 'right' ? { left: offset } : { right: offset }),
              zIndex: layers - i,
            }}
          />
        );
      })}
    </div>
  );
}

export function SketchbookBook({ pages }: { pages: SketchPage[] }) {
  const wide = useMediaQuery('(min-width: 800px)');
  const perSpread = wide ? 2 : 1;
  const maxIndex = Math.max(0, Math.ceil(pages.length / perSpread) - 1);

  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState<Flip | null>(null);
  const viewIndex = Math.min(index, maxIndex);

  const go = useCallback(
    (dir: 'next' | 'prev') => {
      if (flip || pages.length === 0) return;
      const to = dir === 'next' ? viewIndex + 1 : viewIndex - 1;
      if (to < 0 || to > maxIndex) return;
      setFlip({ dir, from: viewIndex, to });
    },
    [flip, viewIndex, maxIndex, pages.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go('next');
      if (e.key === 'ArrowLeft') go('prev');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  useEffect(() => {
    if (!flip) return;
    const mid = window.setTimeout(() => {
      setIndex(flip.to);
    }, 425);
    return () => window.clearTimeout(mid);
  }, [flip]);

  const finishFlip = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (!flip) return;
    setIndex(flip.to);
    setFlip(null);
  };

  const fromPair = pairFor(pages, flip?.from ?? viewIndex);
  const toPair = pairFor(pages, flip?.to ?? viewIndex);
  const nowPair = pairFor(pages, viewIndex);

  const staticLeft =
    perSpread === 1
      ? null
      : flip?.dir === 'prev'
        ? toPair.left
        : nowPair.left;

  const staticRight =
    perSpread === 1
      ? flip
        ? pages[flip.to] ?? null
        : pages[viewIndex] ?? null
      : flip?.dir === 'next'
        ? toPair.right
        : nowPair.right;

  const sheetFront =
    perSpread === 1
      ? pages[flip?.from ?? 0] ?? null
      : flip?.dir === 'next'
        ? fromPair.right
        : fromPair.left;

  const sheetBack =
    perSpread === 1
      ? pages[flip?.to ?? 0] ?? null
      : flip?.dir === 'next'
        ? toPair.left
        : toPair.right;

  const folio = useMemo(() => {
    if (perSpread === 1) return `${viewIndex + 1} / ${pages.length}`;
    const start = viewIndex * 2 + 1;
    const end = Math.min(viewIndex * 2 + 2, pages.length);
    return `${start}-${end} / ${pages.length}`;
  }, [viewIndex, pages.length, perSpread]);

  const leftCount = viewIndex * perSpread;
  const rightCount = Math.max(0, pages.length - (viewIndex + 1) * perSpread);

  if (pages.length === 0) {
    return <p className='sketchbook-intro'>No pages yet.</p>;
  }

  return (
    <div className='book-stage'>
      <div className='book-shell'>
        <PageStack side='left' count={leftCount} />
        <div className={`book-spread${perSpread === 1 ? ' single' : ''}`}>
          {perSpread === 1 ? (
            <Leaf page={staticRight} side='right' />
          ) : (
            <>
              <Leaf page={staticLeft} side='left' />
              <Leaf page={staticRight} side='right' />
              <div className='book-gutter' />
            </>
          )}

          {flip && (
            <div
              className={`flip-sheet ${flip.dir}`}
              onAnimationEnd={finishFlip}
            >
              <div className='flip-face front'>
                <Leaf
                  page={sheetFront}
                  side={flip.dir === 'next' ? 'right' : 'left'}
                />
              </div>
              <div className='flip-face back'>
                <Leaf
                  page={sheetBack}
                  side={flip.dir === 'next' ? 'left' : 'right'}
                />
              </div>
            </div>
          )}

          <button
            type='button'
            className='book-hit left'
            aria-label='Previous page'
            disabled={Boolean(flip) || viewIndex <= 0}
            onClick={() => go('prev')}
          />
          <button
            type='button'
            className='book-hit right'
            aria-label='Next page'
            disabled={Boolean(flip) || viewIndex >= maxIndex}
            onClick={() => go('next')}
          />
        </div>
        <PageStack side='right' count={rightCount} />
      </div>

      <div className='book-controls'>
        <button
          type='button'
          disabled={Boolean(flip) || viewIndex <= 0}
          onClick={() => go('prev')}
        >
          Previous
        </button>
        <span className='book-folio'>{folio}</span>
        <button
          type='button'
          disabled={Boolean(flip) || viewIndex >= maxIndex}
          onClick={() => go('next')}
        >
          Next
        </button>
      </div>
    </div>
  );
}
