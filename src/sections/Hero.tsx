import { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clapperboard, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onNavClick: (target: string) => void;
}

const tools = ['CAPCUT'];

export default function Hero({ onNavClick }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const overlineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const playBadgeRef = useRef<HTMLButtonElement>(null);
  const timelineCardRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const statChipARef = useRef<HTMLDivElement>(null);
  const statChipBRef = useRef<HTMLDivElement>(null);

  const bgLayerRef = useRef<HTMLDivElement>(null);
  const glowARef = useRef<HTMLDivElement>(null);
  const glowBRef = useRef<HTMLDivElement>(null);

  const waveformBars = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
        const seed = Math.sin(i * 12.9898) * 43758.5453;
        const frac = seed - Math.floor(seed);
        return 6 + frac * 20;
      }),
    []
  );

  // Entrance timeline
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    if (overlineRef.current) {
      tl.from(overlineRef.current, { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' });
    }
    if (badgeRef.current) {
      tl.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
    }
    if (headlineRef.current) {
      tl.from(headlineRef.current, { y: 60, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.35');
    }
    if (subtextRef.current) {
      tl.from(subtextRef.current, { y: 26, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.55');
    }
    if (toolsRef.current) {
      tl.from(
        toolsRef.current.children,
        { y: 16, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' },
        '-=0.4'
      );
    }
    if (ctaRowRef.current) {
      tl.from(ctaRowRef.current.children, { y: 18, opacity: 0, stagger: 0.1, duration: 0.55, ease: 'power3.out' }, '-=0.35');
    }
    if (imageWrapRef.current) {
      tl.from(imageWrapRef.current, { x: 60, opacity: 0, scale: 0.92, duration: 1.1, ease: 'power3.out' }, '-=1.1');
    }
    if (timelineCardRef.current) {
      tl.from(timelineCardRef.current, { y: 40, opacity: 0, scale: 0.9, duration: 0.8, ease: 'back.out(1.5)' }, '-=0.7');
    }
    [statChipARef.current, statChipBRef.current, playBadgeRef.current].forEach((el) => {
      if (el) {
        tl.from(el, { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.5');
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Idle motion: playhead sweeping across the timeline, gentle float on stat chips
  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];

    if (playheadRef.current) {
      tweens.push(
        gsap.to(playheadRef.current, {
          left: '86%',
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.6,
        })
      );
    }
    [statChipARef.current, statChipBRef.current].forEach((el, i) => {
      if (!el) return;
      tweens.push(
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 10,
          duration: 2.8 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3 + 1,
        })
      );
    });
    if (timelineCardRef.current) {
      tweens.push(
        gsap.to(timelineCardRef.current, {
          y: -10,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1,
        })
      );
    }

    return () => tweens.forEach((t) => t.kill());
  }, []);

  // Mouse-driven parallax
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const targets: { el: HTMLElement | null; strength: number }[] = [
      { el: imageFrameRef.current, strength: 14 },
      { el: timelineCardRef.current, strength: 24 },
      { el: statChipARef.current, strength: 30 },
      { el: statChipBRef.current, strength: -26 },
      { el: playBadgeRef.current, strength: 20 },
      { el: glowARef.current, strength: 45 },
      { el: glowBRef.current, strength: -35 },
      { el: textBlockRef.current, strength: -8 },
    ];

    const setters = targets.map((t) =>
      t.el
        ? {
            x: gsap.quickTo(t.el, 'x', { duration: 0.9, ease: 'power3.out' }),
            y: gsap.quickTo(t.el, 'y', { duration: 0.9, ease: 'power3.out' }),
            strength: t.strength,
          }
        : null
    );

    function handleMouseMove(e: MouseEvent) {
      const rect = section!.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      setters.forEach((s) => {
        if (!s) return;
        s.x(relX * s.strength);
        s.y(relY * s.strength);
      });

      if (imageFrameRef.current) {
        gsap.to(imageFrameRef.current, {
          rotateY: relX * 10,
          rotateX: -relY * 10,
          duration: 0.7,
          ease: 'power3.out',
        });
      }
    }

    function handleMouseLeave() {
      setters.forEach((s) => {
        if (!s) return;
        s.x(0);
        s.y(0);
      });
      if (imageFrameRef.current) {
        gsap.to(imageFrameRef.current, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' });
      }
    }

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Scroll-driven parallax (subtle, only within hero viewport)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.to(bgLayerRef.current, {
        yPercent: 16,
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
      gsap.to(imageWrapRef.current, {
        yPercent: -10,
        scale: 0.96,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
      gsap.to(timelineCardRef.current, {
        yPercent: -22,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
      gsap.to(textBlockRef.current, {
        yPercent: -18,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh', background: '#0C0C0C' }}
    >
      {/* Background: grid + glow layer */}
      <div ref={bgLayerRef} className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(247,247,247,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(247,247,247,0.045) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 62% 45%, black 0%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 62% 45%, black 0%, transparent 78%)',
          }}
        />
        <div
          ref={glowARef}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 560,
            height: 560,
            top: '-14%',
            left: '50%',
            background: 'radial-gradient(circle, rgba(204,255,0,0.14), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          ref={glowBRef}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 480,
            height: 480,
            bottom: '-20%',
            left: '66%',
            background: 'radial-gradient(circle, rgba(255,107,0,0.12), transparent 70%)',
            filter: 'blur(65px)',
          }}
        />
      </div>

      <div
        className="relative z-10 mx-auto flex flex-col-reverse md:flex-row items-center gap-8"
        style={{ maxWidth: '1400px', minHeight: '100vh', padding: '96px 6vw 64px' }}
      >
        {/* Left: text content */}
        <div ref={textBlockRef} className="flex flex-col items-center text-center md:items-start md:text-left gap-5 w-full md:w-[52%]">
          <div
            ref={overlineRef}
            className="font-mono text-[11px] tracking-[3px] uppercase"
            style={{ color: '#CCFF00' }}
          >
            LAREF IBRAHIM
          </div>

          <div
            ref={badgeRef}
            className="inline-flex self-center md:self-start items-center gap-2 font-mono text-[11px] tracking-[2px] uppercase px-4 py-2"
            style={{
              border: '1px solid rgba(204,255,0,0.4)',
              color: '#F7F7F7',
              background: 'rgba(204,255,0,0.06)',
            }}
          >
            <Clapperboard size={14} color="#CCFF00" strokeWidth={1.8} />
            Short-Form Video Editor
          </div>

          <h1
            ref={headlineRef}
            className="font-display uppercase"
            style={{
              fontSize: 'clamp(34px, 4.6vw, 68px)',
              color: '#F7F7F7',
              lineHeight: 1.05,
              letterSpacing: '1px',
              fontWeight: 400,
              textShadow: '0 2px 40px rgba(0,0,0,0.9)',
            }}
          >
            SHORT-FORM VIDEO EDITOR
          </h1>

          <p ref={subtextRef} className="font-body text-base max-w-[480px] mx-auto md:mx-0" style={{ color: '#A3A3A3', fontWeight: 400, lineHeight: 1.6 }}>
            I turn raw footage into engaging short-form videos through clean editing, dynamic captions, smooth transitions, and storytelling.
          </p>

          <div ref={toolsRef} className="flex flex-wrap justify-center md:justify-start gap-3 mt-1">
            {tools.map((tool) => (
              <span
                key={tool}
                className="font-mono text-[10px] tracking-[1.5px] uppercase px-3 py-1.5"
                style={{ color: '#A3A3A3', border: '1px solid rgba(247,247,247,0.14)' }}
              >
                {tool}
              </span>
            ))}
          </div>

          <div ref={ctaRowRef} className="flex flex-wrap justify-center md:justify-start gap-4 mt-5">
            <button
              onClick={() => onNavClick('#work')}
              className="font-body text-xs font-semibold tracking-[2px] uppercase px-8 py-3.5 transition-all duration-300 hover:bg-[#CCFF00] hover:text-[#0C0C0C]"
              style={{ border: '1px solid #CCFF00', color: '#CCFF00', background: 'transparent' }}
            >
              EXPLORE MY WORK
            </button>
            <a
              href="https://wa.me/213558025255"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs font-semibold tracking-[2px] uppercase px-8 py-3.5 transition-all duration-300 hover:border-[#F7F7F7] inline-flex items-center justify-center"
              style={{ border: '1px solid rgba(247,247,247,0.25)', color: '#F7F7F7', background: 'transparent' }}
            >
              CONTACT ME
            </a>
          </div>
        </div>

        {/* Right: visual composition */}
        <div className="relative w-full md:w-[48%] flex items-center justify-center md:min-h-[420px]">
          <div ref={imageWrapRef} className="relative flex items-center justify-center" style={{ perspective: '1000px' }}>
            <div
              ref={imageFrameRef}
              className="relative"
              style={{
                width: 'clamp(220px, 24vw, 380px)',
                transformStyle: 'preserve-3d',
                boxShadow: '16px 16px 0 rgba(204,255,0,0.9)',
                border: '1px solid rgba(247,247,247,0.15)',
              }}
            >
              <img
                src="/larefibrahim_image.jpg"
                alt="Laref Ibrahim"
                className="block w-full object-cover"
                style={{ aspectRatio: '1 / 1' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(12,12,12,0.55) 100%)' }}
              />

              {/* Play badge - implies showreel */}
              <button
                ref={playBadgeRef}
                onClick={() => onNavClick('#work')}
                aria-label="Watch showreel"
                className="absolute flex items-center justify-center transition-transform duration-300 hover:scale-110"
                style={{
                  width: 56,
                  height: 56,
                  right: -18,
                  bottom: -18,
                  borderRadius: '50%',
                  background: '#CCFF00',
                  boxShadow: '0 8px 30px rgba(204,255,0,0.4)',
                }}
              >
                <Play size={20} color="#0C0C0C" fill="#0C0C0C" strokeWidth={0} style={{ marginLeft: 2 }} />
              </button>
            </div>

            {/* Stat chips */}
            <div
              ref={statChipARef}
              className="absolute hidden sm:flex flex-col font-mono px-4 py-3"
              style={{
                top: '-8%',
                left: '-16%',
                background: 'rgba(22,22,22,0.85)',
                border: '1px solid rgba(247,247,247,0.12)',
                backdropFilter: 'blur(10px)',
              }}
            >
                <span style={{ color: '#CCFF00', fontSize: '22px', lineHeight: 1 }}>CAPCUT</span>
              <span style={{ color: '#A3A3A3', fontSize: '9px', letterSpacing: '1.5px', marginTop: '4px' }}>
                EDITING TOOL
              </span>
            </div>

            <div
              ref={statChipBRef}
              className="absolute hidden sm:flex flex-col font-mono px-4 py-3"
              style={{
                bottom: '4%',
                right: '-20%',
                background: 'rgba(22,22,22,0.85)',
                border: '1px solid rgba(247,247,247,0.12)',
                backdropFilter: 'blur(10px)',
              }}
            >
                <span style={{ color: '#FF6B00', fontSize: '22px', lineHeight: 1 }}>SHORT</span>
              <span style={{ color: '#A3A3A3', fontSize: '9px', letterSpacing: '1.5px', marginTop: '4px' }}>
                FORM VIDEO
              </span>
            </div>

            {/* Timeline mockup card - reinforces "video editor" visually */}
            <div
              ref={timelineCardRef}
              className="absolute hidden md:block"
              style={{
                width: '260px',
                left: '-22%',
                bottom: '-16%',
                background: '#161616',
                border: '1px solid rgba(247,247,247,0.1)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                transform: 'rotate(-4deg)',
              }}
            >
              {/* window chrome */}
              <div
                className="flex items-center gap-1.5 px-3 py-2"
                style={{ borderBottom: '1px solid rgba(247,247,247,0.08)' }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF6B00' }} />
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#CCFF00' }} />
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#A3A3A3' }} />
                <span className="font-mono ml-2" style={{ fontSize: '9px', color: '#666' }}>
                  short_edit.capcut
                </span>
              </div>

              {/* clip track */}
              <div className="relative px-3 pt-3">
                <div className="flex gap-[2px]" style={{ height: 22 }}>
                  <div style={{ flex: 1.4, background: '#CCFF00' }} />
                  <div style={{ flex: 1, background: '#3a3a3a' }} />
                  <div style={{ flex: 1.8, background: '#FF6B00' }} />
                  <div style={{ flex: 0.8, background: '#3a3a3a' }} />
                  <div style={{ flex: 1.2, background: '#CCFF00', opacity: 0.6 }} />
                </div>

                {/* waveform track */}
                <div className="flex items-end gap-[2px] mt-2" style={{ height: 24 }}>
                  {waveformBars.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}px`,
                        background: 'rgba(247,247,247,0.25)',
                      }}
                    />
                  ))}
                </div>

                {/* playhead */}
                <div
                  ref={playheadRef}
                  className="absolute pointer-events-none"
                  style={{ top: 12, left: '14%', bottom: 8, width: 1.5, background: '#F7F7F7' }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -5,
                      left: -3,
                      width: 0,
                      height: 0,
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                      borderTop: '6px solid #F7F7F7',
                    }}
                  />
                </div>
              </div>

              <div className="px-3 pt-2 pb-3">
                <span className="font-mono" style={{ fontSize: '8.5px', color: '#666', letterSpacing: '1px' }}>
                  00:24 / 02:18
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
