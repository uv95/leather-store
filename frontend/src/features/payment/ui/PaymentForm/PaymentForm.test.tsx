import { fireEvent, screen, waitFor } from '@testing-library/react';
import PaymentForm from './PaymentForm';
import { renderComponent } from '../../../../shared/lib/tests/renderComponent';
import * as toast from '../../../../shared/lib/toast/toast';
import { ReactNode } from 'react';
import { useElements, useStripe } from '@stripe/react-stripe-js';

const mockStripe = {
  confirmPayment: jest.fn(),
};

const mockElements = {
  submit: jest.fn(),
  getElement: jest.fn(),
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

describe('PaymentForm', () => {
  beforeEach(() => {
    // jest.clearAllMocks();
    // mockElements.getElement.mockReturnValue(mockPaymentElement);
    // mockElements.submit.mockResolvedValue({ error: null });
    // mockStripe.confirmPayment.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
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

  test('should handle form submission successfully', async () => {});

  test('should handle submit error and show toast', async () => {});

  test('should handle payment confirmation error and show toast', async () => {});

  test('should not call submit when stripe is null', async () => {});
});
