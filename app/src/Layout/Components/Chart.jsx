import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react';

class Chart extends Component {
    render() {
        const option = {
            title: {
              text: this.props.title
            },
            tooltip: {},
            legend: {
              data:this.props.dataeleName
            },
            xAxis: {
              data: this.props.dataName
            },
            yAxis: {},
            series:this.props.mainData
          };
        return (
            <div>
                 <ReactECharts option={option}
                    style={{ height: 400 }}
                    opts={{ renderer: 'svg' }}
                />
            </div>
        );
    }
}

export default Chart;
