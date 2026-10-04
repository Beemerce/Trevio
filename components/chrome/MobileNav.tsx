'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type CSSProperties } from 'react';
import { Icon, ICONS } from '@/components/Icon';
import { SITE } from '@/lib/site';

const TABS = [
  { href: '/', label: 'Home', icon: ICONS.home },
  { href: '/features', label: 'Features', icon: ICONS.grid },
  { href: '/ai-first', label: 'AI First', icon: ICONS.sparkle },
  { href: '/pricing', label: 'Pricing', icon: ICONS.tag },
];

const MORE = [
  { href: '/integrations', title: 'Integrations', sub: 'Connect your tools', icon: ICONS.plug },
  { href: '/integrations#developers', title: 'Developers', sub: 'API & docs', icon: ICONS.code },
  { href: '/about', title: 'About', sub: 'Our mission', icon: ICONS.info },
  { href: '/about#contact-form', title: 'Contact', sub: 'Talk to our team', icon: ICONS.mail },
];

/** Pages reached through the More sheet; the More tab shows as active on these. */
const MORE_PATHS = ['/integrations', '/about'];

const tab: CSSProperties = { flex: 1, minWidth: 0, minHeight: 58, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, fontSize: 11, fontWeight: 600, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', padding: 0, WebkitTapHighlightColor: 'transparent' };
const tabActive: CSSProperties = { ...tab, fontWeight: 800, color: '#5B247A' };
const pill: CSSProperties = { width: 46, height: 30, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' };
const pillActive: CSSProperties = { ...pill, background: 'var(--grad-brand)', boxShadow: '0 6px 14px -6px rgba(131,120,255,0.8)' };

function TabIcon({ d, active, strokeWidth = 2 }: { d: string; active: boolean; strokeWidth?: number }) {
  return (
    <span style={active ? pillActive : pill}>
      <Icon d={d} size={active ? 19 : 20} stroke={active ? '#fff' : 'currentColor'} strokeWidth={active ? Math.max(2.2, strokeWidth) : strokeWidth} />
    </span>
  );
}

/** App-style bottom tab bar and "More" sheet. The tab bar shows below 1100px. */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onResize = () => { if (window.innerWidth >= 1100) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [open]);

  const moreActive = MORE_PATHS.includes(pathname);

  return (
    <>
      <nav aria-label="Primary" className="only-narrow" style={{ position: 'fixed', left: 12, right: 12, bottom: 'calc(12px + env(safe-area-inset-bottom))', zIndex: 70, maxWidth: 560, margin: '0 auto', display: 'flex', alignItems: 'stretch', padding: '4px 6px', borderRadius: 22, background: 'rgba(255,255,255,0.9)', backdropFilter: 'saturate(1.8) blur(18px)', WebkitBackdropFilter: 'saturate(1.8) blur(18px)', boxShadow: '0 18px 40px -16px rgba(26,10,46,0.35),0 0 0 1px rgba(26,26,46,0.06)' }}>
        {TABS.map((t) => {
          const active = pathname === t.href;
          return (
            <Link key={t.href} href={t.href} aria-label={t.label} aria-current={active ? 'page' : undefined} className={active ? 'hv-purple' : 'hv-ink'} style={active ? tabActive : tab}>
              <TabIcon d={t.icon} active={active} />
              <span>{t.label}</span>
            </Link>
          );
        })}
        <button type="button" onClick={() => setOpen((o) => !o)} aria-label="More" aria-expanded={open} style={moreActive ? tabActive : tab}>
          <TabIcon d={ICONS.more} active={moreActive} strokeWidth={3} />
          <span>More</span>
        </button>
      </nav>

      {open && (
        <>
          <div onClick={close} style={{ position: 'fixed', inset: 0, zIndex: 80, background: 'rgba(13,17,23,0.45)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }} />
          <div role="dialog" aria-modal="true" aria-label="More" style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 90, maxWidth: 600, margin: '0 auto', borderRadius: '26px 26px 0 0', background: '#fff', boxShadow: '0 -20px 50px -20px rgba(26,10,46,0.4)', padding: '10px 20px calc(24px + env(safe-area-inset-bottom))', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={{ alignSelf: 'center', width: 40, height: 5, borderRadius: 5, background: '#E3E5EC' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>More from Trevio</span>
              <button type="button" onClick={close} aria-label="Close" autoFocus style={{ width: 44, height: 44, borderRadius: 12, border: 'none', background: '#F4F5F8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1A1A2E' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d={ICONS.close} /></svg>
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 10 }}>
              {MORE.map((m) => (
                <Link key={m.href} href={m.href} onClick={close} className="hv-tile" style={{ padding: 16, borderRadius: 16, background: '#F8F9FB', border: '1px solid #EEF0F4', display: 'flex', flexDirection: 'column', gap: 10, color: '#1A1A2E', minHeight: 44 }}>
                  <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--grad-icon)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon d={m.icon} size={19} stroke="#fff" /></span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 15, fontWeight: 800 }}>{m.title}</span>
                    <span style={{ fontSize: 12.5, color: '#6B7280' }}>{m.sub}</span>
                  </span>
                </Link>
              ))}
            </div>
            <a href={SITE.whatsappUrl} className="hv-bright-sm" style={{ height: 54, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 15.5, fontWeight: 800, color: '#fff', background: '#25D366' }}>
              <Icon d={ICONS.chat} size={20} strokeWidth={2.2} />Chat on WhatsApp · {SITE.whatsappDisplay}
            </a>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <a href={SITE.loginUrl} style={{ height: 50, borderRadius: 14, border: '1.5px solid #DADCE6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1A1A2E' }}>Login</a>
              <a href={SITE.signUpUrl} style={{ height: 50, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', background: 'var(--grad-brand)' }}>Sign Up</a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
