import { NextResponse } from 'next/server';

const FIELDS = ['name', 'company', 'email', 'phone', 'subject', 'message'] as const;
const SUBJECTS = ['General Enquiry', 'Request a Demo', 'Partnership', 'Technical Support', 'Pricing', 'Other'];

/**
 * Receives the About/Contact form and forwards it to the Trevio webhook set in TREVIO_CONTACT_WEBHOOK_URL.
 * The webhook URL stays server-side so it is never exposed to the browser.
 */
export async function POST(req: Request) {
  const webhook = process.env.TREVIO_CONTACT_WEBHOOK_URL;
  if (!webhook) {
    console.error('TREVIO_CONTACT_WEBHOOK_URL is not set');
    return NextResponse.json({ error: 'Contact form is not configured' }, { status: 503 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const data = Object.fromEntries(FIELDS.map((k) => [k, typeof raw[k] === 'string' ? (raw[k] as string).trim().slice(0, 5000) : '']));
  if (!data.name || !data.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: 'Name, a valid email and a message are required' }, { status: 422 });
  }
  if (!SUBJECTS.includes(data.subject)) data.subject = 'Other';

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (process.env.TREVIO_CONTACT_WEBHOOK_SECRET) headers.Authorization = `Bearer ${process.env.TREVIO_CONTACT_WEBHOOK_SECRET}`;

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers,
      body: JSON.stringify({ source: 'trevio.ai/contact', submittedAt: new Date().toISOString(), ...data }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error('Contact webhook responded', res.status);
      return NextResponse.json({ error: 'Upstream error' }, { status: 502 });
    }
  } catch (err) {
    console.error('Contact webhook failed', err);
    return NextResponse.json({ error: 'Upstream error' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
