import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getUserLoading, getUserRole, Role } from '../../../../entities/User';
import NotFound from '../../../../pages/NotFound/NotFound';
import {
  adminRoutes,
  publicRoutes,
  userRoutes,
} from '../../../../shared/config/routeConfig/routeConfig';

export const AppRouter = () => {
  const role = useSelector(getUserRole);
  const loading = useSelector(getUserLoading);

  if (loading === 'failed') {
    return <Navigate to="/" replace />;
  }

  if (loading !== 'succeeded') {
    return null;
  }

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
