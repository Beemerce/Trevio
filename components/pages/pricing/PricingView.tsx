'use client';

import Link from 'next/link';
import { SITE } from '@/lib/site';
import { Fragment, useState } from 'react';
import './pricing.css';

const FAQ: [string, string][] = [
  ['Are prices billed monthly or annually?', 'Both. Pay monthly for flexibility, or pay annually and get 2 months free. All prices are in QAR, and a monthly plan can be upgraded to annual billing at any time.'],
  ['Is there a free trial?', 'Yes. Every plan starts with a 3-day free trial, so your team can connect channels and test the platform before committing.'],
  ['How does AI work, and how is AI usage billed?', 'Trevio connects to OpenAI and other AI services through its REST API module, and to MCP servers. You bring your own AI account, and AI usage is billed directly by that provider at their published rates. Trevio does not charge for AI usage.'],
  ['Can I change plans later?', 'Absolutely. Upgrade at any time and we’ll credit the unused portion of your current plan. Downgrades take effect at renewal.'],
  ['Do you help with WhatsApp Business API setup?', 'Yes. Our Doha team handles verification, number migration and template approvals as part of onboarding on every plan.'],
];

type Plan = {
  name: string;
  tagline: string;
  price: string;
  monthly: string;
  href: string;
  popular?: boolean;
  features: string[];
};

const SIGNUP = `${SITE.signUpUrl}?plan=`;

const PLANS: Plan[] = [
  {
    name: 'Startup Plan',
    tagline: 'Perfect for small businesses and individuals',
    price: '2,000',
    monthly: '200',
    href: `${SIGNUP}startup`,
    features: [
      'Up to 5 User Agents',
      'Up to 20k Conversation P/m',
      'Bulk Broadcast',
      '1 Chatbot (Flow)',
      'Native WhatsApp Flows',
      'API & Webhooks',
      'Payment Gateways',
      'Google Sheet Integration',
      'WhatsApp Store',
      'Shopify/WooCommerce/Ecwid',
      'Fb/ Instagram Lead Ad Automation',
      'Appointment Booking System',
    ],
  },
  {
    name: 'Growth Plan',
    tagline: 'Best for growing businesses and teams',
    price: '5,000',
    monthly: '500',
    href: `${SIGNUP}medium`,
    popular: true,
    features: [
      '20 User Agents',
      '100k Contacts',
      'Up to 50k Conversation P/m',
      '20 Chatbots (Flow)',
      'Native WhatsApp Flows',
      'API & Webhooks',
      'eCommerce Bot Included',
      'Payment Gateways',
      'Google Sheet Integration',
      'All Integrations',
      'WhatsApp Store',
      'Shopify/WooCommerce/Ecwid',
      'Fb/ Instagram Lead Ad Automation',
      'Appointment Booking System',
      'ChatGPT Integration',
      'AI Agent',
      'OpenAI Chat using Business Data',
      'Text & Voice Conversation AI',
    ],
  },
  {
    name: 'Premium Plan',
    tagline: 'Ideal for large businesses and enterprises',
    price: '10,000',
    monthly: '1,000',
    href: `${SIGNUP}premium`,
    features: [
      '100 User Agents',
      '500k Contacts',
      'Up to 100k Conversation P/m',
      '100 Chatbots(Flow)',
      'Native WhatsApp Flows',
      'API & Webhooks',
      'Google Sheet Integration',
      'All Integrations',
      'WhatsApp Store',
      'Shopify/WooCommerce/Ecwid',
      'Payment Gateways',
      'Fb/ Instagram Lead Ad Automation',
      'Appointment Booking System',
      'ChatGPT Integration',
      'AI Agent',
      'OpenAI Chat using Business Data',
      'Text & Voice Conversation AI',
      'Custom Integration Support',
      'Dedicated Support',
    ],
  },
];

const ENTERPRISE_TAGS = ['Dedicated Support', 'Custom Development', 'Enterprise Security', 'SLA Guarantees'];

const GRADIENT_TEXT = {
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

function Check() {
  return (
    <svg
      style={{ flex: 'none', marginTop: 2 }}
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
  );
}

type Billing = 'monthly' | 'annual';

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const { popular } = plan;
  const monthly = billing === 'monthly';
  return (
    <div
      className={popular ? 'pr-growth' : undefined}
      style={
        popular
          ? {
              position: 'relative',
              borderRadius: 20,
              border: '2px solid transparent',
              background:
                'linear-gradient(180deg,#F7F5FF,#F0FAFD) padding-box,linear-gradient(135deg,#5ED6F7,#8378FF 55%,#5B247A) border-box',
              boxShadow: '0 36px 70px -30px rgba(131,120,255,0.6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }
          : {
              borderRadius: 18,
              border: '1px solid #E8E9EF',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(26,26,46,0.04),0 20px 40px -32px rgba(26,26,46,0.3)',
              padding: '34px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }
      }
    >
      {popular && (
        <span
          style={{
            position: 'absolute',
            top: -15,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '6px 14px',
            borderRadius: 999,
            background: 'linear-gradient(100deg,#5B247A,#8378FF 60%,#5ED6F7)',
            color: '#fff',
            fontSize: 12.5,
            fontWeight: 800,
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 20px -8px rgba(131,120,255,0.8)',
          }}
        >
          Popular
        </span>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 19, fontWeight: 800 }}>{plan.name}</span>
        <span style={{ fontSize: 14.5, color: '#6B7280', lineHeight: 1.55 }}>{plan.tagline}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: popular ? '#8378FF' : '#6B7280' }}>QAR</span>
          <span
            style={{
              fontSize: popular ? 60 : 52,
              fontWeight: 800,
              letterSpacing: popular ? '-0.045em' : '-0.04em',
              lineHeight: 1,
              ...(popular ? { background: 'linear-gradient(90deg,#5B247A,#8378FF)', ...GRADIENT_TEXT } : {}),
            }}
          >
            {monthly ? plan.monthly : plan.price}
          </span>
          <span style={{ fontSize: 14, color: '#6B7280' }}>{monthly ? '/mo' : '/yr'}</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0B8F90' }}>
          {monthly ? `or QAR ${plan.price}/yr with annual billing` : '2 months free'}
        </span>
      </div>
      <div style={{ height: 1, background: popular ? 'rgba(131,120,255,0.22)' : '#EEF0F4' }}></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 13, fontSize: 15, lineHeight: 1.45 }}>
        {plan.features.map((f) => (
          <span key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <Check />
            {f}
          </span>
        ))}
      </div>
      <a
        className={popular ? 'hv-bright' : 'hv-outline'}
        href={plan.href}
        style={
          popular
            ? {
                marginTop: 'auto',
                height: 52,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#fff',
                whiteSpace: 'nowrap',
                background: 'linear-gradient(100deg,#5B247A,#8378FF 70%,#5ED6F7 140%)',
                boxShadow: '0 14px 28px -12px rgba(91,36,122,0.7)',
              }
            : {
                marginTop: 'auto',
                height: 50,
                borderRadius: 12,
                border: '1.5px solid #D8D6EE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#1A1A2E',
                whiteSpace: 'nowrap',
              }
        }
      >
        Get Started
      </a>
    </div>
  );
}

export function PricingView() {
  const [open, setOpen] = useState(0);
  const [billing, setBilling] = useState<Billing>('annual');
  const faqs = FAQ.map(([q, a], i) => ({
    q,
    a,
    id: `faq-${i}`,
    open: open === i,
    rot: open === i ? 'rotate(180deg)' : 'none',
    chevBg: open === i ? 'rgba(27,206,207,0.12)' : 'transparent',
    toggle: () => setOpen((o) => (o === i ? -1 : i)),
  }));

  return (
    <>
      <section style={{ padding: 'clamp(72px,9vw,120px) 0 clamp(40px,5vw,64px)', background: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: 820,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 20,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg,#5B247A,#1BCECF)',
              ...GRADIENT_TEXT,
            }}
          >
            Pricing
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
            <span style={{ background: 'linear-gradient(90deg,#5B247A 0%,#8378FF 50%,#1BCECF 100%)', ...GRADIENT_TEXT }}>
              Transparent Pricing
            </span>
            {' for Your Business Needs'}
          </h1>
          <p
            style={{ margin: 0, maxWidth: 600, fontSize: 'clamp(17px,1.5vw,19px)', lineHeight: 1.65, color: '#6B7280', textWrap: 'pretty' }}
          >
            Choose the plan that best fits your WhatsApp marketing strategy
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div
              role="group"
              aria-label="Billing period"
              style={{ display: 'inline-flex', padding: 4, borderRadius: 999, background: '#F3F4F8', fontSize: 14, fontWeight: 700 }}
            >
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                aria-pressed={billing === 'monthly'}
                style={{
                  padding: '8px 18px',
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  font: 'inherit',
                  color: billing === 'monthly' ? '#fff' : '#6B7280',
                  background: billing === 'monthly' ? 'linear-gradient(100deg,#5B247A,#8378FF)' : 'transparent',
                }}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('annual')}
                aria-pressed={billing === 'annual'}
                style={{
                  padding: '8px 18px',
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  font: 'inherit',
                  color: billing === 'annual' ? '#fff' : '#6B7280',
                  background: billing === 'annual' ? 'linear-gradient(100deg,#5B247A,#8378FF)' : 'transparent',
                }}
              >
                Annually
              </button>
            </div>
            <span
              style={{
                padding: '5px 12px',
                borderRadius: 999,
                background: 'rgba(27,206,207,0.12)',
                color: '#0B8F90',
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              2 months free on annual billing
            </span>
          </div>
        </div>
      </section>
      <section style={{ padding: 'clamp(24px,3vw,40px) 0 clamp(88px,10vw,128px)', background: '#FFFFFF' }}>
        <div
          className="pr-plans"
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gap: 24,
            alignItems: 'stretch',
          }}
        >
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} billing={billing} />
          ))}
        </div>
        <div style={{ maxWidth: 1180, margin: '48px auto 0', padding: '0 24px' }}>
          <div
            style={{
              borderRadius: 18,
              border: '1px solid #E8E9EF',
              background: '#F8F9FB',
              padding: 'clamp(28px,3.5vw,40px)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 28,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 560 }}>
              <span style={{ fontSize: 22, fontWeight: 800 }}>Enterprise / Custom Plan</span>
              <span style={{ fontSize: 15.5, lineHeight: 1.65, color: '#6B7280' }}>
                Looking for more limits? Enterprise-level data protection, dedicated support, and custom requirements?
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 }}>
                {ENTERPRISE_TAGS.map((t) => (
                  <span
                    key={t}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '7px 14px',
                      borderRadius: 999,
                      background: '#fff',
                      border: '1px solid #E6E7EE',
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1BCECF"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Link
              className="hv-navy"
              href="/about#contact-form"
              style={{
                height: 50,
                padding: '0 28px',
                borderRadius: 12,
                display: 'inline-flex',
                alignItems: 'center',
                fontWeight: 700,
                color: '#fff',
                whiteSpace: 'nowrap',
                background: '#1A1A2E',
              }}
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
      <section
        style={{
          padding: 'clamp(80px,10vw,120px) 0',
          background: '#F8F9FB',
          borderTop: '1px solid #EEF0F4',
          borderBottom: '1px solid #EEF0F4',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div
            style={{
              maxWidth: 640,
              margin: '0 auto',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
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
              Add-ons
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(30px,3.8vw,46px)', lineHeight: 1.1, letterSpacing: '-0.035em', fontWeight: 800 }}>
              Extend Your Plan.
            </h2>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: '#6B7280' }}>Add exactly what you need, on any plan.</p>
          </div>
          <div className="pr-addons" style={{ display: 'grid', gap: 16 }}>
            <div
              style={{
                padding: 22,
                borderRadius: 14,
                background: '#fff',
                border: '1px solid #E6E7EE',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6"></path>
                </svg>
              </span>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Extra agent seats</span>
              <span style={{ fontSize: 14, lineHeight: 1.55, color: '#6B7280' }}>Grow your team one seat at a time.</span>
            </div>
            <div
              style={{
                padding: 22,
                borderRadius: 14,
                background: '#fff',
                border: '1px solid #E6E7EE',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </span>
              <span style={{ fontSize: 16, fontWeight: 700 }}>WhatsApp Calls</span>
              <span style={{ fontSize: 14, lineHeight: 1.55, color: '#6B7280' }}>Voice calling with recordings and AI summaries.</span>
            </div>
            <div
              style={{
                padding: 22,
                borderRadius: 14,
                background: '#fff',
                border: '1px solid #E6E7EE',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
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
                  <path d="M2 3h20v14H2zM8 21h8M12 17v4"></path>
                </svg>
              </span>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Additional numbers</span>
              <span style={{ fontSize: 14, lineHeight: 1.55, color: '#6B7280' }}>Connect more WhatsApp numbers or brands.</span>
            </div>
            <div
              style={{
                padding: 22,
                borderRadius: 14,
                background: '#fff',
                border: '1px solid #E6E7EE',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
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
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 16v-4M12 8h.01"></path>
                </svg>
              </span>
              <span style={{ fontSize: 16, fontWeight: 700 }}>{'Onboarding & training'}</span>
              <span style={{ fontSize: 14, lineHeight: 1.55, color: '#6B7280' }}>Hands-on setup by our Doha team.</span>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: 'clamp(64px,8vw,96px) 0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              borderRadius: 16,
              border: '1px solid rgba(27,206,207,0.35)',
              background: 'rgba(27,206,207,0.06)',
              padding: 'clamp(24px,3.5vw,36px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 14,
            }}
          >
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(27,206,207,0.14)',
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
                stroke="#0B8F90"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01"></path>
              </svg>
            </span>
            <span style={{ fontSize: 18, fontWeight: 800 }}>Third-party costs are billed separately</span>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: '#4B5163', maxWidth: 680, textWrap: 'pretty' }}>
              Plan prices cover the Trevio platform only. WhatsApp conversation fees charged by Meta, payment gateway fees and usage of
              AI services connected through the REST API module or MCP servers are billed separately by those providers, at their published rates.
              Prices shown exclude any applicable taxes.
            </p>
          </div>
        </div>
      </section>
      <section style={{ padding: 'clamp(40px,5vw,64px) 0 clamp(88px,10vw,128px)', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
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
              FAQ
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(30px,3.8vw,46px)', lineHeight: 1.1, letterSpacing: '-0.035em', fontWeight: 800 }}>
              Questions, answered.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #ECEDF2' }}>
            {faqs.map((q, qI) => (
              <Fragment key={qI}>
                <div style={{ borderBottom: '1px solid #ECEDF2' }}>
                  <button
                    onClick={q.toggle}
                    aria-expanded={q.open}
                    aria-controls={q.id}
                    type="button"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: '22px 4px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: '#1A1A2E',
                    }}
                  >
                    <span style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.4 }}>{q.q}</span>
                    <span
                      style={{
                        flex: 'none',
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all .25s ease',
                        background: q.chevBg,
                      }}
                    >
                      <svg
                        style={{ transition: 'transform .25s ease', transform: q.rot }}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1BCECF"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </span>
                  </button>
                  {q.open && (
                    <>
                      <p id={q.id} style={{ margin: 0, padding: '0 52px 24px 4px', fontSize: 15.5, lineHeight: 1.7, color: '#6B7280' }}>{q.a}</p>
                    </>
                  )}
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
            Not sure which plan fits?
          </h2>
          <p style={{ margin: 0, fontSize: 18.5, lineHeight: 1.6, color: '#fff', maxWidth: 580 }}>
            Talk to our team in Doha and we’ll recommend the right setup for your channels, volume and goals.
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
