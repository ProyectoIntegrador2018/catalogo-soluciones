import React from 'react';

import './form-input.styles.scss';

export const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className='group'>
    <input className='form-input' onChange={handleChange} {...otherProps} />
    {label && (
      <label
        className={`${otherProps.value.length && 'shrink'} form-input-label`}
      >
        {label}
      </label>
    )}
  </div>
);

export const FormSelect = ({ handleChange, label, ...otherProps }) => (
  <div className='group'>
    {label && otherProps.value.length ?
      <label className={`${'shrink'} form-input-label`}>{label}</label>
      : null}
    <select className='form-input' onChange={handleChange} {...otherProps} />
  </div>
);

export const FormTextarea = ({ label, handleChange, ...otherProps }) => (
  <div className='group'></div>
);
