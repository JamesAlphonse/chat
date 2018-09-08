// react
import React from 'react';

// material ui
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

export default function ChatItem(props) {
  return (
  	<span>
	    <ListItem>
	      <ListItemText
	        primary={ props.data.message }
	        secondary={ props.data.username }
	      />
	    </ListItem>
	    <Divider />
    </span>
  );
}