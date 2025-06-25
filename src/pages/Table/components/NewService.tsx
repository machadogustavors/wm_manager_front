import React, { useState } from 'react';
import { createService } from '@src/services/servicesData';
import { ServiceBase } from '@src/lib/types';

interface NewServiceProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function NewService({ onSuccess, onCancel }: NewServiceProps) {
  const [form, setForm] = useState<ServiceBase>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await createService(form as any);
      onSuccess?.();
    } catch (err: any) {
      setError('Erro ao criar serviço');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Novo Serviço</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input type="date" name="date" value={form.date || ''} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <input type="text" name="client_name" value={form.client_name || ''} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Carro</label>
            <input type="text" name="car_model" value={form.car_model || ''} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placa</label>
            <input type="text" name="license_plate" value={form.license_plate || ''} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor Peças</label>
            <input type="number" name="parts_cost" value={form.parts_cost ?? ''} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor Mão de Obra</label>
            <input type="number" name="labor_cost" value={form.labor_cost ?? ''} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mecânico</label>
            <input type="text" name="mechanic" value={form.mechanic || ''} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Forma de Pagamento</label>
            <input type="text" name="payment" value={form.payment || ''} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição do Serviço</label>
          <textarea name="service_description" value={form.service_description || ''} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold">Cancelar</button>
          <button type="submit" disabled={isLoading} className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md transition disabled:opacity-50">
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
