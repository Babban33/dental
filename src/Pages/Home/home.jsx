import React, { useEffect, useState } from "react";
import NavButton from "../../components/btn";
import content from "../data.json";
function HomePage() {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  
  useEffect(()=>{
    localStorage.setItem('lang', language);
  }, [language]);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    localStorage.setItem('lang', newLanguage);
  };

  return (
    <div className="text-center p-8 mx-4 w-3/4">
      <h1 className="font-serif text-4xl font-bold text-indigo-600 leading-tight">
        {content["HomePage"][language].title}
      </h1>

      <h2 className="font-sans text-2xl font-medium text-gray-700 leading-snug">
        {content["HomePage"][language].subtitle}
      </h2>

      <p className="font-sans text-gray-500 text-lg italic mt-2">
        {content["HomePage"][language].tagline}
      </p>

      <div className="flex items-center justify-center mt-4 space-x-4">
        <NavButton text={content["HomePage"][language].buttonText} destination="/info" />
        <select
          className="border border-gray-300 rounded-md p-2 bg-white text-gray-700"
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