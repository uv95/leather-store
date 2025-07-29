export const options = {
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
