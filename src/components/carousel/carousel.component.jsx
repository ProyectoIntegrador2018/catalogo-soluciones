import React, { Component } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import SOLUTION_CATEGORIES from '../../constants/solution-categories';

import './carousel.styles.scss';

export default class PhotoCarousel extends Component {
  render() {
    const settings = {
      duration: 2000,
      pauseOnHover: false,
      indicators: false,
      arrows: false,
    };
    return (
      <div className='slide-container'>
        <Fade {...settings}>
          {Object.keys(SOLUTION_CATEGORIES).map((category, i) => (
            <div key={i} className='each-fade'>
              <div className='image-container'>
                <h1 className='white-text'>{category}</h1>
                <ul className='white-text'>
                  {SOLUTION_CATEGORIES[category].map((subcategory, j) => (
                    <li key={j}>{subcategory}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </Fade>
      </div>
    );
  }
}
