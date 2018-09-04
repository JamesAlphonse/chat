import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  header: {
    marginTop: 20,
  },
  body2: {
    marginTop: '0.35em',
  },
};

class TemporaryDrawer extends React.Component {
  state = {
    open: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <Typography variant="headline" gutterBottom align="center" className={classes.header}>
          Users Online: { this.props.userList.length }
        </Typography>
        <Divider />
        {
          this.props.userList.map((user, key) =>
            <div key={ key }>
              <Typography variant="body2" gutterBottom className={classes.body2} align="center">
                { user.username }
              </Typography>
              <Divider />
            </div>
          )
        }
      </div>
    );

    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={this.toggleDrawer('open', true)}
          className={classNames(classes.menuButton, true && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={this.state.open} onClose={this.toggleDrawer('open', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('open', false)}
            onKeyDown={this.toggleDrawer('open', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
