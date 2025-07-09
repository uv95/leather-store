import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import './analytics.scss';
import MonthlyRevenue from './Reports/MonthlyRevenue';
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
