

interface StateSelectorProps {
  selectedState: string;
  onStateChange: (state: string) => void;
}

export const StateSelector = ({ selectedState, onStateChange }: StateSelectorProps) => {
  const states = ['India', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  
  return (
    <div className="flex justify-start mb-6">
      <div className="inline-flex rounded-lg bg-muted p-1 flex-wrap gap-1">
        {states.map((state) => (
          <button
            key={state}
            onClick={() => onStateChange(state)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all min-w-[40px] ${
              selectedState === state
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {state}
          </button>
        ))}
      </div>
    </div>
  );
};

