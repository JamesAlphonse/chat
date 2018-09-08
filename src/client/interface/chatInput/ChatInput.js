// react
import React from 'react';

// material-ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    zIndex: 1000,
    backgroundColor: 'white',
  },
  textField: {
    width: "80%",
  },
  login: {
    width: '20%',
    height: 62
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});

class ChatInput extends React.Component {
  state = {
    message: '',
    disabled: true
  };

  componentWillReceiveProps = newProps => {
    if(newProps.isLoggedIn)
      this.setState({disabled: false});
    else
      this.setState({disabled: true});
  }

  handleChange = message => event => {
    if(event.target.value.length <= 50)
      this.setState({
        [message]: event.target.value,
      });
  };

  onSendMessage = e => {
    e.preventDefault();
    if(this.state.message.length > 0){
      this.props.onSendMessage(this.state.message);
      this.setState({message: ''});
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off" onSubmit={ this.onSendMessage }>
        <TextField
          id="message"
          label="Message"
          className={classes.textField}
          value={this.state.message}
          onChange={this.handleChange('message')}
          margin="normal"
          autoFocus
          disabled={this.state.disabled}
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.login}
          disabled={this.state.disabled}
          type="submit"
        >
          Send
        </Button>
      </form>
    );
  }
}

ChatInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatInput);