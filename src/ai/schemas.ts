import { z } from 'genkit';

export const filingSchema = z.object({
  id: z.string(),
  creator: z.string(),
  filingType: z.string(),
  date: z.string(),
  link: z.string(),
});

export const insiderTradeSchema = z.object({
  id: z.string(),
  insiderName: z.string(),
  relation: z.string(),
  lastReported: z.string(),
  transactionType: z.enum(['Buy', 'Sell']),
  value: z.string(),
  shares: z.string(),
  company: z.string(),
});
