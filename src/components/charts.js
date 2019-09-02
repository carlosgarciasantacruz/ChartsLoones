import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import SubcategoryAPI from './subcategories';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Brush
} from 'recharts';
import { Translation } from 'react-i18next';

const initialState = {
  left: 'dataMin',
  right: 'dataMax',
  top: 'dataMax+1',
  bottom: 'dataMin-1',
  animation: true,
  data: [],
};

// Custom Labels & Tooltips classes

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" /*transform="rotate(-35)"*/ >{new Date(payload.value).getFullYear()}</text>
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
    this.subcategoryAPI = new SubcategoryAPI(props.id);

    const REFRESH_HOURS = 0
    const REFRESH_MINUTES = 1
    const REFRESH_SECONDS = 0

    this.refreshTime = this.timeToMiliseconds(REFRESH_HOURS, REFRESH_MINUTES, REFRESH_SECONDS);
  }

  getDatabySubcategoryId() {
    this.subcategoryAPI.getResponseBySubcategoryId()
      .then(({ data }) => {
        this.setState({ data: data })
      })
  }

  componentDidMount() {
    this.getDatabySubcategoryId();
    // Refresh each 1 minute.
    this.interval = setInterval(() => this.getDatabySubcategoryId(), this.refreshTime);
  }

  // Format methods
  // ----------------------------

  timeToMiliseconds(hrs, min, sec) {
    return ((hrs * 60 * 60 + min * 60 + sec) * 1000);
  }

  toPercent(decimal, fixed = 0) {
    return `${decimal}€`;
  }

  // Highlight and ZoomOut methods
  // ----------------------------

  zoomOut = () => {
    this.setState(() => ({
      data: this.state.data.slice(),
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin',
    }));
  }

  render() {
    const {
      left, right, top, bottom, data
    } = this.state;

    return (
      <div style={{ width: '100%', height: '100%' }}>

        {/* Button Zoom Out */}
        <Button
          href={null}
          className="btn update"
          onClick={this.zoomOut.bind(this)}
          color="primary">
          <Translation>{t => t('zoom-out')}</Translation>
        </Button>

        {/* Custom LineChart */}
        <ResponsiveContainer>
          <LineChart
            width={800}
            height={400}
            data={data}
            margin={{
              top: 5, right: 10, left: 5, bottom: 75,
            }}
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
            <Brush dataKey="date" height={30} stroke="#8884d8"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
