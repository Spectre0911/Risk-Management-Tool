import React, { useEffect } from "react";

import { Line } from "react-chartjs-2";


const LineGraph = ({labels, datavalues}) => {
    const data = {
    labels: labels,
    datasets: [
        {
        label: "Commit tracker",
        data: datavalues,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
        },
    ],    
    };

    const options = {
            maintainAspectRatio: false,
        };

    return (
        <div className="lineGraphContainer">
        <Line data={data} options={options} />
        </div>
    );
};
export default LineGraph;