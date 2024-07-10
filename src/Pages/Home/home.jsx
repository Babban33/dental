import React from "react";
import NavButton from "../../components/btn";
function HomePage() {
  return (
    <div className="text-center p-8 mx-4 w-3/4">
      <h1 className="font-serif text-4xl font-bold text-indigo-600 leading-tight">
        BIRAC AGC JanCare Project
      </h1>

      <h2 className="font-sans text-2xl font-medium text-gray-700 leading-snug">
        Smart Web Based Application for Dental Disease Detection using Artificial Intelligence
      </h2>

      <p className="font-sans text-gray-500 text-lg italic mt-2">
        Smile with Confidence
      </p>

      <NavButton text="Let's get started" destination="/info"/>
    </div>
  );
}

export default HomePage;