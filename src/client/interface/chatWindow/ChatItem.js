// react
import React from 'react';

// material ui
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function ChatItem(props) {
  return (
    <ListItem>
      <ListItemText
        primary={ props.data.message }
        secondary={ props.data.username }
      />
    </ListItem>
  );
}