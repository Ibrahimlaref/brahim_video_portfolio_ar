export default function About() {
  return (
    <section id="about" className="relative w-full" style={{ background: '#0C0C0C', padding: '120px 5vw' }}>
      <div className="mx-auto grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-center" style={{ maxWidth: '1280px' }}>
        <div className="flex flex-col gap-6">
          <div className="font-mono text-[11px] tracking-[3px] uppercase" style={{ color: '#CCFF00' }}>ABOUT ME</div>
          <h2 className="font-display uppercase" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: '#F7F7F7', lineHeight: 1.1, letterSpacing: '1.5px' }}>TURNING RAW FOOTAGE INTO COMPELLING STORIES</h2>
          <p className="font-body text-[15px]" style={{ color: '#A3A3A3', lineHeight: 1.8 }}>
            I’m Laref Ibrahim, an aspiring short-form video editor focused on content for Instagram Reels, TikTok, and YouTube Shorts. I use CapCut to shape raw footage into clear, engaging edits, with attention to pacing, clean subtitles, visual storytelling, and music synchronization.
          </p>
          <p className="font-body text-[15px]" style={{ color: '#A3A3A3', lineHeight: 1.8 }}>
            My work includes talking-head videos, podcast clips, social content, and short promotions. I’m building my portfolio through hands-on practice and keep each edit focused on the message and its audience.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {['PACING', 'CLEAN SUBTITLES', 'VISUAL STORYTELLING', 'SOUND & MUSIC SYNC'].map((item) => (
              <span key={item} className="font-mono text-[9px] tracking-[1px] px-3 py-2" style={{ color: '#CCFF00', border: '1px solid rgba(204,255,0,0.25)' }}>{item}</span>
            ))}
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative flex flex-col justify-between overflow-hidden p-8" style={{ width: 'min(100%, 380px)', aspectRatio: '0.88', background: 'linear-gradient(145deg, #202020, #101010 65%)', border: '1px solid rgba(247,247,247,0.12)', boxShadow: '18px 18px 0 rgba(204,255,0,0.85)' }}>
            <div className="flex items-center justify-between font-mono text-[9px] tracking-[2px]" style={{ color: '#777' }}><span>EDITING FOCUS</span><span>01 — 10</span></div>
            <img src="/larefibrahim_image.jpg" alt="Laref Ibrahim, short-form video editor" className="mx-auto h-auto object-cover" style={{ width: '70%', aspectRatio: '0.7', border: '1px solid rgba(247,247,247,0.14)', borderRadius: 18 }} />
            <div className="flex justify-between font-mono text-[9px] tracking-[2px]" style={{ color: '#CCFF00' }}><span>CAPCUT</span><span>SHORT-FORM VIDEO</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
