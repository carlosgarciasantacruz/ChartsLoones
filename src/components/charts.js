import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea,
} from 'recharts';

const data = [
  {
    "id": 1,
    "price": 64.07,
    "date": "2018-07-23T00:00:00",
    "add_date": "2019-07-12T12:19:27.403642",
    "subcategory": 4
  },
  {
    "id": 2,
    "price": 41.82,
    "date": "2017-07-24T00:00:00",
    "add_date": "2019-07-12T12:19:27.411743",
    "subcategory": 4
  },
  {
    "id": 3,
    "price": 36.52,
    "date": "2016-07-25T00:00:00",
    "add_date": "2019-07-12T12:19:27.422190",
    "subcategory": 4
  },
  {
    "id": 4,
    "price": 63.17,
    "date": "2018-07-30T00:00:00",
    "add_date": "2019-07-12T12:19:27.454598",
    "subcategory": 4
  },
  {
    "id": 5,
    "price": 42.82,
    "date": "2017-07-31T00:00:00",
    "add_date": "2019-07-12T12:19:27.459467",
    "subcategory": 4
  }
];

// Highlight and Zoom methods
// ----------------------------
const getAxisYDomain = (from, to, ref, offset) => {
  const refData = data.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};


const zoom = () => {
  let { refAreaLeft, refAreaRight, data } = this.state;

  if (refAreaLeft === refAreaRight || refAreaRight === '') {
    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
    }));
    return;
  }

  // xAxis domain
  if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

  // yAxis domain
  const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1);

  this.setState(() => ({
    refAreaLeft: '',
    refAreaRight: '',
    data: data.slice(),
    left: refAreaLeft,
    right: refAreaRight,
    bottom,
    top,
  }));
}

const zoomOut = () => {
  const { data } = this.state;
  this.setState(() => ({
    data: data.slice(),
    refAreaLeft: '',
    refAreaRight: '',
    left: 'dataMin',
    right: 'dataMax',
    top: 'dataMax+1',
    bottom: 'dataMin',
  }));
}

const initialState = {
  data,
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'dataMax+1',
  bottom: 'dataMin-1',
  animation: true,
};

/*
class CustomizedLabel extends PureComponent {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;

    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
  }
}
*/

// Custom Labels & Tooltips classes

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{new Date(payload.value).getFullYear()}</text>
      </g>
    );
  }
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Date: ${new Date(label).toLocaleDateString()}`}</p>
        <p className="intro">{`Price: ${payload !== null ? payload[0].value : ''}€`}</p>
      </div>
    );
  }

  return null;
};


export default class SimpleLineChart extends PureComponent {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  toPercent(decimal, fixed = 0) {
    return `${decimal}€`;
  } 

  render() {
    const {
      data, left, right, refAreaLeft, refAreaRight, top, bottom
    } = this.state;

    return (
      <div style={{ width: '100%', height: '100%' }}>

        {/* Button Zoom Out */}
        <Button
          href={null}
          className="btn update"
          // onClick={zoomOut.bind(this)}
          color="primary">
          Zoom Out
        </Button>

        {/* Custom LineChart */}
        <ResponsiveContainer>
          <LineChart
            width={800}
            height={400}
            data={this.props.data}
            margin={{
              top: 5, right: 10, left: 5, bottom: 75,
            }}
            // TODO: Implement Zoom: http://recharts.org/en-US/examples/HighlightAndZoomLineChart
            // onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel })}
            // onMouseMove={e => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
            // onMouseUp={zoom.bind(this)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              allowDataOverflow
              dataKey="date"
              domain={[left, right]}
              tick={<CustomizedAxisTick />}
            />
            <YAxis
              allowDataOverflow
              dataKey="price"
              domain={[bottom, top]}
              type="number"
              tickFormatter={this.toPercent}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 4 }} animationDuration={300} /*label={<CustomizedLabel />*/ />

            {
              (refAreaLeft && refAreaRight) ? (
                <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null
            }
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
