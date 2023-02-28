export const RadarData = {
    labels: ["Project understanding", "Communication", "Satisfaction", "Team Cohesion", "Committment"],
    datasets: [
      {
        label: "Soft Metric Data",
        backgroundColor: "rgba(34, 202, 236, .2)",
        borderColor: "rgba(34, 202, 236, 1)",
        pointBackgroundColor: "rgba(34, 202, 236, 1)",
        poingBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(34, 202, 236, 1)",
        data: [13, 10, 12, 6, 5],
        borderWidth: 4
      }
    ]
  };
  export const RadarOptions = {
    scale: {
      ticks: {
        min: 0,
        max: 16,
        stepSize: 2,
        showLabelBackdrop: false,
        backdropColor: "rgba(203, 197, 11, 1)"
      },
      angleLines: {
        color: "rgba(255, 255, 255, .3)",
        lineWidth: 100
      },
      gridLines: {
        color: "rgba(255, 255, 255, .3)",
        borderWidth: 10
      },
    },
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
          grid: {
            circular: true,
            lineWidth: 3,
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
           display:false,  
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
  