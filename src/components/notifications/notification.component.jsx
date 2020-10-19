import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import './notification.styles.scss';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

export const Notification = ({ severity, mssg, onClose, ...otherProps }) => (
  <Snackbar
    autoHideDuration={5000}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={mssg ? true : false}
    onClose={onClose}
  >
    <Alert severity={severity} onClose={onClose}>
      {mssg}
    </Alert>
  </Snackbar >
);