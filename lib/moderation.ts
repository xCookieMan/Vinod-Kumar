const blockedTerms = [
  'abuse',
  'scam',
  'casino',
  'crypto giveaway',
  'viagra',
  'loan approval',
  'free money',
  'adult content'
];

function countUrls(message: string) {
  return (message.match(/https?:\/\/|www\./gi) ?? []).length;
}

function capitalRatio(message: string) {
  const letters = message.replace(/[^a-z]/gi, '');
  if (!letters.length) return 0;
  const capitals = letters.replace(/[^A-Z]/g, '');
  return capitals.length / letters.length;
}

async function classifyWithGroq(message: string): Promise<{ allowed: boolean; reason: string | null }> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return { allowed: true, reason: null };

  try {
    const controller = new AbortController();
    const timeout = windowlessTimeout(() => controller.abort(), 3500);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        temperature: 0,
        messages: [
          {
            role: 'system',
            content:
              'Classify a portfolio contact form message. Return only ALLOW or BLOCK. Block clear spam, abuse, harassment, phishing, or promotional junk.'
          },
          { role: 'user', content: message.slice(0, 2000) }
        ]
      })
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.error('Groq moderation failed:', response.status);
      return { allowed: true, reason: null };
    }

    const data = await response.json();
    const content = String(data?.choices?.[0]?.message?.content ?? '').toUpperCase();
    if (content.includes('BLOCK')) {
      return { allowed: false, reason: 'groq_classification' };
    }
  } catch (error) {
    console.error('Groq moderation unavailable:', error);
  }

  return { allowed: true, reason: null };
}

function windowlessTimeout(callback: () => void, delay: number) {
  return setTimeout(callback, delay);
}

export async function moderateMessage(message: string): Promise<{ allowed: boolean; reason: string | null }> {
  const normalized = message.toLowerCase().trim();

  const blockedTerm = blockedTerms.find((term) => normalized.includes(term));
  if (blockedTerm) {
    return { allowed: false, reason: `blocked_term:${blockedTerm}` };
  }

  if (countUrls(message) > 3) {
    return { allowed: false, reason: 'too_many_urls' };
  }

  if (capitalRatio(message) > 0.7 && message.replace(/\s/g, '').length > 20) {
    return { allowed: false, reason: 'excessive_capitals' };
  }

  if (/(.)\1{4,}/.test(message)) {
    return { allowed: false, reason: 'repeated_characters' };
  }

  return classifyWithGroq(message);
}
