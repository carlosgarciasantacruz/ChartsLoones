import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import SimpleLineChart from './charts';
import { Translation } from 'react-i18next';
import SubcategoryAPI from './subcategories';


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

class Dashboard extends React.Component {

  render() {
    const { classes } = this.props;
    console.log(SubcategoryAPI.subcategories);

    const customListPapers = classNames(classes.paper, classes.list)
    const graphs = SubcategoryAPI.subcategories.map((item, key) =>
      <Grid key={key} item xs={12} md={4}>
        <Paper className={customListPapers} elevation={8}>
          <Typography variant="h4" align="center" color="primary" >
            <Translation>{t => t(item.name)}</Translation> {item.measure}
          </Typography>
          <Divider variant='middle' />
          <SimpleLineChart id={item.id} />
        </Paper>
      </Grid>
    );

    return (
      <div>
        <Grid container spacing={0}>
          {graphs}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
