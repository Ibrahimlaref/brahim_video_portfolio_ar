/**
 * Portfolio entries for Laref Ibrahim. Update titles, categories, descriptions,
 * thumbnails, and skills as you refine each project. Vimeo URLs can be normal
 * video links or player links; privacy hashes are preserved automatically.
 */
export const categories = [
  'All',
  'Talking Head',
  'Podcast Editing',
  'Educational Shorts',
  'Social Media Reels',
  'Promotional Videos',
  'Showreel',
] as const;

export type ProjectCategory = (typeof categories)[number];

export interface Project {
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  description: string;
  vimeoUrl: string;
  thumbnail: string;
  editingSkills: string[];
  featured?: boolean;
}

// These links were supplied by Laref. Edit category/title/description when you
// want to identify the exact format or subject of each video.
export const projects: Project[] = [
  { title: 'Short-form edit 01', category: 'Talking Head', description: 'A short-form edit focused on clear pacing and captions.', vimeoUrl: 'https://vimeo.com/1247202016?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247202016.jpg', editingSkills: ['Pacing', 'Captions', 'Jump cuts'], featured: true },
  { title: 'Short-form edit 03', category: 'Educational Shorts', description: 'A short edit with an emphasis on a clean, focused story.', vimeoUrl: 'https://vimeo.com/1247202012?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247202012.jpg', editingSkills: ['Trimming', 'Captions', 'Transitions'] },
  { title: 'Short-form edit 04', category: 'Social Media Reels', description: 'A vertical video edit for social media.', vimeoUrl: 'https://vimeo.com/1247202015?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247202015.jpg', editingSkills: ['Vertical format', 'Captions', 'Music sync'] },
  { title: 'Short-form edit 06', category: 'Social Media Reels', description: 'A mobile-first edit with concise cuts and synchronized audio.', vimeoUrl: 'https://vimeo.com/1247238688?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247238688.jpg', editingSkills: ['Trimming', 'Music sync', 'Sound effects'] },
  { title: 'Short-form edit 07', category: 'Promotional Videos', description: 'A short promotional edit for a social audience.', vimeoUrl: 'https://vimeo.com/1247238690?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247238690.jpg', editingSkills: ['Storytelling', 'Transitions', 'Sound sync'] },
  { title: 'Short-form edit 08', category: 'Promotional Videos', description: 'A concise edit shaped for short-form promotion.', vimeoUrl: 'https://vimeo.com/1247238828?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247238828.jpg', editingSkills: ['Pacing', 'B-roll', 'Captions'] },
  { title: 'Short-form edit 09', category: 'Social Media Reels', description: 'A short-form edit for social media.', vimeoUrl: 'https://vimeo.com/1247978302?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247978302.jpg', editingSkills: ['Pacing', 'Captions', 'Music sync'] },
  { title: 'Short-form edit 10', category: 'Social Media Reels', description: 'A short-form edit for social media.', vimeoUrl: 'https://vimeo.com/1247978304?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247978304.jpg', editingSkills: ['Pacing', 'Captions', 'Music sync'] },
];

/** Converts Vimeo watch/player links to an embed URL and keeps privacy hashes. */
export function getVimeoEmbedUrl(url: string, autoplay = false): string {
  const parsed = new URL(url);
  const pathMatch = parsed.pathname.match(/(?:video\/)?(\d+)/);
  if (!pathMatch || !['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'].includes(parsed.hostname)) {
    throw new Error(`Invalid Vimeo URL: ${url}`);
  }
  const embed = new URL(`https://player.vimeo.com/video/${pathMatch[1]}`);
  const hash = parsed.searchParams.get('h');
  if (hash) embed.searchParams.set('h', hash);
  embed.searchParams.set('autoplay', autoplay ? '1' : '0');
  embed.searchParams.set('title', '0');
  embed.searchParams.set('byline', '0');
  embed.searchParams.set('portrait', '0');
  return embed.toString();
}
