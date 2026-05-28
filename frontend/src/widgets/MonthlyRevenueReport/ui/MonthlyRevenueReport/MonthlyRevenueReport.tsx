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
          toast.error(`Error getting monthly revenue: ${error}`),
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
              ?.totalRevenue || 0,
        ),
        backgroundColor: BAR_COLORS,
      },
    ],
    [monthlyRevenue],
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
          <h3>Monthly Revenue</h3>
          <div className="chart">
            <Bar
              options={options}
              data={data}
              role="img"
              aria-label="Bar chart: Monthly Revenue"
              aria-describedby="monthly-revenue-table"
            />
          </div>

          <table id="monthly-revenue-table" className="sr-only">
            <caption>Monthly Revenue Data</caption>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Revenue ($)</th>
              </tr>
            </thead>
            <tbody>
              {months.map((month, i) => {
                const revenue =
                  monthlyRevenue.find(
                    ({ _id: period }) => period.month - 1 === i,
                  )?.totalRevenue || 0;
                return (
                  <tr key={month}>
                    <td>{month}</td>
                    <td>{revenue}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MonthlyRevenueReport;
