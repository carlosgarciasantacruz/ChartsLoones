import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';

class SimpleLineChart extends PureComponent {

  render() {

    return (
			<ResponsiveContainer>
				<LineChart
					width={500}
					height={300}
					data={this.props.data}
					margin={{
						top: 5, right: 30, left: 20, bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis dataKey="price" />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
				</LineChart>
			</ResponsiveContainer>
    );
  }
}

export default SimpleLineChart;