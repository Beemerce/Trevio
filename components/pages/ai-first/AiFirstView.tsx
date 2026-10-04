'use client';

import Link from 'next/link';
import { Fragment, useEffect, useState, type CSSProperties } from 'react';
import '../split.css';
import './ai-first.css';

const MSGS = [
  { who: 'c', text: 'Hi, where is my order #4821?' },
  { who: 'ai', text: 'It left our Doha hub at 9:40 and arrives before 2 PM today. 🚚' },
  { who: 'c', text: 'Great — can I change the delivery address too?' },
  { who: 'ai', text: 'Address changes need a quick check. Connecting you with Mariam from Logistics.' },
  { who: 'sys', text: 'Handed to Mariam · summary and order details shared' },
  { who: 'h', text: 'Hi Noura, I’m Mariam! Send me the new address and I’ll update it right away.' }
];

const PROMPT = 'Build me a chatbot for appointment booking';

const NODES = [
  { kind: 'Trigger', title: 'Customer asks to book', icon: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z', iconBg: '#1BCECF', kindColor: '#0B7F80' },
  { kind: 'Ask', title: 'Which service and date?', icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', iconBg: 'linear-gradient(135deg,#5ED6F7,#8378FF)', kindColor: '#5B247A' },
  { kind: 'Action', title: 'Check calendar & offer slots', icon: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2', iconBg: 'linear-gradient(135deg,#8378FF,#5B247A)', kindColor: '#5B247A' },
  { kind: 'Confirm', title: 'Book & send WhatsApp reminder', icon: 'M20 6 9 17l-5-5', iconBg: '#1BCECF', kindColor: '#0B7F80' }
];

const industries = [
  { name: 'Retail & E-commerce', use: 'AI answers stock and sizing questions and recovers abandoned carts.', icon: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0' },
  { name: 'Hospitality', use: 'Bookings, check-in details and concierge requests handled 24/7.', icon: 'M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9' },
  { name: 'Healthcare', use: 'Appointment scheduling and reminders with secure hand-off to staff.', icon: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' },
  { name: 'Real Estate', use: 'Qualify leads, share listings and book viewings automatically.', icon: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10' },
  { name: 'Education', use: 'Admissions questions, enrolment steps and fee reminders in Arabic and English.', icon: 'M22 10 12 5 2 10l10 5 10-5zM6 12v5c3 3 9 3 12 0v-5' },
  { name: 'Financial Services', use: 'Account FAQs and document collection with strict guardrails.', icon: 'M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l9 5H3z' },
  { name: 'Automotive', use: 'Test-drive bookings, service reminders and parts enquiries.', icon: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.6A2 2 0 0 0 13.7 6H8.3a2 2 0 0 0-1.6.8L4 10l-2 .6C1.4 10.8 1 11.5 1 12.2V16c0 .6.4 1 1 1h2M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM9 17h6' },
  { name: 'Government', use: 'Citizen services and status updates on the channels people use.', icon: 'M12 2 2 7h20zM4 10v8M9 10v8M15 10v8M20 10v8M2 22h20M2 18h20' }
];

const OUT_PATHS = ['M0 94 C45 94 55 50 100 50', 'M0 94 C45 94 55 150 100 150'];
const BACK_PATHS = ['M100 58 C55 58 45 106 0 106', 'M100 158 C55 158 45 106 0 106'];

/** Two-way flow between Trevio (left) and the AI assistants (right) in the MCP diagram. */
function McpFlow() {
  return (
    <svg viewBox="0 0 100 200" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
      <defs>
        <linearGradient id="mcpA" gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={100} y2={0}>
          <stop offset="0" stopColor="#5ED6F7" />
          <stop offset="1" stopColor="#8378FF" />
        </linearGradient>
        <linearGradient id="mcpB" gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={100} y2={0}>
          <stop offset="0" stopColor="#1BCECF" />
          <stop offset="1" stopColor="#8378FF" />
        </linearGradient>
      </defs>
      {OUT_PATHS.map((d, i) => <path key={'a' + i} d={d} fill="none" stroke="url(#mcpA)" strokeWidth={2} vectorEffect="non-scaling-stroke" />)}
      {BACK_PATHS.map((d, i) => <path key={'b' + i} d={d} fill="none" stroke="url(#mcpB)" strokeWidth={2} strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />)}
      {OUT_PATHS.map((d, i) => (
        <circle key={'c' + i} r={3.5} fill="#8378FF">
          <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${i * 0.6}s`} path={d} />
        </circle>
      ))}
      {BACK_PATHS.map((d, i) => (
        <circle key={'d' + i} r={3.5} fill="#1BCECF">
          <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${0.9 + i * 0.6}s`} path={d} />
        </circle>
      ))}
    </svg>
  );
}

export function AiFirstView() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setTick((t) => t + 1), 90);
    return () => clearInterval(iv);
  }, []);

  // AI Agent demo: one message every 18 ticks, hand-off to a human at step 5.
  const step = Math.floor(tick / 18) % 9;
  const agentMsgs = MSGS.map((m, i) => {
    const shown = i < step;
    const base = { text: m.text, op: shown ? 1 : 0, tf: shown ? 'translateY(0)' : 'translateY(8px)', ta: 'left', shadow: 'none' };
    if (m.who === 'c') return { ...base, align: 'flex-start', maxw: '82%', label: 'Customer', labelColor: '#9CA3AF', radius: '14px 14px 14px 4px', bg: '#fff', color: '#1A1A2E', shadow: '0 0 0 1px #EEF0F4' };
    if (m.who === 'ai') return { ...base, align: 'flex-end', maxw: '82%', label: '✦ AI Agent', labelColor: '#5B247A', radius: '14px 14px 4px 14px', bg: 'linear-gradient(100deg,#5B247A,#8378FF)', color: '#fff' };
    if (m.who === 'sys') return { ...base, align: 'center', maxw: '100%', label: '', labelColor: 'transparent', radius: '999px', bg: '#FFF8EC', color: '#7A4A00', shadow: '0 0 0 1px #FBE3B8', ta: 'center' };
    return { ...base, align: 'flex-end', maxw: '82%', label: 'Mariam · Logistics', labelColor: '#0B7F80', radius: '14px 14px 4px 14px', bg: '#E6FAFA', color: '#0B4F50', shadow: '0 0 0 1px #BFF0F0' };
  });
  const human = step >= 5;
  const handlerLabel = human ? 'Human · Mariam' : '✦ AI Agent handling';
  const handlerBg = human ? '#E6FAFA' : '#F1EFFF';
  const handlerColor = human ? '#0B7F80' : '#5B247A';

  // Copilot demo: type the prompt, then reveal the flow nodes one by one.
  const L = PROMPT.length;
  const c = tick % (L + 70);
  const typedN = Math.min(c, L);
  const after = c - L;
  const typed = PROMPT.slice(0, typedN);
  const caretOp = typedN < L || Math.floor(tick / 6) % 2 ? 1 : 0;
  const flowNodes = NODES.map((n, i) => {
    const on = after >= 6 + i * 6;
    return { ...n, hasLine: i > 0, op: on ? 1 : 0, tf: on ? 'translateY(0)' : 'translateY(10px)', ring: i === 1 && on ? 'rgba(131,120,255,0.45)' : '#ECEDF2' };
  });
  const building = after >= 0 && after < 30;
  const built = after >= 30;
  const statusText = built ? '✓ Chatbot drafted · 4 steps — review & publish' : building ? 'Copilot is building your flow…' : 'Describe what you need';
  const statusColor = built ? '#0B7F80' : building ? '#5B247A' : '#9CA3AF';
  const mcpFlow = <McpFlow />;

  return (
    <>
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(96px,12vw,168px) 0 clamp(96px,12vw,160px)',
          background:
            'radial-gradient(800px 460px at 50% 0%,rgba(131,120,255,0.30),transparent 65%),radial-gradient(600px 400px at 85% 100%,rgba(27,206,207,0.18),transparent 65%),radial-gradient(600px 400px at 10% 90%,rgba(94,214,247,0.12),transparent 65%),linear-gradient(180deg,#0D1117 0%,#1A0A2E 100%)',
          color: '#fff',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at 50% 40%,#000 20%,transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%,#000 20%,transparent 70%)',
          }}
        ></div>
        <div
          style={{
            position: 'relative',
            maxWidth: 960,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 26,
          }}
        >
          <span style={{ padding: 1.5, borderRadius: 999, background: 'linear-gradient(90deg,#5ED6F7,#8378FF,#1BCECF)' }}>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 16px',
                borderRadius: 999,
                background: '#140D26',
                fontSize: 13,
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                  boxShadow: '0 0 10px #8378FF',
                }}
              ></span>
              <span
                style={{
                  background: 'linear-gradient(90deg,#5ED6F7,#A9A2FF)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                AI First
              </span>
            </span>
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(42px,6vw,80px)',
              lineHeight: 1.02,
              letterSpacing: '-0.045em',
              fontWeight: 800,
              color: '#fff',
              textWrap: 'balance',
            }}
          >
            {'AI that answers, builds and '}
            <span
              style={{
                background: 'linear-gradient(90deg,#5ED6F7 0%,#8378FF 50%,#1BCECF 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              connects for you.
            </span>
          </h1>
          <p
            style={{ margin: 0, maxWidth: 640, fontSize: 'clamp(17px,1.6vw,20px)', lineHeight: 1.65, color: '#B4B8CC', textWrap: 'pretty' }}
          >
            Trevio is built AI-first — from agents that resolve conversations on their own, to a copilot that builds automations from plain
            English, to open connections with the models you already trust.
          </p>
        </div>
      </section>
      <section style={{ padding: 'clamp(96px,11vw,152px) 0', background: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(104px,12vw,168px)',
          }}
        >
          <div
            id="agent"
            className="split"
            style={{ scrollMarginTop: 96, display: 'grid', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 520, minWidth: 0 }}>
              <span
                style={{
                  alignSelf: 'flex-start',
                  padding: '6px 12px',
                  borderRadius: 999,
                  background: '#E6FAFA',
                  border: '1px solid #BFF0F0',
                  color: '#0B7F80',
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                AI Agent
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
                {'Resolves the routine. '}
                <span
                  style={{
                    background: 'linear-gradient(90deg,#5B247A,#8378FF 55%,#1BCECF)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Knows when to hand off.
                </span>
              </h2>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
                Trevio’s AI Agent answers order, booking and product questions on every channel, 24/7. When a request needs a person, it
                hands over to the right agent with the whole conversation and a summary attached.
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
                  Trained on your knowledge base, catalogue and policies
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
                  Takes real actions — tracking, bookings, refunds
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
                  Guardrails and confidence-based human hand-off
                </span>
              </div>
            </div>
            <div
              style={{
                minWidth: 0,
                borderRadius: 24,
                padding: 'clamp(16px,2.6vw,32px)',
                background:
                  'radial-gradient(420px 300px at 100% 0%,rgba(94,214,247,0.2),transparent 70%),linear-gradient(135deg,#F6F4FF,#EFFAFD)',
              }}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 24px 54px -26px rgba(56,40,140,0.4),0 0 0 1px rgba(131,120,255,0.08)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                    padding: '12px 16px',
                    borderBottom: '1px solid #F0F1F5',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        position: 'relative',
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
                      NA
                      <span
                        style={{
                          position: 'absolute',
                          right: -2,
                          bottom: -2,
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          border: '2px solid #fff',
                          background: '#25D366',
                        }}
                      ></span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 700 }}>Noura Al-Thani</span>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>WhatsApp</span>
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      transition: 'all .4s',
                      background: handlerBg,
                      color: handlerColor,
                    }}
                  >
                    {handlerLabel}
                  </span>
                </div>
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, background: '#FAFAFC', minHeight: 380 }}>
                  {agentMsgs.map((m, mI) => (
                    <Fragment key={mI}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 4,
                          transition: 'opacity .45s ease,transform .45s ease',
                          alignSelf: m.align,
                          maxWidth: m.maxw,
                          opacity: m.op,
                          transform: m.tf,
                        }}
                      >
                        <span style={{ fontSize: 10.5, fontWeight: 700, color: m.labelColor, alignSelf: m.align }}>{m.label}</span>
                        <div
                          style={{
                            padding: '10px 12px',
                            fontSize: 13,
                            lineHeight: 1.5,
                            borderRadius: m.radius,
                            background: m.bg,
                            color: m.color,
                            boxShadow: m.shadow,
                            textAlign: m.ta as CSSProperties['textAlign'],
                          }}
                        >
                          {m.text}
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            id="copilot"
            className="split"
            style={{ scrollMarginTop: 96, display: 'grid', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}
          >
            <div
              className="split-vis-first"
              style={{
                minWidth: 0,
                borderRadius: 24,
                padding: 'clamp(16px,2.6vw,32px)',
                background:
                  'radial-gradient(420px 300px at 0% 100%,rgba(131,120,255,0.2),transparent 70%),linear-gradient(135deg,#EFFAFD,#F6F4FF)',
              }}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 24px 54px -26px rgba(56,40,140,0.4),0 0 0 1px rgba(131,120,255,0.08)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: 16, borderBottom: '1px solid #F0F1F5', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, color: '#5B247A' }}>
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.13 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0z"></path>
                      </svg>
                    </span>
                    Trevio Copilot
                  </span>
                  <div style={{ borderRadius: 12, padding: 1.5, background: 'linear-gradient(135deg,#5ED6F7,#8378FF)' }}>
                    <div
                      style={{
                        borderRadius: 11,
                        background: '#fff',
                        padding: '12px 12px 12px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        minHeight: 52,
                      }}
                    >
                      <span style={{ flex: 1, minWidth: 0, fontSize: 14.5, fontWeight: 500, color: '#1A1A2E', lineHeight: 1.4 }}>
                        {typed}
                        <span
                          style={{
                            display: 'inline-block',
                            width: 2,
                            height: 17,
                            marginLeft: 1,
                            verticalAlign: -3,
                            background: '#8378FF',
                            opacity: caretOp,
                          }}
                        ></span>
                      </span>
                      <span
                        style={{
                          flex: 'none',
                          width: 34,
                          height: 34,
                          borderRadius: 9,
                          background: 'linear-gradient(135deg,#5B247A,#8378FF)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: statusColor }}>{statusText}</span>
                </div>
                <div
                  style={{
                    padding: '20px 18px',
                    backgroundColor: '#FBFBFE',
                    backgroundImage: 'radial-gradient(#DCDDEB 1px,transparent 1px)',
                    backgroundSize: '16px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: 330,
                  }}
                >
                  {flowNodes.map((n, nI) => (
                    <Fragment key={nI}>
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          transition: 'opacity .45s ease,transform .45s ease',
                          opacity: n.op,
                          transform: n.tf,
                        }}
                      >
                        {n.hasLine && (
                          <>
                            <span style={{ width: 2, height: 16, background: 'linear-gradient(#5ED6F7,#8378FF)' }}></span>
                          </>
                        )}
                        <div
                          style={{
                            width: 'min(100%,300px)',
                            padding: '11px 14px',
                            borderRadius: 12,
                            background: '#fff',
                            boxShadow: `0 8px 20px -14px rgba(26,26,46,0.4),0 0 0 1px ${n.ring}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                          }}
                        >
                          <span
                            style={{
                              flex: 'none',
                              width: 28,
                              height: 28,
                              borderRadius: 8,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: n.iconBg,
                            }}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#fff"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d={n.icon}></path>
                            </svg>
                          </span>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                color: n.kindColor,
                              }}
                            >
                              {n.kind}
                            </span>
                            <span style={{ fontSize: 13, fontWeight: 700 }}>{n.title}</span>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 520, minWidth: 0 }}>
              <span
                style={{
                  alignSelf: 'flex-start',
                  padding: '6px 12px',
                  borderRadius: 999,
                  background: '#E6FAFA',
                  border: '1px solid #BFF0F0',
                  color: '#0B7F80',
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                Copilot
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
                {'Describe it in plain English. '}
                <span
                  style={{
                    background: 'linear-gradient(90deg,#5B247A,#8378FF 55%,#1BCECF)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Copilot builds it.
                </span>
              </h2>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
                Ask for a chatbot, a broadcast or a routing rule and Copilot drafts it in seconds, ready for you to review and publish. In
                the inbox, it suggests replies, summarises threads and translates on the spot.
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
                  Build chatbots and flows from a single prompt
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
                  Suggested replies in your brand voice
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
                  Summaries and Arabic ⇄ English translation
                </span>
              </div>
            </div>
          </div>
          <div
            id="mcp"
            className="split"
            style={{ scrollMarginTop: 96, display: 'grid', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 520, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    padding: '6px 12px',
                    borderRadius: 999,
                    background: '#E6FAFA',
                    border: '1px solid #BFF0F0',
                    color: '#0B7F80',
                    fontSize: 12.5,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  MCP Connector
                </span>
                <span
                  style={{
                    padding: '5px 10px',
                    borderRadius: 999,
                    background: '#1BCECF',
                    color: '#0D1117',
                    fontSize: 11.5,
                    fontWeight: 800,
                  }}
                >
                  New
                </span>
              </div>
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
                {'Your inbox, open to '}
                <span
                  style={{
                    background: 'linear-gradient(90deg,#5B247A,#8378FF 55%,#1BCECF)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  the AI you already use.
                </span>
              </h2>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
                Through the Model Context Protocol, assistants like Claude and ChatGPT can securely read conversations, look up contacts and
                send messages through Trevio, and the results flow straight back into your inbox.
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
                  Two-way: AI reads context and takes action
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
                  Scoped permissions and a full audit log
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
                  Works with any MCP-compatible client
                </span>
              </div>
            </div>
            <div
              style={{
                minWidth: 0,
                borderRadius: 24,
                padding: 'clamp(24px,3.4vw,44px) clamp(14px,2.6vw,32px)',
                background:
                  'radial-gradient(420px 300px at 50% 50%,rgba(131,120,255,0.16),transparent 70%),linear-gradient(135deg,#F6F4FF,#EFFAFD)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'clamp(96px,22vw,150px) minmax(60px,1fr) clamp(110px,24vw,150px)',
                  alignItems: 'center',
                  maxWidth: 560,
                  margin: '0 auto',
                }}
              >
                <div
                  style={{
                    justifySelf: 'stretch',
                    width: '100%',
                    aspectRatio: '1',
                    borderRadius: 22,
                    padding: 2,
                    background: 'linear-gradient(135deg,#5ED6F7,#8378FF 55%,#5B247A)',
                    boxShadow: '0 0 0 8px rgba(131,120,255,0.1),0 24px 50px -20px rgba(131,120,255,0.7)',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 20,
                      background: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: 21,
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
                    <span style={{ font: '600 10px ui-monospace,Menlo,monospace', color: '#0B7F80' }}>MCP server</span>
                  </div>
                </div>
                <div style={{ position: 'relative', height: 200 }}>
                  {mcpFlow}
                  <span
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%,-50%)',
                      padding: '4px 9px',
                      borderRadius: 999,
                      background: '#fff',
                      boxShadow: '0 0 0 1px #E3E1F5',
                      font: '700 10.5px ui-monospace,Menlo,monospace',
                      color: '#5B247A',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    MCP
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 56, alignItems: 'stretch' }}>
                  <div
                    style={{
                      width: '100%',
                      padding: '14px 12px',
                      borderRadius: 16,
                      background: '#fff',
                      boxShadow: '0 14px 30px -18px rgba(26,26,46,0.45),0 0 0 1px #ECEDF2',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        flex: 'none',
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        background: '#F7EEE9',
                        color: '#C96442',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: 15,
                      }}
                    >
                      C
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <span style={{ fontSize: 14, fontWeight: 800 }}>Claude</span>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>Anthropic</span>
                    </div>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      padding: '14px 12px',
                      borderRadius: 16,
                      background: '#fff',
                      boxShadow: '0 14px 30px -18px rgba(26,26,46,0.45),0 0 0 1px #ECEDF2',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        flex: 'none',
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        background: '#E7F6F1',
                        color: '#10A37F',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: 13,
                      }}
                    >
                      AI
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <span style={{ fontSize: 14, fontWeight: 800 }}>ChatGPT</span>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>OpenAI</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 22,
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '8px 18px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#6B7280',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 14, height: 2, borderRadius: 2, background: 'linear-gradient(90deg,#5ED6F7,#8378FF)' }}></span>
                  {'Context & data to AI'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 14, height: 2, borderRadius: 2, background: 'linear-gradient(90deg,#8378FF,#1BCECF)' }}></span>
                  Actions back to Trevio
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          padding: 'clamp(80px,10vw,128px) 0',
          background: '#F8F9FB',
          borderTop: '1px solid #EEF0F4',
          borderBottom: '1px solid #EEF0F4',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 52 }}>
          <div
            style={{
              maxWidth: 700,
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
              Use cases
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
              AI that speaks your industry.
            </h2>
          </div>
          <div className="ai-ind" style={{ display: 'grid', gap: 18 }}>
            {industries.map((ind, indI) => (
              <Fragment key={indI}>
                <div
                  style={{
                    padding: 26,
                    borderRadius: 16,
                    background: '#fff',
                    border: '1px solid #ECEDF2',
                    boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 14px 30px -24px rgba(26,26,46,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
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
                      <path d={ind.icon}></path>
                    </svg>
                  </span>
                  <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', marginTop: 4 }}>{ind.name}</span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.6, color: '#6B7280' }}>{ind.use}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
