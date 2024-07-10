import React, { useState, useEffect } from 'react';

function Results({ disease1, disease2, disease3, disease4, disease5}) {
  const [osmf, setDisease1] = useState(null);
  const [gingivitis, setDisease2] = useState(null);
  const [phenotype, setDisease3] = useState(null);
  const [calculus, setDisease4] = useState(null);
  const [caries, setDisease5] = useState(null);
  const [osmfPred, setOsmfPred] = useState([]);
  const [osmfImages, setOsmfImages] = useState(false);

  useEffect(()=>{
    const storedImagePairs = JSON.parse(localStorage.getItem('osmf')) || [];
    setOsmfPred(storedImagePairs);
    if(osmfPred.length > 0){
      setOsmfImages(true);
    }
  }, []);
  // Update disease state when disease1 prop changes
  useEffect(() => {
    setDisease1(disease1);
    setDisease2(disease2);
    setDisease3(disease3);
    setDisease4(disease4);
    setDisease5(disease5);
  }, [disease1, disease2, disease3, disease4, disease5]);

  return (
    <div className='space-y-6 text-gray-800'>
      <h1>Results</h1>
      <p>OSMF Screening: {osmf ? osmf : 'Screening not done'}</p>
      {osmfImages &&(
        <div className='grid grid-cols-3 gap-2'>
          {osmfPred.map((pair, index)=>{
            <div key={index} className="border border-gray-300 rounded-md p-4">
              <h2 className="text-lg font-semibold">Image Pair {index + 1}</h2>
              <div className="mt-2">
                <img src={pair.capturedPhoto} alt="Captured" className="rounded-lg shadow-md" />
              </div>
              <div className="mt-2">
                <img src={`data:image/jpeg;base64,${pair.generatedImage}`} alt="Generated" className="rounded-lg shadow-md" />
              </div>
              <div className="mt-4">
                <p>Predicted Class: {pair.prediction}</p>
                <p>Confidence: {pair.confidence}</p>
              </div>
            </div>
          })}
        </div>
      )}
      <p>Gingivitis Screening: {gingivitis ? gingivitis : 'Screening not done'}</p>
      <p>Phenotype Screening: {phenotype ? phenotype : 'Screening not done'}</p>
      <p>Calculus Screening: {calculus ? calculus : 'Screening not done'}</p>
      <p>Caries Screening: {caries ? caries : 'Screening not done'}</p>
    </div>
  );
}

export default Results; 