import OpenAI from 'openai';

export const aiClient = new OpenAI({
  apiKey: process.env.API_KEY,
});

export const aiModel = process.env.AI_MODEL ?? 'gpt-5.4-nano';
