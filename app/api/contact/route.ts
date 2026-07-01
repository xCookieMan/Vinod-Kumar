import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { moderateMessage } from '@/lib/moderation';

export const dynamic = 'force-dynamic';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validMongoUri() {
  const uri = process.env.MONGODB_URI ?? '';
  return uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://');
}

function validate(payload: ContactPayload) {
  const errors: Record<string, string> = {};
  const name = payload.name?.trim() ?? '';
  const email = payload.email?.trim() ?? '';
  const subject = payload.subject?.trim() ?? '';
  const message = payload.message?.trim() ?? '';

  if (!name) errors.name = 'Full name is required.';
  if (!email) errors.email = 'Email is required.';
  if (email && !emailRegex.test(email)) errors.email = 'Enter a valid email address.';
  if (!subject) errors.subject = 'Subject is required.';
  if (!message) errors.message = 'Message is required.';
  if (message && message.length < 20) errors.message = 'Message must be at least 20 characters.';

  return {
    errors,
    values: { name, email, subject, message }
  };
}

async function sendEmail(values: { name: string; email: string; subject: string; message: string }) {
  const resendKey = process.env.RESEND_API_KEY;
  const recipient = process.env.RECIPIENT_EMAIL;

  if (!resendKey || !recipient) {
    console.error('Resend email skipped: RESEND_API_KEY or RECIPIENT_EMAIL missing.');
    return false;
  }

  const resend = new Resend(resendKey);
  await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: recipient,
    replyTo: values.email,
    subject: `Portfolio Inquiry: ${values.subject}`,
    text: `Name: ${values.name}\nEmail: ${values.email}\nSubject: ${values.subject}\n\n${values.message}`
  });

  return true;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ errors: { form: 'Invalid request body.' } }, { status: 400 });
  }

  const { errors, values } = validate(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const moderation = await moderateMessage(values.message);
  const flagged = !moderation.allowed;
  let emailSent = false;

  if (!flagged) {
    try {
      emailSent = await sendEmail(values);
    } catch (error) {
      console.error('Resend delivery failed:', error);
    }
  }

  if (validMongoUri()) {
    try {
      const [{ default: dbConnect }, { default: ContactLog }] = await Promise.all([
        import('@/lib/mongodb'),
        import('@/models/ContactLog')
      ]);

      await dbConnect();
      await ContactLog.create({
        ...values,
        flagged,
        reason: moderation.reason,
        emailSent
      });
    } catch (error) {
      console.error('ContactLog insert failed:', error);
    }
  } else {
    console.error('ContactLog insert skipped: valid MONGODB_URI missing.');
  }

  return NextResponse.json({ success: true });
}
