import React from 'react';
import { Line } from "react-chartjs-2";

const data = {
  labels: ['WC 10/02', 'WC 17/02', 'WC 24/02', 'WC 02/03', 'WC 09/03'],
  datasets: [
    {
      label: 'Communication',
      data: [1.4, 2.2, 2.0, 4.4, 4.0],
      fill: false,
      borderColor: '#8884d8',
    },
    {
      label: 'Project Understanding',
      data: [3.4, 2.2, 1.0, 2.4, 4.2],
      fill: false,
      borderColor: '#82ca9d',
    },
    {
      label: 'Team Cohesion',
      data: [1.2, 3.2, 3.0, 4.4, 4.6],
      fill: false,
      borderColor: '#ffc658',
    },
    {
      label: 'Confidence in Skillset',
      data: [1.1, 3.9, 2.2, 4.2, 3.6],
      fill: false,
      borderColor: '#ad2fa5',
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  scales: {
    r: {
      pointLabels: {
        color: 'black',
        font: {
          size: 15,
          family: 'Montserrat',
          weight: 700,
        }
      },
      ticks: {
        font: {
            size: 15,
            family: 'Montserrat',
            weight: 700,
        }
      }

    },
  },
  plugins:{
      legend:{  
        labels:{
          font:{
              size: 15,
              family: 'Montserrat',
              weight: 700,
          }
        } 
      }
  }
};

const MultiLineChart = () => {
  return <Line data={data} options={options} />;
};

export default MultiLineChart;
