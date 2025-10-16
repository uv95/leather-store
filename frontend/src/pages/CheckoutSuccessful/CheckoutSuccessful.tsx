import { useNavigate } from 'react-router-dom';
import { ReactComponent as Success } from '../../shared/assets/icons/success.svg';
import { RoutePath } from '../../shared/config/routeConfig/routeConfig';
import Button, { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button';
import styles from './CheckoutSuccessful.module.scss';

const CheckoutSuccessful = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.CheckoutSuccessful}>
      <Success className={styles.icon} />
      <h1>Payment Successful</h1>
      <p>Thank you for your payment. Your order is being processed.</p>
      <Button
        size={ButtonSize.M}
        theme={ButtonTheme.BLACK}
        className={styles.button}
        onClick={() => navigate(RoutePath.USER_PROFILE)}
      >
        View Orders
      </Button>
    </div>
  );
};

export default CheckoutSuccessful;
