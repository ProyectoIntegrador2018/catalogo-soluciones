import React from 'react';
import { connect } from 'react-redux';
import { Accordion, AccordionSummary, AccordionDetails, Button, CircularProgress } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './enquiry-item.styles.scss';
import {
  toggleAnsweredState,
} from '../../../redux/enquiries/enquiries.actions';
import { setNotification } from '../../../redux/notification/notification.actions';
import { toggleAnswered } from '../../../firebase/enquiries';

const EnquiryItem = ({ enquiry, toggleAnsweredState, setNotification }) => {
  const {
    id,
    created,
    answered,

    name,
    enquiringOrg,
    fromEmail,
    
    service,

    message,
  } = enquiry;

  const [loading, setLoading] = React.useState(false);

  const handleToggle = () => {
    setLoading(true);
    toggleAnswered({id, answered: !answered}).then(() => {
      toggleAnsweredState({id, answered: !answered})
      setLoading(false);
    }).catch((e) => {
      console.error(e);
      setLoading(false);
      setNotification({
        severity: 'warning',
        message: 'Error al actualizar el estatus. Intente nuevamente.',
      });
    })
    
  };

  const buttonContent = loading ? (
    <CircularProgress />
  ) : answered ? 'Marcar como no contestada' : 'Marcar como contestada';

  const date = new Date(created.seconds * 1000);

  return (
    <div className='new-solution-item'>
      <Accordion className='accordion'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel-enquiries-content'
          id='panel-enquiries-header'
        >
          <span className='organization'>{service}</span>
          <span className='solution-name'>{name}</span>
          <span className='category'>{enquiringOrg}</span>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <h4>Creada el:</h4>
            <p>{date.toDateString()}</p>
            <h4>Correo de contacto:</h4>
            <p>{fromEmail}</p>
            <h4>Mensaje:</h4>
            <p>{message}</p>
            <h4>Estatus:</h4>
            <p>{answered ? 'Contestada' : 'Pendiente de contestar'}</p>
          </div>
        </AccordionDetails>
      </Accordion>
      <Button
        color='primary'
        variant="contained"
        onClick={handleToggle}
      >
        {buttonContent} 
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleAnsweredState: (params) => dispatch(toggleAnsweredState(params)),
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(null, mapDispatchToProps)(EnquiryItem);
