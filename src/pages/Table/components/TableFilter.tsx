import React, { useState } from 'react';
import { useData } from '@src/hooks/useData';

interface TableFilterProps {
  onNewService?: () => void;
}

export function TableFilter({ onNewService }: TableFilterProps) {
  const { filter, setFilter } = useData();
  const [dateType, setDateType] = useState<'date' | 'month' | 'year'>('date');

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (dateType === 'date') {
      setFilter({ ...filter, date: e.target.value, month: undefined, year: undefined });
    } else if (dateType === 'month') {
      setFilter({ ...filter, month: e.target.value, date: undefined, year: undefined });
    } else if (dateType === 'year') {
      setFilter({ ...filter, year: e.target.value, date: undefined, month: undefined });
    }
  }

  function handleDateTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setDateType(e.target.value as 'date' | 'month' | 'year');
    setFilter({});
  }

  let inputProps: any = {
    className: "border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary",
    onChange: handleDateChange,
    value: filter.date || filter.month || filter.year || '',
  };
  if (dateType === 'date') inputProps.type = 'date';
  if (dateType === 'month') inputProps.type = 'month';
  if (dateType === 'year') {
    inputProps.type = 'number';
    inputProps.min = 1900;
    inputProps.max = 2100;
    inputProps.placeholder = 'Ano';
  }

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-4 bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-500 p-4 mb-6">
      <select
        value={dateType}
        onChange={handleDateTypeChange}
        className="border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="date">Dia</option>
        <option value="month">Mês</option>
        <option value="year">Ano</option>
      </select>
      <input {...inputProps} />
      <input
        type="text"
        className="border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary w-48"
        placeholder="Cliente"
        value={filter.client_name || ''}
        onChange={e => setFilter({ ...filter, client_name: e.target.value })}
      />
      <input
        type="text"
        className="border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary w-48"
        placeholder="Carro"
        value={filter.car_model || ''}
        onChange={e => setFilter({ ...filter, car_model: e.target.value })}
      />
      <input
        type="text"
        className="border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary w-40"
        placeholder="Placa"
        value={filter.license_plate || ''}
        onChange={e => setFilter({ ...filter, license_plate: e.target.value })}
      />
      <input
        type="text"
        className="border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary w-48"
        placeholder="Mecânico"
        value={filter.mechanic || ''}
        onChange={e => setFilter({ ...filter, mechanic: e.target.value })}
      />
      <button
        type="button"
        onClick={onNewService}
        className="ml-auto px-6 py-2 rounded-lg bg-primary hover:bg-cyan-700 text-white font-bold text-base shadow-md transition"
      >
        Novo Serviço
      </button>
    </div>
  );
}