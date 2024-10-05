import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
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
import Calculus from './Pages/Calculus/calculus';

import {isBrowser } from 'react-device-detect';
function App() {
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
            <Route path="/phenotype" element={<Phenotype/>} />
            <Route path='/calculus' element={<Calculus/>}/>
            <Route path="/caries" element={<Caries/>}/>
            <Route path='/results' element={<Results/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;