// react
import React from 'react';

// redux
import { connect } from 'react-redux';

// actions
import { login, logout } from './redux/actions/UserActions';
import { receiveMessage, displayActiveUsers } from './redux/actions/ChatActions';

// socket.io
import io from "socket.io-client";

// interface container
import InterfaceContainer from './interface/InterfaceContainer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      snackBar: {
        open: false,
        message: null,
      },
    }

    // connect
    // server: 142.93.200.128
    this.socket = io('localhost:8080');

    // history
    this.socket.on('HISTORY', function(message_history) {
      history(message_history);
    });
    // login action
    const history = message_history => {
      message_history.reverse();
      message_history.forEach(message => {
        this.props.receiveMessage(message);
      });

    };

    // login
    this.socket.on('LOGIN_CONFIRM', function(userData) {
      login(userData);
    });
    // login action
    const login = userData => {
      this.props.login(userData);
      this.setState({
        snackBar: {
          open: true,
          message: 'Welcome, ' + userData.username + '.',
        }
      });
    };

    // logout
    this.socket.on('LOGOUT_CONFIRM', function(userData) {
      logout(userData);
    });
    // logout action
    const logout = userData => {
      this.props.logout();
      this.setState({
        snackBar: {
          open: true,
          message: 'Goodbye, ' + userData.username + '.',
        }
      });
    };

    // message
    this.socket.on('RECEIVE_MESSAGE', function(messageData) {
      receiveMessage(messageData);
    });
    // message action
    const receiveMessage = messageData => {
      this.props.receiveMessage(messageData);
    };

    // message
    this.socket.on('ACTIVE_USERS', function(users) {
      displayActiveUsers(users);
    });
    // message action
    const displayActiveUsers = users => {
      this.props.displayActiveUsers(users);
    };
  }

  onLoginNav = () => {
    this.setState({
      dialogOpen: true,
    });
  }

  onLoginFormSubmit = username => {
    this.socket.emit('LOGIN', 
      username
    );
    this.setState({
      dialogOpen: false,
    });
  }

  onLogoutNav = () => {
    this.socket.emit('LOGOUT');
  }

  onSnackbarClose = data => {
    this.setState({
      snackBar: {
        open: data.open,
        message: data.message,
      }
    });
  }

  onSendMessage = message => {
    if(message.length > 0){
      this.socket.emit('SEND_MESSAGE', message);
    }
  }

	render() {
		return (
      <InterfaceContainer
        dialogOpen={ this.state.dialogOpen }
        snackBar={ this.state.snackBar }
        onSnackbarClose = { this.onSnackbarClose }
        isLoggedIn={ this.props.UserStore.isLoggedIn }
        onLoginNav={ this.onLoginNav }
        onLoginFormSubmit={ this.onLoginFormSubmit }
        onLogoutNav={ this.onLogoutNav }
        chatStore={ this.props.ChatStore }
        onSendMessage={ this.onSendMessage }
      />
		);
	}
}

// specify which sets of data (from specific reducers) you want from the store in this component
const mapStateToProps = (state) => {
  return {
    UserStore: state.UserReducer,
    ChatStore: state.ChatReducer
  }
};

// create dispatches to actions
const mapDispatchToProps = (dispatch) => {
  return {
    login: (userData) => {
      dispatch(login(userData));
    },
    logout: () => {
      dispatch(logout());
    },
    receiveMessage: (messageData) => {
      dispatch(receiveMessage(messageData));
    },
    displayActiveUsers: (users) => {
      dispatch(displayActiveUsers(users));
    }
  }
};

// this makes this component a smart component
// connect react to redux and pass login component as default
export default connect(mapStateToProps, mapDispatchToProps)(App);