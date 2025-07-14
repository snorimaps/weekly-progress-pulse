
import { StateData, DashboardMetrics } from '@/types/dashboard';

export const processExcelData = (): StateData[] => {
  // Sample processed data based on your Excel structure
  return [
    {
      sNo: 1,
      state: "Punjab",
      pia: "HFCL",
      agreementDate: "19.02.2025",
      gpsInScope: { new: 673, upgraded: 12664, total: 13337 },
      hoto: { target: 9498, current: 9938, previous: 9938, percentage: 105 },
      survey: { target: 667, current: 10653, previous: 9606, percentage: 114 },
      snoc: { targetDate: "15.07.2025", status: "Hardware Installation in progress" },
      uptime: { current: 6965, previous: 7007, delta: -42 },
      ftthConnections: { current: 183025, previous: 182364, delta: 661 },
      commissioned: { milestone: 1333, current: 0 },
      financial: { amount: "124.46 cr", date: "24.03.25" },
      ofc: { totalRkm: 45081, existingNewRkm: "29,660/15,421", laidRkm: 0 }
    },
    {
      sNo: 2,
      state: "Uttar Pradesh (E)",
      pia: "RVNL",
      agreementDate: "20.02.2025",
      gpsInScope: { new: 8644, upgraded: 34428, total: 43072 },
      hoto: { target: 25821, current: 24442, previous: 23115, percentage: 95 },
      survey: { target: 2154, current: 24746, previous: 24746, percentage: 162 },
      snoc: { targetDate: "15.07.2025", status: "Almost all material delivered, installation in progress" },
      uptime: { current: 2622, previous: 2698, delta: -76 },
      ftthConnections: { current: 18224, previous: 18143, delta: 81 },
      commissioned: { milestone: 4307, current: 0 },
      financial: { amount: "500.82 cr", date: "24.03.25" },
      ofc: { totalRkm: 133408, existingNewRkm: "77,065/56,343", laidRkm: 0 }
    },
    {
      sNo: 3,
      state: "Uttar Pradesh (W)",
      pia: "RVNL",
      agreementDate: "20.02.2025",
      gpsInScope: { new: 3769, upgraded: 12449, total: 16218 },
      hoto: { target: 9337, current: 9386, previous: 9386, percentage: 101 },
      survey: { target: 811, current: 6714, previous: 6714, percentage: 206 },
      snoc: { targetDate: "15.07.2025", status: "Civil and Electrical work in progress" },
      uptime: { current: 1213, previous: 1337, delta: -124 },
      ftthConnections: { current: 16031, previous: 15984, delta: 47 },
      commissioned: { milestone: 1621, current: 0 },
      financial: { amount: "191.74 cr", date: "24.03.25" },
      ofc: { totalRkm: 58860, existingNewRkm: "32,596/26,264", laidRkm: 0 }
    },
    {
      sNo: 4,
      state: "Himachal Pradesh",
      pia: "ITI",
      agreementDate: "25.02.2025",
      gpsInScope: { new: 3363, upgraded: 252, total: 3615 },
      hoto: { target: 189, current: 258, previous: 258, percentage: 137 },
      survey: { target: 181, current: 3615, previous: 3615, percentage: 143 },
      snoc: { targetDate: "15.07.2025", status: "Civil and Electrical work in progress" },
      uptime: { current: 202, previous: 212, delta: -10 },
      ftthConnections: { current: 2357, previous: 2349, delta: 8 },
      commissioned: { milestone: 362, current: 0 },
      financial: { amount: "129.15 cr", date: "24.03.25" },
      ofc: { totalRkm: 20943, existingNewRkm: "828/20,115", laidRkm: 0 }
    },
    {
      sNo: 5,
      state: "West Bengal & A&N",
      pia: "ITI",
      agreementDate: "25.02.2025",
      gpsInScope: { new: 668, upgraded: 2744, total: 3412 },
      hoto: { target: 2058, current: 2670, previous: 2628, percentage: 130 },
      survey: { target: 171, current: 1117, previous: 984, percentage: 129 },
      snoc: { targetDate: "15.07.2025", status: "Civil and Electrical work in progress" },
      uptime: { current: 1661, previous: 1838, delta: -177 },
      ftthConnections: { current: 45972, previous: 45790, delta: 182 },
      commissioned: { milestone: 341, current: 0 },
      financial: { amount: "167.44 cr", date: "08.05.25" },
      ofc: { totalRkm: 38496, existingNewRkm: "19,671/18,825", laidRkm: 0 }
    }
  ];
};

export const calculateMetrics = (data: StateData[]): DashboardMetrics => {
  const totalGPs = data.reduce((sum, state) => sum + state.gpsInScope.total, 0);
  const totalHOTO = data.reduce((sum, state) => sum + state.hoto.current, 0);
  const totalSurvey = data.reduce((sum, state) => sum + state.survey.current, 0);
  const totalFTTH = data.reduce((sum, state) => sum + state.ftthConnections.current, 0);
  const avgUptime = data.reduce((sum, state) => sum + state.uptime.current, 0) / data.length;
  
  const totalFinancialValue = data.reduce((sum, state) => {
    const amount = parseFloat(state.financial.amount.replace(/[^\d.]/g, ''));
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const completionRate = data.reduce((sum, state) => sum + state.hoto.percentage, 0) / data.length;

  return {
    totalStates: data.length,
    totalGPs,
    totalHOTO,
    totalSurvey,
    avgUptime: Math.round(avgUptime),
    totalFTTH,
    totalFinancial: totalFinancialValue,
    completionRate: Math.round(completionRate)
  };
};
