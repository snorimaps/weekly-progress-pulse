
import { Switch } from '@/components/ui/switch';

interface UnitSelectorProps {
  selectedUnit: 'GPs' | 'Blocks' | 'Kms';
  onUnitChange: (unit: 'GPs' | 'Blocks' | 'Kms') => void;
}

export const UnitSelector = ({ selectedUnit, onUnitChange }: UnitSelectorProps) => {
  const units = ['GPs', 'Blocks', 'Kms'] as const;
  
  return (
    <div className="inline-flex rounded-lg bg-muted p-1">
      {units.map((unit) => (
        <button
          key={unit}
          onClick={() => onUnitChange(unit)}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
            selectedUnit === unit
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {unit}
        </button>
      ))}
    </div>
  );
};
