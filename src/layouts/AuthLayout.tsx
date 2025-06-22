import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className=" w-full flex items-center justify-center bg-gray-100">
      <Outlet />
    </div>
  );
}
