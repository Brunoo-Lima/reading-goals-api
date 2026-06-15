import { Outlet } from 'react-router-dom';
import { Sidebar } from '../sidebar/sidebar';

export const DefaultLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};
