import React from 'react';
import './back.scss';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Back = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="back" onClick={() => navigate(-1)}>
      Назад
    </div>
  );
};

export default Back;
