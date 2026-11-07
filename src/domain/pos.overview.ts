export type ChartData = {
  label: string;
  time: string;
  forecasted: number;
  actual: number;
};

export type ExceptionRow = {
  name: string;
  count: number;
  value: string;
  recovery: string;
};

export type POSOverview = {
  id: string;

  // Session association
  sessionId: string;
  staffName: string;
  date: string;

  chartData: ChartData[];
  exceptionRows: ExceptionRow[];
  heatmap: number[][];
  paymentMethods: string[];
};
