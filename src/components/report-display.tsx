
'use client';

import type { ReportData } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ArrowDownRight, ArrowUpRight, BookOpen, LineChart, MessageSquareQuote } from 'lucide-react';
import Link from 'next/link';

interface ReportDisplayProps {
  reportData: ReportData;
}

const chartConfig = {
  'last24h': {
    label: 'Last 24h',
    color: 'hsl(var(--primary))',
  },
  'priorWeek': {
    label: 'Prior Week',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

export default function ReportDisplay({ reportData }: ReportDisplayProps) {
  const { summary, analysis, chartData, filings, trades } = reportData;
  
  if (!chartData) return null;

  return (
    <div className="grid gap-8 animate-in fade-in-50">
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Insider Activity Summary</CardTitle>
            <MessageSquareQuote className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Comparative Analysis</CardTitle>
            <LineChart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{analysis}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Comparison: Last 24h vs. Prior Week</CardTitle>
          <CardDescription>
            A visual comparison of insider trading volume.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="Last 24h" fill="var(--color-last24h)" radius={4} />
                <Bar dataKey="Prior Week" fill="var(--color-priorWeek)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Insider Trading Activity</CardTitle>
            <CardDescription>Most active insider trades in the last 24 hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Insider</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>
                      <div className="font-medium">{trade.insiderName}</div>
                      <div className="text-sm text-muted-foreground">{trade.company} - {trade.relation}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={trade.transactionType === 'Buy' ? 'default' : 'destructive'} className={trade.transactionType === 'Buy' ? 'border-transparent bg-green-500/20 text-green-700 hover:bg-green-500/30 dark:bg-green-500/10 dark:text-green-400' : 'border-transparent bg-red-500/20 text-red-700 hover:bg-red-500/30 dark:bg-red-500/10 dark:text-red-400'}>
                        {trade.transactionType === 'Buy' ? 
                            <ArrowUpRight className="mr-1 h-3 w-3" /> : 
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                        }
                        {trade.transactionType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{trade.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent SEC Filings</CardTitle>
            <CardDescription>Filings related to monitored creators.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
              {filings.map((filing) => (
                <div key={filing.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-md bg-secondary p-2">
                        <BookOpen className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{filing.filingType} - @{filing.creator}</div>
                      <div className="text-sm text-muted-foreground">{filing.date}</div>
                    </div>
                  </div>
                  <Link href={filing.link} target="_blank" rel="noopener noreferrer">
                     <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
