import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import './message.styles.scss';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const Message = ({ errorMssg, open, onClose, ...otherProps }) => (
  <Snackbar
    autoHideDuration={5000}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    open={open}
    onClose={onClose}
  >
    <Alert severity='info' onClose={onClose}>
      {errorMssg}
    </Alert>
  </Snackbar>
);

export default Message;
