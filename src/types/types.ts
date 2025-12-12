/***** DATA MODELS ******/
export interface MassSaveDataRow {
  OBJECTID: number;
  OBJECTID_1: number | null;
  GeoID: string;
  MPO: string;
  POP20: number;
  ZVHH_flag: number;
  REJ__des: number;
  REJ__flag: string;
  POP20_SQMI: number;
  MPO_short: number | null;
  AnalysisAr: number;
  Tract_Num: number;
  pct_lep_fl: number;
  pct_nonwhi: number;
  median_inc: number;
  Senior_fla: number;
  Disabili_f: number;
  GEOID_Text: string;
  Shape_Leng: number;
  Shape_Length: number;
  Shape_Area: number;
  town: string;
  electric_participation_rate_avg: number;
  gas_participation_rate_avg: number;
  block_group_count: number;
}

export interface Bucket {
  id: string;
  label: string;
  range: [number, number];
  color: string;
  test: (p: number) => boolean;
}

/***** MISC. ******/
export type ViewType = 'home' | 'map' | 'table' | 'about';
