/// <reference types="vite/client" />
/**
 * AI Service - Optional OpenAI integration for Concept Bridge personalization.
 * Falls back to pre-written content if no API key is set.
 */

interface AIPersonalization {
  personalizedExplanation: string;
  encouragement: string;
}

const API_URL = 'https://api.openai.com/v1/chat/completions';

export async function getPersonalizedContent(
  concept: string,
  stars: number,
  attempts: number,
  hintsUsed: number,
  timeSpent: number
): Promise<AIPersonalization | null> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a friendly CS tutor in a fantasy game. Give brief, encouraging explanations of algorithms. Keep responses under 100 words. Use simple language.',
          },
          {
            role: 'user',
            content: `The player just completed a puzzle about "${concept}". They got ${stars}/3 stars, made ${attempts} mistakes, used ${hintsUsed} hints, and took ${timeSpent} seconds. Give a personalized explanation and encouragement.`,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) return null;

    return {
      personalizedExplanation: content,
      encouragement: stars === 3
        ? 'Perfect mastery!'
        : stars === 2
          ? 'Great work! A little more practice and you\'ll master this.'
          : 'You completed it! Each attempt teaches something new.',
    };
  } catch {
    return null;
  }
}
