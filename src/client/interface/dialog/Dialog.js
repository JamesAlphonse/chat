// react
import React from 'react';

// material ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
  state = {
    open: false,
    username: null,
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      open: newProps.dialogOpen,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  onUsernameChange = e => {
    if(e.target.value.length <= 30)
      this.setState({
        username: e.target.value,
      });
  }

  onSubmit = () => {
    if(this.state.username.length > 0)
      this.props.onLoginFormSubmit(this.state.username);
  }

  onKeyPress = e => {
    if(e.keyCode === 13)
      this.onSubmit();
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You don't need to register or use a password to login.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              onChange={ this.onUsernameChange }
              onKeyDown={ this.onKeyPress }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
                color="primary"
                onClick={ this.onSubmit }
            >
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
