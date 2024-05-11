// import React, { useState, useEffect } from "react";
// import NavButton from "../../components/btn";

// function Osmf({ onPredictionChange }) {
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [prediction, setPrediction] = useState(null);
//     const [generatedImage, setGeneratedImage] = useState(null);
//     const [burningSensation, setBurningSensation] = useState(null);
//     const [ulcerations, setUlcerations] = useState(null);
//     const [painDuringMouthOpening, setPainDuringMouthOpening] = useState(null);
//     useEffect(() => {
//         console.log("Prediction state:", prediction);
//         onPredictionChange(prediction);
//     }, [prediction, onPredictionChange]);

//     const handleImageChange = async (e) => {
//         try {
//             const file = e.target.files[0];
//             setSelectedImage(file);

//             const formData = new FormData();
//             formData.append("file", file);

//             const response = await fetch("http://127.0.0.1:8000/osmf", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log("OSMF Detection Result:", data.result);
//             console.log("Prediction:", data.prediction);

//             setGeneratedImage(data.generatedImage);
//             console.log(file.name);
//         } catch (error) {
//             console.error("Error:", error.message);
//         }
//     };

//     return(
//         <div className="text-center px-8">
//             <h1 className="text-gray-800">OSMF Detection</h1>
//             <div className="flex flex-col sm:flex-row gap-2">
//                 <div className={`mt-6 ${generatedImage ? 'basis-1/2': ''} rounded-3xl text-center w-full flex flex-col sm:justify-center sm:items-center sm:pt-16 sm:pb-10 bg-white shadow-2xl border border-gray-300`}>
//                     <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 mt-4 rounded-full cursor-pointer !border !border-transparent transition ease-in-out text-center no-underline hover:no-underline inline-flex items-center justify-center text-xl">
//                         <p className="pr-2">Upload Image</p>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
//                         </svg>
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={handleImageChange}
//                             className="hidden"
//                         />
//                     </label>
//                     <div className="sm:flex flex-col gap-1.5 text-gray-800">
//                         <p className="font-semibold text-xl text-typo-secondary">
//                             or drop a file, or
//                         </p>
//                         <p className="text-xs text-typo-secondary">
//                             paste an image
//                         </p>
//                     </div>
//                     {selectedImage && (
//                         <div className="mx-4 flex flex-col items-center">
//                             <p className="text-black">Selected Image</p>
//                             <img
//                             src={URL.createObjectURL(selectedImage)}
//                             alt="Selected Image"
//                             className="max-w-full rounded-lg h-32"
//                             />
//                         </div>
//                     )}
//                 </div>
//                 {generatedImage && (
//                     <div className="basis-1/2 mt-6">
//                         <img
//                             src={`data:image/jpeg;base64,${generatedImage}`}
//                             alt="Generated Image"
//                             className="max-w-full rounded-3xl"
//                         />
//                     </div>
//                 )}
//             </div>
//             {/* New questions section */}
//             <div className="mt-6 text-left text-gray-800">
//                 <p className="text-xl font-semibold mb-2">Additional Questions:</p>
//                 <div className="flex flex-col gap-2 align-middle">
//                     <label className="flex gap-2 items-center">
//                         <p>1. Burning Sensation on spicy food.</p>
//                         <select
//                             value={burningSensation}
//                             onChange={(e) => setBurningSensation(e.target.value)}
//                             className="mt-1 border border-gray-300 rounded-md px-3 py-2"
//                         >
//                             <option value="Yes">Yes</option>
//                             <option value="No">No</option>
//                         </select>
//                     </label>
//                     <label className="flex gap-2 items-center">
//                         <p>2. Presence of ulcerations or lesions in the mouth.</p>
//                         <select
//                             value={ulcerations}
//                             onChange={(e) => setUlcerations(e.target.value)}
//                             className="mt-1 border border-gray-300 rounded-md px-3 py-2"
//                         >
//                             <option value="Yes">Yes</option>
//                             <option value="No">No</option>
//                         </select>
//                     </label>
//                     <label className="flex gap-2 items-center">
//                         <p>3. Pain during mouth opening.</p>
//                         <select
//                             value={painDuringMouthOpening}
//                             onChange={(e) => setPainDuringMouthOpening(e.target.value)}
//                             className="mt-1 border border-gray-300 rounded-md px-3 py-2"
//                         >
//                             <option value="Yes">Yes</option>
//                             <option value="No">No</option>
//                         </select>
//                     </label>
//                 </div>
//             </div>
//             {prediction && (
//                 <div className="mt-6 rounded-3xl text-center flex flex-col sm:justify-center sm:items-center sm:pt-2 sm:pb-2 bg-white shadow-2xl border border-gray-300">
//                     <p className="text-black text-xl font-bold">
//                         {prediction}
//                     </p>
//                 </div>
//             )}
//             <div className="justify-center gap-4 mt-8 grid grid-cols-2">
//                 <NavButton text="Previous" destination="/selection"/>
//                 <NavButton text="Next" destination="/gingivitis" />
//             </div>
//         </div>
//     );
// }
// export default Osmf;

import React, {useState, useEffect} from "react";
import NavButton from "../../components/btn";

function Osmf({onPredictionChange}){
    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState("");
    const [streaming, setStreaming] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);

    useEffect(() => {
        const getAvailableCameras = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                setCameras(videoDevices);
                if (videoDevices.length > 0) {
                    setSelectedCamera(videoDevices[0].deviceId);
                }
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        };

        getAvailableCameras();
    }, []);

    const handleCameraChange = (event) => {
        setSelectedCamera(event.target.value);
    };

    const toggleStreaming = () => {
        if (streaming) {
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        } else {
            startStreaming();
        }
        setStreaming(!streaming);
    };

    const startStreaming = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: selectedCamera } });
            setMediaStream(stream);
        } catch (error) {
            console.error('Error starting streaming:', error);
        }
    };

    const capturePhoto =() =>{
        toggleStreaming();
    }

    return (
        <div>
            <h1 className="font-serif text-4xl font-bold text-indigo-600 leading-tight">Mouth Opening</h1>

            <div className="mt-2 flex items-center">
                <h2 className="text-2xl font-medium text-gray-700 mr-2">Select Camera:</h2>
                <select
                    value={selectedCamera}
                    onChange={handleCameraChange}
                    className="bg-white border border-gray-700 rounded px-3 py-2 mt-2 text-gray-800"
                >
                    {cameras.map(camera => (
                        <option key={camera.deviceId} value={camera.deviceId}>
                            {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
                        </option>
                    ))}
                </select>
                {streaming ? (
                    <button onClick={capturePhoto} className="ml-2 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Capture Photo
                    </button>
                ):(
                    <button onClick={toggleStreaming} className="ml-2 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Start Streaming
                    </button>
                )}
            </div>

            {/* Display the stream */}
            {mediaStream && (
                <div className="mt-4">
                    <video
                        autoPlay
                        playsInline
                        ref={videoRef => {
                            if (videoRef) {
                                videoRef.srcObject = mediaStream;
                            }
                        }}
                        className="w-full"
                    />
                </div>
            )}

            <div className="justify-center gap-4 mt-4 grid grid-cols-2">
                <NavButton destination="/" text="Previous"/>
                <NavButton destination="/gingivitis" text="Next"/>
            </div>
        </div>
    );
}

export default Osmf;