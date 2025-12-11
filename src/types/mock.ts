export const PARTICIPATION_BUCKETS = [ 
  { id: 'zero', label: 'No Data (0%)', range: [0, 0], color: '#cccccc', test: (p: number) => p === 0 },
  { id: 'low', label: 'Low (0-10%)', range: [0, 10], color: '#fee5d9', test: (p: number) => p > 0 && p < 10 },
  { id: 'medium', label: 'Medium (10-20%)', range: [10, 20], color: '#fcae91', test: (p: number) => p >= 10 && p < 20 },
  { id: 'high', label: 'High (20-30%)', range: [20, 30], color: '#fb6a4a', test: (p: number) => p >= 20 && p < 30 },
  { id: 'very-high', label: 'Very High (30%+)', range: [30, 100], color: '#cb181d', test: (p: number) => p >= 30 },
];