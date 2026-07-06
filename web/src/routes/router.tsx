import { DefaultLayout } from '@/components/default-layout/default-layout';
import { AccountPage } from '@/pages/(protected)/account/account';
import { BooksPage } from '@/pages/(protected)/books/books';
import { GeneralPage } from '@/pages/(protected)/general/geral';
import { GoalsPage } from '@/pages/(protected)/goals/goals';
import { StatisticsPage } from '@/pages/(protected)/statistics/statistics';
import { LoginPage } from '@/pages/login/login';
import { PrivateRoute } from '@/providers/private-route';
import { Route, Routes } from 'react-router-dom';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route element={<DefaultLayout />}>
          <Route path="/geral" element={<GeneralPage />} />
          <Route path="/livros" element={<BooksPage />} />
          <Route path="/metas" element={<GoalsPage />} />
          <Route path="/estatisticas" element={<StatisticsPage />} />
          <Route path="/conta" element={<AccountPage />} />
          {/* <Route path="/*" element={<NotFound />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}
