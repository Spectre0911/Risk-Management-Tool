import React from 'react';
import { Line } from "react-chartjs-2";

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'Communication',
      data: [80, 85, 90, 75, 80, 85],
      fill: false,
      borderColor: '#8884d8',
    },
    {
      label: 'Project Understanding',
      data: [60, 68, 80, 65, 70, 75],
      fill: false,
      borderColor: '#82ca9d',
    },
    {
      label: 'Team Cohesion',
      data: [75, 83, 85, 70, 65, 70],
      fill: false,
      borderColor: '#ffc658',
    },
    {
      label: 'Confidence in Skillset',
      data: [65, 78, 75, 79, 87, 90],
      fill: false,
      borderColor: '#ad2fa5',
    },
  ],
};

const options = {
  scales: {
    x: {
      title: {
        display: true,
        text: 'Week',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Score',
      },
      min: 0,
      max: 100,
    },
  },
};

const MultiLineChart = () => {
  return <Line data={data} options={options} />;
};

export default MultiLineChart;
