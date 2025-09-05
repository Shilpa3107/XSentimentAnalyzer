
import DashboardClient from "@/components/dashboard-client";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-8 w-8 text-primary">
                <rect width="256" height="256" fill="none"/>
                <path d="M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm-1.2,168a72,72,0,0,1-70.8-72.2C56.3,95.3,74.5,72,104,72a56,56,0,0,1,56,56,40.1,40.1,0,0,1-2,12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                <path d="M128,192a72,72,0,0,0,70.8-72.2c-.3-24.5-18.5-47-48-47a56,56,0,0,0-56,56,40.1,40.1,0,0,0,2,12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                <line x1="104" y1="128" x2="152" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
              </svg>
              <h1 className="text-xl font-bold tracking-tight font-headline">
                X Sentiment Analyzer
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <DashboardClient />
      </main>
    </div>
  );
}
