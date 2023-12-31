import './App.css';
import ThreeDContainer from './react_components/3dContainer';
import {ReactComponent as VULGATO_TYPE_LG} from './assets/VULGATO_TYPE_LG.svg';
import {ReactComponent as VULGATO_SWIPE} from './assets/VULGATO_SWIPE.svg';
import React, {useState, useEffect} from 'react';


function App() {
  const [isBottom, setIsBottom] = useState(false);
  const endOfPageRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update isBottom when the end of the page is visible
        setIsBottom(entry.isIntersecting);
      },
      { threshold: 1.0 } // Call the callback when the end of the page is fully visible
    );

    if (endOfPageRef.current) {
      observer.observe(endOfPageRef.current);
    }

    // Clean up on unmount
    return () => {
      if (endOfPageRef.current) {
        observer.unobserve(endOfPageRef.current);
      }
    };
  }, []); 

  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
          <div style={{ display: isBottom ? 'none' : 'block' }}>
            <VULGATO_SWIPE className="vulgato-swipe"/>
          </div>
        <div className='child'> 
          <ThreeDContainer className="logo3d"/>
          <VULGATO_TYPE_LG className="vulgato-type"/>
          <h6>Your AI powered fitness Journey</h6>
        </div> 
        <div className='child'>
          <h3>What is Vulgato?</h3>
          <p>Vulgato is a fitness app that uses AI to help you achieve your fitness goals.</p>
        </div>
        <div className='child'>
          <h3>How does it work?</h3>
          <p>Vulgato uses AI to analyze your body and create a personalized fitness plan for you.</p>
        </div>
        <div className='child'>
          <h3>How do I get started?</h3>
          <p>Sign up for our beta program to get early access to Vulgato.</p>
        </div>
        <div className='child'>
          <h3>Sign up for Beta</h3>
          <input className='email' type="text" placeholder="Email" ref={endOfPageRef}></input>
          <button className='btn'>Sign Up</button>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;
