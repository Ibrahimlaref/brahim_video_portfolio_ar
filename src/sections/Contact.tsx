import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const firefliesRef = useRef<Firefly[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // Entrance animation
    const children = content.children;
    gsap.from(children, {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  // Firefly particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const maxFireflies = 60;
    const connectionDist = 150;

    function resizeCanvas() {
      if (!canvas || !sectionRef.current) return;
      canvas.width = sectionRef.current.offsetWidth;
      canvas.height = sectionRef.current.offsetHeight;
    }

    resizeCanvas();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    function spawnFirefly() {
      if (!canvas) return;
      if (firefliesRef.current.length >= maxFireflies) return;

      firefliesRef.current.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 1 + 0.3),
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.6 + 0.4,
        life: 0,
        maxLife: Math.random() * 300 + 200,
      });
    }

    function updateFireflies() {
      if (!canvas) return;

      // Spawn new fireflies occasionally
      if (Math.random() < 0.05) {
        spawnFirefly();
      }

      for (let i = firefliesRef.current.length - 1; i >= 0; i--) {
        const f = firefliesRef.current[i];
        f.x += f.vx + (Math.random() - 0.5) * 0.3;
        f.y += f.vy;
        f.life++;

        // Fade near end of life
        const lifeRatio = f.life / f.maxLife;
        if (lifeRatio > 0.7) {
          f.alpha = (1 - lifeRatio) / 0.3 * 0.6;
        }

        // Remove dead fireflies
        if (f.life >= f.maxLife || f.y < -20) {
          firefliesRef.current.splice(i, 1);
        }
      }
    }

    function drawFireflies() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const fireflies = firefliesRef.current;

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < fireflies.length; i++) {
        for (let j = i + 1; j < fireflies.length; j++) {
          const dx = fireflies[i].x - fireflies[j].x;
          const dy = fireflies[i].y - fireflies[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15;
            ctx.strokeStyle = `rgba(204, 255, 0, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(fireflies[i].x, fireflies[i].y);
            ctx.lineTo(fireflies[j].x, fireflies[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw fireflies
      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];

        // Outer glow
        const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 4);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${f.alpha})`);
        gradient.addColorStop(0.3, `rgba(255, 200, 50, ${f.alpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(204, 255, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(255, 255, 255, ${f.alpha})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function animate() {
      updateFireflies();
      drawFireflies();
      animRef.current = requestAnimationFrame(animate);
    }

    // Click burst effect
    function onClick(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const speed = Math.random() * 2 + 1;
        firefliesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1.5,
          alpha: Math.random() * 0.5 + 0.5,
          life: 0,
          maxLife: Math.random() * 100 + 80,
        });
      }
    }

    canvas.addEventListener('click', onClick);

    // Initial fireflies
    for (let i = 0; i < 30; i++) {
      if (!canvas) break;
      firefliesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 0.8 + 0.2),
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.6 + 0.4,
        life: Math.random() * 100,
        maxLife: Math.random() * 300 + 200,
      });
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh', background: '#0C0C0C' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 0 }}
      />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-8"
        style={{ minHeight: '100vh', maxWidth: '800px', margin: '0 auto' }}
      >
        <div
          className="font-mono text-[11px] tracking-[3px] uppercase mb-6"
          style={{ color: '#CCFF00' }}
        >
          GET IN TOUCH
        </div>

        <h2
          className="font-display uppercase mb-6"
          style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            color: '#F7F7F7',
            lineHeight: 1.1,
            letterSpacing: '1.5px',
          }}
        >
          LET'S CREATE SOMETHING AMAZING TOGETHER
        </h2>

        <p
          className="font-body text-base mb-10"
          style={{
            color: '#A3A3A3',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          Have raw footage you’d like shaped into a short-form video? Get in touch and tell me about your project.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a
            href="https://wa.me/213558025255"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[13px] font-bold tracking-[2px] uppercase px-10 py-4 transition-all duration-300 hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #CCFF00, #FF6B00)',
              color: '#0C0C0C',
            }}
          >
            CONTACT ON WHATSAPP
          </a>
          <a
            href="mailto:larefibrahim@gmail.com"
            className="font-body text-[13px] font-bold tracking-[2px] uppercase px-10 py-4 transition-all duration-300 hover:bg-[#CCFF00] hover:text-[#0C0C0C]"
            style={{
              border: '1px solid #CCFF00',
              color: '#CCFF00',
            }}
          >
            SEND EMAIL
          </a>
        </div>

        <div className="flex gap-8 items-center">
          <a
            href="https://www.instagram.com/ibrahimlaref/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-[#CCFF00]"
            style={{ color: '#A3A3A3' }}
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/laref-ibrahim-4645b4294/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-[#CCFF00]"
            style={{ color: '#A3A3A3' }}
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://vimeo.com/1247202016"
            className="transition-colors duration-300 hover:text-[#CCFF00]"
            style={{ color: '#A3A3A3' }}
            aria-label="Vimeo"
          >
            <span className="font-mono text-sm font-bold">V</span>
          </a>
        </div>
      </div>
    </section>
  );
}
