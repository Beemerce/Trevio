'use client';

import { useState, type FormEvent } from 'react';
import './about.css';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function AboutView() {
  const [status, setStatus] = useState<Status>('idle');
  const sent = status === 'sent';
  const notSent = !sent;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(`Contact request failed: ${res.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };
  const reset = () => setStatus('idle');

  return (
    <>
      <section
        style={{
          padding: 'clamp(80px,10vw,144px) 0 clamp(72px,9vw,120px)',
          background: 'radial-gradient(640px 420px at 100% 0%,rgba(94,214,247,0.12),transparent 70%),#FFFFFF',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 28 }}>
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
            About Trevio
          </span>
          <h1
            style={{
              margin: 0,
              maxWidth: 980,
              fontSize: 'clamp(42px,6vw,80px)',
              lineHeight: 1.03,
              letterSpacing: '-0.045em',
              fontWeight: 800,
              textWrap: 'balance',
            }}
          >
            {'We Built Trevio Because '}
            <span
              style={{
                background: 'linear-gradient(90deg,#5B247A 0%,#8378FF 50%,#1BCECF 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Businesses Deserve Better.
            </span>
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: 720,
              fontSize: 'clamp(17px,1.5vw,19.5px)',
              lineHeight: 1.75,
              color: '#6B7280',
              textWrap: 'pretty',
            }}
          >
            Trevio AI Solutions was founded with a single belief — that intelligent, automated customer communication should be accessible
            to every business. We started by listening to businesses struggling with missed enquiries, slow responses, disconnected
            channels, and support teams buried in repetitive work. Trevio is the answer we built for them.
          </p>
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
        <div
          className="ab-split"
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gap: 'clamp(40px,6vw,96px)',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 540, minWidth: 0 }}>
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
              What we do
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
              A Platform Built for the Way People Actually Communicate
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: '#6B7280', textWrap: 'pretty' }}>
              Customers don’t think in channels — they message on WhatsApp, comment on Instagram, reach out on Facebook and TikTok, and chat
              on your website. Trevio brings all of it into one shared inbox, adds AI that resolves routine requests and assists your team
              on the rest, and automates the workflows in between, so every conversation is answered quickly, consistently and in context.
            </p>
          </div>
          <div
            style={{
              minWidth: 0,
              borderRadius: 24,
              padding: 'clamp(24px,3.4vw,44px)',
              background: '#fff',
              boxShadow: '0 24px 54px -30px rgba(56,40,140,0.35),0 0 0 1px #ECEDF2',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: 8 }}>
              <span
                style={{
                  justifySelf: 'center',
                  width: 52,
                  height: 52,
                  borderRadius: 15,
                  background: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 20px -10px rgba(37,211,102,0.8)',
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
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                </svg>
              </span>
              <span
                style={{
                  justifySelf: 'center',
                  width: 52,
                  height: 52,
                  borderRadius: 15,
                  background: 'linear-gradient(45deg,#F58529,#DD2A7B 50%,#8134AF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 20px -10px rgba(221,42,123,0.8)',
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
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"></path>
                </svg>
              </span>
              <span
                style={{
                  justifySelf: 'center',
                  width: 52,
                  height: 52,
                  borderRadius: 15,
                  background: '#1877F2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 20px -10px rgba(24,119,242,0.8)',
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
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </span>
              <span
                style={{
                  justifySelf: 'center',
                  width: 52,
                  height: 52,
                  borderRadius: 15,
                  background: '#111111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 20px -10px rgba(0,0,0,0.6)',
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
                  <path d="M9 12a4 4 0 1 0 4 4V3a5 5 0 0 0 5 5"></path>
                </svg>
              </span>
              <span
                style={{
                  justifySelf: 'center',
                  width: 52,
                  height: 52,
                  borderRadius: 15,
                  background: '#8378FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 20px -10px rgba(131,120,255,0.8)',
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 10h.01M12 10h.01M16 10h.01"></path>
                </svg>
              </span>
            </div>
            <svg viewBox="0 0 500 90" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 90 }}>
              <defs>
                <linearGradient id="cvG" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="90">
                  <stop offset="0" stopColor="#5ED6F7"></stop>
                  <stop offset="1" stopColor="#8378FF"></stop>
                </linearGradient>
              </defs>
              <path d="M50 4 C50 50 250 40 250 88" fill="none" stroke="url(#cvG)" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
              <path
                d="M150 4 C150 50 250 40 250 88"
                fill="none"
                stroke="url(#cvG)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              ></path>
              <path d="M250 4 L250 88" fill="none" stroke="url(#cvG)" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
              <path
                d="M350 4 C350 50 250 40 250 88"
                fill="none"
                stroke="url(#cvG)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              ></path>
              <path
                d="M450 4 C450 50 250 40 250 88"
                fill="none"
                stroke="url(#cvG)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              ></path>
            </svg>
            <div
              style={{
                borderRadius: 18,
                padding: 2,
                background: 'linear-gradient(135deg,#5ED6F7,#8378FF 55%,#5B247A)',
                boxShadow: '0 24px 50px -24px rgba(131,120,255,0.7)',
              }}
            >
              <div style={{ borderRadius: 16, background: '#fff', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: 18,
                        letterSpacing: '-0.03em',
                        background: 'linear-gradient(90deg,#5B247A,#1BCECF)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      trevio
                    </span>
                    <span style={{ fontSize: 12.5, color: '#6B7280' }}>One platform</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 8 }}>
                  <span
                    style={{
                      padding: '10px 6px',
                      borderRadius: 10,
                      background: '#F4F2FF',
                      textAlign: 'center',
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: '#5B247A',
                    }}
                  >
                    Inbox
                  </span>
                  <span
                    style={{
                      padding: '10px 6px',
                      borderRadius: 10,
                      background: '#F4F2FF',
                      textAlign: 'center',
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: '#5B247A',
                    }}
                  >
                    AI
                  </span>
                  <span
                    style={{
                      padding: '10px 6px',
                      borderRadius: 10,
                      background: '#E6FAFA',
                      textAlign: 'center',
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: '#0B7F80',
                    }}
                  >
                    Automation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          padding: 'clamp(96px,12vw,160px) 0',
          background:
            'radial-gradient(800px 460px at 50% 0%,rgba(131,120,255,0.24),transparent 65%),radial-gradient(600px 380px at 50% 100%,rgba(27,206,207,0.12),transparent 65%),#0D1117',
          color: '#fff',
        }}
      >
        <div
          style={{
            maxWidth: 920,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 28,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(44px,6.4vw,84px)',
              lineHeight: 1,
              letterSpacing: '-0.045em',
              fontWeight: 800,
              color: '#fff',
            }}
          >
            {'Our '}
            <span
              style={{
                background: 'linear-gradient(90deg,#5ED6F7,#8378FF 55%,#1BCECF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Mission
            </span>
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(20px,2.3vw,28px)',
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
              fontWeight: 500,
              color: '#D4D7E5',
              textWrap: 'balance',
            }}
          >
            To make intelligent customer communication accessible to every business — through automation, AI, and the channels customers
            already use every day.
          </p>
        </div>
      </section>
      <section style={{ padding: 'clamp(96px,12vw,160px) 0 clamp(48px,6vw,72px)', background: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 28,
          }}
        >
          <span
            style={{
              fontSize: 96,
              lineHeight: 0.6,
              fontWeight: 800,
              background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              height: 48,
            }}
          >
            “
          </span>
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(28px,3.6vw,46px)',
              lineHeight: 1.25,
              letterSpacing: '-0.03em',
              fontWeight: 800,
              color: '#1A1A2E',
              textWrap: 'balance',
            }}
          >
            {'Behind every deployment is '}
            <span
              style={{
                background: 'linear-gradient(90deg,#5B247A,#8378FF 55%,#1BCECF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              a highly professional team
            </span>
            {' dedicated to making your implementation successful and your customers happier.'}
          </p>
          <span style={{ width: 56, height: 3, borderRadius: 3, background: 'linear-gradient(90deg,#5ED6F7,#8378FF)' }}></span>
        </div>
      </section>
      <section style={{ padding: 'clamp(48px,6vw,72px) 0 clamp(56px,7vw,88px)', background: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: 820,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 24,
          }}
        >
          <span style={{ width: 2, height: 48, background: 'linear-gradient(180deg,rgba(131,120,255,0),#8378FF)' }}></span>
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(24px,2.8vw,34px)',
              lineHeight: 1.3,
              letterSpacing: '-0.02em',
              fontWeight: 700,
              color: '#1A1A2E',
            }}
          >
            {'Ready to start a conversation? '}
            <span
              style={{
                background: 'linear-gradient(90deg,#5B247A,#8378FF 55%,#1BCECF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              So are we.
            </span>
          </p>
        </div>
      </section>
      <section id="contact-us" style={{ scrollMarginTop: 72, padding: '0 0 clamp(64px,8vw,96px)', background: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
            gap: 20,
          }}
        >
          <a
            className="hv-card-ink"
            href="https://wa.me/97466005518"
            style={{
              padding: 28,
              borderRadius: 16,
              background: '#fff',
              border: '1px solid #ECEDF2',
              boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 16px 34px -26px rgba(26,26,46,0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              color: '#1A1A2E',
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
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
              </svg>
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7280' }}>
              WhatsApp
            </span>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>+974 66005518</span>
          </a>
          <a
            className="hv-card-ink"
            href="mailto:hello@trevio.ai"
            style={{
              padding: 28,
              borderRadius: 16,
              background: '#fff',
              border: '1px solid #ECEDF2',
              boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 16px 34px -26px rgba(26,26,46,0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              color: '#1A1A2E',
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
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6"></path>
              </svg>
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7280' }}>
              Email
            </span>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>hello@trevio.ai</span>
          </a>
          <a
            className="hv-card-ink"
            href="https://www.trevio.ai"
            style={{
              padding: 28,
              borderRadius: 16,
              background: '#fff',
              border: '1px solid #ECEDF2',
              boxShadow: '0 2px 6px rgba(26,26,46,0.04),0 16px 34px -26px rgba(26,26,46,0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              color: '#1A1A2E',
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
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7280' }}>
              Website
            </span>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>www.trevio.ai</span>
          </a>
        </div>
      </section>
      <section
        id="contact-form"
        style={{ scrollMarginTop: 72, padding: 'clamp(72px,9vw,112px) 0', background: '#F8F9FB', borderTop: '1px solid #EEF0F4' }}
      >
        <div
          className="ab-split"
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gap: 'clamp(40px,6vw,80px)',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              minWidth: 0,
              background: '#fff',
              borderRadius: 20,
              border: '1px solid #ECEDF2',
              boxShadow: '0 24px 54px -32px rgba(56,40,140,0.35)',
              padding: 'clamp(24px,3.4vw,40px)',
            }}
          >
            {notSent && (
              <>
                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <h2
                      style={{ margin: 0, fontSize: 'clamp(24px,2.6vw,32px)', lineHeight: 1.15, letterSpacing: '-0.03em', fontWeight: 800 }}
                    >
                      Send us a message
                    </h2>
                    <span style={{ fontSize: 15, color: '#6B7280' }}>We usually reply within one business day.</span>
                  </div>
                  <div className="ab-fields" style={{ display: 'grid', gap: 16 }}>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13.5, fontWeight: 700 }}>
                      Full Name
                      <input
                        className="fc-field"
                        required
                        name="name"
                        placeholder="Your full name"
                        style={{
                          height: 48,
                          padding: '0 14px',
                          borderRadius: 12,
                          border: '1.5px solid #E3E5EC',
                          background: '#fff',
                          fontSize: 15,
                          color: '#1A1A2E',
                          outline: 'none',
                        }}
                      />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13.5, fontWeight: 700 }}>
                      Company Name
                      <input
                        className="fc-field"
                        name="company"
                        placeholder="Company"
                        style={{
                          height: 48,
                          padding: '0 14px',
                          borderRadius: 12,
                          border: '1.5px solid #E3E5EC',
                          background: '#fff',
                          fontSize: 15,
                          color: '#1A1A2E',
                          outline: 'none',
                        }}
                      />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13.5, fontWeight: 700 }}>
                      Email
                      <input
                        className="fc-field"
                        required
                        type="email"
                        name="email"
                        placeholder="you@company.com"
                        style={{
                          height: 48,
                          padding: '0 14px',
                          borderRadius: 12,
                          border: '1.5px solid #E3E5EC',
                          background: '#fff',
                          fontSize: 15,
                          color: '#1A1A2E',
                          outline: 'none',
                        }}
                      />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13.5, fontWeight: 700 }}>
                      Phone
                      <input
                        className="fc-field"
                        type="tel"
                        name="phone"
                        placeholder="+974"
                        style={{
                          height: 48,
                          padding: '0 14px',
                          borderRadius: 12,
                          border: '1.5px solid #E3E5EC',
                          background: '#fff',
                          fontSize: 15,
                          color: '#1A1A2E',
                          outline: 'none',
                        }}
                      />
                    </label>
                  </div>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13.5, fontWeight: 700 }}>
                    {'Subject '}
                    <select
                      className="fc-field"
                      name="subject"
                      style={{
                        height: 48,
                        padding: '0 14px',
                        borderRadius: 12,
                        border: '1.5px solid #E3E5EC',
                        background: '#fff',
                        fontSize: 15,
                        color: '#1A1A2E',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option>General Enquiry</option>
                      <option>Request a Demo</option>
                      <option>Partnership</option>
                      <option>Technical Support</option>
                      <option>Pricing</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13.5, fontWeight: 700 }}>
                    Message
                    <textarea
                      className="fc-field"
                      required
                      name="message"
                      rows={5}
                      placeholder="Tell us about your business and what you’d like to achieve…"
                      style={{
                        padding: '12px 14px',
                        borderRadius: 12,
                        border: '1.5px solid #E3E5EC',
                        background: '#fff',
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: '#1A1A2E',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    ></textarea>
                  </label>
                  {status === 'error' && (
                    <p role="alert" style={{ margin: 0, fontSize: 14, color: '#B42318' }}>
                      Something went wrong sending your message. Please try again, or reach us on WhatsApp.
                    </p>
                  )}
                  <button
                    className="hv-brightness"
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      height: 54,
                      border: 'none',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      fontSize: 16,
                      fontWeight: 800,
                      color: '#fff',
                      cursor: 'pointer',
                      background: 'linear-gradient(100deg,#5B247A,#8378FF 70%,#5ED6F7 140%)',
                      boxShadow: '0 14px 30px -12px rgba(91,36,122,0.7)',
                    }}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
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
                      <path d="m22 2-7 20-4-9-9-4zM22 2 11 13"></path>
                    </svg>
                  </button>
                </form>
              </>
            )}
            {sent && (
              <>
                <div
                  style={{
                    minHeight: 420,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 0 10px rgba(131,120,255,0.12)',
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  </span>
                  <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>Message received</span>
                  <span style={{ fontSize: 15.5, lineHeight: 1.6, color: '#6B7280', maxWidth: 360 }}>
                    Thank you — a member of our team will be in touch within one business day.
                  </span>
                  <button
                    className="hv-outline"
                    type="button"
                    onClick={reset}
                    style={{
                      marginTop: 6,
                      height: 44,
                      padding: '0 18px',
                      borderRadius: 10,
                      border: '1.5px solid #D8D6EE',
                      background: '#fff',
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: '#1A1A2E',
                      cursor: 'pointer',
                    }}
                  >
                    Send another
                  </button>
                </div>
              </>
            )}
          </div>
          <div
            style={{
              minWidth: 0,
              borderRadius: 24,
              padding: 'clamp(18px,2.8vw,34px)',
              background:
                'radial-gradient(420px 300px at 100% 0%,rgba(94,214,247,0.22),transparent 70%),radial-gradient(420px 300px at 0% 100%,rgba(131,120,255,0.18),transparent 70%),linear-gradient(135deg,#F3F1FF,#EEFAFD)',
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
                  height: 42,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 14px',
                  borderBottom: '1px solid #F0F1F5',
                  background: '#FBFBFE',
                }}
              >
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E6E3F5' }}></span>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E6E3F5' }}></span>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E6E3F5' }}></span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700 }}>Trevio Inbox</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: '#0E9C9D' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#1BCECF' }}></span>Live
                </span>
              </div>
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, background: '#FAFAFC' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, borderRadius: 12, background: '#F3F1FF' }}>
                  <span
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
                    YK
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
                  </span>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Yousef K. · Request a Demo</span>
                    <span style={{ fontSize: 12, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      We run 4 stores and need WhatsApp + Instagram…
                    </span>
                  </div>
                  <span style={{ fontSize: 10.5, color: '#9CA3AF' }}>now</span>
                </div>
                <div
                  style={{
                    alignSelf: 'flex-start',
                    maxWidth: '86%',
                    padding: '10px 12px',
                    borderRadius: '14px 14px 14px 4px',
                    background: '#fff',
                    boxShadow: '0 0 0 1px #EEF0F4',
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  Hi! We run four stores and want WhatsApp and Instagram in one place. Can we see a demo?
                </div>
                <div style={{ borderRadius: 14, padding: 1, background: 'linear-gradient(135deg,#5ED6F7,#8378FF)' }}>
                  <div
                    style={{ borderRadius: 13, background: '#fff', padding: '12px 13px', display: 'flex', flexDirection: 'column', gap: 8 }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#5B247A' }}>✦ Trevio AI · Suggested reply</span>
                    <span style={{ fontSize: 13, lineHeight: 1.5 }}>
                      Absolutely, Yousef! I can book a 30-minute demo with our team — does Tuesday at 11 AM work for you?
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
                      <span style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #E3E1F5', fontSize: 11.5, fontWeight: 600 }}>
                        Edit
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: 'flex-end',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 10px',
                    borderRadius: 999,
                    background: '#E6FAFA',
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: '#0B7F80',
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Demo booked · Tue 11:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          padding: 'clamp(64px,8vw,104px) 0',
          background: 'linear-gradient(110deg,#5B247A 0%,#8378FF 55%,#5ED6F7 100%)',
          color: '#fff',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(30px,4.4vw,56px)',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              fontWeight: 800,
              color: '#fff',
              textWrap: 'balance',
            }}
          >
            One Platform. Every Channel. Unlimited Possibilities.
          </h2>
        </div>
      </section>
    </>
  );
}
