import { CollectionPage } from '../components/CollectionPage';
import { photography } from '../content';

export function Photography() {
  return (
    <CollectionPage
      collection={photography}
      variant='grid'
      filters={['Wildlife', 'Landscape', 'Field study']}
    />
  );
}
