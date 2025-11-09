import { fireEvent, screen, waitFor } from '@testing-library/react';
import PaymentForm from './PaymentForm';
import { renderComponent } from '../../../../shared/lib/tests/renderComponent';
import toast from '../../../../shared/lib/toast/toast';
import { ReactNode } from 'react';
import { useElements, useStripe } from '@stripe/react-stripe-js';

const mockStripe = {
  confirmPayment: jest.fn(),
};

const initialState = {
  initialState: {
    payment: {
      clientSecret: 'test-secret',
    },
  },
};

const mockUseStripe = jest.fn(() => mockStripe);

jest.mock('@stripe/react-stripe-js', () => ({
  useStripe: () => mockUseStripe(),
  useElements: jest.fn(),
  Elements: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  PaymentElement: () => <div data-testid="payment-element" />,
}));

const mockPaymentElement = {
  on: jest.fn((event, callback) => {
    if (event === 'ready') {
      callback();
    }
  }),
};

const toastErrorSpy = jest.spyOn(toast, 'error');

describe('PaymentForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
    toastErrorSpy.mockRestore();
  });

  test('should render payment form', () => {
    renderComponent(<PaymentForm />);

    expect(screen.getByTestId('payment-element')).toBeInTheDocument();
  });

  test('should show PaymentFormSkeleton while payment element is loading', async () => {
    renderComponent(<PaymentForm />);

    expect(screen.getByTestId('payment-skeleton')).toBeInTheDocument();
  });

  test('should hide PaymentFormSkeleton while payment element is ready', async () => {
    (useElements as jest.Mock) = jest.fn(() => ({
      getElement: jest.fn().mockReturnValue(mockPaymentElement),
    }));

    renderComponent(<PaymentForm />);

    await waitFor(() => {
      expect(screen.queryByTestId('payment-skeleton')).not.toBeInTheDocument();
    });
  });

  test('should show payment button when clientSecret exists and element is ready', async () => {
    renderComponent(<PaymentForm />, initialState);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  test('should not show payment button when clientSecret is missing', async () => {
    renderComponent(<PaymentForm />);
    const button = screen.queryByRole('button');

    await waitFor(() => {
      expect(button).not.toBeInTheDocument();
    });
  });

  test('should disable button when stripe is not initialized', async () => {
    (useStripe as jest.Mock) = jest.fn().mockImplementation(() => null);
    renderComponent(<PaymentForm />, initialState);

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  test('should disable button when payment is processing', async () => {
    (useStripe as jest.Mock) = jest.fn(() => mockUseStripe());

    renderComponent(<PaymentForm />, {
      initialState: {
        payment: {
          clientSecret: 'test-secret',
          loading: 'pending',
        },
      },
    });

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  test('should show "Processing..." text when payment is processing', async () => {
    renderComponent(<PaymentForm />, {
      initialState: {
        payment: {
          clientSecret: 'test-secret',
          loading: 'pending',
        },
      },
    });
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Processing...');
  });

  test('should handle form submission successfully', async () => {
    const submitMock = jest.fn().mockResolvedValue({ error: null });
    (useStripe as jest.Mock) = jest.fn(() => mockStripe);
    (useElements as jest.Mock) = jest.fn(() => ({
      getElement: jest.fn().mockReturnValue(mockPaymentElement),
      submit: submitMock,
    }));

    mockStripe.confirmPayment.mockResolvedValue({ error: null });

    renderComponent(<PaymentForm />, initialState);

    await waitFor(() => {
      expect(screen.queryByTestId('payment-skeleton')).not.toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(submitMock).toHaveBeenCalled();
      expect(mockStripe.confirmPayment).toHaveBeenCalledWith({
        elements: expect.any(Object),
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });
      expect(toastErrorSpy).not.toHaveBeenCalled();
    });
  });

  test('should handle submit error and show toast', async () => {
    const submitError = { message: 'Please fill in your payment details' };
    const submitMock = jest.fn().mockResolvedValue({ error: submitError });
    (useStripe as jest.Mock) = jest.fn(() => mockStripe);
    (useElements as jest.Mock) = jest.fn(() => ({
      getElement: jest.fn().mockReturnValue(mockPaymentElement),
      submit: submitMock,
    }));

    renderComponent(<PaymentForm />, initialState);

    await waitFor(() => {
      expect(screen.queryByTestId('payment-skeleton')).not.toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(submitMock).toHaveBeenCalled();
      expect(toastErrorSpy).toHaveBeenCalledWith(submitError.message);
      expect(mockStripe.confirmPayment).not.toHaveBeenCalled();
    });
  });

  test('should handle payment confirmation error and show toast', async () => {
    const paymentError = { message: 'Payment failed' };
    const submitMock = jest.fn().mockResolvedValue({ error: null });
    (useStripe as jest.Mock) = jest.fn(() => mockStripe);
    (useElements as jest.Mock) = jest.fn(() => ({
      getElement: jest.fn().mockReturnValue(mockPaymentElement),
      submit: submitMock,
    }));

    mockStripe.confirmPayment.mockResolvedValue({ error: paymentError });

    renderComponent(<PaymentForm />, initialState);

    await waitFor(() => {
      expect(screen.queryByTestId('payment-skeleton')).not.toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(submitMock).toHaveBeenCalled();
      expect(mockStripe.confirmPayment).toHaveBeenCalled();
      expect(toastErrorSpy).toHaveBeenCalledWith(paymentError.message);
    });
  });

  test('should not call submit when stripe is null', async () => {
    const submitMock = jest.fn();
    (useStripe as jest.Mock) = jest.fn(() => null);
    (useElements as jest.Mock) = jest.fn(() => ({
      getElement: jest.fn().mockReturnValue(mockPaymentElement),
      submit: submitMock,
    }));

    renderComponent(<PaymentForm />, initialState);

    await waitFor(() => {
      expect(screen.queryByTestId('payment-skeleton')).not.toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);

    await waitFor(() => {
      expect(submitMock).not.toHaveBeenCalled();
      expect(mockStripe.confirmPayment).not.toHaveBeenCalled();
      expect(toastErrorSpy).not.toHaveBeenCalled();
    });
  });
});
