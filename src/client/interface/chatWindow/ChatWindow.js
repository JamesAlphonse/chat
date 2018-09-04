// react
import React from 'react';

// material ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

// components
import ChatItem from './ChatItem';

const styles = theme => ({
  root: {
    width: '100%',
    height: 'calc(100% - 137px)',
    backgroundColor: 'white',
    overflowY: 'auto',
    borderBottom: '1px solid gray',
  }
});

class ChatList extends React.Component {
  componentDidUpdate() { // yes... I know how bad this is, but I'm frustrated trying to find a 'correct' solution
    document.getElementById('chatListContainer').scrollTop = document.getElementById('chatListContainer').scrollHeight;
  }

  render() {
    const { classes } = this.props;

    return (
      <div id="chatListContainer" className={classes.root}>
        <List>

          {
            this.props.log.map((item, key) => 
              <ChatItem data={ item } key={ key } />
            )
          }
          
        </List>
      </div>
    );
  }
}

ChatList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatList);
