
export const recentFilings = [
  { id: '1', creator: 'elonmusk', filingType: 'Form 4', date: '2023-10-27', link: '#' },
  { id: '2', creator: 'satyanadella', filingType: 'Form 144', date: '2023-10-27', link: '#' },
  { id: '3', creator: 'elonmusk', filingType: 'Form 8-K', date: '2023-10-26', link: '#' },
  { id: '4', creator: 'tim_cook', filingType: 'Form 4', date: '2023-10-25', link: '#' },
];

export const insiderTrades = [
  { id: '1', insiderName: 'Director A', relation: 'Director', lastReported: '2023-10-27', transactionType: 'Buy' as const, value: '$500,000', shares: '10,000', company: 'TSLA' },
  { id: '2', insiderName: 'CEO B', relation: 'CEO', lastReported: '2023-10-27', transactionType: 'Sell' as const, value: '$2,000,000', shares: '5,000', company: 'MSFT' },
  { id: '3', insiderName: 'CFO C', relation: 'CFO', lastReported: '2023-10-26', transactionType: 'Buy' as const, value: '$150,000', shares: '2,000', company: 'TSLA' },
  { id: '4', insiderName: 'Director D', relation: 'Director', lastReported: '2023-10-25', transactionType: 'Sell' as const, value: '$750,000', shares: '3,000', company: 'AAPL' },
  { id: '5', insiderName: 'Officer E', relation: 'Officer', lastReported: '2023-10-24', transactionType: 'Buy' as const, value: '$250,000', shares: '15,000', company: 'GOOGL' },
];

export const mockCurrentData = {
  total_trades: 25,
  total_volume: 1500000,
  buy_sell_ratio: 1.5,
  top_insiders: [
    { name: 'Director A', total_value: 500000 },
    { name: 'CEO B', total_value: -2000000 },
  ],
};

export const mockPriorWeekData = {
  total_trades: 120,
  total_volume: 8500000,
  buy_sell_ratio: 0.8,
  top_insiders: [
    { name: 'Director X', total_value: 1200000 },
    { name: 'CFO Y', total_value: -3000000 },
  ],
};

export function generateChartData() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // This data is for visualization purposes and represents a daily breakdown of a weekly total
  return days.map(day => ({
    name: day,
    'Last 24h': Math.floor(Math.random() * 50) + 5,
    'Prior Week': Math.floor(Math.random() * 300) + 50,
  }));
}
