'use client';
import { useState, useRef } from 'react';
import { useContent, defaultContent } from '../lib/content';
import Link from 'next/link';

// ── Styles ──────────────────────────────────────────────────────────────────

const inputStyle = {
  width: '100%', padding: '12px 16px',
  background: '#12100c', border: '1px solid rgba(201,168,76,0.2)',
  color: '#f0e0c0', fontSize: '0.9rem', outline: 'none',
  fontFamily: 'Jost, sans-serif', transition: 'border-color 0.2s',
};

const labelStyle = {
  display: 'block', fontSize: '0.62rem', letterSpacing: '0.18em',
  textTransform: 'uppercase', color: '#c9a84c', marginBottom: '8px', fontWeight: 500,
};

const sectionHeading = {
  fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem',
  color: '#f0e0c0', marginBottom: '32px', paddingBottom: '16px',
  borderBottom: '1px solid rgba(201,168,76,0.15)',
};

const outlineBtn = {
  padding: '9px 20px', background: 'transparent',
  border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c',
  fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase',
  cursor: 'pointer', fontFamily: 'Jost, sans-serif', whiteSpace: 'nowrap',
};

const solidBtn = {
  padding: '10px 20px', background: '#c9a84c', border: 'none',
  color: '#080604', fontSize: '0.68rem', letterSpacing: '0.15em',
  textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontWeight: 600,
};

const dangerBtn = {
  padding: '6px 12px', background: 'transparent',
  border: '1px solid rgba(255,100,100,0.3)', color: '#ff8888',
  fontSize: '0.62rem', letterSpacing: '0.1em', cursor: 'pointer',
  fontFamily: 'Jost, sans-serif',
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function setDeep(obj, dotPath, value) {
  const result = deepClone(obj);
  const keys = dotPath.split('.');
  let cur = result;
  for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
  cur[keys[keys.length - 1]] = value;
  return result;
}

// ── Shared field components ───────────────────────────────────────────────────

function Field({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={labelStyle}>{label}</label>
      <input style={inputStyle} value={value || ''} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 4, placeholder }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={labelStyle}>{label}</label>
      <textarea
        style={{ ...inputStyle, resize: 'vertical', minHeight: `${rows * 26}px` }}
        value={value || ''} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

function ImageField({ label, value, onChange }) {
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('File must be under 2 MB. Use an image URL for larger files.');
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ marginBottom: '28px' }}>
      <label style={labelStyle}>{label}</label>
      {value ? (
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <img src={value} alt="" style={{ width: '100%', height: '200px', objectFit: 'cover', border: '1px solid rgba(201,168,76,0.2)', display: 'block' }} />
          <button type="button" onClick={() => onChange('')} style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(8,6,4,0.85)', color: '#ff8888', border: '1px solid rgba(255,100,100,0.3)', padding: '4px 12px', fontSize: '0.68rem', cursor: 'pointer', fontFamily: 'Jost, sans-serif', letterSpacing: '0.1em' }}>
            Remove
          </button>
        </div>
      ) : (
        <div style={{ width: '100%', height: '120px', border: '1px dashed rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', color: '#3a3020', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          No image set
        </div>
      )}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          style={{ ...inputStyle, flex: 1 }}
          placeholder="Paste image URL…"
          value={value && value.startsWith('data:') ? '' : (value || '')}
          onChange={e => onChange(e.target.value)}
        />
        <button type="button" style={outlineBtn} onClick={() => fileRef.current.click()}>Upload</button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
      <p style={{ fontSize: '0.68rem', color: '#3a3020', marginTop: '6px' }}>Upload (max 2 MB) or paste any image URL.</p>
    </div>
  );
}

// ── Tab: Hero ─────────────────────────────────────────────────────────────────

function HeroTab({ data, onChange }) {
  return (
    <div>
      <p style={sectionHeading}>Hero Section</p>
      <ImageField label="Hero Background Image" value={data.hero.image || ''} onChange={v => onChange('hero.image', v)} />
      <Field label="Restaurant Name" value={data.hero.title} onChange={v => onChange('hero.title', v)} />
      <Field label="Subtitle (above name)" value={data.hero.subtitle} onChange={v => onChange('hero.subtitle', v)} />
      <Field label="Tagline (italic line)" value={data.hero.tagline} onChange={v => onChange('hero.tagline', v)} />
      <TextArea label="Description" value={data.hero.description} onChange={v => onChange('hero.description', v)} rows={4} />
    </div>
  );
}

// ── Tab: About ────────────────────────────────────────────────────────────────

function AboutTab({ data, onChange }) {
  const addValue = () => {
    const values = [...data.about.values, { icon: '⭐', label: 'New Value' }];
    onChange('about.values', values);
  };

  const removeValue = (i) => {
    onChange('about.values', data.about.values.filter((_, idx) => idx !== i));
  };

  const updateValue = (i, field, val) => {
    onChange('about.values', data.about.values.map((v, idx) => idx === i ? { ...v, [field]: val } : v));
  };

  return (
    <div>
      <p style={sectionHeading}>About Page</p>
      <ImageField label="About Photo" value={data.about.image || ''} onChange={v => onChange('about.image', v)} />
      <Field label="Page Title" value={data.about.title} onChange={v => onChange('about.title', v)} />
      <Field label="Subtitle" value={data.about.subtitle} onChange={v => onChange('about.subtitle', v)} />
      <TextArea label="Story — Paragraph 1" value={data.about.body} onChange={v => onChange('about.body', v)} rows={5} />
      <TextArea label="Story — Paragraph 2" value={data.about.body2} onChange={v => onChange('about.body2', v)} rows={5} />

      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle}>Values / Highlights</label>
        {data.about.values.map((v, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'center' }}>
            <input style={{ ...inputStyle, width: '62px', textAlign: 'center', fontSize: '1.2rem', padding: '8px' }} value={v.icon} onChange={e => updateValue(i, 'icon', e.target.value)} placeholder="🌿" />
            <input style={{ ...inputStyle, flex: 1 }} value={v.label} onChange={e => updateValue(i, 'label', e.target.value)} placeholder="Label" />
            <button type="button" style={dangerBtn} onClick={() => removeValue(i)}>Remove</button>
          </div>
        ))}
        <button type="button" style={{ ...outlineBtn, marginTop: '4px' }} onClick={addValue}>+ Add Value</button>
      </div>
    </div>
  );
}

// ── Tab: Menu ─────────────────────────────────────────────────────────────────

function MenuTab({ data, onChange }) {
  const [activeCat, setActiveCat] = useState(0);

  const cats = data.menu.categories;
  const safeIdx = Math.min(activeCat, cats.length - 1);

  const setCats = (updated) => onChange('menu.categories', updated);

  const addItem = () => {
    const updated = deepClone(cats);
    updated[safeIdx].items.push({ id: Date.now(), name: 'New Dish', description: '', price: '0' });
    setCats(updated);
  };

  const removeItem = (itemIdx) => {
    const updated = deepClone(cats);
    updated[safeIdx].items.splice(itemIdx, 1);
    setCats(updated);
  };

  const updateItem = (itemIdx, field, value) => {
    const updated = deepClone(cats);
    updated[safeIdx].items[itemIdx][field] = value;
    setCats(updated);
  };

  const updateCatName = (value) => {
    const updated = deepClone(cats);
    updated[safeIdx].name = value;
    setCats(updated);
  };

  const addCategory = () => {
    const updated = [...deepClone(cats), { name: 'New Category', items: [] }];
    setCats(updated);
    setActiveCat(updated.length - 1);
  };

  const removeCategory = () => {
    if (cats.length <= 1) return;
    const updated = deepClone(cats).filter((_, i) => i !== safeIdx);
    setCats(updated);
    setActiveCat(Math.max(0, safeIdx - 1));
  };

  return (
    <div>
      <p style={sectionHeading}>Menu</p>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        {cats.map((cat, i) => (
          <button key={i} type="button" onClick={() => setActiveCat(i)} style={{
            padding: '8px 20px',
            background: safeIdx === i ? '#c9a84c' : 'transparent',
            border: '1px solid rgba(201,168,76,0.4)',
            color: safeIdx === i ? '#080604' : '#c9a84c',
            fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase',
            cursor: 'pointer', fontFamily: 'Jost, sans-serif',
          }}>
            {cat.name}
          </button>
        ))}
        <button type="button" style={outlineBtn} onClick={addCategory}>+ Category</button>
      </div>

      {/* Category name + remove */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', marginBottom: '8px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Category Name</label>
          <input style={inputStyle} value={cats[safeIdx].name} onChange={e => updateCatName(e.target.value)} />
        </div>
        {cats.length > 1 && (
          <button type="button" style={{ ...dangerBtn, marginBottom: '0', height: '44px' }} onClick={removeCategory}>
            Delete Category
          </button>
        )}
      </div>

      <div style={{ height: '1px', background: 'rgba(201,168,76,0.15)', margin: '28px 0' }} />

      {/* Items */}
      {cats[safeIdx].items.length === 0 && (
        <p style={{ color: '#3a3020', fontSize: '0.85rem', marginBottom: '20px' }}>No items yet — add one below.</p>
      )}
      {cats[safeIdx].items.map((item, i) => (
        <div key={item.id} style={{ border: '1px solid rgba(201,168,76,0.12)', padding: '20px', marginBottom: '14px', background: '#0d0b07' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ ...labelStyle, margin: 0 }}>Item {i + 1}</span>
            <button type="button" style={dangerBtn} onClick={() => removeItem(i)}>Remove</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '10px', marginBottom: '10px' }}>
            <div>
              <label style={labelStyle}>Dish Name</label>
              <input style={inputStyle} value={item.name} onChange={e => updateItem(i, 'name', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Price ($)</label>
              <input style={inputStyle} value={item.price} onChange={e => updateItem(i, 'price', e.target.value)} />
            </div>
          </div>
          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '70px' }} value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} />
        </div>
      ))}

      <button type="button" style={outlineBtn} onClick={addItem}>+ Add Dish</button>
    </div>
  );
}

// ── Tab: Contact ──────────────────────────────────────────────────────────────

function ContactTab({ data, onChange }) {
  return (
    <div>
      <p style={sectionHeading}>Contact & Hours</p>
      <Field label="Address" value={data.contact.address} onChange={v => onChange('contact.address', v)} />
      <Field label="Phone" value={data.contact.phone} onChange={v => onChange('contact.phone', v)} />
      <Field label="Email" value={data.contact.email} onChange={v => onChange('contact.email', v)} />
      <div style={{ height: '1px', background: 'rgba(201,168,76,0.15)', margin: '8px 0 28px' }} />
      <Field label="Weekday Hours" value={data.contact.hoursWeekdays} onChange={v => onChange('contact.hoursWeekdays', v)} placeholder="Mon – Thu: 11:00 AM – 10:00 PM" />
      <Field label="Weekend Hours" value={data.contact.hoursWeekends} onChange={v => onChange('contact.hoursWeekends', v)} placeholder="Fri – Sun: 10:00 AM – 11:00 PM" />
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

const TABS = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'menu', label: 'Menu' },
  { id: 'contact', label: 'Contact' },
];

export default function DashboardPage() {
  const { content, saveContent } = useContent();
  const [draft, setDraft] = useState(null);
  const [tab, setTab] = useState('hero');
  const [isDirty, setIsDirty] = useState(false);
  const [saved, setSaved] = useState(false);

  const data = draft ?? content;

  const onChange = (path, value) => {
    setDraft(prev => setDeep(prev ?? content, path, value));
    setIsDirty(true);
    setSaved(false);
  };

  const handleSave = () => {
    saveContent(data);
    setIsDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (!confirm('Reset all content back to defaults? This cannot be undone.')) return;
    saveContent(defaultContent);
    setDraft(null);
    setIsDirty(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080604', display: 'flex', fontFamily: 'Jost, sans-serif' }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: '220px', flexShrink: 0,
        background: '#0a0804',
        borderRight: '1px solid rgba(201,168,76,0.15)',
        position: 'fixed', left: 0, top: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Branding */}
        <div style={{ padding: '28px 24px 24px', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#f0e0c0', letterSpacing: '0.15em', marginBottom: '4px' }}>RUMI</p>
          <p style={{ fontSize: '0.6rem', color: '#3a3020', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Content Dashboard</p>
        </div>

        {/* Nav tabs */}
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {TABS.map(t => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '13px 24px',
              background: tab === t.id ? 'rgba(201,168,76,0.08)' : 'transparent',
              color: tab === t.id ? '#c9a84c' : '#4a3c28',
              borderLeft: `2px solid ${tab === t.id ? '#c9a84c' : 'transparent'}`,
              fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: 'Jost, sans-serif',
              transition: 'all 0.15s',
            }}>
              {t.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ padding: '20px', borderTop: '1px solid rgba(201,168,76,0.12)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button type="button" onClick={handleSave} style={{
            ...solidBtn, width: '100%', padding: '13px',
            background: saved ? '#4a9c6e' : isDirty ? '#c9a84c' : '#2a2418',
            color: saved || isDirty ? '#080604' : '#4a3c28',
            transition: 'background 0.3s',
            pointerEvents: isDirty ? 'auto' : 'none',
          }}>
            {saved ? '✓  Saved' : isDirty ? 'Save Changes' : 'Up to Date'}
          </button>

          <Link href="/" target="_blank" style={{
            display: 'block', textAlign: 'center', padding: '10px',
            border: '1px solid rgba(201,168,76,0.25)', color: '#8a7040',
            fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'color 0.2s',
          }}>
            View Site ↗
          </Link>

          <button type="button" onClick={handleReset} style={{ ...dangerBtn, width: '100%', textAlign: 'center', padding: '8px' }}>
            Reset to Defaults
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ marginLeft: '220px', flex: 1, padding: '52px 60px', maxWidth: '860px' }}>
        {/* Unsaved banner */}
        {isDirty && !saved && (
          <div style={{ marginBottom: '28px', padding: '12px 20px', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#c9a84c', letterSpacing: '0.1em' }}>You have unsaved changes</span>
            <button type="button" onClick={handleSave} style={{ ...solidBtn, padding: '7px 18px' }}>Save Now</button>
          </div>
        )}

        {tab === 'hero'    && <HeroTab    data={data} onChange={onChange} />}
        {tab === 'about'   && <AboutTab   data={data} onChange={onChange} />}
        {tab === 'menu'    && <MenuTab    data={data} onChange={onChange} />}
        {tab === 'contact' && <ContactTab data={data} onChange={onChange} />}
      </main>
    </div>
  );
}
