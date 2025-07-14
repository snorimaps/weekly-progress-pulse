
export interface StateData {
  sNo: number;
  state: string;
  pia: string;
  agreementDate: string;
  gpsInScope: {
    new: number;
    upgraded: number;
    total: number;
  };
  hoto: {
    target: number;
    current: number;
    previous: number;
    percentage: number;
  };
  survey: {
    target: number;
    current: number;
    previous: number;
    percentage: number;
  };
  snoc: {
    targetDate: string;
    status: string;
  };
  uptime: {
    current: number;
    previous: number;
    delta: number;
  };
  ftthConnections: {
    current: number;
    previous: number;
    delta: number;
  };
  commissioned: {
    milestone: number;
    current: number;
  };
  financial: {
    amount: string;
    date: string;
  };
  ofc: {
    totalRkm: number;
    existingNewRkm: string;
    laidRkm: number;
  };
}

export interface DashboardMetrics {
  totalStates: number;
  totalGPs: number;
  totalHOTO: number;
  totalSurvey: number;
  avgUptime: number;
  totalFTTH: number;
  totalFinancial: number;
  completionRate: number;
}
