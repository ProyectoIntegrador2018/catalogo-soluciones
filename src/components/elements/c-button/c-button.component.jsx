import React from 'react';

import CModal from '../c-modal/c-modal.component';
import { Button } from '@material-ui/core';
import { Form } from '../../form/form.component';

import './c-button.styles.scss'

const ButtonContainer = ({className, ...props}) => (
  <span className='button-container'>
    <Button className={`white-text ${className}`} {...props} />
  </span>
);

const CButton = ({text, onClick, alertMessage, color, ...otherProps}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <span>
      <ButtonContainer 
        variant='contained'
        className={color}
        onClick={alertMessage ? () => setOpen(true) : onClick}
        {...otherProps}
      >
        {text}
      </ButtonContainer>
      {alertMessage ?
        <CModal
          open={open}
          onClose={() => setOpen(false)}
        >
          <Form
            title={alertMessage}
          >
            <br></br>
            <ButtonContainer
              variant='contained'
              className='grey'
              onClick={() => setOpen(false)}
            >
              Cancelar
            </ButtonContainer>
            &nbsp;&nbsp;
            <ButtonContainer
              variant='contained'
              className='red'
              onClick={onClick}
            >
              Continuar
            </ButtonContainer>
          </Form>
        </CModal>
      : null}
    </span>
  );
};


export default CButton;