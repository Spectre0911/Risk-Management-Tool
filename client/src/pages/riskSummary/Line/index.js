import React, { useEffect } from "react";

import { Line } from "react-chartjs-2";


const LineGraph = ({labels, datavalues}) => {
    const data = {
    labels: labels,
    datasets: [
        {
        label: "Risk history",
        data: datavalues,
        fill: true,
        backgroundColor: "rgba(254, 50, 6, 0.548)",
        borderColor: "rgba(219, 52, 0)"
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