import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import './form-error.styles.scss';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const FormError = ({ errorMssg, open, onClose, ...otherProps }) => (
  <Snackbar
    autoHideDuration={5000}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={open}
    onClose={onClose}
  >
    <Alert severity='error' onClose={onClose}>
      {errorMssg}
    </Alert>
  </Snackbar>
);

export default FormError;
