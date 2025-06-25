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
      setFilter({ date: e.target.value });
    } else if (dateType === 'month') {
      setFilter({ month: e.target.value });
    } else if (dateType === 'year') {
      setFilter({ year: e.target.value });
    }
  }

  function handleDateTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setDateType(e.target.value as 'date' | 'month' | 'year');
    setFilter({}); // Limpa filtro ao trocar tipo
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
    <div className="w-full flex flex-col md:flex-row items-center gap-4 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-500 p-4 mb-6">
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