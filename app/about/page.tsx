import type { Metadata } from 'next';
import { AboutView } from '@/components/pages/about/AboutView';

export const metadata: Metadata = {
  title: 'About & Contact',
  description: 'Why we built Trevio, our mission, and how to reach our team in Doha by WhatsApp, email or the contact form.',
};

export default function AboutPage() {
  return <AboutView />;
}
