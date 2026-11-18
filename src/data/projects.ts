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
  /** Native display shape measured from the Vimeo video (width / height). */
  aspectRatio: number;
  editingSkills: string[];
  featured?: boolean;
}

// These links were supplied by Laref. Edit category/title/description when you
// want to identify the exact format or subject of each video.
export const projects: Project[] = [
  { title: 'Cold-Weather Street Story', category: 'Talking Head', description: 'A direct-to-camera outdoor clip with conversational pacing and clean cuts.', vimeoUrl: 'https://vimeo.com/1247202016?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247202016.jpg', aspectRatio: 240 / 426, editingSkills: ['Pacing', 'Captions', 'Jump cuts'], featured: true },
  { title: 'A Quiet Moment in the Mountains', category: 'Educational Shorts', description: 'A scenic short centered on a calm outdoor moment and natural imagery.', vimeoUrl: 'https://vimeo.com/1247202012?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247202012.jpg', aspectRatio: 240 / 426, editingSkills: ['Trimming', 'Transitions', 'Visual storytelling'] },
  { title: 'Vertical Storytelling', category: 'Social Media Reels', description: 'A mobile-first edit composed for a vertical social video frame.', vimeoUrl: 'https://vimeo.com/1247202015?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247202015.jpg', aspectRatio: 426 / 240, editingSkills: ['Vertical format', 'Captions', 'Music sync'] },
  { title: 'Alo: Talking-Head Product Clip', category: 'Social Media Reels', description: 'A concise creator-style clip with subtitles and focused pacing.', vimeoUrl: 'https://vimeo.com/1247238688?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247238688.jpg', aspectRatio: 240 / 426, editingSkills: ['Trimming', 'Captions', 'Sound effects'] },
  { title: 'Portrait in Focus', category: 'Promotional Videos', description: 'A dramatic close-up edit that uses color and pacing to hold attention.', vimeoUrl: 'https://vimeo.com/1247238828?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247238828.jpg', aspectRatio: 240 / 426, editingSkills: ['Pacing', 'Color adjustments', 'Captions'] },
  { title: 'Golf Swing: Focus Before the Shot', category: 'Promotional Videos', description: 'A quick golf clip cut around the player and the moment before the shot.', vimeoUrl: 'https://vimeo.com/1247978302?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247978302.jpg', aspectRatio: 240 / 426, editingSkills: ['Pacing', 'Captions', 'Music sync'] },
  { title: 'Podcast Clip: First Piece of Advice', category: 'Podcast Editing', description: 'A French-language podcast excerpt featuring a guest sharing advice.', vimeoUrl: 'https://vimeo.com/1247978304?fl=ip&fe=ec&share=copy', thumbnail: 'https://vumbnail.com/1247978304.jpg', aspectRatio: 426 / 240, editingSkills: ['Podcast editing', 'Captions', 'Pacing'] },
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
