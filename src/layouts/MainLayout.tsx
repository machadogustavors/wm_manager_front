import { Header } from '@src/components/Header';
import { Footer } from '@src/components/Footer';
import { Outlet } from 'react-router-dom';
import { DataProvider } from '@src/providers/DataProvider';

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <DataProvider>
          <Outlet />
        </DataProvider>
      </main>
      <Footer />
    </div>
  );
}
