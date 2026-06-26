'use client';
import { useContent } from '../lib/content';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function AboutPage() {
  const { content } = useContent();
  const { about } = content;

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{
        minHeight: '60vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '120px 24px 80px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #1f1508 0%, var(--bg) 70%)',
      }}>
        <span className="eyebrow">Who We Are</span>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '24px' }}>
          {about.title}
        </h1>
        <div className="divider" />
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(1rem, 2vw, 1.3rem)', color: 'var(--text)', maxWidth: '560px' }}>
          {about.subtitle}
        </p>
      </section>

      {/* Story */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'grid', gridTemplateColumns: about.image ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr', gap: '80px', alignItems: 'center' }}>
          {about.image && (
            <div>
              <img src={about.image} alt="About Rumi" style={{ width: '100%', height: '480px', objectFit: 'cover', border: '1px solid var(--border)' }} />
            </div>
          )}
          <div style={{ maxWidth: about.image ? undefined : '780px', margin: about.image ? undefined : '0 auto' }}>
            <p style={{ fontSize: '1.05rem', color: 'var(--text)', lineHeight: 2, marginBottom: '32px' }}>{about.body}</p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text)', lineHeight: 2 }}>{about.body2}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '80px 24px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'var(--border)' }}>
          {about.values.map((v, i) => (
            <div key={i} style={{ background: 'var(--surface)', padding: '60px 40px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{v.icon}</div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: 'var(--cream)' }}>{v.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <span className="eyebrow">Come Visit Us</span>
        <h2 className="section-title">Experience It Yourself</h2>
        <div className="divider" />
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 44px', lineHeight: 1.8 }}>
          The best way to understand our story is to taste it. Join us for an evening of Persian hospitality.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/reservations" className="btn-solid">Reserve a Table</Link>
          <Link href="/menu" className="btn-gold">View Our Menu</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px 24px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: 'var(--cream)', letterSpacing: '0.12em', marginBottom: '16px' }}>RUMI</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          {content.contact.address} &nbsp;·&nbsp; {content.contact.phone}
        </p>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '32px', opacity: 0.5 }}>
          © {new Date().getFullYear()} Rumi Restaurant. All rights reserved.
        </p>
      </footer>
    </>
  );
}
