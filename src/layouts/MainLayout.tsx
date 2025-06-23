import { Header } from '@src/components/Header';
import { Footer } from '@src/components/Footer';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
