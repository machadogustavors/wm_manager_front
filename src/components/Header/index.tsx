import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="w-full shadow-md border-b border-gray-100">
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/electric-car.png" alt="Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold text-primary">WM Manager</span>
        </Link>
      </div>
    </header>
  );
}
