import Link from 'next/link';
import { Icon, ICONS } from '@/components/Icon';
import { SITE } from '@/lib/site';
import { Logo } from './Logo';

const heading = { fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' } as const;
const link = { fontSize: 14.5, color: '#9AA1B5' } as const;
const column = { display: 'flex', flexDirection: 'column', gap: 14 } as const;
const social = { width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9CDE0' } as const;

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  { title: 'Quick Links', links: [
    { label: 'Features', href: '/features' },
    { label: 'Integrations', href: '/integrations' },
    { label: 'AI First', href: '/ai-first' },
    { label: 'Pricing', href: '/pricing' },
  ] },
  { title: 'Explore', links: [
    { label: 'About us', href: '/about' },
    { label: 'Developer portal', href: SITE.devPortalUrl },
    { label: 'Mini Apps', href: '/features#miniapps' },
    { label: 'Careers', href: '#' },
  ] },
  { title: 'Legal', links: [
    { label: 'Privacy policy', href: '#' },
    { label: 'Terms of service', href: '#' },
    { label: 'Data processing', href: '#' },
    { label: 'Security', href: '#' },
  ] },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return href.startsWith('/')
    ? <Link href={href} className="hv-white" style={link}>{children}</Link>
    : <a href={href} className="hv-white" style={link}>{children}</a>;
}

export function SiteFooter() {
  return (
    <footer style={{ background: '#0D1117', color: '#fff', padding: '72px 0 32px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 56 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,170px),1fr))', gap: '40px 32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 220 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Logo onDark /></div>
            <span style={{ fontSize: 14.5, lineHeight: 1.65, color: '#9AA1B5', maxWidth: 260 }}>Trevio AI Solutions — AI-powered omnichannel engagement, built in Doha.</span>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="#" aria-label="LinkedIn" className="hv-social" style={social}><Icon d={ICONS.linkedin} size={17} /></a>
              <a href="#" aria-label="X" className="hv-social" style={social}><Icon d={ICONS.x} size={15} strokeWidth={2.2} /></a>
              <a href="#" aria-label="Instagram" className="hv-social" style={social}><Icon d={ICONS.instagram} size={17} /></a>
              <a href="#" aria-label="TikTok" className="hv-social" style={social}><Icon d={ICONS.tiktok} size={17} /></a>
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title} style={column}>
              <span style={heading}>{col.title}</span>
              {col.links.map((l) => <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>)}
            </div>
          ))}
          <div style={column}>
            <span style={heading}>Contact</span>
            <span style={{ fontSize: 14.5, lineHeight: 1.6, color: '#9AA1B5' }}>West Bay, Doha<br />State of Qatar</span>
            <a href={`mailto:${SITE.email}`} className="hv-white" style={link}>{SITE.email}</a>
            <a href={SITE.whatsappUrl} className="hv-white" style={link}>Chat on WhatsApp</a>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: 13.5, color: '#7A8198' }}>
          <span>© 2026 Trevio AI Solutions. All rights reserved.</span>
          <span>Doha, Qatar</span>
        </div>
      </div>
    </footer>
  );
}
