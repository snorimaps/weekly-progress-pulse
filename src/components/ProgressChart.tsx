
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StateData } from '@/types/dashboard';

interface ProgressChartProps {
  data: StateData[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];

export const ProgressChart = ({ data }: ProgressChartProps) => {
  const chartData = data.slice(0, 6).map(state => ({
    name: state.state.split(' ')[0],
    hoto: state.hoto.percentage,
    survey: state.survey.percentage,
    commissioned: state.commissioned.current
  }));

  const pieData = data.slice(0, 5).map((state, index) => ({
    name: state.state.split(' ')[0],
    value: state.gpsInScope.total,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">HOTO vs Survey Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hoto" fill="#8884d8" name="HOTO %" />
              <Bar dataKey="survey" fill="#82ca9d" name="Survey %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">GP Distribution by State</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
