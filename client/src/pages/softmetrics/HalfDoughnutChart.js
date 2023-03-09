import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const HalfDoughnutChart = ({ data1, label, backgroundColor }) => {
  const data = {
    labels: [label, ''],
    datasets: [
      {
        data: [data1, 5 - data1],
        borderWidth: 0,
        backgroundColor: backgroundColor,
      },
    ],
  };

  const options = {
    cutout: '50%',
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
      },
    },
    centerText: {
      text: `${data1} / 5`,
      color: '#333',
      fontFamily: 'Arial',
      fontSize: 20,
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default HalfDoughnutChart;
