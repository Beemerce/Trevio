'use client';

import Link from 'next/link';
import { SITE } from '@/lib/site';
import { useEffect, useState } from 'react';
import '../split.css';
import './features.css';

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export function FeaturesView() {
  // One-second clock driving the call timer and SLA countdowns.
  const [t, setT] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setT((x) => x + 1), 1000);
    return () => clearInterval(iv);
  }, []);
  const r1 = 252 - (t % 240);
  const r2 = 74 - (t % 60);
  const callTime = fmt(134 + t);
  const sla1 = fmt(r1);
  const sla1w = `${Math.round((1 - r1 / 300) * 100)}%`;
  const sla2 = fmt(r2);
  const sla2w = `${Math.round((1 - r2 / 600) * 100)}%`;

  return (
    <>
      <section
        style={{
          padding: 'clamp(72px,9vw,128px) 0 clamp(64px,8vw,104px)',
          background:
            'radial-gradient(700px 420px at 15% 0%,rgba(94,214,247,0.18),transparent 70%),radial-gradient(700px 420px at 90% 100%,rgba(131,120,255,0.16),transparent 70%),linear-gradient(180deg,#FFFFFF,#F5F6FF)',
          borderBottom: '1px solid #EEF0F4',
        }}
      >
        <div
          style={{
            maxWidth: 880,
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
            Features
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(40px,5.4vw,68px)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              fontWeight: 800,
              textWrap: 'balance',
            }}
          >
            {'Every tool your conversations need. '}
            <span
              style={{
                background: 'linear-gradient(90deg,#5B247A 0%,#8378FF 50%,#1BCECF 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              In one platform.
            </span>
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: 640,
              fontSize: 'clamp(17px,1.5vw,19.5px)',
              lineHeight: 1.65,
              color: '#6B7280',
              textWrap: 'pretty',
            }}
          >
            From the first message to the final sale — inbox, automation, AI, commerce, calls and analytics, designed to work as one.
          </p>
        </div>
      </section>
      <section style={{ padding: 'clamp(80px,10vw,136px) 0 0', background: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(96px,11vw,152px)',
          }}
        >
          <div id="inbox" style={{ scrollMarginTop: 96 }}>
            <div className="split" style={{ display: 'grid', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>
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
                  Team Inbox
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 'clamp(30px,3.4vw,44px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.035em',
                    fontWeight: 800,
                    textWrap: 'balance',
                  }}
                >
                  One shared inbox for your whole team.
                </h2>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
                  Every WhatsApp, Instagram, Facebook, TikTok and web chat conversation lands in a single real-time workspace — assigned,
                  tracked and never lost.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15.5, lineHeight: 1.5, color: '#1A1A2E' }}>
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
                    Assign by team, skill or round-robin
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
                    Private notes, @mentions and collision detection
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
                    Labels, saved views and quick replies
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
                    Unified contact history across channels
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
                  <div className="ft-inbox" style={{ display: 'grid' }}>
                        <div className="ft-side"
                          style={{
                            borderRight: '1px solid #F0F1F5',
                            padding: '14px 10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            background: '#FBFBFE',
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10.5,
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: '#9CA3AF',
                              padding: '4px 8px 8px',
                            }}
                          >
                            Views
                          </span>
                          <span
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              padding: 8,
                              borderRadius: 9,
                              background: '#F1EFFF',
                              fontSize: 12.5,
                              fontWeight: 700,
                              color: '#5B247A',
                            }}
                          >
                            <span>All open</span>
                            <span>128</span>
                          </span>
                          <span style={{ display: 'flex', justifyContent: 'space-between', padding: 8, fontSize: 12.5, fontWeight: 600 }}>
                            <span>Mine</span>
                            <span style={{ color: '#6B7280' }}>12</span>
                          </span>
                          <span style={{ display: 'flex', justifyContent: 'space-between', padding: 8, fontSize: 12.5, fontWeight: 600 }}>
                            <span>Unassigned</span>
                            <span style={{ color: '#6B7280' }}>7</span>
                          </span>
                          <span style={{ display: 'flex', justifyContent: 'space-between', padding: 8, fontSize: 12.5, fontWeight: 600 }}>
                            <span>VIP</span>
                            <span style={{ color: '#6B7280' }}>4</span>
                          </span>
                          <span
                            style={{
                              fontSize: 10.5,
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: '#9CA3AF',
                              padding: '14px 8px 8px',
                            }}
                          >
                            Teams
                          </span>
                          <span style={{ padding: 8, fontSize: 12.5, fontWeight: 600 }}>Sales</span>
                          <span style={{ padding: 8, fontSize: 12.5, fontWeight: 600 }}>Support</span>
                          <span style={{ padding: 8, fontSize: 12.5, fontWeight: 600 }}>Logistics</span>
                        </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #F0F1F5',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontSize: 14, fontWeight: 800 }}>All open</span>
                        <span
                          style={{
                            height: 30,
                            padding: '0 10px',
                            borderRadius: 8,
                            background: '#F4F5F8',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: 12,
                            color: '#9CA3AF',
                          }}
                        >
                          Search conversations…
                        </span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'center',
                          padding: '12px 16px',
                          background: '#F7F6FF',
                          borderBottom: '1px solid #F0F1F5',
                        }}
                      >
                        <span
                          style={{
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
                            flex: 'none',
                          }}
                        >
                          NA
                        </span>
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontSize: 13, fontWeight: 700 }}>
                            {'Noura Al-Thani '}
                            <span style={{ fontWeight: 500, color: '#25D366' }}>· WhatsApp</span>
                          </span>
                          <span
                            style={{ fontSize: 12, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            Is my order arriving today?
                          </span>
                        </div>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: 999,
                            background: '#E6FAFA',
                            color: '#0B7F80',
                            fontSize: 10.5,
                            fontWeight: 700,
                            flex: 'none',
                          }}
                        >
                          Mariam
                        </span>
                      </div>
                      <div
                        style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #F0F1F5' }}
                      >
                        <span
                          style={{
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
                            flex: 'none',
                          }}
                        >
                          OH
                        </span>
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontSize: 13, fontWeight: 700 }}>
                            {'Omar Haddad '}
                            <span style={{ fontWeight: 500, color: '#DD2A7B' }}>· Instagram</span>
                          </span>
                          <span
                            style={{ fontSize: 12, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            Do you ship to Al Khor?
                          </span>
                        </div>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: 999,
                            background: '#FFF3E0',
                            color: '#9A5B00',
                            fontSize: 10.5,
                            fontWeight: 700,
                            flex: 'none',
                          }}
                        >
                          Unassigned
                        </span>
                      </div>
                      <div
                        style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #F0F1F5' }}
                      >
                        <span
                          style={{
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
                            flex: 'none',
                          }}
                        >
                          LS
                        </span>
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontSize: 13, fontWeight: 700 }}>
                            {'Lina Saeed '}
                            <span style={{ fontWeight: 500, color: '#111' }}>· TikTok</span>
                          </span>
                          <span
                            style={{ fontSize: 12, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            Is the Eid offer still on?
                          </span>
                        </div>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: 999,
                            background: '#F1EFFF',
                            color: '#5B247A',
                            fontSize: 10.5,
                            fontWeight: 700,
                            flex: 'none',
                          }}
                        >
                          AI agent
                        </span>
                      </div>
                      <div
                        style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #F0F1F5' }}
                      >
                        <span
                          style={{
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
                            flex: 'none',
                          }}
                        >
                          PN
                        </span>
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontSize: 13, fontWeight: 700 }}>
                            {'Priya Nair '}
                            <span style={{ fontWeight: 500, color: '#1877F2' }}>· Facebook</span>
                          </span>
                          <span
                            style={{ fontSize: 12, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            Can I move my appointment?
                          </span>
                        </div>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: 999,
                            background: '#E6FAFA',
                            color: '#0B7F80',
                            fontSize: 10.5,
                            fontWeight: 700,
                            flex: 'none',
                          }}
                        >
                          Yousef
                        </span>
                      </div>
                      <div
                        style={{
                          margin: '12px 16px 14px',
                          padding: '10px 12px',
                          borderRadius: 10,
                          background: '#FFF8EC',
                          border: '1px solid #FBE3B8',
                          fontSize: 12,
                          color: '#7A4A00',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                        </svg>
                        Mariam is replying to Noura — avoid duplicate answers
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="chatbot" style={{ scrollMarginTop: 96 }}>
            <div className="split" style={{ display: 'grid', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>
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
                  AI Chatbot Builder
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 'clamp(30px,3.4vw,44px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.035em',
                    fontWeight: 800,
                    textWrap: 'balance',
                  }}
                >
                  Design smart flows without writing code.
                </h2>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
                  Drag, drop and publish chatbots that greet, qualify, book and sell — with AI understanding free-text replies in Arabic and
                  English.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15.5, lineHeight: 1.5, color: '#1A1A2E' }}>
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
                    Visual drag-and-drop flow canvas
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
                    AI intent detection for free-text answers
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
                    Buttons, lists, forms and media blocks
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
                    Hand off to a human with full context
                  </span>
                </div>
              </div>
              <div
                className="split-vis-first"
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
                    borderRadius: 16,
                    background: '#fff',
                    boxShadow: '0 24px 54px -26px rgba(56,40,140,0.4),0 0 0 1px rgba(131,120,255,0.08)',
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
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 800 }}>Restaurant booking bot</span>
                    <span
                      style={{
                        padding: '5px 12px',
                        borderRadius: 8,
                        background: 'linear-gradient(100deg,#5B247A,#8378FF)',
                        color: '#fff',
                        fontSize: 11.5,
                        fontWeight: 700,
                      }}
                    >
                      Publish
                    </span>
                  </div>
                  <div
                    style={{
                      padding: 22,
                      backgroundColor: '#FBFBFE',
                      backgroundImage: 'radial-gradient(#DCDDEB 1px,transparent 1px)',
                      backgroundSize: '16px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 'min(100%,260px)',
                        padding: '12px 14px',
                        borderRadius: 12,
                        background: '#fff',
                        boxShadow: '0 8px 20px -14px rgba(26,26,46,0.4),0 0 0 1px #ECEDF2',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                      }}
                    >
                      <span
                        style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0B7F80' }}
                      >
                        Trigger
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>Customer says “book a table”</span>
                    </div>
                    <div style={{ width: 2, height: 20, background: 'linear-gradient(#5ED6F7,#8378FF)' }}></div>
                    <div
                      style={{
                        width: 'min(100%,260px)',
                        borderRadius: 12,
                        padding: 1.5,
                        background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                        boxShadow: '0 12px 26px -14px rgba(131,120,255,0.7)',
                      }}
                    >
                      <div
                        style={{
                          borderRadius: 11,
                          background: '#fff',
                          padding: '12px 14px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8,
                        }}
                      >
                        <span
                          style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5B247A' }}
                        >
                          Message · Buttons
                        </span>
                        <span style={{ fontSize: 13, lineHeight: 1.45 }}>Welcome to Saffron! How many guests?</span>
                        <div style={{ display: 'flex', gap: 5 }}>
                          <span
                            style={{
                              flex: 1,
                              padding: 5,
                              borderRadius: 7,
                              background: '#F4F2FF',
                              textAlign: 'center',
                              fontSize: 11.5,
                              fontWeight: 700,
                              color: '#5B247A',
                            }}
                          >
                            1–2
                          </span>
                          <span
                            style={{
                              flex: 1,
                              padding: 5,
                              borderRadius: 7,
                              background: '#F4F2FF',
                              textAlign: 'center',
                              fontSize: 11.5,
                              fontWeight: 700,
                              color: '#5B247A',
                            }}
                          >
                            3–6
                          </span>
                          <span
                            style={{
                              flex: 1,
                              padding: 5,
                              borderRadius: 7,
                              background: '#F4F2FF',
                              textAlign: 'center',
                              fontSize: 11.5,
                              fontWeight: 700,
                              color: '#5B247A',
                            }}
                          >
                            7+
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: 2, height: 20, background: 'linear-gradient(#8378FF,#1BCECF)' }}></div>
                    <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 400 }}>
                      <div
                        style={{
                          padding: '12px 14px',
                          borderRadius: 12,
                          background: '#fff',
                          boxShadow: '0 8px 20px -14px rgba(26,26,46,0.4),0 0 0 1px #ECEDF2',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 4,
                        }}
                      >
                        <span
                          style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0B7F80' }}
                        >
                          Action
                        </span>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>Check availability</span>
                        <span style={{ fontSize: 11.5, color: '#6B7280' }}>Booking Mini App</span>
                      </div>
                      <div
                        style={{
                          padding: '12px 14px',
                          borderRadius: 12,
                          background: '#fff',
                          boxShadow: '0 8px 20px -14px rgba(26,26,46,0.4),0 0 0 1px #ECEDF2',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 4,
                        }}
                      >
                        <span
                          style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9A5B00' }}
                        >
                          7+ guests
                        </span>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>Hand off to events team</span>
                        <span style={{ fontSize: 11.5, color: '#6B7280' }}>Assign · SLA 10 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="ai"
        style={{
          scrollMarginTop: 72,
          marginTop: 'clamp(96px,11vw,152px)',
          padding: 'clamp(80px,10vw,136px) 0',
          background:
            'radial-gradient(900px 520px at 15% 0%,rgba(131,120,255,0.26),transparent 60%),radial-gradient(800px 520px at 95% 100%,rgba(27,206,207,0.16),transparent 60%),linear-gradient(180deg,#1A0A2E 0%,#0D1117 100%)',
          color: '#fff',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 52 }}>
          <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span
              style={{
                alignSelf: 'flex-start',
                padding: '6px 12px',
                borderRadius: 999,
                background: 'rgba(27,206,207,0.14)',
                border: '1px solid rgba(27,206,207,0.4)',
                color: '#7EE7E8',
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
              }}
            >
              AI Features
            </span>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(34px,4.6vw,58px)',
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                fontWeight: 800,
                textWrap: 'balance',
              }}
            >
              {'AI that resolves, assists '}
              <span
                style={{
                  background: 'linear-gradient(90deg,#5ED6F7,#8378FF)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                and connects.
              </span>
            </h2>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.7, color: '#A6ABC4', maxWidth: 620 }}>
              Trained on your knowledge base, products and tone of voice — with your team always in control.
            </p>
          </div>
          <div className="ft-ai" style={{ display: 'grid', gap: 22 }}>
            <div
              style={{
                borderRadius: 18,
                padding: 1.5,
                background: 'linear-gradient(140deg,rgba(94,214,247,0.9),rgba(131,120,255,0.45) 50%,rgba(131,120,255,0.12))',
                boxShadow: '0 0 60px -18px rgba(94,214,247,0.45)',
              }}
            >
              <div
                style={{
                  height: '100%',
                  borderRadius: 17,
                  background: 'linear-gradient(180deg,#171030,#0F1220)',
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18,
                }}
              >
                <span
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px -8px rgba(94,214,247,0.7)',
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
                    <path d="M12 8V4H8M4 8h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zM2 14h2M20 14h2M15 13v2M9 13v2"></path>
                  </svg>
                </span>
                <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>AI Agent</span>
                <span style={{ fontSize: 15.5, lineHeight: 1.65, color: '#A6ABC4' }}>
                  Autonomously resolves order tracking, bookings, returns and FAQs — 24/7, on every channel, in Arabic and English.
                </span>
              </div>
            </div>
            <div
              style={{
                borderRadius: 18,
                padding: 1.5,
                background: 'linear-gradient(140deg,rgba(131,120,255,0.95),rgba(131,120,255,0.4) 50%,rgba(94,214,247,0.15))',
                boxShadow: '0 0 60px -18px rgba(131,120,255,0.6)',
              }}
            >
              <div
                style={{
                  height: '100%',
                  borderRadius: 17,
                  background: 'linear-gradient(180deg,#1A0F36,#0F1220)',
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18,
                }}
              >
                <span
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    background: 'linear-gradient(135deg,#8378FF,#5B247A)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px -8px rgba(131,120,255,0.8)',
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
                    <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.13 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0z"></path>
                  </svg>
                </span>
                <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>Copilot</span>
                <span style={{ fontSize: 15.5, lineHeight: 1.65, color: '#A6ABC4' }}>
                  Suggested replies, instant thread summaries, tone rewriting and one-click translation for every agent.
                </span>
              </div>
            </div>
            <div
              style={{
                borderRadius: 18,
                padding: 1.5,
                background: 'linear-gradient(140deg,rgba(27,206,207,0.95),rgba(94,214,247,0.4) 50%,rgba(131,120,255,0.15))',
                boxShadow: '0 0 60px -18px rgba(27,206,207,0.5)',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  height: '100%',
                  borderRadius: 17,
                  background: 'linear-gradient(180deg,#0F1A2A,#0F1220)',
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 22,
                    right: 22,
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: '#1BCECF',
                    color: '#0D1117',
                    fontSize: 11.5,
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                  }}
                >
                  New
                </span>
                <span
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    background: 'linear-gradient(135deg,#1BCECF,#5ED6F7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px -8px rgba(27,206,207,0.7)',
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
                    <path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z"></path>
                  </svg>
                </span>
                <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>MCP Connector</span>
                <span style={{ fontSize: 15.5, lineHeight: 1.65, color: '#A6ABC4' }}>
                  Connect Trevio to any AI model or internal tool through the Model Context Protocol — your data, your rules.
                </span>
              </div>
            </div>
          </div>
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
            gap: 'clamp(96px,11vw,152px)',
          }}
        >
          <div id="broadcast" style={{ scrollMarginTop: 96 }}>
            <div className="split" style={{ display: 'grid', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>
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
                  Advanced Broadcasting
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 'clamp(30px,3.4vw,44px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.035em',
                    fontWeight: 800,
                    textWrap: 'balance',
                  }}
                >
                  Reach thousands. Sound like one-to-one.
                </h2>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
                  Send approved WhatsApp templates to precisely targeted segments, personalise every message, and route replies straight
                  into the inbox.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15.5, lineHeight: 1.5, color: '#1A1A2E' }}>
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
                    Segments by behaviour, language and location
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
                    Personalised variables and rich media templates
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
                    Smart scheduling and A/B testing
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
                    Delivery, read, reply and revenue tracking
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
                  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span style={{ fontWeight: 800, fontSize: 15 }}>Eid Collection — Early access</span>
                        <span style={{ fontSize: 12.5, color: '#6B7280' }}>Scheduled Thu, 8:00 PM AST</span>
                      </div>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: 999,
                          background: '#E6FAFA',
                          color: '#0B7F80',
                          fontSize: 11,
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Sending
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      <span
                        style={{
                          padding: '5px 10px',
                          borderRadius: 8,
                          background: '#F4F2FF',
                          color: '#5B247A',
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        Loyal customers · 8,420
                      </span>
                      <span
                        style={{
                          padding: '5px 10px',
                          borderRadius: 8,
                          background: '#F4F2FF',
                          color: '#5B247A',
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        Qatar
                      </span>
                      <span
                        style={{
                          padding: '5px 10px',
                          borderRadius: 8,
                          background: '#F4F2FF',
                          color: '#5B247A',
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        Arabic + English
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div
                        style={{
                          padding: 12,
                          borderRadius: 12,
                          border: '1.5px solid #8378FF',
                          background: '#FAF9FF',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6,
                        }}
                      >
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#5B247A' }}>Variant A · Winner</span>
                        <span style={{ fontSize: 12.5, lineHeight: 1.45 }}>
                          Hi Noura — early access to our Eid Collection is open for 48 hours.
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: '#0B7F80' }}>28% replied</span>
                      </div>
                      <div
                        style={{
                          padding: 12,
                          borderRadius: 12,
                          border: '1px solid #ECEDF2',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6,
                        }}
                      >
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280' }}>Variant B</span>
                        <span style={{ fontSize: 12.5, lineHeight: 1.45 }}>
                          Noura, the Eid Collection is here. Shop before anyone else.
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: '#6B7280' }}>19% replied</span>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 12 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <span style={{ fontSize: 11.5, color: '#6B7280' }}>Delivered</span>
                        <span style={{ fontSize: 18, fontWeight: 800 }}>98%</span>
                        <span style={{ height: 5, borderRadius: 9, background: '#EEF0F4', overflow: 'hidden' }}>
                          <span
                            style={{ display: 'block', width: '98%', height: '100%', background: 'linear-gradient(90deg,#5ED6F7,#8378FF)' }}
                          ></span>
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <span style={{ fontSize: 11.5, color: '#6B7280' }}>Read</span>
                        <span style={{ fontSize: 18, fontWeight: 800 }}>81%</span>
                        <span style={{ height: 5, borderRadius: 9, background: '#EEF0F4', overflow: 'hidden' }}>
                          <span
                            style={{ display: 'block', width: '81%', height: '100%', background: 'linear-gradient(90deg,#5ED6F7,#8378FF)' }}
                          ></span>
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <span style={{ fontSize: 11.5, color: '#6B7280' }}>Revenue</span>
                        <span style={{ fontSize: 18, fontWeight: 800 }}>QAR 62k</span>
                        <span style={{ height: 5, borderRadius: 9, background: '#EEF0F4', overflow: 'hidden' }}>
                          <span
                            style={{ display: 'block', width: '64%', height: '100%', background: 'linear-gradient(90deg,#1BCECF,#5ED6F7)' }}
                          ></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="commerce" style={{ scrollMarginTop: 96 }}>
            <div className="split" style={{ display: 'grid', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>
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
                  WhatsApp Commerce
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 'clamp(30px,3.4vw,44px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.035em',
                    fontWeight: 800,
                    textWrap: 'balance',
                  }}
                >
                  Turn chats into checkouts.
                </h2>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
                  Share your catalogue, build carts and take payment without customers ever leaving WhatsApp — synced with your store in
                  real time.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15.5, lineHeight: 1.5, color: '#1A1A2E' }}>
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
                    Product catalogues and carousels in chat
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
                    In-chat carts, order tracking and receipts
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
                    Payment links with local gateways
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
                    Abandoned-cart recovery flows
                  </span>
                </div>
              </div>
              <div
                className="split-vis-first"
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
                    maxWidth: 340,
                    margin: '0 auto',
                    borderRadius: 28,
                    background: '#ECE5DD',
                    boxShadow: '0 30px 60px -30px rgba(56,40,140,0.5),0 0 0 8px #1A1A2E',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: 56,
                      background: '#075E54',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '0 14px',
                    }}
                  >
                    <span
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        fontWeight: 800,
                      }}
                    >
                      S
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{'Silk & Sand'}</span>
                      <span style={{ fontSize: 11, opacity: 0.85 }}>Business account</span>
                    </div>
                  </div>
                  <div style={{ padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div
                      style={{
                        alignSelf: 'flex-end',
                        maxWidth: '80%',
                        padding: '8px 11px',
                        borderRadius: '10px 10px 2px 10px',
                        background: '#DCF8C6',
                        fontSize: 13,
                      }}
                    >
                      Show me the new abayas please
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <div style={{ borderRadius: 10, background: '#fff', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: 88,
                            background: 'linear-gradient(135deg,#E9E4F7,#D9F2F7)',
                            display: 'flex',
                            alignItems: 'flex-end',
                            padding: 6,
                            font: '500 9.5px ui-monospace,Menlo,monospace',
                            color: '#6B7280',
                          }}
                        >
                          product photo
                        </div>
                        <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontSize: 12, fontWeight: 700 }}>Noor Abaya</span>
                          <span style={{ fontSize: 11.5, color: '#6B7280' }}>QAR 320</span>
                        </div>
                      </div>
                      <div style={{ borderRadius: 10, background: '#fff', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: 88,
                            background: 'linear-gradient(135deg,#D9F2F7,#E9E4F7)',
                            display: 'flex',
                            alignItems: 'flex-end',
                            padding: 6,
                            font: '500 9.5px ui-monospace,Menlo,monospace',
                            color: '#6B7280',
                          }}
                        >
                          product photo
                        </div>
                        <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontSize: 12, fontWeight: 700 }}>Layla Kaftan</span>
                          <span style={{ fontSize: 11.5, color: '#6B7280' }}>QAR 220</span>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        alignSelf: 'flex-start',
                        width: '85%',
                        borderRadius: '2px 10px 10px 10px',
                        background: '#fff',
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#075E54' }}>Your cart</span>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>2 items · QAR 540</span>
                        <span style={{ fontSize: 11.5, color: '#6B7280' }}>Free delivery in Doha</span>
                      </div>
                      <div
                        style={{
                          borderTop: '1px solid #EEE',
                          padding: 9,
                          textAlign: 'center',
                          fontSize: 13,
                          fontWeight: 700,
                          color: '#0A7CFF',
                        }}
                      >
                        Pay now
                      </div>
                    </div>
                    <div
                      style={{
                        alignSelf: 'flex-start',
                        padding: '6px 10px',
                        borderRadius: 8,
                        background: '#fff',
                        fontSize: 11.5,
                        color: '#0B7F80',
                        fontWeight: 700,
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
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                      Order #5120 synced to Shopify
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="calls" style={{ scrollMarginTop: 96 }}>
            <div className="split" style={{ display: 'grid', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>
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
                  Calls
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 'clamp(30px,3.4vw,44px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.035em',
                    fontWeight: 800,
                    textWrap: 'balance',
                  }}
                >
                  When a message isn’t enough, call.
                </h2>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
                  Take and place WhatsApp voice calls right from the inbox. Every call is logged against the contact, with an AI summary
                  ready the moment you hang up.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15.5, lineHeight: 1.5, color: '#1A1A2E' }}>
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
                    Inbound and outbound WhatsApp Business calls
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
                    Call routing to available agents
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
                    Recordings, transcripts and AI summaries
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
                    Calls and chats on one customer timeline
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div
                    style={{
                      borderRadius: 18,
                      padding: 22,
                      background: 'linear-gradient(160deg,#1A0A2E,#0D1117)',
                      color: '#fff',
                      boxShadow: '0 30px 60px -28px rgba(26,10,46,0.8)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 14,
                    }}
                  >
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: '#7EE7E8', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          background: '#1BCECF',
                          boxShadow: '0 0 0 4px rgba(27,206,207,0.25)',
                        }}
                      ></span>
                      {'WhatsApp voice call · '}
                      {callTime}
                    </span>
                    <span
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        fontWeight: 800,
                        boxShadow: '0 0 0 8px rgba(131,120,255,0.18)',
                      }}
                    >
                      KM
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <span style={{ fontSize: 16, fontWeight: 700 }}>Khalid Mansour</span>
                      <span style={{ fontSize: 12.5, color: '#A6ABC4' }}>+974 5XXX XXXX · Routed to Support</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 30 }}>
                      <span style={{ width: 3, height: 10, borderRadius: 2, background: '#5ED6F7' }}></span>
                      <span style={{ width: 3, height: 20, borderRadius: 2, background: '#5ED6F7' }}></span>
                      <span style={{ width: 3, height: 28, borderRadius: 2, background: '#76C3FA' }}></span>
                      <span style={{ width: 3, height: 14, borderRadius: 2, background: '#76C3FA' }}></span>
                      <span style={{ width: 3, height: 24, borderRadius: 2, background: '#8378FF' }}></span>
                      <span style={{ width: 3, height: 30, borderRadius: 2, background: '#8378FF' }}></span>
                      <span style={{ width: 3, height: 16, borderRadius: 2, background: '#8378FF' }}></span>
                      <span style={{ width: 3, height: 22, borderRadius: 2, background: '#8378FF' }}></span>
                      <span style={{ width: 3, height: 10, borderRadius: 2, background: '#76C3FA' }}></span>
                      <span style={{ width: 3, height: 26, borderRadius: 2, background: '#76C3FA' }}></span>
                      <span style={{ width: 3, height: 18, borderRadius: 2, background: '#5ED6F7' }}></span>
                      <span style={{ width: 3, height: 8, borderRadius: 2, background: '#5ED6F7' }}></span>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <span
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3"></path>
                        </svg>
                      </span>
                      <span
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          background: '#E5484D',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18M6 6l12 12"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div style={{ borderRadius: 14, padding: 1.5, background: 'linear-gradient(135deg,#5ED6F7,#8378FF)' }}>
                    <div
                      style={{
                        borderRadius: 13,
                        background: '#fff',
                        padding: '14px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#5B247A' }}>AI call summary · previous call</span>
                      <span style={{ fontSize: 13, lineHeight: 1.5 }}>
                        Requested March invoice and a change of billing email. Invoice sent; follow-up task created for Finance.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="miniapps" style={{ scrollMarginTop: 96 }}>
            <div className="split" style={{ display: 'grid', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>
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
                  Mini Apps
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 'clamp(30px,3.4vw,44px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.035em',
                    fontWeight: 800,
                    textWrap: 'balance',
                  }}
                >
                  Your business tools, inside every chat.
                </h2>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
                  Mini Apps open beside the conversation so agents can look up a customer, update a deal or book an appointment without ever
                  switching tabs.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15.5, lineHeight: 1.5, color: '#1A1A2E' }}>
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
                    Built-in CRM, orders and booking apps
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
                    Two-way sync with HubSpot, Salesforce and Zoho
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
                    Build your own with the Mini Apps SDK
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
                    Permissions per team and role
                  </span>
                </div>
              </div>
              <div
                className="split-vis-first"
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
                    <span style={{ width: 40 }}></span>
                  </div>
                  <div className="ft-mini" style={{ display: 'grid' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #F0F1F5' }}>
                      <div
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: '1px solid #F0F1F5' }}
                      >
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
                          FA
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
                          <span style={{ fontSize: 13.5, fontWeight: 700 }}>Fahad Al-Kuwari</span>
                          <span style={{ fontSize: 11, color: '#6B7280' }}>WhatsApp · online</span>
                        </div>
                      </div>
                      <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 9, background: '#FAFAFC' }}>
                        <div
                          style={{
                            alignSelf: 'flex-start',
                            maxWidth: '88%',
                            padding: '9px 11px',
                            borderRadius: '13px 13px 13px 4px',
                            background: '#fff',
                            boxShadow: '0 0 0 1px #EEF0F4',
                            fontSize: 12.5,
                            lineHeight: 1.5,
                          }}
                        >
                          Hi, we'd like to upgrade to 20 seats.
                        </div>
                        <div
                          style={{
                            alignSelf: 'flex-end',
                            maxWidth: '88%',
                            padding: '9px 11px',
                            borderRadius: '13px 13px 4px 13px',
                            background: 'linear-gradient(100deg,#5B247A,#8378FF)',
                            color: '#fff',
                            fontSize: 12.5,
                            lineHeight: 1.5,
                          }}
                        >
                          Great — I’ve opened your account. Updating it now.
                        </div>
                        <div
                          style={{
                            alignSelf: 'flex-start',
                            maxWidth: '88%',
                            padding: '9px 11px',
                            borderRadius: '13px 13px 13px 4px',
                            background: '#fff',
                            boxShadow: '0 0 0 1px #EEF0F4',
                            fontSize: 12.5,
                            lineHeight: 1.5,
                          }}
                        >
                          Perfect, thank you!
                        </div>
                      </div>
                      <div style={{ padding: '10px 12px', borderTop: '1px solid #F0F1F5', display: 'flex', gap: 8 }}>
                        <span
                          style={{
                            flex: 1,
                            height: 34,
                            borderRadius: 9,
                            background: '#F4F5F8',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 10px',
                            fontSize: 12,
                            color: '#9CA3AF',
                          }}
                        >
                          Type a reply…
                        </span>
                        <span
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 9,
                            background: 'linear-gradient(135deg,#5ED6F7,#8378FF)',
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
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m22 2-7 20-4-9-9-4zM22 2 11 13"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
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
                      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 13 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontSize: 14.5, fontWeight: 800 }}>Al-Kuwari Trading</span>
                          <span style={{ fontSize: 11.5, color: '#6B7280' }}>Owner · Mariam S.</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                          <div
                            style={{
                              padding: '8px 10px',
                              borderRadius: 10,
                              background: '#F8F9FB',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 2,
                            }}
                          >
                            <span style={{ fontSize: 10.5, color: '#6B7280' }}>Plan</span>
                            <span style={{ fontSize: 12.5, fontWeight: 700 }}>Growth</span>
                          </div>
                          <div
                            style={{
                              padding: '8px 10px',
                              borderRadius: 10,
                              background: '#F8F9FB',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 2,
                            }}
                          >
                            <span style={{ fontSize: 10.5, color: '#6B7280' }}>Seats</span>
                            <span style={{ fontSize: 12.5, fontWeight: 700 }}>12 → 20</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <span
                            style={{
                              fontSize: 10.5,
                              fontWeight: 700,
                              color: '#6B7280',
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                            }}
                          >
                            Deal stage
                          </span>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4 }}>
                            <span style={{ height: 6, borderRadius: 4, background: 'linear-gradient(90deg,#5ED6F7,#8378FF)' }}></span>
                            <span style={{ height: 6, borderRadius: 4, background: 'linear-gradient(90deg,#5ED6F7,#8378FF)' }}></span>
                            <span style={{ height: 6, borderRadius: 4, background: 'linear-gradient(90deg,#5ED6F7,#8378FF)' }}></span>
                            <span style={{ height: 6, borderRadius: 4, background: '#EEF0F4' }}></span>
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 600 }}>Negotiation · QAR 18,400</span>
                        </div>
                        <span
                          style={{
                            height: 36,
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12.5,
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
            </div>
          </div>
          <div id="sla" style={{ scrollMarginTop: 96 }}>
            <div className="split" style={{ display: 'grid', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>
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
                  SLA Management
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 'clamp(30px,3.4vw,44px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.035em',
                    fontWeight: 800,
                    textWrap: 'balance',
                  }}
                >
                  Promises kept, automatically.
                </h2>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
                  Set response and resolution targets per team, channel and priority. Trevio tracks every clock live and escalates before a
                  deadline slips.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15.5, lineHeight: 1.5, color: '#1A1A2E' }}>
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
                    First-response and resolution targets
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
                    Business hours, weekends and regional holidays
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
                    Automatic escalation and reassignment
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
                    SLA compliance reports by team and agent
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
                  <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12 }}>
                      <span style={{ fontSize: 14, fontWeight: 800 }}>Live SLA monitor</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#0B7F80' }}>96.4% on target today</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 0', borderTop: '1px solid #F0F1F5' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>Omar Haddad · Shipping question</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#0B7F80', fontVariantNumeric: 'tabular-nums' }}>{sla1}</span>
                      </div>
                      <span style={{ height: 6, borderRadius: 9, background: '#EEF0F4', overflow: 'hidden' }}>
                        <span
                          style={{ display: 'block', height: '100%', background: '#1BCECF', transition: 'width 1s linear', width: sla1w }}
                        ></span>
                      </span>
                      <span style={{ fontSize: 11.5, color: '#6B7280' }}>First response · Sales · On track</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 0', borderTop: '1px solid #F0F1F5' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>Priya Nair · Booking change</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#9A5B00', fontVariantNumeric: 'tabular-nums' }}>{sla2}</span>
                      </div>
                      <span style={{ height: 6, borderRadius: 9, background: '#EEF0F4', overflow: 'hidden' }}>
                        <span
                          style={{ display: 'block', height: '100%', background: '#F5A524', transition: 'width 1s linear', width: sla2w }}
                        ></span>
                      </span>
                      <span style={{ fontSize: 11.5, color: '#6B7280' }}>Resolution · Support · At risk</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 0', borderTop: '1px solid #F0F1F5' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>Al-Kuwari Trading · VIP</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#C2303A' }}>Escalated</span>
                      </div>
                      <span style={{ height: 6, borderRadius: 9, background: '#FDE8EA', overflow: 'hidden' }}>
                        <span style={{ display: 'block', height: '100%', width: '100%', background: '#E5484D' }}></span>
                      </span>
                      <span style={{ fontSize: 11.5, color: '#6B7280' }}>Reassigned to Team Lead · Mariam S.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="capi" style={{ scrollMarginTop: 96 }}>
            <div className="split" style={{ display: 'grid', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>
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
                  Conversion CAPI
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 'clamp(30px,3.4vw,44px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.035em',
                    fontWeight: 800,
                    textWrap: 'balance',
                  }}
                >
                  Prove which ads drive real sales.
                </h2>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
                  Trevio sends conversation events — leads, carts and purchases — back to Meta through the Conversions API, so
                  click-to-WhatsApp ads optimise for revenue, not just clicks.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15.5, lineHeight: 1.5, color: '#1A1A2E' }}>
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
                    Server-side events to Meta Conversions API
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
                    Attribution for click-to-WhatsApp and Instagram ads
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
                    Custom events mapped to your funnel
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
                    Privacy-safe, hashed customer data
                  </span>
                </div>
              </div>
              <div
                className="split-vis-first"
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
                  <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 14, fontWeight: 800 }}>Events sent to Meta</span>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: 999,
                          background: '#E6FAFA',
                          color: '#0B7F80',
                          fontSize: 11,
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1BCECF' }}></span>Connected
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 10 }}>
                      <div
                        style={{
                          padding: '10px 12px',
                          borderRadius: 12,
                          background: '#F8F9FB',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                        }}
                      >
                        <span style={{ fontSize: 11, color: '#6B7280' }}>Leads</span>
                        <span style={{ fontSize: 17, fontWeight: 800 }}>1,284</span>
                      </div>
                      <div
                        style={{
                          padding: '10px 12px',
                          borderRadius: 12,
                          background: '#F8F9FB',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                        }}
                      >
                        <span style={{ fontSize: 11, color: '#6B7280' }}>Purchases</span>
                        <span style={{ fontSize: 17, fontWeight: 800 }}>312</span>
                      </div>
                      <div
                        style={{
                          padding: '10px 12px',
                          borderRadius: 12,
                          background: 'linear-gradient(135deg,#F1EFFF,#E5F9FD)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                        }}
                      >
                        <span style={{ fontSize: 11, color: '#5B247A' }}>ROAS</span>
                        <span style={{ fontSize: 17, fontWeight: 800, color: '#5B247A' }}>4.8×</span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 12,
                        border: '1px solid #F0F1F5',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1.1fr 1.3fr .8fr .6fr',
                          gap: 8,
                          padding: '9px 12px',
                          background: '#FBFBFE',
                          fontSize: 10.5,
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#9CA3AF',
                        }}
                      >
                        <span>Event</span>
                        <span>Source ad</span>
                        <span>Value</span>
                        <span>Status</span>
                      </div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1.1fr 1.3fr .8fr .6fr',
                          gap: 8,
                          padding: '10px 12px',
                          borderTop: '1px solid #F0F1F5',
                          fontSize: 12.5,
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontWeight: 700 }}>Purchase</span>
                        <span style={{ color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          CTWA · Eid offer
                        </span>
                        <span>QAR 540</span>
                        <span style={{ color: '#0B7F80', fontWeight: 700 }}>Sent</span>
                      </div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1.1fr 1.3fr .8fr .6fr',
                          gap: 8,
                          padding: '10px 12px',
                          borderTop: '1px solid #F0F1F5',
                          fontSize: 12.5,
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontWeight: 700 }}>AddToCart</span>
                        <span style={{ color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          IG · New arrivals
                        </span>
                        <span>QAR 220</span>
                        <span style={{ color: '#0B7F80', fontWeight: 700 }}>Sent</span>
                      </div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1.1fr 1.3fr .8fr .6fr',
                          gap: 8,
                          padding: '10px 12px',
                          borderTop: '1px solid #F0F1F5',
                          fontSize: 12.5,
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontWeight: 700 }}>Lead</span>
                        <span style={{ color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          CTWA · Free trial
                        </span>
                        <span>—</span>
                        <span style={{ color: '#0B7F80', fontWeight: 700 }}>Sent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="developer" style={{ scrollMarginTop: 96 }}>
            <div className="split" style={{ display: 'grid', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>
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
                  Developer Portal
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 'clamp(30px,3.4vw,44px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.035em',
                    fontWeight: 800,
                    textWrap: 'balance',
                  }}
                >
                  Build on Trevio with a clean, open API.
                </h2>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
                  REST endpoints, real-time webhooks and SDKs for the WhatsApp Business Platform and every Trevio channel — with sandbox
                  keys and full docs at dev.wa-api.cloud.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15.5, lineHeight: 1.5, color: '#1A1A2E' }}>
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
                    REST API for messages, contacts and templates
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
                    Webhooks for every inbox and campaign event
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
                    Node.js and Python SDKs
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
                    Sandbox workspace for testing
                  </span>
                </div>
                <a
                  className="hv-violet"
                  href="https://dev.wa-api.cloud"
                  style={{
                    alignSelf: 'flex-start',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontWeight: 700,
                    fontSize: 15.5,
                    color: '#5B247A',
                  }}
                >
                  Open Developer Portal
                  <svg
                    width="16"
                    height="16"
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
                    borderRadius: 16,
                    background: '#0D1117',
                    boxShadow: '0 30px 60px -30px rgba(13,17,23,0.7),0 0 0 1px rgba(131,120,255,0.2)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: 42,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '0 10px',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <span
                      style={{
                        padding: '6px 10px',
                        borderRadius: 7,
                        background: 'rgba(131,120,255,0.18)',
                        font: '600 12px ui-monospace,Menlo,monospace',
                        color: '#CFCBFF',
                      }}
                    >
                      Node.js
                    </span>
                    <span style={{ padding: '6px 10px', font: '500 12px ui-monospace,Menlo,monospace', color: '#7A8198' }}>Python</span>
                    <span style={{ padding: '6px 10px', font: '500 12px ui-monospace,Menlo,monospace', color: '#7A8198' }}>cURL</span>
                  </div>
                  <div
                    style={{
                      padding: '18px 20px',
                      fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace',
                      fontSize: 13,
                      lineHeight: 1.8,
                      color: '#C9D1E3',
                      overflow: 'auto',
                      whiteSpace: 'pre',
                    }}
                  >
                    <div>
                      <span style={{ color: '#A9A2FF' }}>import</span>
                      {' Trevio '}
                      <span style={{ color: '#A9A2FF' }}>from</span> <span style={{ color: '#7EE7E8' }}>'@trevio/sdk'</span>;
                    </div>
                    <div> </div>
                    <div>
                      <span style={{ color: '#A9A2FF' }}>const</span>
                      {' trevio = '}
                      <span style={{ color: '#A9A2FF' }}>new</span> <span style={{ color: '#5ED6F7' }}>Trevio</span>
                      (process.env.TREVIO_KEY);
                    </div>
                    <div> </div>
                    <div>
                      <span style={{ color: '#A9A2FF' }}>await</span>
                      {' trevio.messages.'}
                      <span style={{ color: '#5ED6F7' }}>send</span>
                      {'({'}
                    </div>
                    <div>
                      {'  channel: '}
                      <span style={{ color: '#7EE7E8' }}>'whatsapp'</span>,
                    </div>
                    <div>
                      {'  to: '}
                      <span style={{ color: '#7EE7E8' }}>'+97450000000'</span>,
                    </div>
                    <div>
                      {'  template: '}
                      <span style={{ color: '#7EE7E8' }}>'order_shipped'</span>,
                    </div>
                    <div>{'});'}</div>
                  </div>
                  <div
                    style={{
                      borderTop: '1px solid rgba(255,255,255,0.07)',
                      padding: '12px 20px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 9px',
                        borderRadius: 7,
                        background: 'rgba(255,255,255,0.05)',
                        font: '500 11.5px ui-monospace,Menlo,monospace',
                        color: '#A6ABC4',
                      }}
                    >
                      <span style={{ color: '#1BCECF' }}>POST</span>
                      {' /v1/messages'}
                    </span>
                    <span
                      style={{
                        padding: '4px 9px',
                        borderRadius: 7,
                        background: 'rgba(255,255,255,0.05)',
                        font: '500 11.5px ui-monospace,Menlo,monospace',
                        color: '#A6ABC4',
                      }}
                    >
                      <span style={{ color: '#5ED6F7' }}>GET</span>
                      {' /v1/contacts'}
                    </span>
                    <span
                      style={{
                        padding: '4px 9px',
                        borderRadius: 7,
                        background: 'rgba(255,255,255,0.05)',
                        font: '500 11.5px ui-monospace,Menlo,monospace',
                        color: '#A6ABC4',
                      }}
                    >
                      <span style={{ color: '#A9A2FF' }}>HOOK</span>
                      {' message.received'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="analytics" style={{ scrollMarginTop: 96 }}>
            <div className="split" style={{ display: 'grid', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>
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
                  Analytics
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 'clamp(30px,3.4vw,44px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.035em',
                    fontWeight: 800,
                    textWrap: 'balance',
                  }}
                >
                  See what’s working. Fix what isn’t.
                </h2>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#6B7280', textWrap: 'pretty' }}>
                  Real-time dashboards across channels, teams, campaigns and AI — so every decision is backed by what customers are actually
                  saying.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15.5, lineHeight: 1.5, color: '#1A1A2E' }}>
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
                    Response time, resolution and CSAT
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
                    AI resolution rate and hand-off reasons
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
                    Campaign and conversation revenue
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
                    Scheduled reports and CSV export
                  </span>
                </div>
              </div>
              <div
                className="split-vis-first"
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
                  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 14, fontWeight: 800 }}>Last 7 days</span>
                      <span
                        style={{
                          padding: '5px 10px',
                          borderRadius: 8,
                          background: '#F4F5F8',
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: '#6B7280',
                        }}
                      >
                        All channels
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 10 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span style={{ fontSize: 11, color: '#6B7280' }}>Avg. first response</span>
                        <span style={{ fontSize: 19, fontWeight: 800 }}>1m 42s</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#0B7F80' }}>↓ 38%</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span style={{ fontSize: 11, color: '#6B7280' }}>Resolved by AI</span>
                        <span style={{ fontSize: 19, fontWeight: 800 }}>64%</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#0B7F80' }}>↑ 11 pts</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span style={{ fontSize: 11, color: '#6B7280' }}>CSAT</span>
                        <span style={{ fontSize: 19, fontWeight: 800 }}>4.8</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#0B7F80' }}>↑ 0.3</span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7,minmax(0,1fr))',
                        gap: 10,
                        alignItems: 'end',
                        height: 150,
                        paddingTop: 6,
                        borderBottom: '1px solid #EEF0F4',
                      }}
                    >
                      <span
                        style={{ height: '48%', borderRadius: '6px 6px 0 0', background: 'linear-gradient(180deg,#8378FF,#5ED6F7)' }}
                      ></span>
                      <span
                        style={{ height: '62%', borderRadius: '6px 6px 0 0', background: 'linear-gradient(180deg,#8378FF,#5ED6F7)' }}
                      ></span>
                      <span
                        style={{ height: '55%', borderRadius: '6px 6px 0 0', background: 'linear-gradient(180deg,#8378FF,#5ED6F7)' }}
                      ></span>
                      <span
                        style={{ height: '78%', borderRadius: '6px 6px 0 0', background: 'linear-gradient(180deg,#8378FF,#5ED6F7)' }}
                      ></span>
                      <span
                        style={{ height: '92%', borderRadius: '6px 6px 0 0', background: 'linear-gradient(180deg,#5B247A,#8378FF)' }}
                      ></span>
                      <span
                        style={{ height: '70%', borderRadius: '6px 6px 0 0', background: 'linear-gradient(180deg,#8378FF,#5ED6F7)' }}
                      ></span>
                      <span
                        style={{ height: '58%', borderRadius: '6px 6px 0 0', background: 'linear-gradient(180deg,#8378FF,#5ED6F7)' }}
                      ></span>
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7,minmax(0,1fr))',
                        gap: 10,
                        marginTop: -10,
                        fontSize: 11,
                        color: '#9CA3AF',
                        textAlign: 'center',
                      }}
                    >
                      <span>Sat</span>
                      <span>Sun</span>
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
  );
}
