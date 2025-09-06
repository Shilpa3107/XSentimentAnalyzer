
'use server';

/**
 * @fileOverview Generates a comparative analysis of insider trading activity.
 *
 * - generateComparativeAnalysis - A function that handles the generation of comparative analysis report.
 * - GenerateComparativeAnalysisInput - The input type for the generateComparativeAnalysis function.
 * - GenerateComparativeAnalysisOutput - The return type for the generateComparativeAnalysis function.
 */

import {ai} from '@/ai/genkit';
import { getInsiderTradingData } from '@/ai/tools/get-sec-data';
import {z} from 'genkit';

const GenerateComparativeAnalysisInputSchema = z.object({
  companyTickers: z.array(z.string()).describe('An array of company ticker symbols to get insider trading data for.'),
});
export type GenerateComparativeAnalysisInput = z.infer<typeof GenerateComparativeAnalysisInputSchema>;

const GenerateComparativeAnalysisOutputSchema = z.object({
  analysis: z.string().describe('A summary of key trends in insider trading activity comparing the last 24 hours to the prior week.'),
});
export type GenerateComparativeAnalysisOutput = z.infer<typeof GenerateComparativeAnalysisOutputSchema>;

export async function generateComparativeAnalysis(input: GenerateComparativeAnalysisInput): Promise<GenerateComparativeAnalysisOutput> {
  return generateComparativeAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateComparativeAnalysisPrompt',
  input: {schema: z.object({
    currentData: z.string().describe('JSON string of current insider trading data.'),
    priorWeekData: z.string().describe('JSON string of prior week insider trading data.'),
  })},
  output: {schema: GenerateComparativeAnalysisOutputSchema},
  prompt: `You are an expert financial analyst. Analyze the following insider trading data to identify key trends and significant changes between the last 24 hours and the prior week.

Current Data: {{{currentData}}}
Prior Week Data: {{{priorWeekData}}}

Provide a concise summary of the key trends and significant changes in insider trading activity. Focus on any unusual or noteworthy patterns.`,
});

const generateComparativeAnalysisFlow = ai.defineFlow(
  {
    name: 'generateComparativeAnalysisFlow',
    inputSchema: GenerateComparativeAnalysisInputSchema,
    outputSchema: GenerateComparativeAnalysisOutputSchema,
    tools: [getInsiderTradingData]
  },
  async (input) => {
    const [currentData, priorWeekData] = await Promise.all([
        getInsiderTradingData({ ...input, timePeriod: 'last_24_hours' }),
        getInsiderTradingData({ ...input, timePeriod: 'prior_week' })
    ]);

    const {output} = await prompt({
        currentData: JSON.stringify(currentData),
        priorWeekData: JSON.stringify(priorWeekData)
    });
    return output!;
  }
);
