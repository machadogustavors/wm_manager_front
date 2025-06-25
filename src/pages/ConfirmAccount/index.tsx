import { FormEvent, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@src/hooks/useAuth';

export function ConfirmAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const username = (location.state as { username?: string })?.username || '';
  const { confirmAccount } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username || !confirmationCode) {
      toast.error('Preencha todos os campos.');
      return;
    }
    try {
      setIsLoading(true);
      await confirmAccount({ username, confirmation_code: confirmationCode });
      toast.success('Conta confirmada com sucesso!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Erro ao confirmar conta');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-white px-4 w-full">
      <div className="w-full max-w-xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="hidden md:flex flex-col justify-center items-center bg-primary text-white p-10 w-1/2">
          <svg className="w-20 h-20 mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h2 className="text-3xl font-bold mb-2">Confirme sua conta</h2>
          <p className="text-lg opacity-80">Digite o código enviado para seu e-mail.</p>
        </div>
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-6 text-center">Confirmação de Conta</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="confirmation_code" className="block text-base font-medium text-gray-700 mb-1">
                Código de confirmação
              </label>
              <input
                type="text"
                id="confirmation_code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                className="px-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg bg-gray-50"
                required
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-primary hover:bg-cyan-700 text-white font-bold text-lg shadow-md transition disabled:opacity-50"
            >
              {isLoading ? 'Confirmando...' : 'Confirmar conta'}
            </button>
          </form>
          <div className="w-full flex flex-col items-center gap-2 mt-8">
            <Link to="/login" className="font-semibold text-primary hover:text-cyan-700 text-base transition">
              Voltar para login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
