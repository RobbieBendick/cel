import { ProjectGallery } from '../components/ProjectGallery';
import { designs } from '../content';

export function Designs() {
  return <ProjectGallery works={designs.works} />;
}
