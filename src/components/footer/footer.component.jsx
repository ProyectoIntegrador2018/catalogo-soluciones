import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import Twitter from '@material-ui/icons/Twitter';
import LinkedIn from '@material-ui/icons/LinkedIn';

import './footer.styles.scss';
import { YouTube } from '@material-ui/icons';

const Footer = () => (
  <div className='footer'>
    <div className='footer-content'>
      <h4>Consejo de Software de Nuevo León AC</h4>
      <div>
        <a 
          href='https://www.facebook.com/csoftmty/' 
          className='social-media'
          target='_blank'
          rel='noreferrer'
        >
          <FacebookIcon color='primary' />
        </a>
        <a 
          href='https://twitter.com/Csoftmty' 
          className='social-media'
          target='_blank'
          rel='noreferrer'
        >
          <Twitter color='primary' />
        </a>
        <a
          href='https://www.linkedin.com/company/nuevo-leon-software-council/about/'
          className='social-media'
          target='_blank'
          rel='noreferrer'
        >
          <LinkedIn color='primary' />
        </a>
        <a
          href='https://www.youtube.com/channel/UCl6uQPgQvJ_0gNXdeCHK3Gg'
          className='social-media'
          target='_blank'
          rel='noreferrer'
        >
          <YouTube color='primary' />
        </a>
      </div>
      <p>Copyright @2020</p>
      <p>Padre Mier #1251 Cuarto piso, Zona Centro. Monterrey, NL.</p>
      <a
        className='orange'
        href='https://csoftmty.org/Aviso%20de%20Privacidad.html'
        target='_blank'
        rel='noreferrer'
      >
        Aviso de Privacidad
      </a>
    </div>
  </div>
);

export default Footer;
