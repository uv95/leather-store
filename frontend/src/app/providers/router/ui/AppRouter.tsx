import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { getUserLoading, getUserRole, Role } from '../../../../entities/User';
import NotFound from '../../../../pages/NotFound/NotFound';
import { adminRoutes, publicRoutes, userRoutes } from '../model/routeConfig';
import { useEffect, useRef } from 'react';

export const AppRouter = () => {
  const role = useSelector(getUserRole);
  const location = useLocation();
  const loading = useSelector(getUserLoading);
  const announcerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (announcerRef.current) {
        announcerRef.current.textContent = `Navigated to ${document.title}`;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (location.pathname !== '/' && loading === 'failed') {
    return <Navigate to="/" replace />;
  }

  if (loading === 'pending') {
    return null;
  }

  return (
    <>
      <div
        ref={announcerRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
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
    </>
  );
};
