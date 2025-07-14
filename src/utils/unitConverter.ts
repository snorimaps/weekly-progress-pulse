
import { StateData } from '@/types/dashboard';

export type UnitType = 'GPs' | 'Blocks' | 'Kms';

// Conversion ratios (example ratios - adjust based on your actual data relationships)
const CONVERSION_RATIOS = {
  'GPs': 1,
  'Blocks': 0.1, // 1 Block = 10 GPs (example)
  'Kms': 0.05,   // 1 Km = 20 GPs (example)
};

export const convertValue = (value: number, unit: UnitType): number => {
  return Math.round(value * CONVERSION_RATIOS[unit]);
};

export const convertStateData = (data: StateData[], unit: UnitType): StateData[] => {
  const ratio = CONVERSION_RATIOS[unit];
  
  return data.map(state => ({
    ...state,
    gpsInScope: {
      ...state.gpsInScope,
      new: Math.round(state.gpsInScope.new * ratio),
      upgraded: Math.round(state.gpsInScope.upgraded * ratio),
      total: Math.round(state.gpsInScope.total * ratio),
    },
    hoto: {
      ...state.hoto,
      target: Math.round(state.hoto.target * ratio),
      current: Math.round(state.hoto.current * ratio),
      previous: Math.round(state.hoto.previous * ratio),
      percentage: state.hoto.percentage, // Keep percentage unchanged
    },
    survey: {
      ...state.survey,
      target: Math.round(state.survey.target * ratio),
      current: Math.round(state.survey.current * ratio),
      previous: Math.round(state.survey.previous * ratio),
      percentage: state.survey.percentage, // Keep percentage unchanged
    },
    uptime: {
      ...state.uptime,
      current: Math.round(state.uptime.current * ratio),
      previous: Math.round(state.uptime.previous * ratio),
      delta: Math.round(state.uptime.delta * ratio),
    },
    commissioned: {
      ...state.commissioned,
      milestone: Math.round(state.commissioned.milestone * ratio),
      current: Math.round(state.commissioned.current * ratio),
    },
  }));
};

export const getUnitLabel = (unit: UnitType): string => {
  const labels = {
    'GPs': 'Gram Panchayats',
    'Blocks': 'Blocks',
    'Kms': 'Kilometers'
  };
  return labels[unit];
};
