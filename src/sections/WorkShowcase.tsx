import { useEffect, useState } from 'react';
import { Play, X } from 'lucide-react';
import { categories, getVimeoEmbedUrl, projects, type ProjectCategory } from '../data/projects';

function VideoPlayer({ projectIndex }: { projectIndex: number }) {
  const [loaded, setLoaded] = useState(false);
  const project = projects[projectIndex];
  return (
    <div className="relative w-full overflow-hidden rounded-md" style={{ aspectRatio: '16 / 9', background: '#111' }}>
      {!loaded && <div className="absolute inset-0 z-10 grid place-items-center font-mono text-xs tracking-[2px]" style={{ color: '#CCFF00', background: '#111' }} role="status">LOADING VIDEO…</div>}
      <iframe onLoad={() => setLoaded(true)} className="absolute inset-0 w-full h-full" src={getVimeoEmbedUrl(project.vimeoUrl)} allow="fullscreen; picture-in-picture" allowFullScreen title={project.title} />
    </div>
  );
}

export default function WorkShowcase() {
  const [category, setCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const visibleProjects = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => category === 'All' || project.category === category);

  useEffect(() => {
    if (activeProject === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveProject(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [activeProject]);

  return (
    <section id="work" className="relative w-full" style={{ background: '#0C0C0C', padding: '120px 5vw' }}>
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        <div className="mb-12">
          <div className="font-mono text-[11px] tracking-[3px] uppercase mb-4" style={{ color: '#CCFF00' }}>PORTFOLIO</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="font-display uppercase" style={{ fontSize: 'clamp(48px, 6vw, 72px)', color: '#F7F7F7', letterSpacing: '1.5px', lineHeight: 1.1 }}>SELECTED WORK</h2>
              <p className="font-body text-sm mt-3" style={{ color: '#A3A3A3' }}>Short-form edits, collected in one place.</p>
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

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map(({ project, index }) => (
            <article key={project.vimeoUrl} className="group">
              <button onClick={() => setActiveProject(index)} aria-label={`Play ${project.title}`} className="relative block w-full overflow-hidden text-left rounded-md"
                style={{ aspectRatio: '16 / 10', background: '#191919', border: '1px solid rgba(247,247,247,0.08)' }}>
                <img src={project.thumbnail} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  onError={(event) => { event.currentTarget.style.display = 'none'; }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(12,12,12,0.05), rgba(12,12,12,0.75))' }} />
                <span className="absolute left-4 top-4 font-mono text-[9px] tracking-[1.5px] px-3 py-1.5" style={{ color: '#CCFF00', background: 'rgba(12,12,12,0.78)', border: '1px solid rgba(204,255,0,0.25)' }}>{project.category.toUpperCase()}</span>
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid place-items-center rounded-full transition-transform duration-300 group-hover:scale-110" style={{ width: 58, height: 58, color: '#0C0C0C', background: '#CCFF00', boxShadow: '0 8px 30px rgba(204,255,0,0.28)' }}><Play fill="currentColor" size={20} style={{ marginLeft: 3 }} /></span>
                </span>
                <span className="absolute bottom-4 left-4 font-mono text-[9px] tracking-[2px]" style={{ color: '#ddd' }}>VIDEO {String(index + 1).padStart(2, '0')}</span>
              </button>
              <div className="flex justify-between gap-4 pt-4">
                <div>
                  <h3 className="font-body text-base font-bold" style={{ color: '#F7F7F7' }}>{project.title}</h3>
                  <p className="font-body text-sm mt-1" style={{ color: '#A3A3A3', lineHeight: 1.6 }}>{project.description}</p>
                  <p className="font-mono text-[9px] tracking-[1px] mt-3" style={{ color: '#777' }}>{project.editingSkills.join(' · ')}</p>
                </div>
                {project.featured && <span className="font-mono text-[9px] tracking-[1px] h-fit" style={{ color: '#CCFF00' }}>FEATURED</span>}
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProject !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12" style={{ background: 'rgba(8,8,8,0.96)' }} onClick={() => setActiveProject(null)}>
          <button onClick={() => setActiveProject(null)} aria-label="Close video" className="absolute right-5 top-5 md:right-10 md:top-10 grid place-items-center rounded-full" style={{ width: 48, height: 48, color: '#CCFF00', border: '1px solid #CCFF00', background: '#111' }}><X size={22} /></button>
          <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <VideoPlayer projectIndex={activeProject} />
            <p className="font-body mt-4" style={{ color: '#F7F7F7' }}>{projects[activeProject].title}</p>
          </div>
        </div>
      )}
    </section>
  );
}
