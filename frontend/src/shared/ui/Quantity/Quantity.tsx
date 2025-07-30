import './quantity.scss';

interface IQuantity {
  onDecrement: () => void;
  quantity: number;
  onIncrement: () => void;
}

const Quantity = ({ onDecrement, quantity, onIncrement }: IQuantity) => {
  return (
    <div className="quantity">
      <div className="quantity__cell" onClick={onDecrement}>
        -
      </div>
      <div className="quantity__cell-num">{quantity}</div>
      <div className="quantity__cell" onClick={onIncrement}>
        +
      </div>
    </div>
  );
};

export default Quantity;
