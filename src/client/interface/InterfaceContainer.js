// react
import React from 'react';

// css
import './defaultStyles.css';

// material ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// components
import Dialog from './dialog/Dialog';
import Snackbar from './snackbar/Snackbar';
import Nav from './nav/nav.js';
import ChatWindow from './chatWindow/ChatWindow';
import ChatInput from './chatInput/ChatInput';

const styles = theme => ({
  interfaceContainer: {
  	margin: '0px auto',
  	width: '100%',
  	height: '100%',
  	maxWidth: 800,
  	backgroundColor: 'white',
  }
});

class InterfaceContainer extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.interfaceContainer}>

				<Dialog
					dialogOpen={ this.props.dialogOpen }
					onLoginFormSubmit= { this.props.onLoginFormSubmit }
				/>

				<Snackbar
					snackBar={ this.props.snackBar }
					onSnackbarClose={ this.props.onSnackbarClose }
				/>

				<Nav
					userList={ this.props.chatStore.users }
					isLoggedIn={ this.props.isLoggedIn }
					onLoginNav={ this.props.onLoginNav }
					onLogoutNav={ this.props.onLogoutNav }
				/>

				<ChatWindow
					log={ this.props.chatStore.log }
				/>

				<ChatInput
					isLoggedIn={ this.props.isLoggedIn }
					onSendMessage={ this.props.onSendMessage }
				/>

			</div>
		);
	}
}

InterfaceContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InterfaceContainer);