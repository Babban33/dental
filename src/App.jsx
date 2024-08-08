import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer'; 
import NavBar from './components/navbar';
import HomePage from './Pages/Home/home';
import InfoPage from './Pages/Info/information';
import Gingi from './Pages/Gingi/gingivitis';
import Phenotype from './Pages/Pheno/phenotype';
import Osmf from './Pages/OSMF/osmf';
import Caries from './Pages/Caries/caries';
import MouthOpening from './Pages/Opening/opening';
import SelectionPage from './Pages/Options/options';
import Results from './Pages/Result/results';
import { useState } from 'react';
import Calculus from './Pages/Calculus/calculus';

import {isBrowser } from 'react-device-detect';
function App() {
  const [phenotypePrediction, setPhenotypePrediction] = useState(null);
  const [calculusPrediction, setcalculusPrediction] = useState(null);
  const [cariesPrediction, setcariesPrediction] = useState(null);

  const handlePhenotypeChange = (prediction) => {
    setPhenotypePrediction(prediction);
  };
  const handleCalculusChange = (prediction) => {
    setcalculusPrediction(prediction);
  }
  const handleCariesChange = (prediction) => {
    setcariesPrediction(prediction);
  }
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* <NavBar /> */}
        <NavBar />
        <main className="flex flex-col justify-center items-center flex-grow py-20">
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="*" element={<h1>Page not found</h1>} />
            <Route path='/info' element={<InfoPage/>}/>
            {isBrowser && <Route path="/opening" element={<MouthOpening/>}/>}
            <Route path='/selection' element={<SelectionPage/>}/>
            <Route path="/osmf" element={<Osmf/>}/>
            <Route path="/gingivitis" element={<Gingi/>}/>
            <Route path="/phenotype" element={<Phenotype onPredictionChange={handlePhenotypeChange}/>} />
            <Route path='/calculus' element={<Calculus onPredictionChange={handleCalculusChange}/>}/>
            <Route path="/caries" element={<Caries onPredictionChange={handleCariesChange}/>}/>
            <Route path='/results' element={<Results disease3={phenotypePrediction} disease4={calculusPrediction} disease5={cariesPrediction}/>}/>
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;