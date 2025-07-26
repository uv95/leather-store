import { Bar } from 'react-chartjs-2';
import useGetAnalytics from '../../../hooks/useGetAnalytics';
import { BAR_COLORS, months } from '../../../shared/const/consts';
import { useMemo } from 'react';
import Spinner from '../../../shared/ui/Spinner/Spinner';
import './monthlyRevenueReport.scss';

const MonthlyRevenueReport = () => {
  const { monthlyRevenue, isLoading } = useGetAnalytics();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10,
          },
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 8,
        borderColor: '#faebd700',
      },
    },
  };

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
