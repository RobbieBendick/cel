import { sketchbook } from '../content';
import { SketchbookBook } from '../components/SketchbookBook';

export function Sketchbook() {
  return (
    <div className='sketchbook-page'>
      <div className='sketchbook-intro'>
        <h1>{sketchbook.title}</h1>
        {sketchbook.intro && <p>{sketchbook.intro}</p>}
      </div>
      <SketchbookBook pages={sketchbook.pages} />
    </div>
  );
}
