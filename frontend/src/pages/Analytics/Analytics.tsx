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
import { MonthlyRevenueReport } from '../../widgets/MonthlyRevenueReport';
import { OrdersByCategoryReport } from '../../widgets/OrdersByCategoryReport';

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
        <MonthlyRevenueReport />
        <OrdersByCategoryReport />
      </div>
    </div>
  );
};

export default Analytics;
