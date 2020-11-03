import React from 'react';

import {
  MenuItem,
  Checkbox,
  ListItemText,
  Select,
  Input,
} from '@material-ui/core';

import './form.styles.scss';

export const Form = ({ title, onSubmit, ...otherProps }) => (
  <div className='form-container'>
    <div className='form-content'>
      <h2 className='title'>{title}</h2>
      <form onSubmit={onSubmit} {...otherProps}></form>
    </div>
  </div>
);

export const FormSubTitle = ({ subtitle }) => (
  <h3 className='title'>{subtitle}</h3>
);

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
  <option className='form-input-label' {...otherProps}>
    {label}
  </option>
);

export const FormMultiSelect = ({ label, ...otherProps }) => (
  <div className='group'>
    {/* <InputLabel id={label}>{label}</InputLabel> */}
    <Select
      className='form-multi-select'
      labelId={label}
      input={<Input />}
      multiple
      {...otherProps}
    />
    {label && (
      <label
        className={`${otherProps.value.length && 'shrink'} form-input-label`}
      >
        {label}
      </label>
    )}
  </div>
);

export const FormMultiOption = ({ label, ...otherProps }) => (
  <MenuItem key={label} value={label} {...otherProps}>
    <Checkbox />
    <ListItemText primary={label} />
  </MenuItem>
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
    <input
      className='form-input file'
      type='file'
      onChange={handleChange}
      {...otherProps}
    />
    {label && <label className={`${'shrink'} form-input-label`}>{label}</label>}
  </div>
);
