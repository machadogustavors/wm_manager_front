import { TableFilter } from '../Table/components/TableFilter';
import { useData } from '@src/hooks/useData';
import { Card, CardContent, CardTitle } from './components/DashboardCards';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);
import { Bar, Pie } from 'react-chartjs-2';

export default function Dashboard() {
  const { services } = useData();
  console.log(services)
  const totalServicos = services.length;
  const totalFaturamento = services.reduce((acc, s) => acc + (s.total_cost || 0), 0);
  const totalLucro = services.reduce((acc, s) => acc + (s.parts_store_profit || 0), 0);

  const servicosPorMecanico = services.reduce((acc, s) => {
    const key = s.mechanic || 'Não informado';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const faturamentoPorMes: Record<string, number> = {};
  services.forEach(s => {
    if (s.date) {
      const mes = s.date.slice(0, 7);
      faturamentoPorMes[mes] = (faturamentoPorMes[mes] || 0) + (s.total_cost || 0);
    }
  });

  return (
    <div className="mx-auto px-4 py-8">
      <TableFilter />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardTitle>Total de Serviços</CardTitle>
          <CardContent>{totalServicos}</CardContent>
        </Card>
        <Card>
          <CardTitle>Faturamento Total</CardTitle>
          <CardContent>R$ {totalFaturamento.toLocaleString('pt-BR')}</CardContent>
        </Card>
        <Card>
          <CardTitle>Lucro Loja Peças</CardTitle>
          <CardContent>R$ {totalLucro.toLocaleString('pt-BR')}</CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-4">Serviços por Mecânico</h2>
          <Pie
            data={{
              labels: Object.keys(servicosPorMecanico),
              datasets: [{
                data: Object.values(servicosPorMecanico),
                backgroundColor: ['#0092c4', '#00bcd4', '#80deea', '#b2ebf2', '#e0f7fa'],
              }],
            }}
          />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-4">Faturamento por Mês</h2>
          <Bar
            data={{
              labels: Object.keys(faturamentoPorMes),
              datasets: [{
                label: 'Faturamento',
                data: Object.values(faturamentoPorMes),
                backgroundColor: '#0092c4',
              }],
            }}
            options={{
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>
      </div>
    </div>
  );
}
