
'use server';

import { generateComparativeAnalysis } from '@/ai/flows/generate-comparative-analysis';
import { summarizeInsiderActivity } from '@/ai/flows/summarize-insider-activity';
import { generateChartData } from '@/lib/mock-data';
import { getSECData } from '@/ai/tools/get-sec-data';

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

export async function getReport(creators: string): Promise<ReportData> {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

  try {
    let summaryResult, analysisResult, filings, trades;

    if (process.env.GEMINI_API_KEY) {
      const [summary, analysis, secData] = await Promise.all([
        summarizeInsiderActivity({ companyTickers: ['TSLA', 'MSFT', 'AAPL', 'GOOGL'] }),
        generateComparativeAnalysis({ companyTickers: ['TSLA', 'MSFT', 'AAPL', 'GOOGL'] }),
        getSECData({ companyTickers: ['TSLA', 'MSFT', 'AAPL', 'GOOGL'] })
      ]);
      summaryResult = summary.summary;
      analysisResult = analysis.analysis;
      filings = secData.filings;
      trades = summary.trades;
    } else {
      summaryResult = "This is a placeholder summary. Add a Gemini API key to .env to see real AI-powered analysis.";
      analysisResult = "This is a placeholder analysis. Add a Gemini API key to .env to see real AI-powered analysis.";
      const secData = await getSECData({ companyTickers: [] });
      filings = secData.filings;
      trades = secData.trades;
    }
    
    if (!summaryResult || !analysisResult) {
        throw new Error("Failed to get analysis from AI");
    }

    const report: ReportData = {
      summary: summaryResult,
      analysis: analysisResult,
      filings: filings,
      trades: trades,
      chartData: generateChartData(),
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
