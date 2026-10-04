import type { Metadata } from 'next';
import { AiFirstView } from '@/components/pages/ai-first/AiFirstView';

export const metadata: Metadata = {
  title: 'AI First',
  description: 'AI Agents, Copilot and the MCP Connector: Trevio AI resolves routine requests, builds chatbots from plain English and connects to Claude and ChatGPT.',
};

export default function AiFirstPage() {
  return <AiFirstView />;
}
