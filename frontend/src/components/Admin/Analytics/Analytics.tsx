import useGetAnalytics from '../../../hooks/useGetAnalytics';
import MonthlyRevenue from './Reports/MonthlyRevenue';
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LinearScale,
} from 'chart.js';
import './analytics.scss';
import OrdersByCategory from './Reports/OrdersByCategory';

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  return (
    <div className="analytics">
      <h1>Analytics</h1>
      <div className="analytics__reports">
        <MonthlyRevenue />
        <OrdersByCategory />
      </div>
    </div>
  );
};

export default Analytics;
