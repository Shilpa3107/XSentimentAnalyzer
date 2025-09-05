'use server';

import { ai } from '@/ai/genkit';
import { recentFilings, insiderTrades } from '@/lib/mock-data';
import { z } from 'genkit';
import { filingSchema, insiderTradeSchema } from '@/ai/schemas';

export const getSECData = ai.defineTool(
  {
    name: 'getSECData',
    description: 'Returns recent SEC filings and insider trading data for a given list of companies.',
    inputSchema: z.object({
        companyTickers: z.array(z.string()).describe('An array of company ticker symbols.'),
    }),
    outputSchema: z.object({
        filings: z.array(filingSchema),
        trades: z.array(insiderTradeSchema),
    }),
  },
  async (input) => {
    // In a real app, you would use the companyTickers to fetch data from an API.
    // For now, we'll return mock data.
    console.log(`Fetching SEC data for: ${input.companyTickers.join(', ')}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return {
        filings: recentFilings,
        trades: insiderTrades,
    };
  }
);


export const getInsiderTradingData = ai.defineTool(
    {
        name: 'getInsiderTradingData',
        description: 'Returns insider trading data for a given list of companies and time period.',
        inputSchema: z.object({
            companyTickers: z.array(z.string()).describe('An array of company ticker symbols.'),
            timePeriod: z.enum(['last_24_hours', 'prior_week']).describe('The time period to fetch data for.'),
        }),
        outputSchema: z.array(insiderTradeSchema),
    },
    async (input) => {
        // In a real app, you would use the companyTickers and timePeriod to fetch data from an API.
        console.log(`Fetching insider trading data for ${input.timePeriod} for: ${input.companyTickers.join(', ')}`);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        
        if (input.timePeriod === 'last_24_hours') {
            return insiderTrades.slice(0, 2); // Return a subset for "last 24 hours"
        }
        return insiderTrades; // Return all for "prior week"
    }
);
