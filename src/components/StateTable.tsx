
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { StateData } from '@/types/dashboard';

interface StateTableProps {
  data: StateData[];
  unit?: string;
}

export const StateTable = ({ data, unit = 'GPs' }: StateTableProps) => {
  const getStatusColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">State-wise Progress Details ({unit})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>State</TableHead>
                <TableHead>PIA</TableHead>
                <TableHead>Total {unit}</TableHead>
                <TableHead>HOTO %</TableHead>
                <TableHead>Survey %</TableHead>
                <TableHead>FTTH Connections</TableHead>
                <TableHead>Financial</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((state) => (
                <TableRow key={state.sNo} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{state.state}</TableCell>
                  <TableCell>{state.pia}</TableCell>
                  <TableCell>{state.gpsInScope.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(state.hoto.percentage)} text-white`}>
                      {state.hoto.percentage}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(state.survey.percentage)} text-white`}>
                      {state.survey.percentage}%
                    </Badge>
                  </TableCell>
                  <TableCell>{state.ftthConnections.current.toLocaleString()}</TableCell>
                  <TableCell>{state.financial.amount}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate text-xs text-muted-foreground">
                      {state.snoc.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
