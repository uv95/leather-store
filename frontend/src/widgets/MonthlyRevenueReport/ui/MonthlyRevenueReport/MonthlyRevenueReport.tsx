import { useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import {
  getAnalyticsLoading,
  getMonthlyRevenueData,
  getMonthlyRevenueSelector,
} from '../../../../features/analytics';
import { BAR_COLORS, months } from '../../../../shared/const/consts';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../../shared/lib/toast/toast';
import { options } from '../../model/options';
import MonthleRevenueReportSkeleton from '../MonthleRevenueReportSkeleton/MonthleRevenueReportSkeleton';
import './monthlyRevenueReport.scss';

const MonthlyRevenueReport = () => {
  const dispatch = useAppDispatch();
  const loading = useSelector(getAnalyticsLoading);
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

  return (
    <div className="monthly-revenue">
      {loading === 'pending' && <MonthleRevenueReportSkeleton />}

      {loading === 'succeeded' && (
        <>
          <h2>Monthly Revenue</h2>
          <div className="chart">
            <Bar options={options} data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default MonthlyRevenueReport;
