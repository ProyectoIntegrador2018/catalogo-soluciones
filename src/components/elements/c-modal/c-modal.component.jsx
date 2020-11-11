import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import './c-modal.styles.scss'

const CModal = ({open, onClose, ...otherProps}) => (
  <Modal
    className='modal'
    open={open}
    onClose={onClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open} {...otherProps} />
  </Modal>
);

export default CModal