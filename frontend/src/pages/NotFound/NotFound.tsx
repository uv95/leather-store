import { useEffect } from 'react';
import './notFound.scss';
import Back from '../../shared/ui/Back/Back';

function NotFound() {
  useEffect(() => {
    document.title = '404 - Page Not Found';
  }, []);

  return (
    <div className="not-found">
      <h1 className="not-found-404" aria-label="404 - Page not found">
        404
      </h1>
      <p aria-hidden="true">PAGE NOT FOUND</p>
      <p className="sr-only">The page you are looking for does not exist.</p>
      <Back />
    </div>
  );
}

export default NotFound;
