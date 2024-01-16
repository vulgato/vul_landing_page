import './App.css';
import ThreeDContainer from './react_components/3dContainer';
import VULGATO_TYPE_LG from './assets/VULGATO_TYPE_DR.svg';
import VULGATO_SWIPE from './assets/VULGATO_SWIPE_DR.svg';
import VULGATO_ARM from './assets/VULGATO_ARM_LG.svg';
import VULGATO_LEG_LG from './assets/VULGATO_LEG_LG.svg';
import {ReactComponent as VULGATO_SCAN} from './assets/VULGATO_SCAN.svg';
import {ReactComponent as VULGATO_PROMPT} from './assets/VULGATO_PROMPT.svg';
import {ReactComponent as VULGATO_RESPONSE} from './assets/VULGATO_RESPONSE.svg';

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

  const signUp = "Sign up for Beta";
  const signUpArabic = "اشترك في البيتا";

  const signUpBtn = "Sign Up Now";
  const signUpBtnArabic = "اشترك الان";

  const slide1Title = "Your AI powered fitness Journey";
  const slide1TitleArabic = "رحلتك الصحية محصنة بالذكاء الاصتناعي";

  const slide2Title = "How it Works?";
  const slide2TitleArabic = "كيف يعمل؟";

  const slide2SubTitle1 = "Your Input Matters:";
  const slide2SubTitle1Arabic = ":بيناتك البدنية مهمة";
  const slide2paragraph1 = "Share essential details about yourself, your preferences, and your fitness objectives. Vulgato transforms this information into a comprehensive understanding of your individual profile.";
  const slide2paragraph1Arabic = ".شاركنا بياناتك البدنية وتفضيلاتك وأهدافك الرياضية" +"\n"+" .يحول فولغاتو هذه المعلومات إلى فهم شامل لملفك الشخصي";

  const slide2SubTitle2 = "Crafting Your Fitness Blueprint:";
  const slide2SubTitle2Arabic = ":تصميم خطة التمرين";
  const slide2paragraph2 = "Our advanced algorithms weave together your data, needs, and goals to create a unique workout program. This personalized blueprint serves as your roadmap to success, ensuring every session is purposeful and aligned with your aspirations.";
  const slide2paragraph2Arabic = "خوارزمياتنا المتقدمة تشابك بياناتك واحتياجاتك وأهدافك لإنشاء برنامج تمرين فريد من نوعه "+"\n"+"تعمل هذه الخطة الشخصية كخارطة طريق للنجاح ، مما يضمن أن تكون كل جلسة ذات غرض ومتوافقة مع تطلعاتك";

  const slide2SubTitle3 = "Precision in Every Detail:";
  const slide2SubTitle3Arabic = ":دقة في كل تفصيل";
  const slide2paragraph3 = "Vulgato's commitment to excellence extends to the finer details of your workout routine. Each exercise, rep, and rest interval is meticulously chosen to optimize your progress, making every moment in your fitness journey count.";
  const slide2paragraph3Arabic = "تمتد التزام فولغاتو بالتميز إلى التفاصيل الدقيقة لروتين التمرين الخاص بك"+"\n"+" يتم اختيار كل تمرين وتكرار وفترة راحة بدقة لتحسين تقدمك ، مما يجعل كل لحظة في رحلتك الصحية تعد";

  const slide2SubTitle4 = "Progress at Your Pace:";
  const slide2SubTitle4Arabic = ":تقدم بخطواتك";
  const slide2paragraph4 = "We recognize that everyone's journey is different. Vulgato's personalized approach allows for adjustments, ensuring that your program evolves with you. Your success is our priority, and we're dedicated to supporting your growth every step of the way.";
  const slide2paragraph4Arabic = "ندرك أن رحلة كل شخص مختلفة. يسمح النهج الشخصي لفولغاتو بالتعديلات  "+"\n"+"مما يضمن تطور برنامجك معك. نجاحك هو أولويتنا ، ونحن ملتزمون بدعم نموك في كل خطوة من الطريق";

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
            <div className='vulgato-swipe-container'>
              <button className='btn btn-vulgato-swipe' onClick={() => endOfPageRef.current.scrollIntoView({ behavior: "smooth" })}>{isEnglish ? signUpBtn : signUpBtnArabic}</button>
              <img src={VULGATO_SWIPE} className="vulgato-swipe" alt="swipe" />
            </div>
          </div>
          <button className='btn-lang' onClick={handleLanClick} >{language}</button>
        <div className='child'> 
        <div className='slide1'>
          <div className='slide1Content'>
            <ThreeDContainer className="logo3d"/>
            <img src={VULGATO_TYPE_LG}  className="vulgato-type" alt="logo" />
            <h6>{isEnglish ? slide1Title : slide1TitleArabic}</h6>
          </div>
          <div className='prompt-container'>
            <VULGATO_PROMPT className="vulgato-prompt"/>
            <VULGATO_RESPONSE className="vulgato-response"/>
          </div>
        </div>
        </div> 

        <div className='child child-how-it-works' style={{ textAlign: isEnglish ? 'left' : 'right', paddingLeft: isEnglish ? '5vw' : '5vw' }}>
          <div className='vulgato-container'  style={{ display: isEnglish ? 'none' : 'flex' }}>
            <img src={VULGATO_ARM} className="vulgato-arm" alt="arm" /> <br></br>
            <img src={VULGATO_LEG_LG} className="vulgato-leg" alt="leg" />
          </div>
          <div className='text-container'>
          <h3>{isEnglish ? slide2Title : slide2TitleArabic}</h3>

          <h4>{isEnglish ? slide2SubTitle1 : slide2SubTitle1Arabic }</h4>
          <p>{(isEnglish ? slide2paragraph1 : slide2paragraph1Arabic).split('\n').map((item, key) => {
                                                                                                        return <span key={key}>{item}<br/></span>
                                                                                                     })}</p>

          <h4>{isEnglish ? slide2SubTitle2 : slide2SubTitle2Arabic }</h4>
          <p>{(isEnglish ? slide2paragraph2 : slide2paragraph2Arabic).split('\n').map((item, key) => {
                                                                                                        return <span key={key}>{item}<br/></span>
                                                                                                     })}</p>
          <h4>{isEnglish ? slide2SubTitle3 : slide2SubTitle3Arabic }</h4>
          <p>{(isEnglish ? slide2paragraph3 : slide2paragraph3Arabic).split('\n').map((item, key) => {
                                                                                                        return <span key={key}>{item}<br/></span>
                                                                                                     })}</p>
          <h4> {isEnglish ? slide2SubTitle4 : slide2SubTitle4Arabic }</h4>
          <p>{(isEnglish ? slide2paragraph4 : slide2paragraph4Arabic).split('\n').map((item, key) => {
                                                                                                        return <span key={key}>{item}<br/></span>
                                                                                                     })}</p>
          </div>
          <div className='vulgato-container'  style={{ display: isEnglish ? 'flex' : 'none' }}>
            <img src={VULGATO_ARM} className="vulgato-arm" alt="arm" /><br></br>
            <img src={VULGATO_LEG_LG} className="vulgato-leg" alt="leg" />
          </div>
        </div>
        <div className='child'>
          <h3>{isEnglish ? signUp : signUpArabic}</h3>
          <div className='signup-container'> 
            <input 
                    className='email' 
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    disabled={validEmail===1}
                    onChange={(e) => setEmail(e.target.value)} 
                    ref={endOfPageRef}>    
            </input>
            <button className='btn' onClick={handleSignUp}>{isEnglish ? signUpBtn : signUpBtnArabic}</button>
            <div style={{display: validEmail===2 ? 'block' : 'none'}}>
              <p>Please enter a valid email address</p>
            </div>
            <div style={{display: validEmail===1 ? 'block' : 'none'}}>
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
