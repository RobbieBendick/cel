import { JSX } from 'react';
import { Home } from './pages/Home';
import { Designs } from './pages/Designs';
import { Photography } from './pages/Photography';
import { Layout } from './components/Layout';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

const ROUTE_PATHS = {
  HOME: '/',
  DESIGNS: '/designs',
  PHOTOGRAPHY: '/photography',
} as const;

interface IRoute {
  path: string;
  element: JSX.Element;
}

const routes: IRoute[] = [
  { path: ROUTE_PATHS.HOME, element: <Home /> },
  { path: ROUTE_PATHS.DESIGNS, element: <Designs /> },
  { path: ROUTE_PATHS.PHOTOGRAPHY, element: <Photography /> },
];

export const BindRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path='*' element={<Navigate to={ROUTE_PATHS.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
};
