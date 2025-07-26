import React from 'react';
import './quantity.scss';

type IQuantity = {
  reduce: () => void;
  quantity: number;
  increase: () => void;
};

const Quantity: React.FC<IQuantity> = ({ reduce, quantity, increase }) => {
  return (
    <div className="quantity">
      <div className="quantity__cell" onClick={reduce}>
        -
      </div>
      <div className="quantity__cell-num">{quantity}</div>
      <div className="quantity__cell" onClick={increase}>
        +
      </div>
    </div>
  );
};

export default Quantity;
