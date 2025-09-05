'use server';

/**
 * @fileOverview Summarizes the most active insider trading activities detected today.
 *
 * - summarizeInsiderActivity - A function that summarizes insider trading activities.
 * - SummarizeInsiderActivityInput - The input type for the summarizeInsiderActivity function.
 * - SummarizeInsiderActivityOutput - The return type for the summarizeInsiderActivity function.
 */

import {ai} from '@/ai/genkit';
import { getInsiderTradingData } from '@/ai/tools/get-sec-data';
import { insiderTradeSchema } from '@/ai/schemas';
import {z} from 'genkit';

const SummarizeInsiderActivityInputSchema = z.object({
  companyTickers: z.array(z.string()).describe('An array of company ticker symbols to get insider trading data for.'),
});
export type SummarizeInsiderActivityInput =
  z.infer<typeof SummarizeInsiderActivityInputSchema>;

const SummarizeInsiderActivityOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the most active insider trading activities detected today.'
    ),
  trades: z.array(insiderTradeSchema).describe('The most active insider trades in the last 24 hours.')
});
export type SummarizeInsiderActivityOutput =
  z.infer<typeof SummarizeInsiderActivityOutputSchema>;

export async function summarizeInsiderActivity(
  input: SummarizeInsiderActivityInput
): Promise<SummarizeInsiderActivityOutput> {
  return summarizeInsiderActivityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeInsiderActivityPrompt',
  input: {schema: z.object({ insiderActivityData: z.string() })},
  output: {schema: z.object({ summary: z.string() })},
  prompt: `You are an expert financial analyst.

  You will receive insider trading activity data and provide a concise summary of the most active insider trading activities detected today.

  Insider Activity Data: {{{insiderActivityData}}}

  Summary:`,
});

const summarizeInsiderActivityFlow = ai.defineFlow(
  {
    name: 'summarizeInsiderActivityFlow',
    inputSchema: SummarizeInsiderActivityInputSchema,
    outputSchema: SummarizeInsiderActivityOutputSchema,
    tools: [getInsiderTradingData]
  },
  async (input, streamingCallback) => {
    const trades = await getInsiderTradingData({ ...input, timePeriod: 'last_24_hours' });
    const {output} = await prompt({insiderActivityData: JSON.stringify(trades)});

    return {
      summary: output!.summary,
      trades: trades,
    }
  }
);
