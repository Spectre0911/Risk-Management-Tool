import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const HalfDoughnutChart = ({ data1, label }) => {
  const data = {
    labels: [label, ''],
    datasets: [
      {
        data: [data1, 5 - data1],
        backgroundColor: ['#3bb35b', '#ccc'],
        borderWidth: 0,
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
