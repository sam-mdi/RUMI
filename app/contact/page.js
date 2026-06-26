'use client';
import { useState } from 'react';
import { useContent } from '../lib/content';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function ContactPage() {
  const { content } = useContent();
  const { contact } = content;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle = {
    width: '100%', padding: '14px 18px',
    background: 'var(--surface-2)', border: '1px solid var(--border)',
    color: 'var(--cream)', fontSize: '0.9rem', outline: 'none',
    transition: 'border-color 0.2s',
  };

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
        <span className="eyebrow">Get in Touch</span>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '24px' }}>
          Contact Us
        </h1>
        <div className="divider" />
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text)', maxWidth: '480px' }}>
          We'd love to hear from you. Reach out for inquiries, private events, or just to say hello.
        </p>
      </section>

      {/* Contact Info + Form */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px' }}>

          {/* Info */}
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', marginBottom: '40px', color: 'var(--cream)' }}>Find Us</h2>

            {[
              { label: 'Address', value: contact.address },
              { label: 'Phone', value: contact.phone },
              { label: 'Email', value: contact.email },
              { label: 'Weekdays', value: contact.hoursWeekdays },
              { label: 'Weekends', value: contact.hoursWeekends },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontWeight: 500 }}>{item.label}</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.6 }}>{item.value}</p>
              </div>
            ))}

            <div style={{ marginTop: '40px' }}>
              <Link href="/reservations" className="btn-gold">Reserve a Table</Link>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', marginBottom: '40px', color: 'var(--cream)' }}>Send a Message</h2>

            {sent ? (
              <div style={{ padding: '48px', border: '1px solid var(--border)', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: 'var(--cream)', marginBottom: '12px' }}>Thank you!</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>We've received your message and will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input
                  style={inputStyle}
                  placeholder="Your Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  style={inputStyle}
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
                <textarea
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '160px' }}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
                <button type="submit" className="btn-solid" style={{ alignSelf: 'flex-start', cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px 24px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: 'var(--cream)', letterSpacing: '0.12em', marginBottom: '16px' }}>RUMI</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          {contact.address} &nbsp;·&nbsp; {contact.phone}
        </p>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '32px', opacity: 0.5 }}>
          © {new Date().getFullYear()} Rumi Restaurant. All rights reserved.
        </p>
      </footer>
    </>
  );
}
