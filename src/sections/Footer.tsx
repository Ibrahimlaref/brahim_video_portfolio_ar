export default function Footer() {
  return (
    <footer
      className="w-full flex flex-col md:flex-row items-center justify-between gap-4"
      style={{
        background: '#0C0C0C',
        borderTop: '1px solid #161616',
        padding: '40px 5vw',
      }}
    >
      <span
        className="font-body text-xs"
        style={{ color: '#A3A3A3' }}
      >
        &copy; {new Date().getFullYear()} Laref Ibrahim.
      </span>
      <span
        className="font-mono text-[10px] tracking-[2px]"
        style={{ color: '#CCFF00' }}
      >
        DESIGNED & EDITED WITH PASSION
      </span>
    </footer>
  );
}
