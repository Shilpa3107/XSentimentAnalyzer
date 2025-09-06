# X Sentiment Analyzer

This is a Next.js application that leverages Genkit and Gemini AI to analyze SEC filings and insider trading activity related to specified X (formerly Twitter) creators. It provides AI-powered summaries and a visual dashboard to help users quickly understand key financial trends.

## Features

- **AI-Powered Analysis**: Uses Gemini to summarize insider trading activity and generate comparative analysis reports.
- **Dynamic Reporting**: Enter X creator handles to generate a detailed report on demand.
- **Data Visualization**: Includes a bar chart to compare trading activity between the last 24 hours and the prior week.
- **Detailed Tables**: Displays recent insider trades and SEC filings in easy-to-read tables.
- **Responsive Design**: A modern, clean UI built with ShadCN and Tailwind CSS that works on all devices.
- **Mock Data Fallback**: The application is fully functional without an API key, using mock data for demonstration purposes.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation & Running the App

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```
    *Note: The application will run with mock data if the API key is not provided.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **AI/ML**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with [Google's Gemini Model](https://deepmind.google/technologies/gemini/)
- **UI**: [React](https://react.dev/), [ShadCN UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Styling**: CSS-in-JS with HSL variables for easy theming.
- **Language**: [TypeScript](https://www.typescriptlang.org/)
