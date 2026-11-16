import { useRef, useEffect } from 'react';

interface BgStar {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<BgStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numBgStars = 300;
    const bgStarSpeed = 0.15;

    function resizeBgCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeBgCanvas();

    if (starsRef.current.length === 0) {
      for (let i = 0; i < numBgStars; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          speed: Math.random() * bgStarSpeed + 0.05,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    }

    const handleResize = () => resizeBgCanvas();
    window.addEventListener('resize', handleResize);

    function animateBgStarfield() {
      if (!canvas || !ctx) return;

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i];
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i];
        ctx.fillStyle = `rgba(247, 247, 247, ${star.opacity})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      }

      animRef.current = requestAnimationFrame(animateBgStarfield);
    }

    animRef.current = requestAnimationFrame(animateBgStarfield);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="starfield-bg"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
