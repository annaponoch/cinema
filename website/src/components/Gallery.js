import Carousel from 'react-bootstrap/Carousel';
import React from 'react';

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height: 600}}
          src="images/vol.JPG"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Разом нас багато</h3>
          {/* <p>Допомагаємо українцям гуманітарною.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height: 600}}
          src="images/vol3.JPEG"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Нас не подолати</h3>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height: 600}}
          src="images/vol2.JPG"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Разом нас багато</h3>
          {/* <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;