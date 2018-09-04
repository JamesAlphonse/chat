// react
import React from 'react';

// material ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// components
import UserList from '../userList/UserList';
import Button from '../button/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
};

class Nav extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.root }>
        <AppBar position="static" color="default">
          <Toolbar>
            <UserList
              userList={ this.props.userList }
            />

            <Typography variant="title" color="inherit" className={classes.flex}>
              Chat
            </Typography>

            <Button
              text={ this.props.isLoggedIn ? 'LOGOUT' : 'LOGIN' }
              action={ this.props.isLoggedIn ? this.props.onLogoutNav : this.props.onLoginNav }
              color={ this.props.isLoggedIn ? 'secondary' : 'primary' }
              variant='contained'
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);