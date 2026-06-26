'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 'var(--nav-height)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px',
        background: scrolled ? 'rgba(8,6,4,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <Link href="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: 'var(--cream)', letterSpacing: '0.12em', fontWeight: 400 }}>
          RUMI
        </Link>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', gap: '40px', listStyle: 'none', alignItems: 'center' }} className="nav-desktop">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} style={{
                fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500,
                color: pathname === l.href ? 'var(--gold)' : 'var(--text)',
                transition: 'color 0.2s',
                paddingBottom: '2px',
                borderBottom: pathname === l.href ? '1px solid var(--gold)' : '1px solid transparent',
              }}>{l.label}</Link>
            </li>
          ))}
        </ul>

        {/* Reserve Button */}
        <Link href="/reservations" className="btn-gold" style={{ fontSize: '0.65rem', padding: '10px 24px', display: 'none' }} id="nav-reserve">
          Reserve a Table
        </Link>

        <Link href="/reservations" className="btn-gold nav-cta" style={{ fontSize: '0.65rem', padding: '10px 24px' }}>
          Reserve a Table
        </Link>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="nav-hamburger" style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', padding: '4px' }}>
          {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: '22px', height: '1px', background: 'var(--gold)' }} />)}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(8,6,4,0.98)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '36px',
        }}>
          <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 28, right: 28, background: 'none', color: 'var(--gold)', fontSize: '1.5rem' }}>✕</button>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'var(--cream)', letterSpacing: '0.08em' }}>
              {l.label}
            </Link>
          ))}
          <Link href="/reservations" onClick={() => setOpen(false)} className="btn-gold" style={{ marginTop: '12px' }}>Reserve a Table</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
