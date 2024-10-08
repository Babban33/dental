import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import content from "../data.json";
import { BrowserView, MobileView } from 'react-device-detect';
function SelectionPage(){
    const navigate = useNavigate();
    const [language, setLanguage] = useState('en');

    useEffect(()=>{
        const getLang= ()=>{
            setLanguage(localStorage.getItem('lang'));
        }
        getLang();
    })

    return(
        <div className='space-y-6'>
            <h1 className="font-serif text-4xl font-bold text-indigo-600 leading-tight">{content["Select"][language].title}</h1>
            <BrowserView>
                <button onClick={() => navigate('/osmf')} className='m-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full'>{content["Select"][language].dis1}</button>
                <button onClick={() => navigate('/gingivitis')} className='m-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full'>{content["Select"][language].dis2}</button>
                <button onClick={() => navigate('/phenotype')} className='m-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full'>{content["Select"][language].dis3}</button>
                <button onClick={() => navigate('/calculus')} className='m-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full'>{content["Select"][language].dis4}</button>
                <button onClick={() => navigate('/caries')} className='m-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full'>{content["Select"][language].dis5}</button>
            </BrowserView>
            <MobileView>
                <button onClick={() => navigate('/osmf')} className='m-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full'>{content["Select"][language].dis1}</button>
            </MobileView>
        </div>
    )
}

export default SelectionPage;