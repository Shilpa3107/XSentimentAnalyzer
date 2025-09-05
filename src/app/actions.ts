
'use server';

import { generateComparativeAnalysis } from '@/ai/flows/generate-comparative-analysis';
import { summarizeInsiderActivity } from '@/ai/flows/summarize-insider-activity';
import { insiderTrades, recentFilings, mockCurrentData, mockPriorWeekData } from '@/lib/mock-data';

export interface ReportData {
  summary: string;
  analysis: string;
  chartData: {
    name: string;
    'Last 24h': number;
    'Prior Week': number;
  }[];
  filings: {
    id: string;
    creator: string;
    filingType: string;
    date: string;
    link: string;
  }[];
  trades: {
    id: string;
    insiderName: string;
    relation: string;
    lastReported: string;
    transactionType: 'Buy' | 'Sell';
    value: string;
    shares: string;
    company: string;
  }[];
}

export async function getReport(creators: string): Promise<Omit<ReportData, 'chartData'>> {
  // In a real app, `creators` would be used to filter data.
  // Here, we proceed with mock data.
  
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

  try {
    const insiderActivityJson = JSON.stringify(insiderTrades);
    let summaryResult, analysisResult;

    if (process.env.GEMINI_API_KEY) {
        [summaryResult, analysisResult] = await Promise.all([
          summarizeInsiderActivity({ insiderActivityData: insiderActivityJson }),
          generateComparativeAnalysis({
            currentData: JSON.stringify(mockCurrentData),
            priorWeekData: JSON.stringify(mockPriorWeekData),
          }),
        ]);
    } else {
        summaryResult = { summary: "This is a placeholder summary. Add a Gemini API key to .env to see real AI-powered analysis." };
        analysisResult = { analysis: "This is a placeholder analysis. Add a Gemini API key to .env to see real AI-powered analysis." };
    }
    
    if (!summaryResult.summary || !analysisResult.analysis) {
        throw new Error("Failed to get analysis from AI");
    }

    const report: Omit<ReportData, 'chartData'> = {
      summary: summaryResult.summary,
      analysis: analysisResult.analysis,
      filings: recentFilings,
      trades: insiderTrades,
    };
    
    return report;
  } catch (error) {
    console.error('Error generating report:', error);
    if (error instanceof Error && error.message.includes('GEMINI_API_KEY')) {
        throw new Error('The Gemini API key is not configured. Please add it to your .env file.');
    }
    throw new Error('Failed to generate report. The AI service might be unavailable.');
  }
}
