import React from 'react';
import './top-bar.scss';

type Props = {};

const View = (props: Props) => {
  return (
    <div className="view">
      <div className="view__cell active">15</div>
      <div className="view__cell">30</div>
      <div className="view__cell">60</div>
    </div>
  );
};

export default View;
