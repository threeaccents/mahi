import {Component, ComponentInterface, h, Host, Prop, Watch} from '@stencil/core';
import {Chart} from "frappe-charts"
import {TaLineGraphDataSet} from './interface';

@Component({
  tag: 'ta-line-graph',
  styleUrl: 'ta-line-graph.css',
  shadow: true,
})
export class TaLineGraph implements ComponentInterface {
  chartEl: HTMLDivElement;

  chart: Chart;

  @Prop() labels!: string[];
  @Prop() datasets!: TaLineGraphDataSet[];

  @Watch('datasets')
  handleWatchDatasets() {
    const data = {
      labels: this.labels,
      datasets: this.datasets
    }
    this.chart.update(data)
  }

  componentDidLoad() {
    const data = {
      labels: this.labels,
      datasets: this.datasets
    }


    // gotta add this set timeout for some reason.
    setTimeout(() => {
      this.chart = new Chart(this.chartEl, {
        data: data,
        type: 'line',
        height: 258,
        colors: ['#38bdd3', '#fe6e71', '#53c78e', '#fce170']
      })
    }, 100)
  }

  render() {
    return (
      <Host>
        <div
          ref={(el) => this.chartEl = el}
          class="ct-chart ct-perfect-fourth"></div>
      </Host>
    );
  }

}
