import { useCallback, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import useGetAnalytics from '../../../../hooks/useGetAnalytics';
import { ItemType } from '../../../../types/data';
import { DOUGHNUT_COLORS } from '../../../../utils/consts';
import Spinner from '../../../UI/Spinner/Spinner';

const OrdersByCategory = () => {
  const { ordersByCategory, isLoading } = useGetAnalytics();

  const labels = Object.values(ItemType);

  const getData = useCallback(
    (data: 'totalRevenue' | 'totalQuantity') => {
      return labels.map((itemType) => {
        const dataObject = ordersByCategory.find(
          (item) => item._id === itemType
        );
        return dataObject ? dataObject[data] : 0;
      });
    },
    [labels, ordersByCategory]
  );

  const revenueDataset = useMemo(
    () => ({
      label: 'Revenue',
      data: getData('totalRevenue'),
      backgroundColor: DOUGHNUT_COLORS,
    }),
    [getData]
  );

  const quantityDataset = useMemo(
    () => ({
      label: 'Quantity',
      data: getData('totalQuantity'),
      backgroundColor: DOUGHNUT_COLORS,
    }),
    [getData]
  );

  const chartData = useMemo(() => {
    return [
      {
        title: 'Revenue by category',
        data: {
          labels,
          datasets: [revenueDataset],
        },
      },
      {
        title: 'Quantity by category',
        data: {
          labels,
          datasets: [quantityDataset],
        },
      },
    ];
  }, [revenueDataset, quantityDataset, labels]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="orders-by-category">
      {chartData.map((chart) => (
        <div key={chart.title} className="orders-by-category__item">
          <h2>{chart.title}</h2>
          <div className="chart-item">
            <div className="legend">
              {labels.map((label, i) => (
                <div key={label} className="legend-item">
                  <div
                    className="legend-label"
                    style={{ backgroundColor: DOUGHNUT_COLORS[i] }}
                  ></div>
                  <p>{label}</p>
                </div>
              ))}
            </div>
            <div className="chart">
              <Doughnut data={chart.data} options={options} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersByCategory;
