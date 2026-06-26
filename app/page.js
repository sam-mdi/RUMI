'use client';
import { useContent } from './lib/content';
import Navbar from './components/Navbar';
import Link from 'next/link';

export default function Home() {
  const { content } = useContent();
  const { hero } = content;

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 24px',
        position: 'relative', overflow: 'hidden',
        background: hero.image
          ? `linear-gradient(rgba(8,6,4,0.65), rgba(8,6,4,0.85)), url(${hero.image}) center/cover no-repeat`
          : 'radial-gradient(ellipse 80% 60% at 50% 40%, #1f1508 0%, var(--bg) 70%)',
      }}>
        {/* Decorative pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, var(--gold) 0, var(--gold) 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

        <span style={{ display: 'block', color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '28px', fontFamily: 'Jost, sans-serif' }}>
          {hero.subtitle}
        </span>

        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(6rem, 18vw, 16rem)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 0.9, marginBottom: '32px' }}>
          {hero.title}
        </h1>

        <div style={{ width: '48px', height: '1px', background: 'var(--gold)', margin: '0 auto 28px' }} />

        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: 'var(--text)', maxWidth: '520px', marginBottom: '48px', letterSpacing: '0.02em' }}>
          {hero.tagline}
        </p>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '480px', marginBottom: '52px', lineHeight: 1.8 }}>
          {hero.description}
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/menu" className="btn-solid">Explore Our Menu</Link>
          <Link href="/reservations" className="btn-gold">Reserve a Table</Link>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          <span>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
        </div>
      </section>

      {/* Features */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '80px 24px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'var(--border)' }}>
          {[
            { icon: '🌿', title: 'Authentic Persian Recipes', desc: 'Handed down through generations, our recipes use heirloom spices sourced from the bazaars of Tehran and Isfahan.' },
            { icon: '🔥', title: 'Slow-Cooked with Love', desc: 'From our Ghormeh Sabzi simmered for 6 hours to our lamb shank braised overnight — patience is our secret ingredient.' },
            { icon: '🌹', title: "Rumi's Hospitality", desc: 'In Persian culture, guests are considered a gift. Every visit to Rumi is an invitation to feel at home.' },
          ].map((f, i) => (
            <div key={i} style={{ background: 'var(--surface)', padding: '56px 40px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '20px' }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', marginBottom: '14px', color: 'var(--cream)' }}>{f.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Signature Dishes */}
      <section style={{ padding: '110px 24px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <span className="eyebrow">From Our Kitchen</span>
          <h2 className="section-title">Signature Dishes</h2>
          <div className="divider" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {content.menu.categories[1].items.slice(0, 3).map((item) => (
              <div key={item.id} style={{ background: 'var(--surface)', padding: '48px 36px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '16px', right: '20px', color: 'var(--gold)', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem' }}>${item.price}</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', marginBottom: '12px' }}>{item.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{item.description}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/menu" className="btn-gold">View Full Menu</Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        padding: '100px 24px', textAlign: 'center',
        background: 'linear-gradient(135deg, #1a1005 0%, #0d0907 50%, #1a1005 100%)',
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      }}>
        <span className="eyebrow">Reserve Your Evening</span>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px', color: 'var(--cream)' }}>
          An Evening Worth Remembering
        </h2>
        <div className="divider" />
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 44px', lineHeight: 1.8 }}>
          Join us for an intimate Persian dining experience. We take reservations for parties of all sizes.
        </p>
        <Link href="/reservations" className="btn-solid">Make a Reservation</Link>
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
