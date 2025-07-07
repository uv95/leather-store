import useGetAnalytics from '../../../hooks/useGetAnalytics';
import './analytics.scss';

type Props = {};

const Analytics = (props: Props) => {
  const { monthlyRevenue, ordersByCategory } = useGetAnalytics();
  console.log('monthlyRevenue', monthlyRevenue);
  console.log('ordersByCategory', ordersByCategory);

  return (
    <div className="stats">
      <h1></h1>
    </div>
  );
};

export default Analytics;
