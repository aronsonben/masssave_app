export const PARTICIPATION_BUCKETS = [ 
  { id: 'zero', label: 'No Data (0%)', range: [0, 0] as [number, number], color: '#fefeef', test: (p: number) => p === 0 },
  { id: 'low', label: 'Low (0.1-18%)', range: [0.1, 18] as [number, number], color: '#fff7bc', test: (p: number) => p > 0 && p < 18 },
  { id: 'medium', label: 'Medium (18-26%)', range: [18, 26] as [number, number], color: '#fee391', test: (p: number) => p >= 18 && p < 26 },
  { id: 'high', label: 'High (26-32%)', range: [26, 32] as [number, number], color: '#fec44f', test: (p: number) => p >= 26 && p < 32 },
  { id: 'very-high', label: 'Very High (32%+)', range: [32, 100] as [number, number], color: '#d95f0e', test: (p: number) => p >= 32 },
];

export const PARTICIPATION_BUCKETS_GAS = [ 
  { id: 'zero', label: 'No Data (0%)', range: [0, 0] as [number, number], color: '#cccccc', test: (p: number) => p === 0 },
  { id: 'low', label: 'Low (0.1-9%)', range: [0.1, 9] as [number, number], color: '#deebf7', test: (p: number) => p > 0 && p < 9 },
  { id: 'medium', label: 'Medium (9-15%)', range: [9, 15] as [number, number], color: '#9ecae1', test: (p: number) => p >= 9 && p < 15 },
  { id: 'high', label: 'High (15-23%)', range: [15, 23] as [number, number], color: '#3182bd', test: (p: number) => p >= 15 && p < 23 },
  { id: 'very-high', label: 'Very High (23%+)', range: [23, 100] as [number, number], color: '#08519c', test: (p: number) => p >= 23 },
];

export const POPULATION_BUCKETS = [
  { id: 'zero', label: 'No Data (0)', range: [0, 0] as [number, number], color: '#fbeee6', test: (p: number) => p === 0 },
  { id: 'very-low', label: 'Very Low (1-3,000)', range: [1, 3000] as [number, number], color: '#fed7b0', test: (p: number) => p > 0 && p < 3000 },
  { id: 'low', label: 'Low (3,000-4,500)', range: [3000, 4500] as [number, number], color: '#fdac6b', test: (p: number) => p >= 3000 && p < 4500 },
  { id: 'medium', label: 'Medium (4,500-6,000)', range: [4500, 6000] as [number, number], color: '#fb7a24', test: (p: number) => p >= 4500 && p < 6000 },
  { id: 'high', label: 'High (6,000+)', range: [6000, 20000] as [number, number], color: '#c65102', test: (p: number) => p >= 6000 },
];

export const REJ_STATUS_BUCKETS = [
  { id: 'yes', label: 'REJ Community (Yes)', range: [1, 1] as [number, number], color: '#1a9850', test: (status: string | number) => status === 'Yes' || status === 1 },
  { id: 'no', label: 'Non-REJ (No)', range: [0, 0] as [number, number], color: '#d9d9d9', test: (status: string | number) => status === 'No' || status === 0 },
];