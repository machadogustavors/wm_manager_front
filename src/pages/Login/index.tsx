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
      toast.error('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Bem vindo!</h1>
        <p className="text-gray-600">Faça login em sua conta</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Usuário
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Não tem uma conta?{' '}
        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
          Crie uma
        </Link>
      </p>
    </div>
  );
}
