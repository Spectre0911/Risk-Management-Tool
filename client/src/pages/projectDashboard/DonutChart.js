import React, { useEffect, useState, useMemo } from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js'
Chart.register(ArcElement);
Chart.register(Tooltip);
Chart.register(Legend);
const DonutChart = ({chartData, labels, border, backgroundColor, cutOut}) => {
  const data = {
    labels: labels,
    datasets: [
        {
            data: chartData,
            borderColor: border,
            backgroundColor: backgroundColor,
            pointBackgroundColor: 'rgba(255,206,86,0.2)',
        }
    ],
    text: "23%",
    }
    const options = {
    maintainAspectRatio: false,
    cutout: cutOut,
    tooltip: {
        callbacks: {
        title: function () {
            return "my tittle";
        },
        },
        
    },
    plugins: {
        title: {
            display: true,
            text: 'Doughnut Chart',
            color:'blue',
            font: {
                size:14
            },
            padding:{
                top:60,
                bottom:160
            },
            responsive:true,
            animation:{
            animateScale: true,
                        }
        },
        datalabels: {
            // display: false,
            color: "black",
            font: {
            size: 20,
            weight: "bold"
            }
        }, 
        legend: {
            display: true,
            position: 'bottom',
            labels: {
            padding: 7,
            font: {
                size: 13,
                family: 'Montserrat'
            },
            }
        }      
    }
    }

  return (
    <Doughnut data={data} options={options} />
  );
};

export default DonutChart;