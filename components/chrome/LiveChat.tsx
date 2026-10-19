import Script from 'next/script';
import { SITE } from '@/lib/site';

/** wa-api.cloud web chat widget. Replaces the design's floating WhatsApp button. */
export function LiveChat() {
  const config = { gatewayUrl: SITE.webchat.gatewayUrl, siteKey: SITE.webchat.siteKey };
  return (
    <>
      <Script id="live-chat-init" strategy="afterInteractive">
        {`window.connectChat = window.connectChat || { q: [] };
window.connectChat.q.push(['init', ${JSON.stringify(config)}]);`}
      </Script>
      <Script src={`${SITE.webchat.gatewayUrl}/v1/widget.js`} strategy="afterInteractive" />
    </>
  );
}
