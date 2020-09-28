import React from 'react';

import './form-error.styles.scss';

const FormError = ({ handleChange, errorMssg, ...otherProps }) => (
  <span>{errorMssg ? <p className='error'>{errorMssg}</p> : null}</span>
);

export default FormError;
