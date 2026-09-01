import siteJson from './site.json';
import photographyJson from './photography.json';
import designsJson from './designs.json';
import sketchbookJson from './sketchbook.json';
import aboutJson from './about.json';

export type WorkInput = {
  file: string;
  title?: string;
  subtitle?: string;
  description?: string;
  story?: string;
  images?: string[];
  year?: number;
  featured?: boolean;
  slug?: string;
};

export type CollectionInput = {
  title: string;
  subtitle?: string;
  description?: string;
  folder: string;
  works: WorkInput[];
};

export type Work = {
  file: string;
  src: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  story: string;
  gallery: string[];
  year: number;
  featured: boolean;
};

export type Collection = {
  title: string;
  subtitle: string;
  description: string;
  folder: string;
  works: Work[];
};

export type SketchPageInput = {
  file: string;
  note?: string;
  title?: string;
};

export type SketchbookInput = {
  title: string;
  intro?: string;
  folder: string;
  pages: SketchPageInput[];
};

export type SketchPage = {
  file: string;
  src: string;
  title: string;
  note: string;
};

export type Sketchbook = {
  title: string;
  intro: string;
  folder: string;
  pages: SketchPage[];
};

export type AboutFocus = {
  title: string;
  text: string;
  href: string;
};

export type AboutContent = {
  eyebrow: string;
  headline: string;
  role: string;
  portraitSrc: string;
  portraitAlt: string;
  bio: string[];
  focus: AboutFocus[];
  cta: string;
};

export type SiteContent = {
  artistName: string;
  shortName: string;
  email: string;
  instagramUrl: string;
  home: {
    eyebrow: string;
    headline: string;
    description: string;
    availability: string;
  };
  footer: {
    blurb: string;
  };
};

function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, '')}`;
}

function titleFromFile(file: string): string {
  const name = file.replace(/\.[^.]+$/, '');
  return name
    .split(/[-_]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function slugFromFile(file: string): string {
  return file
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function resolveWork(work: WorkInput, folder: string): Work {
  const cover = publicUrl(`/${folder}/${work.file}`);
  const extras = (work.images ?? [])
    .map(name => name.trim())
    .filter(Boolean)
    .map(name => publicUrl(`/${folder}/${name}`))
    .filter(src => src !== cover);

  return {
    file: work.file,
    src: cover,
    slug: work.slug?.trim() || slugFromFile(work.file),
    title: work.title?.trim() || titleFromFile(work.file),
    subtitle: work.subtitle?.trim() || '',
    description: work.description?.trim() || '',
    story: work.story?.trim() || work.description?.trim() || '',
    gallery: [cover, ...extras],
    year: work.year ?? new Date().getFullYear(),
    featured: Boolean(work.featured),
  };
}

function resolveCollection(input: CollectionInput): Collection {
  return {
    title: input.title,
    subtitle: input.subtitle?.trim() || '',
    description: input.description?.trim() || '',
    folder: input.folder,
    works: input.works.map(work => resolveWork(work, input.folder)),
  };
}

function resolveSketchPage(page: SketchPageInput, folder: string): SketchPage {
  return {
    file: page.file,
    src: publicUrl(`/${folder}/${page.file}`),
    title: page.title?.trim() || titleFromFile(page.file),
    note: page.note?.trim() || '',
  };
}

export const site = siteJson as SiteContent;
export const photography = resolveCollection(photographyJson);
export const designs = resolveCollection(designsJson);
export const sketchbook: Sketchbook = {
  title: sketchbookJson.title,
  intro: sketchbookJson.intro?.trim() || '',
  folder: sketchbookJson.folder,
  pages: sketchbookJson.pages.map(page =>
    resolveSketchPage(page, sketchbookJson.folder),
  ),
};

export const about: AboutContent = {
  eyebrow: aboutJson.eyebrow,
  headline: aboutJson.headline,
  role: aboutJson.role?.trim() || '',
  portraitSrc: publicUrl(
    `/${aboutJson.portraitFolder}/${aboutJson.portraitFile}`,
  ),
  portraitAlt: aboutJson.portraitAlt?.trim() || aboutJson.headline,
  bio: aboutJson.bio ?? [],
  focus: (aboutJson.focus ?? []).map(item => ({
    title: item.title,
    text: item.text,
    href: item.href?.trim() || '',
  })),
  cta: aboutJson.cta?.trim() || 'Say hello',
};

export function getWorkBySlug(
  collection: Collection,
  slug?: string,
): Work | undefined {
  if (!slug) return undefined;
  return collection.works.find(work => work.slug === slug);
}

export function featuredWorks(collection: Collection, count = 3): Work[] {
  const featured = collection.works.filter(work => work.featured);
  const source = featured.length > 0 ? featured : collection.works;
  return source.slice(0, count);
}

export function worksByYear(
  works: Work[],
): { year: number; works: Work[] }[] {
  const map = new Map<number, Work[]>();
  for (const work of works) {
    const list = map.get(work.year) ?? [];
    list.push(work);
    map.set(work.year, list);
  }
  return [...map.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, yearWorks]) => ({ year, works: yearWorks }));
}
