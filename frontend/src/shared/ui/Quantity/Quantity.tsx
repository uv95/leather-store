import './quantity.scss';

interface QuantityProps {
  onDecrement: () => void;
  quantity: number;
  onIncrement: () => void;
}

const Quantity = ({ onDecrement, quantity, onIncrement }: QuantityProps) => {
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
