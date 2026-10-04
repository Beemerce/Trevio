import type { Metadata } from 'next';
import { PricingView } from '@/components/pages/pricing/PricingView';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent annual pricing in QAR. Startup, Growth and Premium plans for Trevio’s AI-powered omnichannel inbox.',
};

export default function PricingPage() {
  return <PricingView />;
}
