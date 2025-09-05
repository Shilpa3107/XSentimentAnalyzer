'use server';

/**
 * @fileOverview Summarizes the most active insider trading activities detected today.
 *
 * - summarizeInsiderActivity - A function that summarizes insider trading activities.
 * - SummarizeInsiderActivityInput - The input type for the summarizeInsiderActivity function.
 * - SummarizeInsiderActivityOutput - The return type for the summarizeInsiderActivity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeInsiderActivityInputSchema = z.object({
  insiderActivityData: z
    .string()
    .describe(
      'The insider activity data retrieved from the SEC website in JSON format.'
    ),
});
export type SummarizeInsiderActivityInput =
  z.infer<typeof SummarizeInsiderActivityInputSchema>;

const SummarizeInsiderActivityOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the most active insider trading activities detected today.'
    ),
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
  input: {schema: SummarizeInsiderActivityInputSchema},
  output: {schema: SummarizeInsiderActivityOutputSchema},
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
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
