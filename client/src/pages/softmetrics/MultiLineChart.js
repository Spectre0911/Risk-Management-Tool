import React, { Component, useState, useEffect } from "react";
import { AverageSoftMetrics } from "../services/AverageSoftMetricScore";
import { Line } from "react-chartjs-2";

const options = {
  maintainAspectRatio: false,
  scales: {
    r: {
      pointLabels: {
        color: "black",
        font: {
          size: 15,
          family: "Montserrat",
          weight: 700,
        },
      },
      ticks: {
        font: {
          size: 15,
          family: "Montserrat",
          weight: 700,
        },
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        font: {
          size: 15,
          family: "Montserrat",
          weight: 700,
        },
      },
    },
  },
};

const MultiLineChart = ({ projectid }) => {
  const [labels, setLabels] = useState(["1", "2", "3", "4", "5", "6"]);
  const [datasets, setDataSets] = useState([
    {
      label: "Communication",
      data: [80, 85, 90, 75, 80, 85],
      fill: false,
      borderColor: "#8884d8",
    },
    {
      label: "Project Understanding",
      data: [60, 68, 80, 65, 70, 75],
      fill: false,
      borderColor: "#82ca9d",
    },
    {
      label: "Team Cohesion",
      data: [75, 83, 85, 70, 65, 70],
      fill: false,
      borderColor: "#ffc658",
    },
    {
      label: "Confidence in Skillset",
      data: [65, 78, 75, 79, 87, 90],
      fill: false,
      borderColor: "#ad2fa5",
    },
  ]);

  const data = { datasets, labels };
  useEffect(() => {
    // Get the soft metrics
    AverageSoftMetrics({ projectid: projectid }).then((data) => {
      // Find the unique dates for the labels
      let dates = new Set();
      data.forEach((obj) => {
        let date = new Date(obj.fbdate).toLocaleDateString();
        dates.add(date);
      });
      let buckets = {};
      data.forEach((obj) => {
        let type = obj.fbtype.toString();
        if (!buckets[type]) {
          buckets[type] = [];
        }
        buckets[type].push(obj.avg);
      });
      const updatedDatasets = datasets.map((dataset, index) => {
        return {
          ...dataset,
          data: buckets[index + 1], // add 1 to index to match bucket array index
        };
      });
      setDataSets(updatedDatasets);
      setLabels(Array.from(dates));
      console.log(updatedDatasets);
    });
  }, []);

  return <Line data={data} options={options} />;
};

export default MultiLineChart;
