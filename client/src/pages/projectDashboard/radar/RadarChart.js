import React from "react";
import { RadarData, RadarOptions } from "./RadarConfig";
import { Radar} from "react-chartjs-2";
import {Chart, RadialLinearScale, PointElement, LineElement, Legend, Filler, LineController} from "chart.js";
Chart.register(RadialLinearScale, PointElement, LineElement, Legend ,Filler, LineController);

export class RadarChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
  }

  render() {
    return (
      <Radar ref={this.chartRef} data={RadarData} options={RadarOptions} />
    );
  }
}
