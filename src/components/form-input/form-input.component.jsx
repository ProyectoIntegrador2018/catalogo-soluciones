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
    <select className='form-input' onChange={handleChange} {...otherProps} />
    {label && (
      <label
        className={`${otherProps.value.length && 'shrink'} form-input-label`}
      >
        {label}
      </label>
    )}
  </div>
);

export const FormOption = ({ label, ...otherProps }) => (
  <option className='form-input-label' {...otherProps}>{label}</option>
);

export const FormTextarea = ({ label, handleChange, ...otherProps }) => (
  <div className='group'>
    <textarea className='form-input' onChange={handleChange} {...otherProps} />
    {label && (
      <label
        className={`${otherProps.value.length && 'shrink'} form-input-label`}
      >
        {label}
      </label>
    )}
  </div>
);

export const FormFile = ({ label, handleChange, ...otherProps }) => (
  <div className='group'>
    <input className='form-input file' type='file' onChange={handleChange}
      {...otherProps} />
    {label && (
      <label
        className={`${'shrink'} form-input-label`}
      >
        {label}
      </label>
    )}
  </div>
)