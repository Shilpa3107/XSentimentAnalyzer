
'use client';

<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import { useState } from 'react';
>>>>>>> af44e60 (Initial prototype)
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Search } from 'lucide-react';
import ReportDisplay from '@/components/report-display';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getReport, type ReportData } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
<<<<<<< HEAD
import { generateChartData } from '@/lib/mock-data';
=======
>>>>>>> af44e60 (Initial prototype)

const formSchema = z.object({
  creators: z.string().min(1, {
    message: 'Please enter at least one X creator handle.',
  }),
});

export default function DashboardClient() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
<<<<<<< HEAD
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
=======
>>>>>>> af44e60 (Initial prototype)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      creators: 'elonmusk, satyanadella',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setReportData(null);
    try {
      const data = await getReport(values.creators);
      setReportData(data);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate the report. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

<<<<<<< HEAD
  if (!isMounted) {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Monitor X Creators</CardTitle>
                    <CardDescription>
                        Enter X creator handles separated by commas to analyze their related SEC filings and insider trading activity.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full sm:w-auto px-8" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  }

=======
>>>>>>> af44e60 (Initial prototype)
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Monitor X Creators</CardTitle>
          <CardDescription>
            Enter X creator handles separated by commas to analyze their related SEC filings and insider trading activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <FormField
                control={form.control}
                name="creators"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="sr-only">X Creators</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., elonmusk, satyanadella" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Generate Report
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className="grid gap-8">
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                    <CardContent><Skeleton className="h-20 w-full" /></CardContent>
                </Card>
                <Card>
                    <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                    <CardContent><Skeleton className="h-20 w-full" /></CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader>
                <CardContent><Skeleton className="aspect-video w-full" /></CardContent>
            </Card>
        </div>
      )}

      {reportData && <ReportDisplay reportData={reportData} />}
    </div>
  );
}
