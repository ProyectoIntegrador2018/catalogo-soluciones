import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import './notification.styles.scss';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

export const FormError = ({ errorMssg, onClose, ...otherProps }) => (
  <Snackbar
    autoHideDuration={5000}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={errorMssg ? true : false}
    onClose={onClose}
  >
    <Alert severity='error' onClose={onClose}>
      {errorMssg}
    </Alert>
  </Snackbar >
);

export const Message = ({ mssg, onClose, ...otherProps }) => (
  <Snackbar
    autoHideDuration={5000}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={mssg ? true : false}
    onClose={onClose}
  >
    <Alert severity='info' onClose={onClose}>
      {mssg}
    </Alert>
  </Snackbar >
);