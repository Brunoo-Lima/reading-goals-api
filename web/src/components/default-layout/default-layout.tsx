import { Outlet } from 'react-router-dom';

export const DefaultLayout = () => {
  return (
    <>
      <main className="w-full">
        <Outlet />
      </main>
    </>
  );
};
