import { config } from 'dotenv';
config();

import '@/ai/flows/generate-comparative-analysis.ts';
import '@/ai/flows/summarize-insider-activity.ts';
import '@/ai/tools/get-sec-data.ts';
