import type { Metadata, Viewport } from 'next';
import { Noto_Sans_Arabic, Plus_Jakarta_Sans } from 'next/font/google';
import { MobileNav } from '@/components/chrome/MobileNav';
import { SiteFooter } from '@/components/chrome/SiteFooter';
import { SiteHeader } from '@/components/chrome/SiteHeader';
import { SITE } from '@/lib/site';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-jakarta', display: 'swap' });
const arabic = Noto_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '600'], variable: '--font-arabic', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Trevio AI — One Platform. Every Conversation. Every Channel.', template: '%s · Trevio AI' },
  description: 'AI-powered omnichannel customer engagement from Doha, Qatar. WhatsApp, Instagram, Facebook, TikTok and web chat in one AI-powered inbox.',
  openGraph: { siteName: SITE.name, type: 'website' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${arabic.variable}`}>
      <body>
        <div className="site">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
