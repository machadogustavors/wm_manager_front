import { useData } from '@src/hooks/useData';
import { useState } from 'react';
import { deleteService } from '@src/services/servicesData';
import { NewService } from './NewService';

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
  const { services, isLoading, error, refetch } = useData();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editService, setEditService] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  async function handleDelete() {
    if (deleteId == null) return;
    setIsDeleting(true);
    try {
      await deleteService(deleteId);
      setDeleteId(null);
      refetch();
    } finally {
      setIsDeleting(false);
    }
  }

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
            <th className="px-4 py-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id_servico} className="group border-t border-gray-100 hover:bg-primary/5 transition">
              <td className="px-4 py-2 whitespace-nowrap max-w-[180px] overflow-x-auto">{service.date || '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap max-w-[180px] overflow-x-auto">{service.client_name || '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap max-w-[180px] overflow-x-auto">{service.car_model || '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap max-w-[180px] overflow-x-auto">{service.license_plate || '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap max-w-[180px] overflow-x-auto">{getLabel(mechanicOptions, service.mechanic)}</td>
              <td className="px-4 py-2 whitespace-nowrap max-w-[180px] overflow-x-auto">{service.service_description || '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap max-w-[180px] overflow-x-auto">{service.parts_cost != null ? `R$ ${service.parts_cost}` : '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap max-w-[180px] overflow-x-auto">{service.labor_cost != null ? `R$ ${service.labor_cost}` : '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap max-w-[180px] overflow-x-auto">{service.total_cost != null ? `R$ ${service.total_cost}` : '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap max-w-[180px] overflow-x-auto">{service.parts_store_cost != null ? `R$ ${service.parts_store_cost}` : '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap max-w-[180px] overflow-x-auto">{service.parts_store_profit != null ? `R$ ${service.parts_store_profit}` : '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap max-w-[180px] overflow-x-auto">{getLabel(paymentOptions, service.payment)}</td>
              <td className="px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button title="Editar" className="text-primary hover:text-primary-dark p-1 rounded" onClick={() => setEditService(service)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L7.5 19.79l-4 1 1-4 12.362-12.303ZM19 7l-2-2" />
                    </svg>
                  </button>
                  <button title="Deletar" className="text-red-500 hover:text-red-700 p-1 rounded" onClick={() => setDeleteId(service.id_servico)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {deleteId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Confirmar exclusão</h2>
            <p className="mb-6">Tem certeza que deseja deletar este serviço?</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold">Cancelar</button>
              <button onClick={handleDelete} disabled={isDeleting} className="px-6 py-2 rounded-lg font-bold shadow-md transition disabled:opacity-50 bg-red-600 text-white">
                {isDeleting ? 'Deletando...' : 'Deletar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {editService && (
        <NewService
          onSuccess={() => { setEditService(null); refetch(); }}
          onCancel={() => setEditService(null)}
          initialData={editService}
          isEdit
        />
      )}
    </div>
  );
}
