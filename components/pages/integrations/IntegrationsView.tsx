'use client';

import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import './integrations.css';

/** Logos around the hub: [mark, brand colour, name]. Even indexes sit on the inner ring, odd on the outer ring. */
const ITEMS: [string, string, string][] = [
  ['S', '#5E8E3E', 'Shopify'], ['H', '#FF7A59', 'HubSpot'], ['AI', '#10A37F', 'OpenAI'], ['Z', '#FF4F00', 'Zapier'],
  ['T', '#1A1A2E', 'Tap Payments'], ['Sf', '#00A1E0', 'Salesforce'], ['G', '#4285F4', 'Gemini'], ['M', '#6D00CC', 'Make'],
  ['S', '#635BFF', 'Stripe'], ['O', '#714B67', 'Odoo'], ['W', '#7F54B3', 'WooCommerce'], ['{}', '#5B247A', 'REST API'],
];
const PTS = ITEMS.map((_, i) => {
  const outer = i % 2 === 1;
  const k = Math.floor(i / 2);
  const a = (k / 6) * Math.PI * 2 + (outer ? Math.PI / 6 : 0) - Math.PI / 2;
  const r = outer ? 46 : 31;
  return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a), outer };
});

const CURL = `curl -X POST https://api.wa-api.cloud/v1/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"channel":"whatsapp","to":"+97450000000","type":"text","text":"Hello from Trevio"}'`;

export function IntegrationsView() {
  const webRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [copied, setCopied] = useState(false);

  // Logos animate in once the integration web scrolls into view.
  useEffect(() => {
    const el = webRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) {
        setInView(true);
        io.disconnect();
      }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const onCopy = () => {
    navigator.clipboard?.writeText(CURL).catch(() => {});
    setCopied(true);
  };
  const copyLabel = copied ? 'Copied' : 'Copy';

  const nodes = ITEMS.map(([mark, color, name], i) => ({
    mark,
    color,
    name,
    outer: PTS[i].outer,
    x: PTS[i].x + '%',
    y: PTS[i].y + '%',
    op: inView ? 1 : 0,
    tf: inView ? 'translate(-50%,-50%) scale(1)' : 'translate(-50%,-50%) scale(0.6)',
    delay: (0.15 + i * 0.07).toFixed(2) + 's',
  }));
  const lines = (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
      <defs>
        <linearGradient id="webG" gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={100} y2={100}>
          <stop offset="0" stopColor="#5ED6F7" />
          <stop offset="0.5" stopColor="#8378FF" />
          <stop offset="1" stopColor="#1BCECF" />
        </linearGradient>
      </defs>
      {PTS.map((p, i) => (
        <line key={i} x1={50} y1={50} x2={p.x} y2={p.y} stroke="url(#webG)" strokeWidth={1.4} vectorEffect="non-scaling-stroke" opacity={inView ? 0.75 : 0} style={{ transition: `opacity .8s ease ${(i * 0.07).toFixed(2)}s` }} />
      ))}
    </svg>
  );

  return (
    <>
      <section style={{ padding: 'clamp(64px,8vw,112px) 0 clamp(56px,7vw,96px)', background: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 22,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg,#5B247A,#1BCECF)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Integrations
          </span>
          <h1
            style={{
              margin: 0,
              maxWidth: 860,
              fontSize: 'clamp(40px,5.4vw,68px)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              fontWeight: 800,
              textWrap: 'balance',
            }}
          >
            {'Connect Everything '}
            <span
              style={{
                background: 'linear-gradient(90deg,#5B247A 0%,#8378FF 50%,#1BCECF 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              You Already Use
            </span>
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: 620,
              fontSize: 'clamp(17px,1.5vw,19.5px)',
              lineHeight: 1.65,
              color: '#6B7280',
              textWrap: 'pretty',
            }}
          >
            Your store, CRM, payments, AI models and automation tools — synced in real time with every conversation.
          </p>
          <div ref={webRef} className="int-web" style={{ position: 'relative', width: '100%', maxWidth: 880, marginTop: 20 }}>
            <div
              style={{
                position: 'absolute',
                inset: '6% 10%',
                borderRadius: '50%',
                background: 'radial-gradient(closest-side,rgba(131,120,255,0.14),rgba(94,214,247,0.06) 60%,transparent)',
              }}
            ></div>
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '62%',
                height: '62%',
                transform: 'translate(-50%,-50%)',
                borderRadius: '50%',
                border: '1px dashed #E1DFF5',
              }}
            ></div>
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '92%',
                height: '92%',
                transform: 'translate(-50%,-50%)',
                borderRadius: '50%',
                border: '1px dashed #ECEBF7',
              }}
            ></div>
            {lines}
            {nodes.map((n, nI) => (
              <Fragment key={nI}>
                <div
                  title={n.name}
                  className={n.outer ? 'int-node int-node-outer' : 'int-node'}
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 16,
                    background: '#fff',
                    boxShadow: '0 12px 28px -14px rgba(56,40,140,0.45),0 0 0 1px rgba(26,26,46,0.06)',
                    fontWeight: 800,
                    transition: 'opacity .6s ease,transform .7s cubic-bezier(.2,.8,.2,1)',
                    left: n.x,
                    top: n.y,
                    color: n.color,
                    opacity: n.op,
                    transform: n.tf,
                    transitionDelay: n.delay,
                  }}
                >
                  {n.mark}
                </div>
              </Fragment>
            ))}
            <div
              className="int-hub"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%,-50%)',
                borderRadius: '50%',
                padding: 2,
                background: 'linear-gradient(135deg,#5ED6F7,#8378FF 55%,#5B247A)',
                boxShadow: '0 0 0 10px rgba(131,120,255,0.10),0 30px 60px -20px rgba(131,120,255,0.7)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 11,
                    background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 19,
                  }}
                >
                  t
                </div>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: 17,
                    letterSpacing: '-0.03em',
                    background: 'linear-gradient(90deg,#5B247A,#1BCECF)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  trevio
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: 'clamp(48px,6vw,80px) 0 clamp(80px,10vw,128px)', background: '#FFFFFF', borderTop: '1px solid #EEF0F4' }}>
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(56px,7vw,88px)',
          }}
        >
          <div id="automation" style={{ scrollMarginTop: 96, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '8px 24px',
                paddingBottom: 16,
                borderBottom: '1px solid #EEF0F4',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h2 style={{ margin: 0, fontSize: 'clamp(24px,2.4vw,30px)', lineHeight: 1.15, letterSpacing: '-0.03em', fontWeight: 800 }}>
                  Automation Tools
                </h2>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: '#6B7280', maxWidth: 620 }}>
                  Trigger workflows across thousands of apps whenever a conversation starts, changes or closes.
                </p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', display: 'inline' }}></span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 16 }}>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#FF4F00',
                  }}
                >
                  Z
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Zapier</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Connect Trevio events to 6,000+ apps</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#6D00CC',
                  }}
                >
                  M
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Make</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Visual multi-step scenarios with chat data</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#EA4B71',
                  }}
                >
                  n8n
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>n8n</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Self-hosted, open-source workflow automation</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#1D4ED8',
                  }}
                >
                  P
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Pabbly Connect</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Affordable automations with unlimited steps</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#1A1A2E',
                  }}
                >
                  Pd
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Pipedream</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Code-level workflows triggered by webhooks</span>
                </div>
              </div>
            </div>
          </div>
          <div id="ecommerce" style={{ scrollMarginTop: 96, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '8px 24px',
                paddingBottom: 16,
                borderBottom: '1px solid #EEF0F4',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h2 style={{ margin: 0, fontSize: 'clamp(24px,2.4vw,30px)', lineHeight: 1.15, letterSpacing: '-0.03em', fontWeight: 800 }}>
                  E-Commerce Platforms
                </h2>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: '#6B7280', maxWidth: 620 }}>
                  Sync catalogues, carts and orders so customers can browse, buy and track inside the chat.
                </p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280' }}>5 integrations</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 16 }}>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#5E8E3E',
                  }}
                >
                  S
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Shopify</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Catalogue, orders and abandoned-cart flows</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#7F54B3',
                  }}
                >
                  W
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>WooCommerce</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Product sync and order notifications</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#004956',
                  }}
                >
                  S
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Salla</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Native support for Saudi and Gulf merchants</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#5C2D91',
                  }}
                >
                  Z
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Zid</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Order updates and customer sync for Zid stores</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#EE672F',
                  }}
                >
                  M
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Magento</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Enterprise catalogues and order status</span>
                </div>
              </div>
            </div>
          </div>
          <div id="ai" style={{ scrollMarginTop: 96, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '8px 24px',
                paddingBottom: 16,
                borderBottom: '1px solid #EEF0F4',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h2 style={{ margin: 0, fontSize: 'clamp(24px,2.4vw,30px)', lineHeight: 1.15, letterSpacing: '-0.03em', fontWeight: 800 }}>
                  AI and Language
                </h2>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: '#6B7280', maxWidth: 620 }}>
                  Bring the models you trust into Trevio for answers, translation and voice.
                </p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280' }}>5 integrations</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 16 }}>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#10A37F',
                  }}
                >
                  AI
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>OpenAI</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>GPT models for agents and copilot replies</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#C96442',
                  }}
                >
                  C
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Anthropic Claude</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Reasoning-grade answers on your knowledge</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#4285F4',
                  }}
                >
                  G
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Google Gemini</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Multimodal understanding for chats and media</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#0F2B46',
                  }}
                >
                  D
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>DeepL</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>High-quality Arabic ⇄ English translation</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#0078D4',
                  }}
                >
                  Az
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Azure AI Speech</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Transcripts and summaries for calls</span>
                </div>
              </div>
            </div>
          </div>
          <div id="crm" style={{ scrollMarginTop: 96, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '8px 24px',
                paddingBottom: 16,
                borderBottom: '1px solid #EEF0F4',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h2 style={{ margin: 0, fontSize: 'clamp(24px,2.4vw,30px)', lineHeight: 1.15, letterSpacing: '-0.03em', fontWeight: 800 }}>
                  CRM and ERP via Mini Apps
                </h2>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: '#6B7280', maxWidth: 620 }}>
                  Open customer records, deals and invoices as Mini Apps right beside every conversation — synced both ways.
                </p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280' }}>5 integrations</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 16 }}>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#00A1E0',
                  }}
                >
                  Sf
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Salesforce</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Two-way contact, lead and case sync</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#FF7A59',
                  }}
                >
                  H
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>HubSpot</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Deals, timelines and lifecycle stages</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#E42527',
                  }}
                >
                  Z
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Zoho CRM</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Leads, contacts and activity logging</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#714B67',
                  }}
                >
                  O
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Odoo</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Customers, sales orders and invoices</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#002050',
                  }}
                >
                  D
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Dynamics 365</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Enterprise CRM records and service cases</span>
                </div>
              </div>
            </div>
          </div>
          <div id="payments" style={{ scrollMarginTop: 96, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '8px 24px',
                paddingBottom: 16,
                borderBottom: '1px solid #EEF0F4',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h2 style={{ margin: 0, fontSize: 'clamp(24px,2.4vw,30px)', lineHeight: 1.15, letterSpacing: '-0.03em', fontWeight: 800 }}>
                  Payment Gateways
                </h2>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: '#6B7280', maxWidth: 620 }}>
                  Send secure payment links in chat and confirm the moment a customer pays.
                </p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280' }}>5 integrations</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 16 }}>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#1A1A2E',
                  }}
                >
                  T
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Tap Payments</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Local cards, Apple Pay and KNET across the GCC</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#635BFF',
                  }}
                >
                  S
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Stripe</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Global payment links and subscriptions</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#1A1A2E',
                  }}
                >
                  C
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Checkout.com</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Enterprise-grade card processing</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#0E4C92',
                  }}
                >
                  PT
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>PayTabs</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Regional payments with fast settlement</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#003087',
                  }}
                >
                  P
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>PayPal</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Trusted checkout for international buyers</span>
                </div>
              </div>
            </div>
          </div>
          <div id="channels" style={{ scrollMarginTop: 96, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '8px 24px',
                paddingBottom: 16,
                borderBottom: '1px solid #EEF0F4',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h2 style={{ margin: 0, fontSize: 'clamp(24px,2.4vw,30px)', lineHeight: 1.15, letterSpacing: '-0.03em', fontWeight: 800 }}>
                  Channels
                </h2>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: '#6B7280', maxWidth: 620 }}>
                  Connect your official business accounts in minutes — every message lands in one shared inbox.
                </p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280' }}>5 integrations</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 16 }}>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#25D366',
                  }}
                >
                  W
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>WhatsApp Business API</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>
                    Official Meta partner access with green-tick support
                  </span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#DD2A7B',
                  }}
                >
                  IG
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Instagram</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>DMs, story replies and comment-to-DM flows</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#1877F2',
                  }}
                >
                  f
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Facebook Messenger</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Page conversations and click-to-Messenger ads</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#111111',
                  }}
                >
                  TT
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>TikTok</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Business messaging from TikTok profiles and ads</span>
                </div>
              </div>
              <div
                className="hv-card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #ECEDF2',
                  boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 28px -22px rgba(26,26,46,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .25s ease',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F8F9FB',
                    border: '1px solid #EEF0F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#8378FF',
                  }}
                >
                  WC
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>Web Chat Widget</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B7280' }}>Branded, lightweight chat for your website</span>
                </div>
              </div>
            </div>
            <section
              style={{ padding: 'clamp(72px,9vw,112px) 0 0', background: '#FFFFFF', height: 284, alignSelf: 'auto', position: 'static' }}
            >
              <div
                style={{
                  maxWidth: 820,
                  margin: '0 auto',
                  padding: '0 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 28,
                  width: 829,
                  height: 284,
                  position: 'static',
                  paddingLeft: 24,
                  paddingRight: 24,
                }}
              >
                <span style={{ width: 2, height: 56, background: 'linear-gradient(180deg,rgba(131,120,255,0),#8378FF)' }}></span>
                <p
                  style={{
                    margin: 0,
                    fontSize: 'clamp(24px,2.8vw,34px)',
                    lineHeight: 1.35,
                    letterSpacing: '-0.02em',
                    fontWeight: 700,
                    color: '#1A1A2E',
                    textWrap: 'balance',
                  }}
                >
                  {'Everything above connects through the Trevio API. '}
                  <span
                    style={{
                      background: 'linear-gradient(90deg,#5B247A,#8378FF 55%,#1BCECF)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    Here’s what developers need to know.
                  </span>
                </p>
                <span style={{ width: 2, height: 72, background: 'linear-gradient(180deg,#8378FF,#1BCECF)' }}></span>
              </div>
            </section>
          </div>
        </div>
      </section>
      <section
        id="developers"
        style={{
          scrollMarginTop: 72,
          padding: 'clamp(80px,10vw,128px) 0',
          background: 'radial-gradient(700px 420px at 100% 0%,rgba(131,120,255,0.20),transparent 65%),#1A1A2E',
          color: '#fff',
        }}
      >
        <div
          className="int-split"
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gap: 'clamp(40px,6vw,80px)',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 500, minWidth: 0 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: 'linear-gradient(90deg,#5ED6F7,#1BCECF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Developer Portal · Quick start
            </span>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(32px,4vw,50px)',
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                fontWeight: 800,
                color: '#fff',
                textWrap: 'balance',
              }}
            >
              Your first message in under five minutes.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span
                  style={{
                    flex: 'none',
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    background: 'rgba(27,206,207,0.16)',
                    border: '1px solid rgba(27,206,207,0.4)',
                    color: '#7EE7E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  1
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>Create an API key</span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.55, color: '#B4B8CC' }}>
                    Generate a key in your workspace under Settings → API.
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span
                  style={{
                    flex: 'none',
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    background: 'rgba(27,206,207,0.16)',
                    border: '1px solid rgba(27,206,207,0.4)',
                    color: '#7EE7E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  2
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>Copy the request</span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.55, color: '#B4B8CC' }}>Replace YOUR_API_KEY and the recipient number.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span
                  style={{
                    flex: 'none',
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    background: 'rgba(27,206,207,0.16)',
                    border: '1px solid rgba(27,206,207,0.4)',
                    color: '#7EE7E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  3
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>Send it</span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.55, color: '#B4B8CC' }}>
                    The message appears in WhatsApp — and in your Trevio inbox.
                  </span>
                </div>
              </div>
            </div>
            <a
              className="hv-teal-btn"
              href="https://dev.wa-api.cloud"
              style={{
                alignSelf: 'flex-start',
                whiteSpace: 'nowrap',
                height: 52,
                padding: '0 24px',
                borderRadius: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 16,
                fontWeight: 800,
                color: '#0D1117',
                background: '#1BCECF',
                boxShadow: '0 14px 30px -12px rgba(27,206,207,0.6)',
              }}
            >
              Manage API keys
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
              </svg>
            </a>
          </div>
          <div
            style={{
              minWidth: 0,
              borderRadius: 16,
              background: '#0D1117',
              boxShadow: '0 30px 60px -30px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: 46,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                padding: '0 10px 0 16px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'rgba(27,206,207,0.15)',
                    font: '700 11px ui-monospace,Menlo,monospace',
                    color: '#1BCECF',
                  }}
                >
                  POST
                </span>
                <span style={{ font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace', color: '#9AA1B5' }}>/v1/messages</span>
              </div>
              <button
                type="button"
                onClick={onCopy}
                style={{
                  height: 30,
                  padding: '0 12px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#E6E8F0',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                {copyLabel}
              </button>
            </div>
            <div
              style={{
                padding: '20px 22px',
                fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace',
                fontSize: 13.5,
                lineHeight: 1.85,
                color: '#C9D1E3',
                overflow: 'auto',
                whiteSpace: 'pre',
              }}
            >
              <div>
                <span style={{ color: '#5ED6F7' }}>curl</span>
                {' -X POST https://api.wa-api.cloud/v1/messages \\'}
              </div>
              <div>
                {'  -H '}
                <span style={{ color: '#7EE7E8' }}>{'"Authorization: Bearer '}</span>
                <span style={{ color: '#FFB86B' }}>YOUR_API_KEY</span>
                <span style={{ color: '#7EE7E8' }}>"</span>
                {' \\'}
              </div>
              <div>
                {'  -H '}
                <span style={{ color: '#7EE7E8' }}>"Content-Type: application/json"</span>
                {' \\'}
              </div>
              <div>
                {'  -d '}
                <span style={{ color: '#7EE7E8' }}>{"'{"}</span>
              </div>
              <div>
                {'    '}
                <span style={{ color: '#A9A2FF' }}>"channel"</span>
                {': '}
                <span style={{ color: '#7EE7E8' }}>"whatsapp"</span>,
              </div>
              <div>
                {'    '}
                <span style={{ color: '#A9A2FF' }}>"to"</span>
                {': '}
                <span style={{ color: '#7EE7E8' }}>"+97450000000"</span>,
              </div>
              <div>
                {'    '}
                <span style={{ color: '#A9A2FF' }}>"type"</span>
                {': '}
                <span style={{ color: '#7EE7E8' }}>"text"</span>,
              </div>
              <div>
                {'    '}
                <span style={{ color: '#A9A2FF' }}>"text"</span>
                {': '}
                <span style={{ color: '#7EE7E8' }}>"Hello from Trevio 👋"</span>
              </div>
              <div>
                {'  '}
                <span style={{ color: '#7EE7E8' }}>{"}'"}</span>
              </div>
            </div>
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.07)',
                padding: '12px 22px',
                font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace',
                color: '#9AA1B5',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ color: '#1BCECF', fontWeight: 700 }}>200 OK</span>
              {'{ "id": "msg_9f2c…", "status": "queued" }'}
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: 'clamp(80px,10vw,128px) 0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 52 }}>
          <div
            style={{
              maxWidth: 680,
              margin: '0 auto',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: 'linear-gradient(90deg,#5B247A,#1BCECF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              API resources
            </span>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(32px,4vw,50px)',
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                fontWeight: 800,
                textWrap: 'balance',
              }}
            >
              {'Full '}
              <span
                style={{
                  background: 'linear-gradient(90deg,#5B247A,#8378FF 55%,#1BCECF)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Programmatic Access.
              </span>
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: '#6B7280' }}>
              Every feature in the Trevio app is available through a consistent, versioned REST API.
            </p>
          </div>
          <div className="int-res" style={{ display: 'grid', gap: 18 }}>
            <div
              className="hv-card"
              style={{
                padding: 24,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'all .25s ease',
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px -8px rgba(131,120,255,0.7)',
                }}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                </svg>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Messages</span>
                <span style={{ font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace', color: '#6B7280' }}>6 operations</span>
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6B7280' }}>Send text, media, templates and interactive messages.</span>
            </div>
            <div
              className="hv-card"
              style={{
                padding: 24,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'all .25s ease',
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px -8px rgba(131,120,255,0.7)',
                }}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5"></path>
                </svg>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Templates</span>
                <span style={{ font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace', color: '#6B7280' }}>5 operations</span>
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6B7280' }}>Create, submit and track WhatsApp template approvals.</span>
            </div>
            <div
              className="hv-card"
              style={{
                padding: 24,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'all .25s ease',
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px -8px rgba(131,120,255,0.7)',
                }}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6"></path>
                </svg>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Contacts</span>
                <span style={{ font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace', color: '#6B7280' }}>7 operations</span>
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6B7280' }}>Create, update, tag and merge customer profiles.</span>
            </div>
            <div
              className="hv-card"
              style={{
                padding: 24,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'all .25s ease',
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px -8px rgba(131,120,255,0.7)',
                }}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                </svg>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Conversations</span>
                <span style={{ font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace', color: '#6B7280' }}>6 operations</span>
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6B7280' }}>List, assign, label and close inbox threads.</span>
            </div>
            <div
              className="hv-card"
              style={{
                padding: 24,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'all .25s ease',
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px -8px rgba(131,120,255,0.7)',
                }}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                </svg>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Broadcasts</span>
                <span style={{ font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace', color: '#6B7280' }}>5 operations</span>
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6B7280' }}>Schedule campaigns to segments and read results.</span>
            </div>
            <div
              className="hv-card"
              style={{
                padding: 24,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'all .25s ease',
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px -8px rgba(131,120,255,0.7)',
                }}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 8V4H8M4 8h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zM2 14h2M20 14h2M15 13v2M9 13v2"></path>
                </svg>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Chatbots</span>
                <span style={{ font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace', color: '#6B7280' }}>4 operations</span>
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6B7280' }}>Trigger flows and pass variables into bot sessions.</span>
            </div>
            <div
              className="hv-card"
              style={{
                padding: 24,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'all .25s ease',
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px -8px rgba(131,120,255,0.7)',
                }}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.13 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0z"></path>
                </svg>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>AI Agents</span>
                <span style={{ font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace', color: '#6B7280' }}>4 operations</span>
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6B7280' }}>Configure knowledge sources and query agent runs.</span>
            </div>
            <div
              className="hv-card"
              style={{
                padding: 24,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'all .25s ease',
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px -8px rgba(131,120,255,0.7)',
                }}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10M3 15l5-5 4 4M16 19h6M19 16v6"></path>
                </svg>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Media</span>
                <span style={{ font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace', color: '#6B7280' }}>3 operations</span>
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6B7280' }}>Upload and retrieve images, documents and audio.</span>
            </div>
            <div
              className="hv-card"
              style={{
                padding: 24,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'all .25s ease',
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px -8px rgba(131,120,255,0.7)',
                }}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Catalog</span>
                <span style={{ font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace', color: '#6B7280' }}>5 operations</span>
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6B7280' }}>Sync products and send catalogue messages.</span>
            </div>
            <div
              className="hv-card"
              style={{
                padding: 24,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'all .25s ease',
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px -8px rgba(131,120,255,0.7)',
                }}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM20 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Orders</span>
                <span style={{ font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace', color: '#6B7280' }}>4 operations</span>
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6B7280' }}>Create carts, payment links and order updates.</span>
            </div>
            <div
              className="hv-card"
              style={{
                padding: 24,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'all .25s ease',
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px -8px rgba(131,120,255,0.7)',
                }}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2M6 17l3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06M12 6l3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8"></path>
                </svg>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Webhooks</span>
                <span style={{ font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace', color: '#6B7280' }}>4 operations</span>
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6B7280' }}>Subscribe endpoints to real-time platform events.</span>
            </div>
            <div
              className="hv-card"
              style={{
                padding: 24,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'all .25s ease',
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px -8px rgba(131,120,255,0.7)',
                }}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v18h18M18 17V9M13 17V5M8 17v-3"></path>
                </svg>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Analytics</span>
                <span style={{ font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace', color: '#6B7280' }}>3 operations</span>
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6B7280' }}>Export response times, CSAT and campaign metrics.</span>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: '0 0 clamp(80px,10vw,128px)', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 44 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 560 }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(90deg,#5B247A,#1BCECF)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Recipes
              </span>
              <h2
                style={{
                  margin: 0,
                  fontSize: 'clamp(28px,3.4vw,42px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.035em',
                  fontWeight: 800,
                  textWrap: 'balance',
                }}
              >
                Start from a working example.
              </h2>
            </div>
            <a
              className="hv-violet"
              href="https://dev.wa-api.cloud"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 15,
                fontWeight: 700,
                color: '#5B247A',
                whiteSpace: 'nowrap',
              }}
            >
              All recipes
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          <div className="int-recipes" style={{ display: 'grid', gap: 20 }}>
            <div
              style={{
                padding: 28,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 14px 30px -24px rgba(26,26,46,0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <span
                style={{
                  alignSelf: 'flex-start',
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg,#5B247A,#8378FF 60%,#5ED6F7)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 15,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                01
              </span>
              <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.3 }}>
                Send an order confirmation on WhatsApp
              </span>
              <span style={{ fontSize: 15, lineHeight: 1.65, color: '#6B7280' }}>
                Trigger an approved template from your store the moment an order is paid.
              </span>
              <a
                className="hv-teal"
                href="https://dev.wa-api.cloud"
                style={{
                  marginTop: 'auto',
                  alignSelf: 'flex-start',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#0B8F90',
                }}
              >
                View Recipe
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div
              style={{
                padding: 28,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 14px 30px -24px rgba(26,26,46,0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <span
                style={{
                  alignSelf: 'flex-start',
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg,#5B247A,#8378FF 60%,#5ED6F7)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 15,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                02
              </span>
              <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.3 }}>
                Hand off from AI Agent to a human
              </span>
              <span style={{ fontSize: 15, lineHeight: 1.65, color: '#6B7280' }}>
                Escalate a bot conversation with full context when confidence drops.
              </span>
              <a
                className="hv-teal"
                href="https://dev.wa-api.cloud"
                style={{
                  marginTop: 'auto',
                  alignSelf: 'flex-start',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#0B8F90',
                }}
              >
                View Recipe
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div
              style={{
                padding: 28,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 14px 30px -24px rgba(26,26,46,0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <span
                style={{
                  alignSelf: 'flex-start',
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg,#5B247A,#8378FF 60%,#5ED6F7)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 15,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                03
              </span>
              <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.3 }}>
                Sync new contacts to your CRM
              </span>
              <span style={{ fontSize: 15, lineHeight: 1.65, color: '#6B7280' }}>
                Listen for contact.created and upsert the record in HubSpot or Salesforce.
              </span>
              <a
                className="hv-teal"
                href="https://dev.wa-api.cloud"
                style={{
                  marginTop: 'auto',
                  alignSelf: 'flex-start',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#0B8F90',
                }}
              >
                View Recipe
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div
              style={{
                padding: 28,
                borderRadius: 16,
                border: '1px solid #ECEDF2',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 14px 30px -24px rgba(26,26,46,0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <span
                style={{
                  alignSelf: 'flex-start',
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg,#5B247A,#8378FF 60%,#5ED6F7)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 15,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                04
              </span>
              <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.3 }}>Recover abandoned carts</span>
              <span style={{ fontSize: 15, lineHeight: 1.65, color: '#6B7280' }}>
                Combine Catalog, Orders and Broadcasts to win back incomplete checkouts.
              </span>
              <a
                className="hv-teal"
                href="https://dev.wa-api.cloud"
                style={{
                  marginTop: 'auto',
                  alignSelf: 'flex-start',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#0B8F90',
                }}
              >
                View Recipe
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          padding: 'clamp(80px,10vw,128px) 0',
          background:
            'radial-gradient(600px 380px at 100% 0%,rgba(94,214,247,0.16),transparent 70%),linear-gradient(120deg,#F6F4FF,#F0FAFD)',
          borderTop: '1px solid #EEF0F4',
        }}
      >
        <div
          className="int-split"
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gap: 'clamp(40px,6vw,88px)',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 500, minWidth: 0 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: 'linear-gradient(90deg,#5B247A,#1BCECF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Webhooks
            </span>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(30px,3.6vw,46px)',
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                fontWeight: 800,
                textWrap: 'balance',
              }}
            >
              React the moment anything happens.
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
              Subscribe your endpoint to the events you care about. Trevio delivers signed JSON payloads in real time, with automatic
              retries.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15.5, lineHeight: 1.5 }}>
              <span style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <svg
                  style={{ flex: 'none', marginTop: 3 }}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1BCECF"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                40+ events across inbox, campaigns and commerce
              </span>
              <span style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <svg
                  style={{ flex: 'none', marginTop: 3 }}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1BCECF"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                HMAC-signed payloads and retries with backoff
              </span>
              <span style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <svg
                  style={{ flex: 'none', marginTop: 3 }}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1BCECF"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                Delivery logs and one-click replay
              </span>
            </div>
            <a
              className="hv-bright"
              href="https://dev.wa-api.cloud"
              style={{
                alignSelf: 'flex-start',
                whiteSpace: 'nowrap',
                height: 52,
                padding: '0 24px',
                borderRadius: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 16,
                fontWeight: 700,
                color: '#fff',
                background: 'linear-gradient(100deg,#5B247A,#8378FF 70%,#5ED6F7 140%)',
                boxShadow: '0 14px 30px -12px rgba(91,36,122,0.7)',
              }}
            >
              Webhook reference
            </a>
          </div>
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <span
              style={{
                display: 'block',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#6B7280',
                marginBottom: 12,
              }}
            >
              Trevio events
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 10 }}>
              <span
                style={{
                  height: 44,
                  borderRadius: 12,
                  background: '#fff',
                  boxShadow: '0 8px 20px -14px rgba(26,26,46,0.35),0 0 0 1px #ECEDF2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '0 10px',
                  font: '600 12.5px ui-monospace,SFMono-Regular,Menlo,monospace',
                  color: '#1A1A2E',
                  minWidth: 0,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                <span
                  style={{ flex: 'none', width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#5ED6F7,#8378FF)' }}
                ></span>
                message.received
              </span>
              <span
                style={{
                  height: 44,
                  borderRadius: 12,
                  background: '#fff',
                  boxShadow: '0 8px 20px -14px rgba(26,26,46,0.35),0 0 0 1px #ECEDF2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '0 10px',
                  font: '600 12.5px ui-monospace,SFMono-Regular,Menlo,monospace',
                  color: '#1A1A2E',
                  minWidth: 0,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                <span
                  style={{ flex: 'none', width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#5ED6F7,#8378FF)' }}
                ></span>
                message.status
              </span>
              <span
                style={{
                  height: 44,
                  borderRadius: 12,
                  background: '#fff',
                  boxShadow: '0 8px 20px -14px rgba(26,26,46,0.35),0 0 0 1px #ECEDF2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '0 10px',
                  font: '600 12.5px ui-monospace,SFMono-Regular,Menlo,monospace',
                  color: '#1A1A2E',
                  minWidth: 0,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                <span
                  style={{ flex: 'none', width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#5ED6F7,#8378FF)' }}
                ></span>
                conversation.assigned
              </span>
              <span
                style={{
                  height: 44,
                  borderRadius: 12,
                  background: '#fff',
                  boxShadow: '0 8px 20px -14px rgba(26,26,46,0.35),0 0 0 1px #ECEDF2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '0 10px',
                  font: '600 12.5px ui-monospace,SFMono-Regular,Menlo,monospace',
                  color: '#1A1A2E',
                  minWidth: 0,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                <span
                  style={{ flex: 'none', width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#5ED6F7,#8378FF)' }}
                ></span>
                order.created
              </span>
            </div>
            <svg
              viewBox="0 0 100 60"
              preserveAspectRatio="none"
              style={{ width: '100%', height: 64, display: 'block', overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="whG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#5ED6F7"></stop>
                  <stop offset="1" stopColor="#8378FF"></stop>
                </linearGradient>
              </defs>
              <path
                d="M25 0 C25 34 50 26 50 60"
                fill="none"
                stroke="url(#whG)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="5 5"
              ></path>
              <path
                d="M75 0 C75 34 50 26 50 60"
                fill="none"
                stroke="url(#whG)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="5 5"
              ></path>
            </svg>
            <div
              style={{
                borderRadius: 16,
                padding: 1.5,
                background: 'linear-gradient(135deg,#5ED6F7,#8378FF 55%,#5B247A)',
                boxShadow: '0 24px 50px -24px rgba(131,120,255,0.7)',
              }}
            >
              <div
                style={{ borderRadius: 15, background: '#fff', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 800 }}>Your webhook endpoint</span>
                  <span
                    style={{
                      padding: '3px 9px',
                      borderRadius: 999,
                      background: '#E6FAFA',
                      color: '#0B7F80',
                      font: '700 11px ui-monospace,Menlo,monospace',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    200 OK · 84ms
                  </span>
                </div>
                <span
                  style={{
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: '#F8F9FB',
                    font: '500 12.5px ui-monospace,SFMono-Regular,Menlo,monospace',
                    color: '#1A1A2E',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ color: '#0B8F90', fontWeight: 700 }}>POST</span>
                  {' https://api.yourapp.com/hooks/trevio'}
                </span>
                <div
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    background: '#0D1117',
                    font: '500 12px ui-monospace,SFMono-Regular,Menlo,monospace',
                    lineHeight: 1.7,
                    color: '#C9D1E3',
                    overflow: 'auto',
                    whiteSpace: 'pre',
                  }}
                >
                  <div>
                    {'{ '}
                    <span style={{ color: '#A9A2FF' }}>"event"</span>
                    {': '}
                    <span style={{ color: '#7EE7E8' }}>"message.received"</span>,
                  </div>
                  <div>
                    {'  '}
                    <span style={{ color: '#A9A2FF' }}>"channel"</span>
                    {': '}
                    <span style={{ color: '#7EE7E8' }}>"whatsapp"</span>,
                  </div>
                  <div>
                    {'  '}
                    <span style={{ color: '#A9A2FF' }}>"contact"</span>
                    {': '}
                    <span style={{ color: '#7EE7E8' }}>"ct_41a8"</span>
                    {' }'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          padding: 'clamp(80px,10vw,120px) 0',
          background: 'linear-gradient(110deg,#5B247A 0%,#8378FF 55%,#5ED6F7 100%)',
          color: '#fff',
        }}
      >
        <div
          style={{
            maxWidth: 820,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 22,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(40px,5.6vw,72px)',
              lineHeight: 1.02,
              letterSpacing: '-0.045em',
              fontWeight: 800,
              color: '#fff',
            }}
          >
            Ready to Build?
          </h2>
          <p style={{ margin: 0, fontSize: 18.5, lineHeight: 1.6, color: '#fff', maxWidth: 560 }}>
            Get your sandbox key, explore the docs and ship your first integration today.
          </p>
          <a
            className="hv-lift"
            href="https://dev.wa-api.cloud"
            style={{
              marginTop: 8,
              whiteSpace: 'nowrap',
              height: 56,
              padding: '0 30px',
              borderRadius: 12,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 16.5,
              fontWeight: 800,
              color: '#5B247A',
              background: '#fff',
              boxShadow: '0 14px 30px -14px rgba(26,10,46,0.6)',
            }}
          >
            Go to dev.wa-api.cloud
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7M7 7h10v10"></path>
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
