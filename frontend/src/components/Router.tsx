import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import NotFound from '../pages/NotFound/NotFound';
import { adminRoutes, publicRoutes, userRoutes } from '../lib/routes';
import { Role } from '../types/data';
import MainLayout from './layouts/MainLayout/MainLayout';

const Router: React.FC = () => {
  const { role, user } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route element={<MainLayout role={role} user={user} />}>
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
      </Route>
    </Routes>
  );
};

export default Router;
