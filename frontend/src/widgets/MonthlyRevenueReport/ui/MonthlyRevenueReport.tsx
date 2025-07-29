import { useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import {
  getAnalyticsIsLoading,
  getMonthlyRevenueData,
  getMonthlyRevenueSelector,
} from '../../../features/analytics';
import { BAR_COLORS, months } from '../../../shared/const/consts';
import Spinner from '../../../shared/ui/Spinner/Spinner';
import { options } from '../model/options';
import './monthlyRevenueReport.scss';
import { useAppDispatch } from '../../../hooks';
import toast from '../../../shared/lib/toast/toast';

const MonthlyRevenueReport = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getAnalyticsIsLoading);
  const monthlyRevenue = useSelector(getMonthlyRevenueSelector);

  useEffect(() => {
    if (!monthlyRevenue.length) {
      dispatch(getMonthlyRevenueData())
        .unwrap()
        .then()
        .catch((error) =>
          toast.error(`Error getting monthly revenue: ${error}`)
        );
    }
  }, [monthlyRevenue.length, dispatch]);

  const datasets = useMemo(
    () => [
      {
        label: 'Total',
        data: months.map(
          (_, i) =>
            monthlyRevenue.find(({ _id: period }) => period.month - 1 === i)
              ?.totalRevenue || 0
        ),
        backgroundColor: BAR_COLORS,
      },
    ],
    [monthlyRevenue]
  );

  const data = {
    labels: months,
    datasets,
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="monthly-revenue">
      <h2>Monthly Revenue</h2>
      <div className="chart">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default MonthlyRevenueReport;
