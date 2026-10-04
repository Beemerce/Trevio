'use client';

import Link from 'next/link';
import { SITE } from '@/lib/site';
import { Fragment, useEffect, useState } from 'react';
import './home.css';

const CH: { name: string; bg: string; dot?: string; icon: string }[] = [
  { name: 'WhatsApp', bg: '#25D366', icon: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z' },
  { name: 'Instagram', bg: 'linear-gradient(45deg,#F58529,#DD2A7B 50%,#8134AF)', dot: '#DD2A7B', icon: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01' },
  { name: 'Facebook', bg: '#1877F2', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { name: 'TikTok', bg: '#111111', icon: 'M9 12a4 4 0 1 0 4 4V3a5 5 0 0 0 5 5' },
  { name: 'Web Chat', bg: '#8378FF', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 10h.01M12 10h.01M16 10h.01' }
];

const CONVS = [
  { name: 'Noura Al-Thani', initials: 'NA', ch: 0, dir: 'rtl', intent: 'Order status', msg: 'هل طلبي رقم ٤٨٢١ في الطريق اليوم؟', ai: 'نعم نورة، غادر طلبك مستودع الدوحة ويصل قبل الساعة ٢ ظهرًا.' },
  { name: 'Omar Haddad', initials: 'OH', ch: 1, dir: 'ltr', intent: 'Product question', msg: 'Do you have the linen set in sand?', ai: 'We do! Sand is in stock in every size. Shall I reserve one at The Pearl store?' },
  { name: 'Priya Nair', initials: 'PN', ch: 2, dir: 'ltr', intent: 'Booking change', msg: 'Can I move my appointment to Thursday evening?', ai: 'Of course — Thursday at 6:00 PM is open. Shall I confirm it?' },
  { name: 'Lina Saeed', initials: 'LS', ch: 3, dir: 'ltr', intent: 'Promo', msg: 'Saw your video — is the Eid offer still on?', ai: 'Yes! 20% off until Sunday. Here’s your personal code: EID20.' },
  { name: 'Sara Lindqvist', initials: 'SL', ch: 4, dir: 'ltr', intent: 'Pre-sales', msg: 'How does Arabic support work for agents?', ai: 'Replies can be drafted in Arabic or English to match each customer, with one-click translation.' }
];

const pillars = [
  { name: 'Communicate', tag: 'Inbox · Campaigns · Chat', icon: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z', bullets: ['Shared team inbox across all five channels', 'WhatsApp broadcasts and templates at scale', 'Bilingual replies with instant translation'] },
  { name: 'Automate', tag: 'AI · Flows · Routing', icon: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z', bullets: ['AI agents that resolve routine requests 24/7', 'No-code flows, routing rules and SLAs', 'Smooth hand-off from AI to a human'] },
  { name: 'Integrate', tag: 'CRM · Commerce · API', icon: 'M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z', bullets: ['Shopify, HubSpot, Salesforce, Zoho and more', 'Mini Apps inside every conversation', 'Open REST API, webhooks and MCP'] }
];

const why = [
  { title: 'One unified inbox', desc: 'Every channel and every customer in one shared, real-time workspace.', icon: 'M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z' },
  { title: 'AI built in', desc: 'Agents and copilots that answer, summarise and translate in your brand voice.', icon: 'M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.13 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0z' },
  { title: 'Arabic & English', desc: 'Right-to-left support and Arabic-aware AI, designed for the region.', icon: 'm5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6' },
  { title: 'Campaigns that convert', desc: 'Segmented WhatsApp broadcasts with delivery, read and revenue tracking.', icon: 'm3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6' },
  { title: 'Real-time analytics', desc: 'Response times, CSAT and revenue by channel, agent and campaign.', icon: 'M3 3v18h18M18 17V9M13 17V5M8 17v-3' },
  { title: 'Enterprise security', desc: 'Role-based access, SSO, audit logs and encryption at rest and in transit.', icon: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z' }
];

const industries = [
  { name: 'Retail & E-commerce', icon: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0' },
  { name: 'Hospitality', icon: 'M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9' },
  { name: 'Healthcare', icon: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' },
  { name: 'Real Estate', icon: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10' },
  { name: 'Education', icon: 'M22 10 12 5 2 10l10 5 10-5zM6 12v5c3 3 9 3 12 0v-5' },
  { name: 'Financial Services', icon: 'M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l9 5H3z' },
  { name: 'Automotive', icon: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.6A2 2 0 0 0 13.7 6H8.3a2 2 0 0 0-1.6.8L4 10l-2 .6C1.4 10.8 1 11.5 1 12.2V16c0 .6.4 1 1 1h2M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM9 17h6' },
  { name: 'Government', icon: 'M12 2 2 7h20zM4 10v8M9 10v8M15 10v8M20 10v8M2 22h20M2 18h20' }
];

const TIMES = ['now', '1m', '4m', '9m', '15m'];
const FLOW_PATHS = [0, 1, 2, 3, 4].map((i) => {
  const x = 50 + 100 * i;
  return `M${x} 2 C${x} 42 250 30 250 70`;
});
const DOT_COLORS = ['#25D366', '#DD2A7B', '#1877F2', '#111111', '#8378FF'];

/** Animated connectors for the platform diagram: five channels in on the left, three pillars out on the right. */
function Connector({ side }: { side: 'L' | 'R' }) {
  const ys = side === 'L' ? [6, 28, 50, 72, 94] : [16.7, 50, 83.3];
  const paths = ys.map((y) => (side === 'L' ? `M0 ${y} C50 ${y} 50 50 100 50` : `M0 50 C50 50 50 ${y} 100 ${y}`));
  const id = 'cg' + side;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" stopColor={side === 'L' ? '#5ED6F7' : '#8378FF'} />
          <stop offset="1" stopColor={side === 'L' ? '#8378FF' : '#1BCECF'} />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={`url(#${id})`} strokeWidth={2} vectorEffect="non-scaling-stroke" strokeDasharray="4 5">
          <animate attributeName="stroke-dashoffset" from={18} to={0} dur="1.2s" repeatCount="indefinite" />
        </path>
      ))}
    </svg>
  );
}

export function HomeView() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => s + 1), 2600);
    return () => clearInterval(t);
  }, []);

  const active = step % 5;
  const inbox = [0, 1, 2, 3, 4].map((i) => {
    const c = CONVS[(step - i + 500) % 5];
    const ch = CH[c.ch];
    return { name: c.name, initials: c.initials, preview: c.msg, time: TIMES[i], chColor: ch.dot || ch.bg, bg: i === 0 ? '#F3F1FF' : 'transparent' };
  });
  const c = CONVS[active];
  const cur = { ...c, chName: CH[c.ch].name };
  const heroChannels = CH.map((ch, i) => ({
    ...ch,
    shadow: i === active ? '0 0 0 3px #fff, 0 0 0 5px #8378FF, 0 14px 28px -8px rgba(131,120,255,0.6)' : '0 8px 18px -8px rgba(26,26,46,0.35)',
    tf: i === active ? 'translateY(-4px) scale(1.05)' : 'none',
  }));
  const stripChannels = CH;
  const flowSvg = (
    <svg viewBox="0 0 500 72" width="100%" style={{ display: 'block', overflow: 'visible' }} aria-hidden="true">
      <defs>
        <linearGradient id="flowG" gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={0} y2={72}>
          <stop offset="0" stopColor="#5ED6F7" />
          <stop offset="1" stopColor="#8378FF" />
        </linearGradient>
      </defs>
      {FLOW_PATHS.map((d, i) => (
        <path key={'p' + i} d={d} fill="none" stroke={i === active ? 'url(#flowG)' : '#D9DAEE'} strokeWidth={i === active ? 2.2 : 1.3} strokeDasharray={i === active ? undefined : '3 5'} />
      ))}
      {FLOW_PATHS.map((d, i) => (
        <circle key={'c' + i} r={3.4} fill={DOT_COLORS[i]}>
          <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${(i * 0.48).toFixed(2)}s`} path={d} />
        </circle>
      ))}
      <circle cx={250} cy={70} r={5} fill="#8378FF" />
    </svg>
  );
  const connLeft = <Connector side="L" />;
  const connRight = <Connector side="R" />;

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="hgA" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0" stopColor="#5ED6F7" />
            <stop offset="1" stopColor="#8378FF" />
          </linearGradient>
        </defs>
      </svg>
    <>
      <section
        id="top"
        style={{
          background:
            'radial-gradient(700px 480px at 88% 10%,rgba(94,214,247,0.20),transparent 70%),radial-gradient(620px 460px at 70% 95%,rgba(131,120,255,0.18),transparent 70%),linear-gradient(180deg,#FFFFFF 0%,#F5F7FF 60%,#F1F0FF 100%)',
          padding: 'clamp(48px,7vw,96px) 0 clamp(64px,8vw,104px)',
          position: 'relative',
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,480px),1fr))',
            gap: 'clamp(40px,5vw,72px)',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start' }}>
            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(40px,5.4vw,70px)',
                lineHeight: 1.04,
                letterSpacing: '-0.04em',
                fontWeight: 800,
                color: '#1A1A2E',
                textWrap: 'balance',
              }}
            >
              {'One Platform. Every Conversation. '}
              <span
                style={{
                  background: 'linear-gradient(90deg,#5B247A 0%,#8378FF 50%,#1BCECF 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Every Channel.
              </span>
            </h1>
            <p
              style={{
                margin: 0,
                maxWidth: 540,
                fontSize: 'clamp(17px,1.5vw,19.5px)',
                lineHeight: 1.65,
                color: '#6B7280',
                textWrap: 'pretty',
              }}
            >
              Trevio unifies WhatsApp, Instagram, Facebook, TikTok and web chat in one AI-powered inbox — so your team can answer faster,
              automate the routine and turn conversations into revenue.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a
                className="hv-bright"
                href={SITE.signUpUrl}
                style={{
                  whiteSpace: 'nowrap',
                  height: 54,
                  padding: '0 26px',
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
                Get Started Free
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
              <a
                className="hv-outline-light"
                href="#platform"
                style={{
                  whiteSpace: 'nowrap',
                  height: 54,
                  padding: '0 24px',
                  borderRadius: 12,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#1A1A2E',
                  background: 'rgba(255,255,255,0.7)',
                  border: '1.5px solid #D8D6EE',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"></path>
                </svg>
                See It in Action
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: 8 }}>
              {heroChannels.map((ch, chI) => (
                <Fragment key={chI}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 15,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform .4s ease,box-shadow .4s ease',
                        background: ch.bg,
                        boxShadow: ch.shadow,
                        transform: ch.tf,
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={ch.icon}></path>
                      </svg>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', whiteSpace: 'nowrap' }}>{ch.name}</span>
                  </div>
                </Fragment>
              ))}
            </div>
            <div style={{ padding: '4px 0 2px' }}>{flowSvg}</div>
            <div
              style={{
                background: '#fff',
                borderRadius: 18,
                boxShadow: '0 30px 60px -24px rgba(56,40,140,0.35),0 0 0 1px rgba(131,120,255,0.12)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 16px',
                  borderBottom: '1px solid #F0F1F5',
                  background: '#FBFBFE',
                }}
              >
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E6E3F5' }}></span>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E6E3F5' }}></span>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E6E3F5' }}></span>
                </div>
                <span style={{ fontSize: 12.5, fontWeight: 700 }}>Unified Inbox</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 600, color: '#0E9C9D' }}>
                  <span
                    style={{ width: 7, height: 7, borderRadius: '50%', background: '#1BCECF', boxShadow: '0 0 0 3px rgba(27,206,207,0.2)' }}
                  ></span>
                  Live
                </span>
              </div>
              <div className="home-dash" style={{ display: 'grid', minHeight: 300 }}>
                <div style={{ borderRight: '1px solid #F0F1F5', padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {inbox.map((c, cI) => (
                    <Fragment key={cI}>
                      <div
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'center',
                          padding: '9px 10px',
                          borderRadius: 12,
                          transition: 'background .4s',
                          background: c.bg,
                        }}
                      >
                        <div
                          style={{
                            position: 'relative',
                            flex: 'none',
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg,#EDEBFF,#E3F8FD)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#5B247A',
                          }}
                        >
                          {c.initials}
                          <span
                            style={{
                              position: 'absolute',
                              right: -2,
                              bottom: -2,
                              width: 13,
                              height: 13,
                              borderRadius: '50%',
                              border: '2px solid #fff',
                              background: c.chColor,
                            }}
                          ></span>
                        </div>
                        <div style={{ minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                            <span
                              style={{
                                fontSize: 12.5,
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {c.name}
                            </span>
                            <span style={{ fontSize: 10.5, color: '#9CA3AF', flex: 'none' }}>{c.time}</span>
                          </div>
                          <span
                            style={{ fontSize: 11.5, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            {c.preview}
                          </span>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
                    <div className="home-thread"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '16px 18px',
                        gap: 14,
                        background: 'linear-gradient(180deg,#FFFFFF,#FAFAFF)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 10,
                          paddingBottom: 12,
                          borderBottom: '1px solid #F0F1F5',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontSize: 14, fontWeight: 700 }}>{cur.name}</span>
                          <span style={{ fontSize: 11.5, color: '#6B7280' }}>
                            {'via '}
                            {cur.chName}
                          </span>
                        </div>
                        <span
                          style={{
                            padding: '4px 9px',
                            borderRadius: 999,
                            background: '#F1EFFF',
                            color: '#5B247A',
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          {cur.intent}
                        </span>
                      </div>
                      <div
                        dir={cur.dir}
                        style={{
                          alignSelf: 'flex-start',
                          maxWidth: '86%',
                          padding: '10px 13px',
                          borderRadius: '14px 14px 14px 4px',
                          background: '#F3F4F7',
                          fontSize: 13,
                          lineHeight: 1.5,
                          fontFamily: 'var(--font-ar)',
                        }}
                      >
                        {cur.msg}
                      </div>
                      <div
                        style={{ marginTop: 'auto', borderRadius: 14, padding: 1, background: 'linear-gradient(135deg,#5ED6F7,#8378FF)' }}
                      >
                        <div
                          style={{
                            borderRadius: 13,
                            background: '#fff',
                            padding: '12px 13px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#5B247A' }}>
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="url(#hgA)"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.13 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0z"></path>
                            </svg>
                            Trevio AI · Suggested reply
                          </span>
                          <span dir={cur.dir} style={{ fontSize: 13, lineHeight: 1.5, fontFamily: 'var(--font-ar)' }}>
                            {cur.ai}
                          </span>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <span
                              style={{
                                padding: '6px 12px',
                                borderRadius: 8,
                                background: 'linear-gradient(100deg,#5B247A,#8378FF)',
                                color: '#fff',
                                fontSize: 11.5,
                                fontWeight: 700,
                              }}
                            >
                              Send
                            </span>
                            <span
                              style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #E3E1F5', fontSize: 11.5, fontWeight: 600 }}
                            >
                              Edit
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ background: '#FFFFFF', padding: '44px 0 48px', borderBottom: '1px solid #EEF0F4' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6B7280' }}>
            Now live on
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', rowGap: 16 }}>
            {stripChannels.map((ch, chI) => (
              <Fragment key={chI}>
                <div
                  className="home-strip-item" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px clamp(16px,3vw,36px)' }}
                >
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: ch.bg,
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={ch.icon}></path>
                    </svg>
                  </span>
                  <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>{ch.name}</span>
                </div>
              </Fragment>
            ))}
          </div>
          <p style={{ margin: 0, fontSize: 15, color: '#6B7280', textAlign: 'center' }}>
            Connect your official business accounts in minutes — every message lands in one shared inbox.
          </p>
        </div>
      </section>
      <section id="why" style={{ scrollMarginTop: 72, padding: 'clamp(72px,9vw,120px) 0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 56 }}>
          <div
            style={{
              maxWidth: 720,
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
              Why Trevio
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
              Everything your team needs to win the conversation.
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: '#6B7280', maxWidth: 580 }}>
              Built for serious businesses across the Gulf and beyond — fast to launch, simple to run, ready to scale.
            </p>
          </div>
          <div className="home-why" style={{ display: 'grid', gap: 22 }}>
            {why.map((f, fI) => (
              <Fragment key={fI}>
                <div
                  className="hv-card-lg"
                  style={{
                    padding: 30,
                    borderRadius: 16,
                    border: '1px solid #ECEDF2',
                    background: '#fff',
                    boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 12px 30px -24px rgba(26,26,46,0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    transition: 'all .25s ease',
                  }}
                >
                  <span
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 13,
                      background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 20px -8px rgba(131,120,255,0.7)',
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={f.icon}></path>
                    </svg>
                  </span>
                  <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.015em', marginTop: 4 }}>{f.title}</span>
                  <span style={{ fontSize: 15, lineHeight: 1.65, color: '#6B7280' }}>{f.desc}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <section
        id="platform"
        style={{
          scrollMarginTop: 72,
          padding: 'clamp(72px,9vw,120px) 0',
          background: '#F8F9FB',
          borderTop: '1px solid #EEF0F4',
          borderBottom: '1px solid #EEF0F4',
        }}
      >
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 56 }}>
          <div
            style={{
              maxWidth: 720,
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
              Platform
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
              Every channel in. Everything you need out.
            </h2>
          </div>
              <div className="home-diagram-wide"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1fr) 110px minmax(0,1.15fr) 110px minmax(0,1fr)',
                  alignItems: 'stretch',
                  minHeight: 420,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '6px 0' }}>
                  {stripChannels.map((ch, chI) => (
                    <Fragment key={chI}>
                      <div
                        style={{
                          height: 58,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '0 14px',
                          borderRadius: 14,
                          background: '#fff',
                          boxShadow: '0 8px 22px -16px rgba(26,26,46,0.3),0 0 0 1px #ECEDF2',
                        }}
                      >
                        <span
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: ch.bg,
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d={ch.icon}></path>
                          </svg>
                        </span>
                        <span style={{ fontSize: 15, fontWeight: 700 }}>{ch.name}</span>
                      </div>
                    </Fragment>
                  ))}
                </div>
                <div style={{ position: 'relative' }}>{connLeft}</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '100%',
                      borderRadius: 20,
                      padding: 2,
                      background: 'linear-gradient(135deg,#5ED6F7,#8378FF 55%,#5B247A)',
                      boxShadow: '0 30px 60px -28px rgba(131,120,255,0.7)',
                    }}
                  >
                    <div style={{ borderRadius: 18, background: '#fff', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg
                            width="22"
                            height="22"
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>Trevio Inbox</span>
                          <span style={{ fontSize: 13, color: '#6B7280' }}>AI-powered · Shared · Real-time</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ height: 10, borderRadius: 6, background: '#F1F2F6', width: '100%' }}></div>
                        <div style={{ height: 10, borderRadius: 6, background: '#F1F2F6', width: '78%' }}></div>
                        <div
                          style={{
                            height: 10,
                            borderRadius: 6,
                            background: 'linear-gradient(90deg,rgba(94,214,247,0.45),rgba(131,120,255,0.45))',
                            width: '62%',
                          }}
                        ></div>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: 999,
                            background: '#F4F2FF',
                            color: '#5B247A',
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          AI replies
                        </span>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: 999,
                            background: '#F4F2FF',
                            color: '#5B247A',
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          Routing
                        </span>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: 999,
                            background: '#E6FAFA',
                            color: '#0B7F80',
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          Contacts
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ position: 'relative' }}>{connRight}</div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 16 }}>
                  {pillars.map((p, pI) => (
                    <Fragment key={pI}>
                      <div
                        style={{
                          padding: 18,
                          borderRadius: 16,
                          background: '#fff',
                          boxShadow: '0 10px 26px -18px rgba(26,26,46,0.35),0 0 0 1px #ECEDF2',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                        }}
                      >
                        <span
                          style={{
                            flex: 'none',
                            width: 40,
                            height: 40,
                            borderRadius: 11,
                            background: 'linear-gradient(135deg,#5B247A,#1BCECF)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d={p.icon}></path>
                          </svg>
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                          <span style={{ fontSize: 16, fontWeight: 800 }}>{p.name}</span>
                          <span
                            style={{ fontSize: 12.5, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            {p.tag}
                          </span>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
              <div className="home-diagram-stacked" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: 8, width: '100%', maxWidth: 420 }}>
                  {stripChannels.map((ch, chI) => (
                    <Fragment key={chI}>
                      <span
                        style={{
                          justifySelf: 'center',
                          width: 46,
                          height: 46,
                          borderRadius: 13,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: ch.bg,
                        }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={ch.icon}></path>
                        </svg>
                      </span>
                    </Fragment>
                  ))}
                </div>
                <div style={{ width: 2, height: 36, background: 'linear-gradient(#5ED6F7,#8378FF)' }}></div>
                <div
                  style={{
                    width: '100%',
                    maxWidth: 420,
                    borderRadius: 18,
                    padding: 2,
                    background: 'linear-gradient(135deg,#5ED6F7,#8378FF 55%,#5B247A)',
                  }}
                >
                  <div style={{ borderRadius: 16, background: '#fff', padding: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ fontSize: 17, fontWeight: 800 }}>Trevio Inbox</span>
                      <span style={{ fontSize: 12.5, color: '#6B7280' }}>AI-powered · Shared · Real-time</span>
                    </div>
                  </div>
                </div>
                <div style={{ width: 2, height: 36, background: 'linear-gradient(#8378FF,#1BCECF)' }}></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 8, width: '100%', maxWidth: 420 }}>
                  {pillars.map((p, pI) => (
                    <Fragment key={pI}>
                      <div
                        style={{
                          padding: '14px 8px',
                          borderRadius: 14,
                          background: '#fff',
                          boxShadow: '0 0 0 1px #ECEDF2',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: 'linear-gradient(135deg,#5B247A,#1BCECF)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d={p.icon}></path>
                          </svg>
                        </span>
                        <span style={{ fontSize: 13.5, fontWeight: 800 }}>{p.name}</span>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
              gap: '20px 40px',
              paddingTop: 8,
            }}
          >
            {pillars.map((p, pI) => (
              <Fragment key={pI}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.015em' }}>{p.name}</span>
                  {p.bullets.map((b, bI) => (
                    <Fragment key={bI}>
                      <span
                        style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.55, color: '#4B5163' }}
                      >
                        <svg
                          style={{ flex: 'none', marginTop: 2 }}
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#1BCECF"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        {b}
                      </span>
                    </Fragment>
                  ))}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <section
        id="ai"
        style={{
          scrollMarginTop: 72,
          padding: 'clamp(80px,10vw,136px) 0',
          background: 'radial-gradient(800px 480px at 50% 0%,rgba(131,120,255,0.22),transparent 65%),#0D1117',
          color: '#fff',
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 52,
          }}
        >
          <div style={{ maxWidth: 780, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <span
              style={{
                padding: '6px 12px',
                borderRadius: 999,
                background: 'rgba(131,120,255,0.14)',
                border: '1px solid rgba(131,120,255,0.35)',
                fontSize: 13,
                fontWeight: 700,
                color: '#CFCBFF',
                whiteSpace: 'nowrap',
              }}
            >
              AI First
            </span>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(34px,4.6vw,60px)',
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                fontWeight: 800,
                textWrap: 'balance',
                background: 'linear-gradient(90deg,#5ED6F7,#8378FF 55%,#C7B8FF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              AI that works the front line with you.
            </h2>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.7, color: '#A6ABC4', maxWidth: 640 }}>
              Trevio AI learns your products, policies and tone of voice. It resolves routine requests on its own, drafts the rest for your
              team, and connects to the tools you already run.
            </p>
          </div>
          <div
            style={{
              width: '100%',
              borderRadius: 22,
              padding: 1.5,
              background: 'linear-gradient(120deg,rgba(94,214,247,0.9),rgba(131,120,255,0.7) 50%,rgba(27,206,207,0.8))',
              boxShadow: '0 0 80px -24px rgba(131,120,255,0.6)',
            }}
          >
            <div
              style={{
                borderRadius: 21,
                background: 'linear-gradient(180deg,#151A2B,#10131D)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
              }}
            >
              <div
                style={{
                  padding: 'clamp(28px,3.5vw,44px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  borderRight: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 13,
                    background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px -8px rgba(94,214,247,0.7)',
                  }}
                >
                  <svg
                    width="23"
                    height="23"
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
                <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.02em' }}>AI Agents</span>
                <span style={{ fontSize: 15.5, lineHeight: 1.65, color: '#A6ABC4' }}>
                  Resolve order tracking, bookings and FAQs end to end — 24/7, in Arabic and English, on every channel.
                </span>
              </div>
              <div
                style={{
                  padding: 'clamp(28px,3.5vw,44px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  borderRight: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 13,
                    background: 'linear-gradient(135deg,#8378FF,#5B247A)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px -8px rgba(131,120,255,0.8)',
                  }}
                >
                  <svg
                    width="23"
                    height="23"
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
                <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.02em' }}>AI Copilot</span>
                <span style={{ fontSize: 15.5, lineHeight: 1.65, color: '#A6ABC4' }}>
                  Suggested replies, thread summaries and one-click translation that keep every agent on-brand and fast.
                </span>
              </div>
              <div style={{ padding: 'clamp(28px,3.5vw,44px)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 13,
                    background: 'linear-gradient(135deg,#1BCECF,#5ED6F7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px -8px rgba(27,206,207,0.7)',
                  }}
                >
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z"></path>
                  </svg>
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.02em' }}>MCP Connector</span>
                  <span
                    style={{
                      padding: '3px 9px',
                      borderRadius: 999,
                      background: 'rgba(27,206,207,0.14)',
                      border: '1px solid rgba(27,206,207,0.45)',
                      color: '#1BCECF',
                      fontSize: 11.5,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                    }}
                  >
                    MCP
                  </span>
                </div>
                <span style={{ fontSize: 15.5, lineHeight: 1.65, color: '#A6ABC4' }}>
                  Plug Trevio into any AI model or internal tool through the Model Context Protocol — your data, your rules.
                </span>
              </div>
            </div>
          </div>
          <Link
            className="hv-dark-glow"
            href="/ai-first"
            style={{
              whiteSpace: 'nowrap',
              height: 54,
              padding: '0 28px',
              borderRadius: 12,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 16,
              fontWeight: 700,
              color: '#fff',
              border: '1.5px solid transparent',
              background: 'linear-gradient(#0D1117,#0D1117) padding-box,linear-gradient(100deg,#5ED6F7,#8378FF,#1BCECF) border-box',
            }}
          >
            Explore Trevio AI
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </section>
      <section style={{ padding: 'clamp(72px,9vw,128px) 0', background: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))',
            gap: 'clamp(40px,6vw,88px)',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 500 }}>
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
                alignSelf: 'flex-start',
              }}
            >
              Mini Apps
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
              Your tools, right inside the conversation.
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
              Mini Apps open beside every chat — so agents can check a customer record, update a deal or book a slot without ever switching
              tabs.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15.5 }}>
              <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <svg
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
                Built-in CRM, orders and booking apps
              </span>
              <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <svg
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
                Two-way sync with your existing systems
              </span>
              <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <svg
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
                Build your own with the Mini Apps SDK
              </span>
            </div>
          </div>
          <div
            style={{
              borderRadius: 24,
              padding: 'clamp(16px,2.6vw,32px)',
              background:
                'radial-gradient(420px 300px at 100% 0%,rgba(94,214,247,0.22),transparent 70%),linear-gradient(135deg,#F6F4FF,#EFFAFD)',
            }}
          >
            <div
              style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 24px 54px -26px rgba(56,40,140,0.4)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #F0F1F5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid #F0F1F5' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg,#EDEBFF,#E3F8FD)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: '#5B247A',
                    }}
                  >
                    FA
                    <span
                      style={{
                        position: 'absolute',
                        right: -2,
                        bottom: -2,
                        width: 13,
                        height: 13,
                        borderRadius: '50%',
                        border: '2px solid #fff',
                        background: '#25D366',
                      }}
                    ></span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>Fahad Al-Kuwari</span>
                    <span style={{ fontSize: 11.5, color: '#6B7280' }}>WhatsApp · online</span>
                  </div>
                </div>
                <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, background: '#FAFAFC' }}>
                  <div
                    style={{
                      alignSelf: 'flex-start',
                      maxWidth: '85%',
                      padding: '10px 12px',
                      borderRadius: '14px 14px 14px 4px',
                      background: '#fff',
                      boxShadow: '0 0 0 1px #EEF0F4',
                      fontSize: 13,
                      lineHeight: 1.5,
                    }}
                  >
                    Hi, I'd like to upgrade our plan to 20 seats.
                  </div>
                  <div
                    style={{
                      alignSelf: 'flex-end',
                      maxWidth: '85%',
                      padding: '10px 12px',
                      borderRadius: '14px 14px 4px 14px',
                      background: 'linear-gradient(100deg,#5B247A,#8378FF)',
                      color: '#fff',
                      fontSize: 13,
                      lineHeight: 1.5,
                    }}
                  >
                    Great — I've opened your account. Updating it now.
                  </div>
                  <div
                    style={{
                      alignSelf: 'flex-start',
                      maxWidth: '85%',
                      padding: '10px 12px',
                      borderRadius: '14px 14px 14px 4px',
                      background: '#fff',
                      boxShadow: '0 0 0 1px #EEF0F4',
                      fontSize: 13,
                      lineHeight: 1.5,
                    }}
                  >
                    Perfect, thank you! 🙏
                  </div>
                </div>
                <div style={{ padding: '12px 14px', borderTop: '1px solid #F0F1F5', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      flex: 1,
                      height: 36,
                      borderRadius: 10,
                      background: '#F4F5F8',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      fontSize: 12.5,
                      color: '#9CA3AF',
                    }}
                  >
                    Type a reply…
                  </span>
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m22 2-7 20-4-9-9-4zM22 2 11 13"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderBottom: '1px solid #F0F1F5',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700 }}>
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        background: 'linear-gradient(135deg,#5B247A,#1BCECF)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"></path>
                      </svg>
                    </span>
                    CRM
                  </span>
                  <span style={{ fontSize: 11, color: '#6B7280' }}>Mini App</span>
                </div>
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 15, fontWeight: 800 }}>Al-Kuwari Trading</span>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>Account owner · Mariam S.</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div
                      style={{
                        padding: '9px 10px',
                        borderRadius: 10,
                        background: '#F8F9FB',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                      }}
                    >
                      <span style={{ fontSize: 10.5, color: '#6B7280' }}>Plan</span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>Growth</span>
                    </div>
                    <div
                      style={{
                        padding: '9px 10px',
                        borderRadius: 10,
                        background: '#F8F9FB',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                      }}
                    >
                      <span style={{ fontSize: 10.5, color: '#6B7280' }}>Seats</span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>12 → 20</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Deal stage
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4 }}>
                      <span style={{ height: 6, borderRadius: 4, background: 'linear-gradient(90deg,#5ED6F7,#8378FF)' }}></span>
                      <span style={{ height: 6, borderRadius: 4, background: 'linear-gradient(90deg,#5ED6F7,#8378FF)' }}></span>
                      <span style={{ height: 6, borderRadius: 4, background: 'linear-gradient(90deg,#5ED6F7,#8378FF)' }}></span>
                      <span style={{ height: 6, borderRadius: 4, background: '#EEF0F4' }}></span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>Negotiation</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Tags
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: 999,
                          background: '#F4F2FF',
                          color: '#5B247A',
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        Upsell
                      </span>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: 999,
                          background: '#E6FAFA',
                          color: '#0B7F80',
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        Key account
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      height: 38,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#fff',
                      background: 'linear-gradient(100deg,#5B247A,#8378FF)',
                    }}
                  >
                    Update deal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="developers"
        style={{
          scrollMarginTop: 72,
          padding: 'clamp(72px,9vw,120px) 0',
          background: 'linear-gradient(120deg,rgba(94,214,247,0.08),rgba(131,120,255,0.10))',
          borderTop: '1px solid #EEF0F4',
          borderBottom: '1px solid #EEF0F4',
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
            Developers
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(30px,3.8vw,48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              fontWeight: 800,
              textWrap: 'balance',
            }}
          >
            Send your first message in minutes.
          </h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: '#6B7280', maxWidth: 580 }}>
            A clean REST API, webhooks and SDKs for the WhatsApp Business Platform and every Trevio channel — documented end to end.
          </p>
          <div
            style={{
              width: '100%',
              textAlign: 'left',
              borderRadius: 16,
              background: '#0D1117',
              boxShadow: '0 30px 60px -30px rgba(13,17,23,0.7),0 0 0 1px rgba(131,120,255,0.2)',
              overflow: 'hidden',
              marginTop: 8,
            }}
          >
            <div
              style={{
                height: 42,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#2A3042' }}></span>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#2A3042' }}></span>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#2A3042' }}></span>
              </div>
              <span style={{ font: '500 12px ui-monospace,SFMono-Regular,Menlo,monospace', color: '#7A8198' }}>send-message.sh</span>
              <span style={{ font: '600 11px ui-monospace,Menlo,monospace', color: '#1BCECF' }}>cURL</span>
            </div>
            <div
              style={{
                padding: '20px 22px',
                fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace',
                fontSize: 13.5,
                lineHeight: 1.8,
                color: '#C9D1E3',
                overflow: 'auto',
                whiteSpace: 'pre',
              }}
            >
              {'\n'}
              <div>
                <span style={{ color: '#5ED6F7' }}>curl</span>
                {' -X POST https://api.wa-api.cloud/v1/messages \\'}
              </div>
              <div>
                {'  -H '}
                <span style={{ color: '#7EE7E8' }}>"Authorization: Bearer $TREVIO_API_KEY"</span>
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
                <span style={{ color: '#7EE7E8' }}>{'    '}</span>
                <span style={{ color: '#A9A2FF' }}>"channel"</span>
                <span style={{ color: '#7EE7E8' }}>: "whatsapp",</span>
              </div>
              <div>
                <span style={{ color: '#7EE7E8' }}>{'    '}</span>
                <span style={{ color: '#A9A2FF' }}>"to"</span>
                <span style={{ color: '#7EE7E8' }}>: "+97450000000",</span>
              </div>
              <div>
                <span style={{ color: '#7EE7E8' }}>{'    '}</span>
                <span style={{ color: '#A9A2FF' }}>"text"</span>
                <span style={{ color: '#7EE7E8' }}>: "Your order is on its way 🚚"</span>
              </div>
              <div>
                <span style={{ color: '#7EE7E8' }}>{"  }'"}</span>
              </div>
            </div>
          </div>
          <a
            className="hv-bright"
            href="https://dev.wa-api.cloud"
            style={{
              marginTop: 8,
              whiteSpace: 'nowrap',
              height: 54,
              padding: '0 26px',
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
            Open Developer Portal
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7M7 7h10v10"></path>
            </svg>
          </a>
          <span style={{ font: '500 13px ui-monospace,Menlo,monospace', color: '#6B7280' }}>dev.wa-api.cloud</span>
        </div>
      </section>
      <section style={{ padding: 'clamp(72px,9vw,120px) 0', background: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 48,
          }}
        >
          <div style={{ maxWidth: 680, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
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
              Industries
            </span>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(30px,3.8vw,48px)',
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                fontWeight: 800,
                textWrap: 'balance',
              }}
            >
              Trusted by teams in every industry.
            </h2>
          </div>
          <div className="home-ind" style={{ width: '100%', display: 'grid', gap: 14 }}>
            {industries.map((ind, indI) => (
              <Fragment key={indI}>
                <div
                  className="hv-pill"
                  style={{
                    height: 64,
                    borderRadius: 999,
                    border: '1px solid #E6E7EE',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    padding: '0 18px',
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#1A1A2E',
                    cursor: 'default',
                    transition: 'all .25s ease',
                  }}
                >
                  <svg
                    style={{ flex: 'none' }}
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={ind.icon}></path>
                  </svg>
                  <span style={{ whiteSpace: 'nowrap' }}>{ind.name}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <section
        style={{
          padding: 'clamp(72px,9vw,112px) 0',
          background: 'linear-gradient(110deg,#5B247A 0%,#8378FF 55%,#5ED6F7 100%)',
          color: '#fff',
        }}
      >
        <div
          style={{
            maxWidth: 900,
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
              fontSize: 'clamp(34px,4.6vw,58px)',
              lineHeight: 1.06,
              letterSpacing: '-0.04em',
              fontWeight: 800,
              color: '#fff',
              textWrap: 'balance',
            }}
          >
            Ready to bring every conversation together?
          </h2>
          <p style={{ margin: 0, fontSize: 18.5, lineHeight: 1.6, color: '#fff', maxWidth: 600 }}>
            Launch in an afternoon. Our Doha team will help you connect channels and train your AI — at no cost.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 8 }}>
            <a
              className="hv-lift"
              href={SITE.signUpUrl}
              style={{
                whiteSpace: 'nowrap',
                height: 54,
                padding: '0 28px',
                borderRadius: 12,
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: 16,
                fontWeight: 800,
                color: '#5B247A',
                background: '#fff',
                boxShadow: '0 14px 30px -14px rgba(26,10,46,0.6)',
              }}
            >
              Get Started Free
            </a>
            <Link
              className="hv-ghost"
              href="/about#contact-form"
              style={{
                whiteSpace: 'nowrap',
                height: 54,
                padding: '0 26px',
                borderRadius: 12,
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: 16,
                fontWeight: 700,
                color: '#fff',
                border: '1.5px solid #fff',
              }}
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </>
    </>
  );
}
