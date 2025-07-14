
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/MetricCard';
import { ProgressChart } from '@/components/ProgressChart';
import { StateTable } from '@/components/StateTable';
import { processExcelData, calculateMetrics } from '@/utils/dataProcessor';
import { StateData, DashboardMetrics } from '@/types/dashboard';
import { 
  Building2, 
  Network, 
  CheckCircle, 
  Search, 
  Wifi, 
  Users, 
  DollarSign, 
  TrendingUp,
  Calendar,
  RefreshCw
} from 'lucide-react';

const Index = () => {
  const [data, setData] = useState<StateData[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const processedData = processExcelData();
      const calculatedMetrics = calculateMetrics(processedData);
      
      setData(processedData);
      setMetrics(calculatedMetrics);
      setLastUpdated(new Date());
      setIsLoading(false);
    };

    loadData();
  }, []);

  const refreshData = () => {
    const processedData = processExcelData();
    const calculatedMetrics = calculateMetrics(processedData);
    
    setData(processedData);
    setMetrics(calculatedMetrics);
    setLastUpdated(new Date());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            BharatNet Program Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Weekly Progress Monitoring (04.07.2025 - 11.07.2025)
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Last Updated: {lastUpdated.toLocaleString()}
            </div>
            <button 
              onClick={refreshData}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total States"
              value={metrics.totalStates}
              icon={Building2}
              color="blue"
              change={5}
            />
            <MetricCard
              title="Total GPs"
              value={metrics.totalGPs}
              icon={Network}
              color="green"
              change={12}
            />
            <MetricCard
              title="HOTO Completed"
              value={metrics.totalHOTO}
              icon={CheckCircle}
              color="orange"
              change={8}
            />
            <MetricCard
              title="Survey Completed"
              value={metrics.totalSurvey}
              icon={Search}
              color="purple"
              change={15}
            />
          </div>
        )}

        {/* Secondary Metrics */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Avg Uptime GPs"
              value={metrics.avgUptime}
              icon={Wifi}
              color="green"
              change={-2}
            />
            <MetricCard
              title="FTTH Connections"
              value={metrics.totalFTTH}
              icon={Users}
              color="blue"
              change={18}
            />
            <MetricCard
              title="Financial Progress"
              value={metrics.totalFinancial}
              icon={DollarSign}
              color="green"
              suffix=" Cr"
              change={25}
            />
            <MetricCard
              title="Completion Rate"
              value={metrics.completionRate}
              icon={TrendingUp}
              color="purple"
              suffix="%"
              change={7}
            />
          </div>
        )}

        {/* Charts */}
        <ProgressChart data={data} />

        {/* State Table */}
        <StateTable data={data} />

        {/* Footer */}
        <Card className="animate-fade-in">
          <CardContent className="p-6">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">
                This dashboard provides real-time monitoring of the Amended BharatNet Program across all states.
              </p>
              <p>
                Data is updated weekly and reflects the latest progress in HOTO completion, surveys, 
                FTTH connections, and financial milestones.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
