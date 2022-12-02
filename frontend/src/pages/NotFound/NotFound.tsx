import React from 'react';
import './notFound.scss';
import Back from '../../components/UI/Back/Back';

function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found-404">404</h1>
      <p>СТРАНИЦА НЕ НАЙДЕНА</p>
      <Back />
    </div>
  );
}

export default NotFound;
