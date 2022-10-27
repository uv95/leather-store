import React from 'react';
import './banner.scss';
import bg from '../../../assets/img/bg-1.jpg';

const Banner = () => {
  return (
    <div className="banner">
      <img src={bg} alt="" className="banner__img" />
    </div>
  );
};

export default Banner;
