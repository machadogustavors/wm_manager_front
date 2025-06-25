import { useData } from '@src/hooks/useData';

const paymentOptions = [
    { value: 'none', label: 'Nenhum' },
    { value: 'credit_card', label: 'Cartão de Crédito' },
    { value: 'debit_card', label: 'Cartão de Débito' },
    { value: 'cash', label: 'Dinheiro' },
    { value: 'pix', label: 'PIX' },
];

const mechanicOptions = [
    { value: 'none', label: 'Nenhum' },
    { value: 'wilson_machado', label: 'Wilson Machado' },
    { value: 'cleomar_almeida', label: 'Cleomar Almeida' },
    { value: 'daniel_hentz', label: 'Daniel Hentz' },
];

function getLabel(options: { value: string, label: string }[], value?: string | null) {
  if (!value) return '-';
  const found = options.find(opt => opt.value === value);
  return found ? found.label : value;
}

export function Table() {
  const { services, isLoading, error } = useData();

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar serviços</div>;
  if (!services.length) return <div>Nenhum serviço encontrado.</div>;

  return (
    <div className="overflow-x-auto w-full mx-auto">
      <table className="min-w-full bg-white rounded-xl shadow border border-gray-200">
        <thead className="bg-primary/50">
          <tr>
            <th className="px-4 py-2 text-left">Data</th>
            <th className="px-4 py-2 text-left">Cliente</th>
            <th className="px-4 py-2 text-left">Carro</th>
            <th className="px-4 py-2 text-left">Placa</th>
            <th className="px-4 py-2 text-left">Mecânico</th>
            <th className="px-4 py-2 text-left">Serviço</th>
            <th className="px-4 py-2 text-left">Valor Peças</th>
            <th className="px-4 py-2 text-left">Valor Mão de Obra</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Custo Loja Peças</th>
            <th className="px-4 py-2 text-left">Lucro Loja Peças</th>
            <th className="px-4 py-2 text-left">Pagamento</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="border-t border-gray-100 hover:bg-primary/5 transition">
              <td className="px-4 py-2">{service.date || '-'}</td>
              <td className="px-4 py-2">{service.client_name || '-'}</td>
              <td className="px-4 py-2">{service.car_model || '-'}</td>
              <td className="px-4 py-2">{service.license_plate || '-'}</td>
              <td className="px-4 py-2">{getLabel(mechanicOptions, service.mechanic)}</td>
              <td className="px-4 py-2">{service.service_description || '-'}</td>
              <td className="px-4 py-2">{service.parts_cost != null ? `R$ ${service.parts_cost}` : '-'}</td>
              <td className="px-4 py-2">{service.labor_cost != null ? `R$ ${service.labor_cost}` : '-'}</td>
              <td className="px-4 py-2">{service.total_cost != null ? `R$ ${service.total_cost}` : '-'}</td>
              <td className="px-4 py-2">{service.parts_store_cost != null ? `R$ ${service.parts_store_cost}` : '-'}</td>
              <td className="px-4 py-2">{service.parts_store_profit != null ? `R$ ${service.parts_store_profit}` : '-'}</td>
              <td className="px-4 py-2">{getLabel(paymentOptions, service.payment)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
