
'use server';

import { generateComparativeAnalysis } from '@/ai/flows/generate-comparative-analysis';
import { summarizeInsiderActivity } from '@/ai/flows/summarize-insider-activity';
import { getSECData } from '@/ai/tools/get-sec-data';
import { generateChartData } from '@/lib/mock-data';
import { ReportData } from '@/lib/types';


export async function getReport(creators: string): Promise<ReportData> {
  // In a real app, `creators` would be used to filter data.
  // For now, we'll use a predefined list of tickers.
  const companyTickers = ['TSLA', 'MSFT', 'AAPL', 'GOOGL'];

  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

  try {
    let summary, analysis, filings, trades;

    if (process.env.GEMINI_API_KEY) {
      const [summaryResponse, analysisResponse, secData] = await Promise.all([
        summarizeInsiderActivity({ companyTickers }),
        generateComparativeAnalysis({ companyTickers }),
        getSECData({ companyTickers })
      ]);
      
      if (!summaryResponse.summary || !analysisResponse.analysis) {
        throw new Error("Failed to get analysis from AI");
      }

      summary = summaryResponse.summary;
      analysis = analysisResponse.analysis;
      filings = secData.filings;
      trades = summaryResponse.trades;

    } else {
      // Use mock data and placeholder summaries if no API key is present
      const secData = await getSECData({ companyTickers: [] });
      summary = "This is a placeholder summary. Add a Gemini API key to .env to see real AI-powered analysis.";
      analysis = "This is a placeholder analysis. Add a Gemini API key to .env to see real AI-powered analysis.";
      filings = secData.filings;
      trades = secData.trades;
    }
    
    const report: ReportData = {
      summary: summary,
      analysis: analysis,
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
