import './App.css';
import ThreeDContainer from './react_components/3dContainer';
import VULGATO_TYPE_LG from './assets/VULGATO_TYPE_LG.svg';
import VULGATO_SWIPE from './assets/VULGATO_SWIPE.svg';
import VULGATO_ARM from './assets/VULGATO_ARM.svg';
import {ReactComponent as VULGATO_SCAN} from './assets/VULGATO_SCAN.svg';
import React, {useState, useEffect} from 'react';
import testFireBaseConnection from './firebase/config';
import { getFirestore, collection, addDoc } from "firebase/firestore";


function App() {
  const [isBottom, setIsBottom] = useState(false);
  const endOfPageRef = React.useRef(null);
  const [isEnglish, setIsEnglish] = useState(true);
  const language = isEnglish ? "ENG" : "AR";
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState("0");

  const slide1Title = "Your AI powered fitness Journey";
  const slide1TitleArabic = "رحلتك الصحية محصنة بالذكاء الاصتناعي";
  const db = getFirestore();

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

  function handleLanClick() {
    setIsEnglish(!isEnglish);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (emailRegex.test(email)) {
      try {
        await addDoc(collection(db, "emails"), {
          email: email,
        });
        setEmail("");
        setValidEmail("1");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      setValidEmail("2");
      console.error("Invalid email format");
    }
  };

  testFireBaseConnection();

  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
          <div style={{ display: isBottom ? 'none' : 'block' }}>
            <img src={VULGATO_SWIPE} className="vulgato-swipe" alt="swipe" />
          </div>
          <button className='btn-lang' onClick={handleLanClick} >{language}</button>
        <div className='child'> 
          <ThreeDContainer className="logo3d"/>
          <img src={VULGATO_TYPE_LG}  className="vulgato-type" alt="logo" />
          <h6>{isEnglish ? slide1Title : slide1TitleArabic}</h6>

          
        </div> 
        <div className='child'>
          <h3>What is Vulgato?</h3>
          <p>Vulgato is a fitness app that uses AI to help you achieve your fitness goals.</p>
        </div>
        <div className='child'>
          <h3>How does it work?</h3>
          <p>Vulgato uses AI to analyze your body and create a personalized fitness plan for you.</p>
          <div className='vulgato-container'>
            <img src={VULGATO_ARM} className="vulgato-arm" alt="arm" />
            <VULGATO_SCAN className="vulgato-scan"/>
          </div>
        </div>
        <div className='child'>
          <h3>How do I get started?</h3>
          <p>Sign up for our beta program to get early access to Vulgato.</p>
        </div>
        <div className='child'>
          <h3>Sign up for Beta</h3>
          <div className='signup-container'> 
            <input  className='email' 
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    disabled={validEmail==1}
                    onChange={(e) => setEmail(e.target.value)} 
                    ref={endOfPageRef}>    
            </input>

            <button className='btn' onClick={handleSignUp}>Sign Up</button>
            <div style={{display: validEmail==2 ? 'block' : 'none'}}>
              <p>Please enter a valid email address</p>
            </div>
            <div style={{display: validEmail==1 ? 'block' : 'none'}}>
              <p>Thank you for signing up!</p> 
            </div>
          </div>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;
