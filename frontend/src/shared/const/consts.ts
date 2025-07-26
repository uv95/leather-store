import { OrderStatus } from '../../types/data';

export const orderStatuses = [
  {
    status: OrderStatus.AWAITING_PAYMENT,
    style: 'status status-waitsForPayment',
  },
  { status: OrderStatus.IN_PROGRESS, style: 'status status-accepted' },
  { status: OrderStatus.COMPLETED, style: 'status status-completed' },
];

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const BAR_COLORS = [
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba',
  '#e8c3b9',
  '#8e5ea2',
  '#b2dfdb',
];

export const DOUGHNUT_COLORS = ['#7787f9', '#a68dcf', '#d28da2'];

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/'
    : 'https://leather-store.fly.dev/';

    console.log('BASE_URL', BASE_URL)