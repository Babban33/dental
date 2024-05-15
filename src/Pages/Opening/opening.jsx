// import React, { useState, useEffect } from "react";
// import NavButton from "../../components/btn";

// function MouthOpening() {
//     const [cameras, setCameras] = useState([]);
//     const [selectedCamera, setSelectedCamera] = useState("");
//     const [streaming, setStreaming] = useState(false);
//     const [mediaStream, setMediaStream] = useState(null);

//     useEffect(() => {
//         const getAvailableCameras = async () => {
//             try {
//                 const devices = await navigator.mediaDevices.enumerateDevices();
//                 const videoDevices = devices.filter(device => device.kind === 'videoinput');
//                 setCameras(videoDevices);
//                 if (videoDevices.length > 0) {
//                     setSelectedCamera(videoDevices[0].deviceId);
//                 }
//             } catch (error) {
//                 console.error('Error accessing media devices:', error);
//             }
//         };

//         getAvailableCameras();
//     }, []);

//     const handleCameraChange = (event) => {
//         setSelectedCamera(event.target.value);
//     };

//     const toggleStreaming = () => {
//         if (streaming) {
//             mediaStream.getTracks().forEach(track => track.stop());
//             setMediaStream(null);
//         } else {
//             startStreaming();
//         }
//         setStreaming(!streaming);
//     };

//     const startStreaming = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: selectedCamera } });
//             setMediaStream(stream);
//         } catch (error) {
//             console.error('Error starting streaming:', error);
//         }
//     };

//     return (
//         <div>
//             <h1 className="font-serif text-4xl font-bold text-indigo-600 leading-tight">Mouth Opening</h1>

//             <div className="mt-2 flex flex-row items-center">
//                 <h2 className="text-2xl font-medium text-gray-700 mr-2">Select Camera:</h2>
//                 <select
//                     value={selectedCamera}
//                     onChange={handleCameraChange}
//                     className="bg-white border border-gray-700 rounded px-3 py-2 mt-2"
//                 >
//                     {cameras.map(camera => (
//                         <option key={camera.deviceId} value={camera.deviceId}>
//                             {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//                         </option>
//                     ))}
//                 </select>
//                 <button onClick={toggleStreaming} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                     {streaming ? 'Stop Streaming' : 'Start Streaming'}
//                 </button>
//             </div>

//             {/* Display the stream */}
//             {mediaStream && (
//                 <div className="mt-4">
//                     <video
//                         autoPlay
//                         playsInline
//                         ref={videoRef => {
//                             if (videoRef) {
//                                 videoRef.srcObject = mediaStream;
//                             }
//                         }}
//                         className="w-full"
//                     />
//                 </div>
//             )}

//             <div className="justify-center gap-4 mt-4 grid grid-cols-2">
//                 <NavButton destination="/" text="Previous"/>
//                 <NavButton destination="/selection" text="Next"/>
//             </div>
//         </div>
//     );
// }

// export default MouthOpening;

import React, { useState, useEffect } from "react";
import NavButton from "../../components/btn";

function MouthOpening() {
    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState("");
    const [streaming, setStreaming] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const [socket, setSocket] = useState(null);
    const [videoFrames, setVideoFrames] = useState([]);

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
        if (!streaming) {
            const newSocket = new WebSocket('ws://your-backend-url'); // Replace 'your-backend-url' with your actual backend URL
            newSocket.onopen = () => {
                startStreaming(newSocket);
            };
            setSocket(newSocket);
        } else {
            if (socket) {
                socket.send("stop");
                socket.close();
                setSocket(null);
                setVideoFrames([]);
            }
        }
        setStreaming(!streaming);
    };

    const startStreaming = (socket) => {
        socket.send("start");
        socket.send(selectedCamera); // Send the selected camera ID to the backend
        socket.onmessage = (event) => {
            // Process the received video frame
            const frameData = event.data;
            // Update state with the new frame
            setVideoFrames(prevFrames => [...prevFrames, frameData]);
        };
    };

    return (
        <div>
            <h1 className="font-serif text-4xl font-bold text-indigo-600 leading-tight">Mouth Opening</h1>

            <div className="mt-2 flex flex-row items-center">
                <h2 className="text-2xl font-medium text-gray-700 mr-2">Select Camera:</h2>
                <select
                    value={selectedCamera}
                    onChange={handleCameraChange}
                    className="bg-white border border-gray-700 rounded px-3 py-2 mt-2"
                >
                    {cameras.map(camera => (
                        <option key={camera.deviceId} value={camera.deviceId}>
                            {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
                        </option>
                    ))}
                </select>
                <button onClick={toggleStreaming} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {streaming ? 'Stop Streaming' : 'Start Streaming'}
                </button>
            </div>

            {/* Display the stream */}
            {videoFrames.length > 0 && (
                <div className="mt-4">
                    <video
                        autoPlay
                        playsInline
                        ref={videoRef => {
                            if (videoRef) {
                                // Combine all frames into a single blob and create a URL
                                const blob = new Blob(videoFrames, { type: 'image/jpeg' });
                                videoRef.src = URL.createObjectURL(blob);
                            }
                        }}
                        className="w-full"
                    />
                </div>
            )}

            <div className="justify-center gap-4 mt-4 grid grid-cols-2">
                <NavButton destination="/" text="Previous"/>
                <NavButton destination="/selection" text="Next"/>
            </div>
        </div>
    );
}

export default MouthOpening;