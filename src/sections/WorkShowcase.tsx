import { useState } from 'react';
import { categories, getVimeoEmbedUrl, projects, type ProjectCategory } from '../data/projects';

function VimeoCard({ project }: { project: (typeof projects)[number] }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <article className="group" style={{ breakInside: 'avoid', marginBottom: '36px' }}>
      <div className="relative w-full overflow-hidden rounded-md" style={{ aspectRatio: project.aspectRatio, background: '#111', border: '1px solid rgba(247,247,247,0.1)' }}>
        {!loaded && (
          <div className="absolute inset-0 z-10 grid place-items-center font-mono text-xs tracking-[2px]" style={{ color: '#CCFF00', background: '#111' }} role="status">
            LOADING VIDEO...
          </div>
        )}
        <iframe
          src={getVimeoEmbedUrl(project.vimeoUrl)}
          title={project.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full"
          allow="fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="flex justify-between gap-4 pt-4">
        <div>
          <p className="font-mono text-[9px] tracking-[1.5px] uppercase mb-2" style={{ color: '#CCFF00' }}>{project.category}</p>
          <h3 className="font-body text-base font-bold" style={{ color: '#F7F7F7' }}>{project.title}</h3>
          <p className="font-body text-sm mt-1" style={{ color: '#A3A3A3', lineHeight: 1.6 }}>{project.description}</p>
          <p className="font-mono text-[9px] tracking-[1px] mt-3" style={{ color: '#777' }}>{project.editingSkills.join(' · ')}</p>
        </div>
        {project.featured && <span className="font-mono text-[9px] tracking-[1px] h-fit" style={{ color: '#CCFF00' }}>FEATURED</span>}
      </div>
    </article>
  );
}

export default function WorkShowcase() {
  const [category, setCategory] = useState<ProjectCategory>('All');
  const visibleProjects = projects.filter((project) => category === 'All' || project.category === category);

  return (
    <section id="work" className="relative w-full" style={{ background: '#0C0C0C', padding: '120px 5vw' }}>
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        <div className="mb-12">
          <div className="font-mono text-[11px] tracking-[3px] uppercase mb-4" style={{ color: '#CCFF00' }}>PORTFOLIO</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="font-display uppercase" style={{ fontSize: 'clamp(48px, 6vw, 72px)', color: '#F7F7F7', letterSpacing: '1.5px', lineHeight: 1.1 }}>SELECTED WORK</h2>
              <p className="font-body text-sm mt-3" style={{ color: '#A3A3A3' }}>Short-form edits, shown in their original format.</p>
            </div>
            <span className="font-mono text-[10px] tracking-[2px]" style={{ color: '#777' }}>{String(visibleProjects.length).padStart(2, '0')} VIDEOS</span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 hide-scrollbar" role="group" aria-label="Filter projects by category">
          {categories.map((item) => (
            <button key={item} onClick={() => setCategory(item)} aria-pressed={category === item}
              className="shrink-0 px-4 py-2 font-mono text-[10px] tracking-[1px] uppercase transition-colors"
              style={{ color: category === item ? '#0C0C0C' : '#A3A3A3', background: category === item ? '#CCFF00' : '#161616', border: '1px solid rgba(247,247,247,0.1)' }}>
              {item}
            </button>
          ))}
        </div>

        <div className="mx-auto [column-count:1] md:[column-count:2]" style={{ maxWidth: '860px', columnGap: '36px' }}>
          {visibleProjects.map((project) => <VimeoCard key={project.vimeoUrl} project={project} />)}
        </div>
      </div>
    </section>
  );
}
