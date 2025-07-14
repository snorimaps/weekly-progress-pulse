
import { Slider } from '@/components/ui/slider';

interface UnitSelectorProps {
  selectedUnit: 'GPs' | 'Blocks' | 'Kms';
  onUnitChange: (unit: 'GPs' | 'Blocks' | 'Kms') => void;
}

export const UnitSelector = ({ selectedUnit, onUnitChange }: UnitSelectorProps) => {
  const units = ['GPs', 'Blocks', 'Kms'] as const;
  const currentIndex = units.indexOf(selectedUnit);
  
  const handleSliderChange = (value: number[]) => {
    const newUnit = units[value[0]];
    onUnitChange(newUnit);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-3 w-48">
      <div className="space-y-2">
        <div className="text-center">
          <h4 className="text-sm font-medium text-gray-700">Unit</h4>
        </div>
        
        <div className="space-y-2">
          <div className="px-2">
            <Slider
              value={[currentIndex]}
              onValueChange={handleSliderChange}
              max={2}
              step={1}
              className="w-full"
            />
          </div>
          
          <div className="flex justify-between px-2 text-xs font-medium">
            {units.map((unit, index) => (
              <span 
                key={unit}
                className={`transition-colors ${
                  index === currentIndex 
                    ? 'text-primary font-bold' 
                    : 'text-muted-foreground'
                }`}
              >
                {unit}
              </span>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {selectedUnit}
          </span>
        </div>
      </div>
    </div>
  );
};
