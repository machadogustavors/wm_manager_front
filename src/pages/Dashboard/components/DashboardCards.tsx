import React from 'react';

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-lg font-bold mb-2 text-primary">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-2xl font-extrabold">{children}</div>;
}
