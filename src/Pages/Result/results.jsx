import React, { useState, useEffect } from 'react';

function Results({ disease1, disease2, disease3, disease4, disease5 }) {
  const [osmf, setDisease1] = useState(null);
  const [gingivitis, setDisease2] = useState(null);
  const [phenotype, setDisease3] = useState(null);
  const [calculus, setDisease4] = useState(null);
  const [caries, setDisease5] = useState(null);
  const [osmfPairs, setOsmfPairs] = useState([]);
  const [patientInfo, setPatientInfo] = useState({});

  useEffect(() => {
    const fetchImagePairs = () => {
      const storedImagePairs = JSON.parse(localStorage.getItem('osmf')) || [];
      setOsmfPairs(storedImagePairs);
    };
    fetchImagePairs();
    const data = JSON.parse(localStorage.getItem('formData'));
    setPatientInfo(data);
  }, []);

  useEffect(() => {
    setDisease1(disease1);
    setDisease2(disease2);
    setDisease3(phenotype);
    setDisease4(calculus);
    setDisease5(caries);
  }, [disease1, disease2, disease3, disease4, disease5]);

  return (
    <div className='space-y-6 text-gray-800 p-4 md:p-8'>
      <h1 className='font-serif text-4xl font-bold text-indigo-600 leading-tight text-center mb-8'>Screening Report</h1>
      <div className='border border-gray-300 rounded-md'>
        <div className='flex pl-4 mt-6'>
          <h2 className='font-serif text-2xl font-semibold text-indigo-600 leading-tight mb-4 mt'>Patient Information</h2>
          <div>
            <span><strong>Name:</strong> {patientInfo.name || 'N/A'}</span>
            <span><strong>Age:</strong> {patientInfo.age || 'N/A'}</span>
            <span><strong>Gender:</strong> {patientInfo.gender || 'N/A'}</span>
            <span><strong>Village:</strong> {patientInfo.village || 'N/A'}</span>
          </div>
        </div>
        <h2 className='font-serif text-2xl font-semibold text-indigo-600 leading-tight mb-4'>OSMF</h2>
        {osmfPairs.length > 0 ? (
          <div className='py-4 px-2'>
            <div className='flex flex-row justify-between mb-4'>
              <div className='basis-1/2 font-medium'>Clicked Photo</div>
              <div className='basis-1/2 font-medium'>Predicted Image</div>
              <div className='basis-1/5 font-medium'>Prediction</div>
            </div>
            {osmfPairs.map((pair, index) => (
              <div key={index} className="flex flex-row gap-4 mb-4">
                <div className='basis-1/2'>
                  <img src={pair.capturedPhoto} alt="Captured" className="rounded-lg shadow-md w-full" />
                </div>
                <div className='basis-1/2'>
                  <img src={`data:image/jpeg;base64,${pair.generatedImage}`} alt="Generated" className="rounded-lg shadow-md w-full" />
                </div>
                <div className='basis-1/5'>
                  <p>Class: {pair.prediction}</p>
                  <p>Confidence: {pair.confidence}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className='font-medium'>Screening Not Done.</h3>
        )}
      </div>

      <div>
        <h2 className='font-serif text-2xl font-semibold text-indigo-600 leading-tight mb-4'>Other Screenings</h2>
        <p className='mb-2'><strong>Gingivitis Screening:</strong> {gingivitis || 'Screening not done'}</p>
        <p className='mb-2'><strong>Phenotype Screening:</strong> {phenotype || 'Screening not done'}</p>
        <p className='mb-2'><strong>Calculus Screening:</strong> {calculus || 'Screening not done'}</p>
        <p className='mb-2'><strong>Caries Screening:</strong> {caries || 'Screening not done'}</p>
      </div>
    </div>
  );
}

export default Results;