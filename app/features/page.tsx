import type { Metadata } from 'next';
import { FeaturesView } from '@/components/pages/features/FeaturesView';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Team Inbox, AI Chatbot Builder, AI Agent and Copilot, broadcasting, WhatsApp Commerce, calls, Mini Apps, SLAs, Conversion CAPI, developer tools and analytics.',
};

export default function FeaturesPage() {
  return <FeaturesView />;
}
