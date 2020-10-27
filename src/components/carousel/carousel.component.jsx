import React, { Component } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import './carousel.styles.scss';

export default class PhotoCarousel extends Component {
  render() {
    const settings = {
      duration: 2000,
      pauseOnHover: false,
      indicators: false,
      arrows: false
    };
    return (
      <div className='slide-container'>
        <Fade {...settings}>
          <div className='each-fade'>
            <div className='image-container'>
              <h1 className='white-text'>Desarrollo de software</h1>
              <ul className='white-text'>
                <li>Desarrollo web</li>
                <li>Soluciones tecnológicas</li>
                <li>Fintech</li>
                <li>Healthtech</li>
                <li>E-commerce</li>
                <li>Desarrollo a la medida</li>
              </ul>
            </div>
          </div>

          <div className='each-fade'>
            <div className='image-container'>
              <h1 className='white-text'>Servicios</h1>
              <ul className='white-text'>
                <li>Facturación electrónica</li>
                <li>Staffing</li>
                <li>Software as a service</li>
                <li>Monitoreo de software y hardware</li>
                <li>Consultoría TIC</li>
                <li>Asesoría en propiedad intelectual en temas de tecnología</li>
                <li>Tratamiento de imagen</li>
                <li>Servicios de telecomunicaciones</li>
              </ul>
            </div>
          </div>

          <div className='each-fade'>
            <div className='image-container'>
              <h1 className='white-text'>Tecnología 4.0</h1>
              <ul className='white-text'>
                <li>Realidad aumentada</li>
                <li>3D printing</li>
                <li>Business intelligence</li>
                <li>Big data y Analítica de datos</li>
                <li>Inteligencia artifial</li>
                <li>Robótica</li>
                <li>IoT</li>
                <li>Ciberseguridad</li>
                <li>Blockchain</li>
                <li>Nube</li>
              </ul>
            </div>
          </div>

          <div className='each-fade'>
            <div className='image-container'>
              <h1 className='white-text'>Desarrollo</h1>
              <ul className='white-text'>
                <li>Uso de PLC</li>
                <li>Redes industriales</li>
              </ul>
            </div>
          </div>
        </Fade>
      </div>
    );
  }
}
