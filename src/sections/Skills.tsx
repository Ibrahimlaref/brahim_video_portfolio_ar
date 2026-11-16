const skills = [
  'Video trimming and cutting', 'Animated captions and subtitles', 'Talking-head editing', 'Jump cuts', 'Zoom effects',
  'B-roll integration', 'Sound effects', 'Music synchronization', 'Basic color adjustments', 'Social media formatting',
];

const workflow = ['Receive raw footage', 'Understand the content and audience', 'Edit and improve pacing', 'Add captions, B-roll, and sound', 'Export and deliver the final video'];

export default function Skills() {
  return (
    <section id="skills" className="relative w-full" style={{ background: '#161616', padding: '120px 5vw' }}>
      <div style={{ maxWidth: '1280px' }} className="mx-auto">
        <div className="mb-14">
          <div className="font-mono text-[11px] tracking-[3px] uppercase mb-4" style={{ color: '#CCFF00' }}>CAPCUT EDITING</div>
          <h2 className="font-display uppercase mb-4" style={{ fontSize: 'clamp(48px, 6vw, 72px)', color: '#F7F7F7', letterSpacing: '1.5px', lineHeight: 1.1 }}>MY SKILLS</h2>
          <p className="font-body text-base" style={{ color: '#A3A3A3' }}>Short-form editing skills, developed in CapCut.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <div key={skill} className="flex items-center gap-4 p-5" style={{ background: '#0C0C0C', borderLeft: '2px solid #CCFF00' }}>
              <span className="font-mono text-[10px]" style={{ color: '#CCFF00' }}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className="font-body text-sm font-semibold" style={{ color: '#F7F7F7' }}>{skill}</h3>
            </div>
          ))}
        </div>
        <div className="mt-20">
          <div className="font-mono text-[11px] tracking-[3px] uppercase mb-4" style={{ color: '#CCFF00' }}>FROM FOOTAGE TO FINAL CUT</div>
          <h3 className="font-display uppercase mb-8" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: '#F7F7F7' }}>MY WORKFLOW</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {workflow.map((step, index) => (
              <div key={step} className="p-5" style={{ borderTop: '1px solid rgba(204,255,0,0.55)' }}>
                <div className="font-mono text-[10px] mb-4" style={{ color: '#CCFF00' }}>STEP {String(index + 1).padStart(2, '0')}</div>
                <p className="font-body text-sm" style={{ color: '#D0D0D0', lineHeight: 1.6 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
