import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../static/images/logo-loones.jpg'
import IconButton from '@material-ui/core/IconButton';
import TranslateIcon from '@material-ui/icons/Translate';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ReactCountryFlag from "react-country-flag";
import i18n from '../i18n';
import { withTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function AppBarComponent() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(lng) {
    setAnchorEl(null);
    if (lng != null)
      i18n.changeLanguage(lng);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <a href="https://loones.es/" className={classes.title}>
            <img src={logo} alt="Loones Logo" />
          </a>
          <div>
            <IconButton
              aria-label="language"
              aria-controls="menu-language"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <TranslateIcon />
            </IconButton>
            <Menu
              id="menu-language"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={() => handleClose(null)}
            >
              <MenuItem onClick={() => handleClose('es')}>
                <ReactCountryFlag code="es" />&nbsp;&nbsp; ES
              </MenuItem>
              <MenuItem onClick={() => handleClose('en')}>
                <ReactCountryFlag code="gb" />&nbsp;&nbsp; EN
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withTranslation()(AppBarComponent);