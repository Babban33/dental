import React, { useState, useEffect} from 'react';

function Results({disease3, disease4, disease5}){
    const [phenotype, setDisease3] = useState(null);
    const [calculus, setDisease4] = useState(null);
    const [caries, setDisease5] = useState(null);
    const [osmfPairs, setOsmfPairs] = useState([]);
    const [gingiPairs, setGingiPairs] = useState([]);
    const [patientInfo, setPatientInfo] = useState({});

    useEffect(() => {
        const fetchImagePairs = () => {
            const storedImagePairs = JSON.parse(localStorage.getItem('osmf')) || [];
            setOsmfPairs(storedImagePairs);
        };
        fetchImagePairs();

        const fetchGingiPairs = () => {
            const storedPairs = JSON.parse(localStorage.getItem('gingi')) || [];
            setGingiPairs(storedPairs);
        };
        fetchGingiPairs();

        const data = JSON.parse(localStorage.getItem('formData')) || {};
        setPatientInfo(data);
    }, []);

    useEffect(() => {
        setDisease3(phenotype);
        setDisease4(calculus);
        setDisease5(caries);
    }, [disease3, disease4, disease5]);

    return(
        <div className='space-y-6 text-gray-800 p-4 md:p-8'>
            <h1 className='font-serif text-4xl font-bold text-indigo-600 leading-tight text-center mb-8'>Screening Report</h1>
            
            <div className='border border-gray-300 rounded-md p-4 mb-8'>
                <h2 className='font-serif text-2xl font-semibold text-white bg-indigo-800 leading-tight mb-4 py-2'>Patient Information</h2>
                <p><strong>Name:</strong> {patientInfo.name || 'N/A'}</p>
                <p><strong>Age:</strong> {patientInfo.age || 'N/A'}</p>
                <p><strong>Gender:</strong> {patientInfo.gender || 'N/A'}</p>
                <p><strong>Village:</strong> {patientInfo.village || 'N/A'}</p>

                <div className='p-4 mb-8'>
                    <h2 className='font-serif text-2xl font-semibold text-white leading-tight mb-4 bg-indigo-800 p-2'>OSMF</h2>
                    {osmfPairs.length > 0 ? (
                        <>
                            <div className='flex flex-row justify-between mb-4'>
                                <div className='basis-1/2 font-medium text-center'>Clicked Photo</div>
                                <div className='basis-1/2 font-medium text-center'>Predicted Image</div>
                                <div className='basis-1/5 font-medium text-center'>Prediction</div>
                            </div>
                            {osmfPairs.map((pair, index) => (
                                <div key={index} className="flex flex-row gap-4 mb-4 items-center">
                                    <div className='basis-1/2'>
                                        <img src={pair.capturedPhoto} alt="Captured" className="rounded-lg shadow-md w-full" />
                                    </div>
                                    <div className='basis-1/2'>
                                        <img src={`data:image/jpeg;base64,${pair.generatedImage}`} alt="Generated" className="rounded-lg shadow-md w-full" />
                                    </div>
                                    <div className='basis-1/5 text-center'>
                                        <p><strong>Class:</strong> {pair.prediction}</p>
                                        <p><strong>Confidence:</strong> {pair.confidence}</p>
                                    </div>
                                </div>
                            ))}
                        </>
                    ):(
                        <h3 className='font-medium'>Screening Not Done.</h3>
                    )}
                </div>

                <div className='p-4'>
                    <h2 className='font-serif text-2xl font-semibold text-indigo-600 leading-tight mb-4'>Other Screenings</h2>
                    <p className='mb-2'><strong>Phenotype Screening:</strong> {phenotype || 'Screening not done'}</p>
                    <p className='mb-2'><strong>Calculus Screening:</strong> {calculus || 'Screening not done'}</p>
                    <p className='mb-2'><strong>Caries Screening:</strong> {caries || 'Screening not done'}</p>
                </div>
            </div>
        </div>
    )
}

export default Results;