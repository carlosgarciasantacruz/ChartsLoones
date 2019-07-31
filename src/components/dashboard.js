import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import SimpleLineChart from './charts';

var classNames = require('classnames');

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    'align-items': 'center',
    // color: theme.palette.text.secondary,
  },
  list: {
    height: theme.spacing(40),
    'padding-bottom': theme.spacing(3),
  },
  zeronoassigned: {
    'background-color': 'default',
  },
  noassigned: {
    'background-color': 'red',
  },
  'total': {
    'font-weight': 'bold',
  }
});

const SUBCATEGORIES_URL = process.env.REACT_APP_API_URL + 'subcategories'

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    const REFRESH_HOURS = 0
    const REFRESH_MINUTES = 1
    const REFRESH_SECONDS = 0

    this.state = {
      extra_virgin_olive_oil_data: [],
      virgin_olive_oil_data: [],
      lampante_olive_oil_data: [],
      red_wine: [],
      white_wine: [],
      shell_rice: [],
      barley_feed: [],
      soft_bread_wheat: [],
    }

    this.refreshTime = this.timeToMiliseconds(REFRESH_HOURS, REFRESH_MINUTES, REFRESH_SECONDS);
  }

  timeToMiliseconds(hrs, min, sec) {
    return ((hrs * 60 * 60 + min * 60 + sec) * 1000);
  }

  componentDidMount() {
    this.getChartsData();
    this.interval = setInterval(() => this.getChartsData(), this.refreshTime);
  }

  getChartsData() {
    this.getExtraVirginOliveOilData();
    this.getVirginOliveOilData();
    this.getLampanteOliveOilData();
    this.getRedWine();
    this.getWhiteWine();
    this.getShellRice();
    this.getBarleyFeed();
    this.getSoftBreadWheat();
  }

  getExtraVirginOliveOilData() {
    const extraVirginOliveOilID = 1;
    axios.get(`${SUBCATEGORIES_URL}/${extraVirginOliveOilID}/dataprice_by_subcategory/`)
      .then(res => {
        this.setState({ extra_virgin_olive_oil_data: res.data });
      })
  }

  getVirginOliveOilData() {
    const virginOliveOilID = 2;
    axios.get(`${SUBCATEGORIES_URL}/${virginOliveOilID}/dataprice_by_subcategory/`)
      .then(res => {
        this.setState({ virgin_olive_oil_data: res.data });
      })
  }

  getLampanteOliveOilData() {
    const lampanteOliveOilID = 3;
    axios.get(`${SUBCATEGORIES_URL}/${lampanteOliveOilID}/dataprice_by_subcategory/`)
      .then(res => {
        this.setState({ lampante_olive_oil_data: res.data });
      })
  }

  getRedWine() {
    const redWineID = 4;
    axios.get(`${SUBCATEGORIES_URL}/${redWineID}/dataprice_by_subcategory/`)
      .then(res => {
        this.setState({ red_wine: res.data });
      })
  }

  getWhiteWine() {
    const whiteWineID = 5;
    axios.get(`${SUBCATEGORIES_URL}/${whiteWineID}/dataprice_by_subcategory/`)
      .then(res => {
        this.setState({ white_wine: res.data });
      })
  }

  getShellRice() {
    const shellRiceID = 6;
    axios.get(`${SUBCATEGORIES_URL}/${shellRiceID}/dataprice_by_subcategory/`)
      .then(res => {
        this.setState({ shell_rice: res.data });
      })
  }

  getBarleyFeed() {
    const barleyFeedID = 7;
    axios.get(`${SUBCATEGORIES_URL}/${barleyFeedID}/dataprice_by_subcategory/`)
      .then(res => {
        this.setState({ barley_feed: res.data });
      })
  }

  getSoftBreadWheat() {
    const softBreadWheatID = 8;
    axios.get(`${SUBCATEGORIES_URL}/${softBreadWheatID}/dataprice_by_subcategory/`)
      .then(res => {
        this.setState({ soft_bread_wheat: res.data });
      })
  }

  render() {
    const { classes } = this.props;

    const customListPapers = classNames(classes.paper, classes.list)

    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12} md={4}>
            <Paper className={customListPapers} elevation={8}>
              <Typography variant="h4" align="center" color="primary" >
                Extra Virgin Olive Oil (€/100kg)
          </Typography>
              <Divider variant='middle' />
              <SimpleLineChart data={this.state.extra_virgin_olive_oil_data} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={customListPapers} elevation={8}>
              <Typography variant="h4" align="center" color="primary" >
                Virgin Olive Oil (€/100kg)
          </Typography>
              <Divider variant='middle' />
              <SimpleLineChart data={this.state.virgin_olive_oil_data} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={customListPapers} elevation={8}>
              <Typography variant="h4" align="center" color="primary" >
                Lampante Olive Oil (€/100kg)
              </Typography>
              <Divider variant='middle' />
              <SimpleLineChart data={this.state.lampante_olive_oil_data} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={customListPapers} elevation={8}>
              <Typography variant="h4" align="center" color="primary" >
                Red Whine (€/hl)
              </Typography>
              <Divider variant='middle' />
              <SimpleLineChart data={this.state.red_wine} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={customListPapers} elevation={8}>
              <Typography variant="h4" align="center" color="primary" >
                White Wine (€/hl)
              </Typography>
              <Divider variant='middle' />
              <SimpleLineChart data={this.state.white_wine} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={customListPapers} elevation={8}>
              <Typography variant="h4" align="center" color="primary" >
                Shell Rice (€/T)
              </Typography>
              <Divider variant='middle' />
              <SimpleLineChart data={this.state.shell_rice} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={customListPapers} elevation={8}>
              <Typography variant="h4" align="center" color="primary" >
                Barley Feed (€/T)
              </Typography>
              <Divider variant='middle' />
              <SimpleLineChart data={this.state.barley_feed} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={customListPapers} elevation={8}>
              <Typography variant="h4" align="center" color="primary" >
                Soft Bread Wheat (€/T)
              </Typography>
              <Divider variant='middle' />
              <SimpleLineChart data={this.state.soft_bread_wheat} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
