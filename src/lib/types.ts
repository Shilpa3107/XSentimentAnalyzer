import type { z } from 'genkit';
import type { filingSchema, insiderTradeSchema } from '@/ai/schemas';

export interface ReportData {
  summary: string;
  analysis: string;
  filings: z.infer<typeof filingSchema>[];
  trades: z.infer<typeof insiderTradeSchema>[];
  chartData: { name: string; 'Last 24h': number; 'Prior Week': number }[];
}
