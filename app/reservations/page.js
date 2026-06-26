'use client';
import { useState } from 'react';
import { useContent } from '../lib/content';
import Navbar from '../components/Navbar';
import Link from 'next/link';

const times = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'];

export default function ReservationsPage() {
  const { content } = useContent();
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '2', requests: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.date) e.date = 'Please select a date';
    if (!form.time) e.time = 'Please select a time';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSubmitted(true);
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const inputStyle = {
    width: '100%', padding: '14px 18px',
    background: 'var(--surface-2)', border: '1px solid var(--border)',
    color: 'var(--cream)', fontSize: '0.9rem', outline: 'none',
    transition: 'border-color 0.2s',
  };

  const errStyle = { fontSize: '0.75rem', color: '#e07070', marginTop: '6px' };

  const today = new Date().toISOString().split('T')[0];

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
        <span className="eyebrow">Reserve Your Evening</span>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '24px' }}>
          Reservations
        </h1>
        <div className="divider" />
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text)', maxWidth: '480px' }}>
          Secure your place at the table. We look forward to welcoming you.
        </p>
      </section>

      {/* Form */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          {submitted ? (
            <div style={{ border: '1px solid var(--border)', padding: '72px 48px', textAlign: 'center', background: 'var(--surface)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '24px' }}>🌹</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'var(--cream)', marginBottom: '16px' }}>
                Reservation Confirmed
              </h2>
              <div className="divider" />
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '8px' }}>
                Thank you, <strong style={{ color: 'var(--text)' }}>{form.name}</strong>. We have received your reservation for
              </p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '8px' }}>
                {form.guests} {parseInt(form.guests) === 1 ? 'guest' : 'guests'} · {form.date} · {form.time}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '48px', lineHeight: 1.8 }}>
                A confirmation will be sent to <strong style={{ color: 'var(--text)' }}>{form.email}</strong>. We can't wait to see you.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '2', requests: '' }); }}
                className="btn-gold"
                style={{ cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: 'var(--cream)', marginBottom: '40px' }}>Your Details</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <input style={{ ...inputStyle, borderColor: errors.name ? '#e07070' : 'var(--border)' }} placeholder="Full Name *" value={form.name} onChange={set('name')} />
                  {errors.name && <p style={errStyle}>{errors.name}</p>}
                </div>
                <div>
                  <input style={{ ...inputStyle, borderColor: errors.phone ? '#e07070' : 'var(--border)' }} placeholder="Phone Number *" value={form.phone} onChange={set('phone')} />
                  {errors.phone && <p style={errStyle}>{errors.phone}</p>}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <input style={{ ...inputStyle, borderColor: errors.email ? '#e07070' : 'var(--border)' }} type="email" placeholder="Email Address *" value={form.email} onChange={set('email')} />
                {errors.email && <p style={errStyle}>{errors.email}</p>}
              </div>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: 'var(--cream)', margin: '40px 0 24px' }}>Booking Details</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <input
                    style={{ ...inputStyle, borderColor: errors.date ? '#e07070' : 'var(--border)', colorScheme: 'dark' }}
                    type="date" min={today} value={form.date} onChange={set('date')}
                  />
                  {errors.date && <p style={errStyle}>{errors.date}</p>}
                </div>
                <div>
                  <select style={{ ...inputStyle, borderColor: errors.time ? '#e07070' : 'var(--border)' }} value={form.time} onChange={set('time')}>
                    <option value="">Time *</option>
                    {times.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <p style={errStyle}>{errors.time}</p>}
                </div>
                <div>
                  <select style={inputStyle} value={form.guests} onChange={set('guests')}>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '40px' }}>
                <textarea
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  placeholder="Special requests or dietary requirements (optional)"
                  value={form.requests}
                  onChange={set('requests')}
                />
              </div>

              <button type="submit" className="btn-solid" style={{ width: '100%', cursor: 'pointer', fontFamily: 'Jost, sans-serif', padding: '18px', fontSize: '0.8rem' }}>
                Confirm Reservation
              </button>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '16px', textAlign: 'center', lineHeight: 1.8 }}>
                For parties larger than 8 or private events, please call us at {content.contact.phone}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Hours info */}
      <section style={{ borderTop: '1px solid var(--border)', padding: '80px 24px', background: 'var(--surface)', textAlign: 'center' }}>
        <span className="eyebrow">Hours</span>
        <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>When to Find Us</h2>
        <div className="divider" />
        <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginBottom: '8px' }}>{content.contact.hoursWeekdays}</p>
        <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginBottom: '32px' }}>{content.contact.hoursWeekends}</p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{content.contact.address}</p>
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
