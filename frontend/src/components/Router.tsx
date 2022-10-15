import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import { authRoutes, publicRoutes } from '../routes';

const Router: React.FC = () => {
  const isAuth = true;
  return (
    <Routes>
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
