import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@src/hooks/useAuth';
import { toast } from 'react-toastify';

export function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    if (!username || !email || !password || !phoneNumber || !birthdate) {
      toast.error('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      setIsLoading(true);
      await signUp({ username, email, password, phone_number: phoneNumber, birthdate });
      toast.success('Conta criada com sucesso! Verifique seu e-mail para o código de verificação.');
      navigate('/confirm-account', { state: { username } });
    } catch (error) {
      toast.error('Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-white px-4 w-full">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="hidden md:flex flex-col justify-center items-center bg-primary text-white p-10 w-1/2">
          <svg className="w-20 h-20 mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h2 className="text-3xl font-bold mb-2">Crie sua conta</h2>
          <p className="text-lg opacity-80">Gerencie sua oficina de forma simples e eficiente.</p>
        </div>
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-6 text-center">Cadastro</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-base font-medium text-gray-700 mb-1">
                Usuário
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg bg-gray-50"
                required
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg bg-gray-50"
                required
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
                className="px-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg bg-gray-50"
                required
              />
            </div>
            <div>
              <label htmlFor="phone_number" className="block text-base font-medium text-gray-700 mb-1">
                Telefone (com DDD, ex: +5511999999999)
              </label>
              <input
                type="tel"
                id="phone_number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="px-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg bg-gray-50"
                required
              />
            </div>
            <div>
              <label htmlFor="birthdate" className="block text-base font-medium text-gray-700 mb-1">
                Data de nascimento
              </label>
              <input
                type="date"
                id="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="px-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg bg-gray-50"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-primary hover:bg-cyan-700 text-white font-bold text-lg shadow-md transition disabled:opacity-50"
            >
              {isLoading ? 'Carregando...' : 'Criar conta'}
            </button>
          </form>
          <div className="w-full flex flex-col items-center gap-2 mt-8">
            <p className="text-center text-base text-gray-600">
              Já possui uma conta?
            </p>
            <Link to="/login" className="font-semibold text-primary hover:text-cyan-700 text-base transition">
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
