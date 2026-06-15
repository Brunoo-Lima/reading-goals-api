import { Outlet } from 'react-router-dom';
import { Sidebar } from '../sidebar/sidebar';

export const DefaultLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};
