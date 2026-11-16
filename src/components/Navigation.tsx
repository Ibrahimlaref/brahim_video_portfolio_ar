import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface NavigationProps {
  onNavClick: (target: string) => void;
}

export default function Navigation({ onNavClick }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -72,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      });
    }
  }, []);

  const navLinks = [
    { label: 'WORK', target: '#work' },
    { label: 'ABOUT', target: '#about' },
    { label: 'SKILLS', target: '#skills' },
    { label: 'CONTACT', target: '#contact' },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 h-[72px] flex items-center justify-between px-8 md:px-12"
      style={{
        background: 'rgba(12, 12, 12, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 50,
      }}
    >
      <button
        onClick={() => onNavClick('#hero')}
        className="font-mono text-sm font-semibold tracking-[4px]"
        style={{ color: '#F7F7F7' }}
      >
        LAREF
      </button>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <button
            key={link.target}
            onClick={() => onNavClick(link.target)}
            className="font-body text-xs font-semibold tracking-[2px] uppercase transition-colors duration-300 hover:text-[#CCFF00]"
            style={{ color: '#A3A3A3' }}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => onNavClick('#contact')}
          className="font-body text-[11px] font-bold tracking-[2px] uppercase px-6 py-2.5"
          style={{
            background: 'linear-gradient(135deg, #CCFF00, #FF6B00)',
            color: '#0C0C0C',
          }}
        >
          LET'S TALK
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span
          className="block w-6 h-0.5 transition-transform duration-300"
          style={{
            background: '#F7F7F7',
            transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
          }}
        />
        <span
          className="block w-6 h-0.5 transition-opacity duration-300"
          style={{
            background: '#F7F7F7',
            opacity: mobileOpen ? 0 : 1,
          }}
        />
        <span
          className="block w-6 h-0.5 transition-transform duration-300"
          style={{
            background: '#F7F7F7',
            transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
          }}
        />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="absolute top-[72px] left-0 right-0 flex flex-col items-center gap-6 py-8 md:hidden"
          style={{ background: 'rgba(12, 12, 12, 0.95)', backdropFilter: 'blur(20px)' }}
        >
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => {
                onNavClick(link.target);
                setMobileOpen(false);
              }}
              className="font-body text-sm font-semibold tracking-[2px] uppercase transition-colors duration-300 hover:text-[#CCFF00]"
              style={{ color: '#A3A3A3' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onNavClick('#contact');
              setMobileOpen(false);
            }}
            className="font-body text-xs font-bold tracking-[2px] uppercase px-6 py-2.5"
            style={{
              background: 'linear-gradient(135deg, #CCFF00, #FF6B00)',
              color: '#0C0C0C',
            }}
          >
            LET'S TALK
          </button>
        </div>
      )}
    </nav>
  );
}
