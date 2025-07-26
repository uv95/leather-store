import React from 'react';
import './notFound.scss';
import Back from '../../shared/ui/Back/Back';

function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found-404">404</h1>
      <p>PAGE NOT FOUND</p>
      <Back />
    </div>
  );
}

export default NotFound;
