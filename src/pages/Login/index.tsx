import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@src/contexts/AuthContext';
import { toast } from 'react-toastify';

export function Login() {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      setIsLoading(true);
      await signIn({ username, password });
    } catch (error) {
      toast.error('Usuário ou senha inválidos');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-white px-4 w-full">
      <div className="w-full max-w-2xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="hidden md:flex flex-col justify-center items-center bg-indigo-600 text-white p-10 w-1/2">
          <svg className="w-20 h-20 mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h2 className="text-3xl font-bold mb-2">Bem-vindo de volta!</h2>
          <p className="text-lg opacity-80">Gerencie sua oficina de forma simples e eficiente.</p>
        </div>
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-700 mb-6 text-center">Entrar na plataforma</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-base font-medium text-gray-700 mb-1">
                Usuário
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUser(e.target.value)}
                className="px-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-lg bg-gray-50"
                required
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-lg bg-gray-50"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-md transition disabled:opacity-50"
            >
              {isLoading ? 'Carregando...' : 'Entrar'}
            </button>
          </form>
          <div className="w-full flex flex-col items-center gap-2 mt-8">
            <p className="text-center text-base text-gray-600">
              Não tem uma conta?
            </p>
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 text-base transition">
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
