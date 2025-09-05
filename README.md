# X Sentiment Analyzer

This is a Next.js application that allows users to monitor and analyze the financial activities related to X (formerly Twitter) creators. It leverages AI to provide insightful summaries and comparative analysis of SEC filings and insider trading data.

## Features

- **Monitor X Creators**: Enter X creator handles to fetch and analyze related financial data.
- **AI-Powered Analysis**: Utilizes Genkit to generate summaries of insider trading activity and compare recent trends against historical data.
- **Interactive Dashboard**: Displays analysis results, including charts, data tables for recent trades, and a list of SEC filings.
- **Modern Tech Stack**: Built with Next.js, React, ShadCN UI, and Tailwind CSS for a responsive and modern user experience.
- **Flexible AI Backend**: Can run with a real AI model (Google's Gemini) or in a "no-key" mode that uses mock data, perfect for local development.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Shilpa3107/XSentimentAnalyzer
    cd XSentimentAnalyzer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Configuration

1.  **Create an environment file:**

    Create a file named `.env` in the root of the project.

2.  **Add your Gemini API Key (Optional):**

    If you want to use the full AI capabilities, obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) and add it to your `.env` file:

    ```
    GEMINI_API_KEY=your_api_key_here
    ```

    If you leave this blank, the application will run in a "no-key" mode, using mock data for all AI-generated content.

### Running the Development Server

You'll need to run two separate processes in two different terminals for the full application to work.

1.  **Run the Next.js frontend:**
    ```bash
    npm run dev
    ```
    This will start the web application, typically on `http://localhost:9002`.

2.  **Run the Genkit development server:**
    ```bash
    npm run genkit:dev
    ```
    This starts the Genkit server that powers the AI flows.

## How to Use

1.  Open your browser and navigate to `http://localhost:9002`.
2.  In the input box, enter one or more X creator handles, separated by commas (e.g., `elonmusk, satyanadella`).
3.  Click the "Generate Report" button.
4.  The dashboard will load and display the analysis, including summaries, charts, and data tables.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Project Structure

- `src/app/`: Contains the main pages and layout of the Next.js application.
- `src/components/`: Reusable React components, including the main dashboard client and UI elements.
- `src/ai/`: Home for all Genkit-related code.
  - `src/ai/flows/`: Defines the multi-step AI workflows (e.g., summarizing data, generating analysis).
  - `src/ai/tools/`: Contains the "tools" that Genkit flows can use to fetch data (e.g., getting SEC filings).
- `src/lib/`: Utility functions and mock data.
