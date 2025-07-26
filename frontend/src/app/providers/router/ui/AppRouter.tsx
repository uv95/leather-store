import { Route, Routes } from 'react-router-dom';
import { adminRoutes, publicRoutes, userRoutes } from '../../../../shared/config/routeConfig/routeConfig';
import NotFound from '../../../../pages/NotFound/NotFound';
import { Role } from '../../../../types/data';
import { useAppSelector } from '../../../../hooks';

export const AppRouter: React.FC = () => {
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
