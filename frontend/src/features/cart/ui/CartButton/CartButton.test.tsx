import { fireEvent, render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import Checkout from '../../../../pages/Checkout/Checkout';
import { renderComponent } from '../../../../shared/lib/tests/renderComponent';
import { RoutePath } from '../../../../shared/types/routePaths';
import CartButton from './CartButton';

describe('CartButton', () => {
  test('should display "Select delivery address" if address section is collapsed', () => {
    render(<CartButton isSelectAddressOpen={false} />);
    const button = screen.getByRole('button', {
      name: 'Select delivery address',
    });
    expect(button).toBeInTheDocument();
  });

  test('should display "Checkout" if address section is open', () => {
    render(<CartButton isSelectAddressOpen={true} />);
    const button = screen.getByRole('button', {
      name: 'Checkout',
    });
    expect(button).toBeInTheDocument();
  });

  test('should navigate to Checkout Page', () => {
    renderComponent(
      <Routes>
        <Route
          path={RoutePath.CART}
          element={<CartButton isSelectAddressOpen={true} />}
        />
        <Route path={RoutePath.CHECKOUT} element={<Checkout />} />
      </Routes>,
      {
        route: RoutePath.CART,
      }
    );
    const button = screen.getByRole('button', {
      name: 'Checkout',
    });
    fireEvent.click(button);

    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });
});
