'use client';
import { useState } from 'react';
import { useContent } from '../lib/content';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function MenuPage() {
  const { content } = useContent();
  const { menu } = content;
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{
        minHeight: '50vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '120px 24px 80px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #1f1508 0%, var(--bg) 70%)',
      }}>
        <span className="eyebrow">Our Offerings</span>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '24px' }}>
          The Menu
        </h1>
        <div className="divider" />
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text)', maxWidth: '480px' }}>
          Every dish is a verse from the poetry of Persian cuisine — crafted with patience, saffron, and love.
        </p>
      </section>

      {/* Category Tabs */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)', padding: '0 24px', position: 'sticky', top: 'var(--nav-height)', zIndex: 10 }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', gap: '0', justifyContent: 'center' }}>
          {menu.categories.map((cat, i) => (
            <button key={i} onClick={() => setActiveCategory(i)} style={{
              padding: '20px 36px',
              background: 'none',
              color: activeCategory === i ? 'var(--gold)' : 'var(--text-muted)',
              fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500,
              borderBottom: activeCategory === i ? '1px solid var(--gold)' : '1px solid transparent',
              transition: 'all 0.2s',
            }}>
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Items */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {menu.categories[activeCategory].items.map((item) => (
              <div key={item.id} style={{ background: 'var(--surface)', padding: '36px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', marginBottom: '10px', color: 'var(--cream)' }}>{item.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{item.description}</p>
                </div>
                <span style={{ color: 'var(--gold)', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', whiteSpace: 'nowrap', flexShrink: 0 }}>${item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '100px 24px', textAlign: 'center',
        background: 'linear-gradient(135deg, #1a1005 0%, #0d0907 50%, #1a1005 100%)',
        borderTop: '1px solid var(--border)',
      }}>
        <span className="eyebrow">Ready to Dine?</span>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px', color: 'var(--cream)' }}>
          Reserve Your Table
        </h2>
        <div className="divider" />
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 44px', lineHeight: 1.8 }}>
          Secure your evening at Rumi and let us take care of the rest.
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
