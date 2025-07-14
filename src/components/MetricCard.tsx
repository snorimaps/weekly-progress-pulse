
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCounter } from './AnimatedCounter';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  change?: number;
  icon: LucideIcon;
  suffix?: string;
  prefix?: string;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  suffix = '', 
  prefix = '',
  color = 'blue' 
}: MetricCardProps) => {
  const colorVariants = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600'
  };

  const iconColorVariants = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    orange: 'text-orange-500',
    purple: 'text-purple-500',
    red: 'text-red-500'
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-gradient-to-r ${colorVariants[color]}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <AnimatedCounter 
            end={value} 
            suffix={suffix} 
            prefix={prefix}
            className="text-foreground"
          />
        </div>
        {change !== undefined && (
          <p className={`text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
            <span className="mr-1">{change >= 0 ? '↗' : '↘'}</span>
            {Math.abs(change)}% from last week
          </p>
        )}
      </CardContent>
    </Card>
  );
};
