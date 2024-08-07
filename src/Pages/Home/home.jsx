import React, { useEffect, useState } from "react";
import NavButton from "../../components/btn";
import content from "../data.json";
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    localStorage.setItem('lang', newLanguage);
  };

  const handleButtonClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        navigate('/info');
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      alert("Camera access is required to proceed.");
    }
  };

  return (
    <div className={`text-center p-4 ${isMobile ? 'mx-2 w-full' : 'mx-4 w-3/4'}`}>
      <h1 className={`font-serif font-bold text-indigo-600 leading-tight ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
        {content["HomePage"][language].title}
      </h1>

      <h2 className={`font-sans font-medium text-gray-700 leading-snug ${isMobile ? 'text-xl' : 'text-2xl'}`}>
        {content["HomePage"][language].subtitle}
      </h2>

      <p className={`font-sans text-gray-500 italic mt-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
        {content["HomePage"][language].tagline}
      </p>

      <div className={`flex items-center justify-center mt-4 space-x-4 ${isMobile ? 'flex-col space-y-4' : 'flex-row space-x-4'}`}>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          {content["HomePage"][language].buttonText}
        </button>
        <select
          className={`border border-gray-300 rounded-md p-2 bg-white text-gray-700 ${isMobile ? 'w-full' : ''}`}
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mar">Marathi</option>
        </select>
      </div>
    </div>
  );
}

export default HomePage;