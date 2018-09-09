// react
import React from 'react';

// material ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  listItemText: {
  	wordWrap: 'break-word',
  }
});

function ChatItem(props) {
	const { classes } = props;
  return (
  	<span>
	    <ListItem>
	      <ListItemText
	        primary={ props.data.message }
	        secondary={ props.data.username }
	        className={classes.listItemText}
	      />
	    </ListItem>
	    <Divider />
    </span>
  );
}

ChatItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatItem);