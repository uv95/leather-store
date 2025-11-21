import Button from '../Button/Button';
import './quantity.scss';

interface QuantityProps {
  onDecrement: () => void;
  quantity: number;
  onIncrement: () => void;
}

const Quantity = ({ onDecrement, quantity, onIncrement }: QuantityProps) => {
  return (
    <div className="quantity">
      <Button
        isSquare
        className="quantity__cell"
        onClick={onDecrement}
        aria-label="Decrease quantity"
      >
        -
      </Button>
      <div className="quantity__cell-num" role="status" aria-live="polite">
        {quantity}
      </div>
      <Button
        isSquare
        className="quantity__cell"
        onClick={onIncrement}
        aria-label="Increase quantity"
      >
        +
      </Button>
    </div>
  );
};

export default Quantity;
