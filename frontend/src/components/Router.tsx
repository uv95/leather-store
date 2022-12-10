import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import NotFound from '../pages/NotFound/NotFound';
import { adminRoutes, userRoutes, publicRoutes } from '../routes';

const Router: React.FC = () => {
  const role = useAppSelector((state) => state.auth.role);

  return (
    <Routes>
      {role === 'admin' &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {role === 'user' &&
        userRoutes.map(({ path, Component }) => (
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
