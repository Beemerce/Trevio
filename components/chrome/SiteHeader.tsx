'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV, SITE } from '@/lib/site';
import { Logo } from './Logo';

const navLink = { padding: '8px 12px', borderRadius: 8, fontSize: 14.5, fontWeight: 500, color: '#1A1A2E' } as const;
const navLinkActive = { ...navLink, fontWeight: 700, color: '#5B247A', background: '#F4F2FF' } as const;

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.84)', backdropFilter: 'saturate(1.6) blur(14px)', WebkitBackdropFilter: 'saturate(1.6) blur(14px)', borderBottom: '1px solid rgba(26,26,46,0.06)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 24, position: 'relative' }}>
        <nav className="only-wide" aria-label="Main" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={active ? undefined : 'hv-nav'} style={active ? navLinkActive : navLink} aria-current={active ? 'page' : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="only-wide" style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none' }}>
          <a href={SITE.loginUrl} className="hv-nav" style={{ padding: '10px 16px', borderRadius: 10, fontSize: 14.5, fontWeight: 600, color: '#1A1A2E' }}>Login</a>
          <a href={SITE.signUpUrl} className="hv-bright" style={{ padding: '10px 18px', borderRadius: 10, fontSize: 14.5, fontWeight: 700, color: '#fff', background: 'var(--grad-brand)', boxShadow: '0 8px 20px -8px rgba(91,36,122,0.6)' }}>Sign Up</a>
        </div>
        <div className="only-narrow" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href={SITE.loginUrl} style={{ height: 44, padding: '0 12px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 14.5, fontWeight: 700, color: '#1A1A2E' }}>Login</a>
          <a href={SITE.signUpUrl} className="hv-white" style={{ height: 44, padding: '0 16px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 14.5, fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', background: 'var(--grad-brand)', boxShadow: '0 8px 20px -8px rgba(91,36,122,0.6)' }}>Sign Up</a>
        </div>
        <Link href="/" aria-label="Trevio home" style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none', position: 'absolute', left: 25, top: '50%', transform: 'translateY(-50%)' }}>
          <Logo priority />
        </Link>
      </div>
    </header>
  );
}
