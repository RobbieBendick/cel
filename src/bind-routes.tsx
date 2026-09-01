import { JSX } from 'react';
import { Designs } from './pages/Designs';
import { Photography } from './pages/Photography';
import { ProjectDetail } from './pages/ProjectDetail';
import { Sketchbook } from './pages/Sketchbook';
import { About } from './pages/About';
import { Layout } from './components/Layout';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

const ROUTE_PATHS = {
  HOME: '/',
  DESIGNS: '/designs',
  PROJECT: '/designs/:slug',
  SKETCHBOOK: '/sketchbook',
  PHOTOGRAPHY: '/photography',
  ABOUT: '/about',
} as const;

interface IRoute {
  path: string;
  element: JSX.Element;
}

const routes: IRoute[] = [
  { path: ROUTE_PATHS.HOME, element: <Designs /> },
  { path: ROUTE_PATHS.DESIGNS, element: <Navigate to={ROUTE_PATHS.HOME} replace /> },
  { path: ROUTE_PATHS.PROJECT, element: <ProjectDetail /> },
  { path: ROUTE_PATHS.SKETCHBOOK, element: <Sketchbook /> },
  { path: ROUTE_PATHS.PHOTOGRAPHY, element: <Photography /> },
  { path: ROUTE_PATHS.ABOUT, element: <About /> },
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
