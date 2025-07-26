import React from 'react';
import './spinner.scss';
import spinner from '../../assets/img/spinner.gif';

type Props = {};

const Spinner = (props: Props) => {
  return (
    <div className="spinner">
      <img src={spinner} alt="Loading..." />
    </div>
  );
};

export default Spinner;
