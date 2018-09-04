import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  ButtonPre: {
    margin: theme.spacing.unit,
  }
});

function ButtonPre(props) {
  const { classes } = props;
  return (
    <div>
      <Button
        variant={ props.variant }
        color={ props.color }
        className={ classes.ButtonPre }
        onClick={ props.action }
      >
        { props.text }
      </Button>
    </div>
  );
}

ButtonPre.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonPre);
