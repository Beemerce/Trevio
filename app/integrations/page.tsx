import type { Metadata } from 'next';
import { IntegrationsView } from '@/components/pages/integrations/IntegrationsView';

export const metadata: Metadata = {
  title: 'Integrations & Developers',
  description: 'Connect Shopify, HubSpot, Salesforce, OpenAI, Stripe, Zapier and more, then build on the Trevio API, webhooks and MCP server.',
};

export default function IntegrationsPage() {
  return <IntegrationsView />;
}
