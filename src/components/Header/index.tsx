import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  return (
    <header className="w-full shadow-md border-b border-gray-100">
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/electric-car.png" alt="Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold text-primary">WM Manager</span>
        </Link>
        <nav className="flex gap-4">
          <Link
            to="/dashboard"
            className={`font-semibold px-3 py-2 rounded transition ${
              location.pathname.startsWith('/dashboard')
                ? 'bg-primary text-white'
                : 'text-primary hover:bg-primary/10'
            }`}
          >
            Relatório
          </Link>
          <Link
            to="/table"
            className={`font-semibold px-3 py-2 rounded transition ${
              location.pathname.startsWith('/table')
                ? 'bg-primary text-white'
                : 'text-primary hover:bg-primary/10'
            }`}
          >
            Tabela
          </Link>
        </nav>
      </div>
    </header>
  );
}
