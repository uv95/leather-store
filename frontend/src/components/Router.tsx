import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { adminRoutes, publicRoutes, userRoutes } from '../shared/config/routeConfig/routeConfig';
import NotFound from '../pages/NotFound/NotFound';
import { Role } from '../types/data';

const Router: React.FC = () => {
  const { role } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      {role === Role.ADMIN &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

      {role === Role.USER &&
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
