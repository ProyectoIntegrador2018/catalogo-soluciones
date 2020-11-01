import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectNotification } from '../../redux/notification/notification.selector';
import { setNotification } from '../../redux/notification/notification.actions';

import './notification.styles.scss';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

class Notification extends React.Component {
  constructor() {
    super();

    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.setNotification({ severity: 'info', message: '' });
  }

  render() {
    const { severity, message } = this.props.notification;
    return (
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={message ? true : false}
        onClose={this.onClose}
      >
        <Alert severity={severity} onClose={this.onClose}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  notification: selectNotification,
});

const mapDispatchToProps = (dispatch) => ({
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
