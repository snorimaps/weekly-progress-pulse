
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';

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
    <Card className="mb-6 animate-fade-in">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unit Selection</h3>
            <p className="text-sm text-gray-600">Select the unit for displaying data across the dashboard</p>
          </div>
          
          <div className="space-y-4">
            <div className="px-4">
              <Slider
                value={[currentIndex]}
                onValueChange={handleSliderChange}
                max={2}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-between px-4 text-sm font-medium">
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
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              Current Unit: {selectedUnit}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
