import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import AboutCard from '../AboutCard';
import UncontrolledExample from '../Gallery';
// import Swiper_block from '../Swiper';
import Cards_Grid from '../CardGrid.js'


function Home() {
  return (
    <>
     <HeroSection /> 
     {/* <AboutCard
              img src='images/did.JPG'
              text=''
              label='About'
              path='/about'
            />
      <br></br> */}
     {/* <UncontrolledExample/> */}
     {/* <Cards_Grid/> */}
     <Cards/>
     <Footer/>
    
    </>
  );
}

export default Home;