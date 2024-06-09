import React, { useState, useEffect, useRef } from "react";
import NavButton from "../../components/btn";
import AvatarEditor from "react-avatar-editor";

function Osmf({ onPredictionChange }) {
    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState("");
    const [streaming, setStreaming] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [photoClicked, isPhotoClicked] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [predictedClass, setPredictedClass] = useState(null);
    const [confidence, setConfidence] = useState(null);
    const [openCrop, isOpenCrop] = useState(false);
    const [scale, setScale] = useState(1.2);
    const [height, setHeight] = useState(250);
    const [width, setWidth] = useState(250);
    const editorRef = useRef(null);

    useEffect(() => {
        console.log("Prediction state:", predictedClass);
        onPredictionChange(predictedClass);
    }, [predictedClass, onPredictionChange]);

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

    const capturePhoto = async () => {
        try {
            const track = mediaStream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track);
            const photoBlob = await imageCapture.takePhoto();
            const photoUrl = URL.createObjectURL(photoBlob);

            // Create an image element to get the dimensions
            const img = new Image();
            img.onload = () => {
                setHeight(img.height);
                setWidth(img.width);
            };
            img.src = photoUrl;

            setCapturedPhoto(photoUrl);
            isPhotoClicked(false);

            const pngFile = new File([photoBlob], "captured_photo.png", { type: "image/png" });
            setSelectedImage(pngFile);
        } catch (error) {
            console.error('Error capturing photo:', error);
        }
        if (streaming) {
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        }
    };

    const captureAgain = async () => {
        setCapturedPhoto(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: selectedCamera } });
            setMediaStream(stream);
        } catch (error) {
            console.error('Error starting streaming:', error);
        }
        isPhotoClicked(true);
    };

    const checkOsmf = async () => {
        if (selectedImage) {
            try {
                const formData = new FormData();
                formData.append('file', selectedImage);

                const response = await fetch("http://127.0.0.1:8000/osmf", {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setGeneratedImage(data.generatedImage);
                setPredictedClass(data.class);
                setConfidence(data.conf);
            } catch (error) {
                console.error('Error from Server:', error);
            }
        }
    }

    const cropPhoto = () => {
        isOpenCrop(!openCrop);
    }

    const handleSaveCrop = async () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImage();
            canvas.toBlob(blob => {
                if (blob) {
                    const croppedUrl = URL.createObjectURL(blob);
                    setCapturedPhoto(croppedUrl);
                    const file = new File([blob], "cropped_photo.png", { type: "image/png" });
                    setSelectedImage(file);
                    isOpenCrop(false);
                }
            }, 'image/png');
        }
    }

    return (
        <div>
            <h1 className="font-serif text-4xl font-bold text-indigo-600 leading-tight">OSMF Prediction</h1>

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
                    photoClicked && (
                        <button onClick={capturePhoto} className="ml-2 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Capture Photo
                        </button>
                    )
                ) : (
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
                        className="w-full rounded-3xl shadow-2xl border border-gray-300"
                    />
                </div>
            )}

            {/* Display captured photo */}
            {capturedPhoto && (
                <div className="mt-4 flex space-x-4 items-center">
                    <img src={capturedPhoto} alt="Captured" className="w-full rounded-3xl shadow-2xl border border-gray-300" />
                    <div className="flex flex-col space-y-2 items-start">
                        <button onClick={captureAgain} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Capture Again</button>
                        <button onClick={cropPhoto} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Crop Image</button>
                        <button onClick={checkOsmf} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">Check OSMF</button>
                    </div>
                </div>
            )}
            {capturedPhoto && openCrop && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-3xl shadow-lg flex flex-row">
                        <AvatarEditor
                            ref={editorRef}
                            image={capturedPhoto}
                            width={width}
                            height={height}
                            border={50}
                            borderRadius={0}
                            color={[255, 255, 255, 0.6]}
                            scale={scale}
                            rotate={0}
                        />
                        <div className="flex flex-col ml-4 items-center space-y-2 justify-center">
                            <label htmlFor="scale" className="text-gray-700">Scale</label>
                            <input
                                id="scale"
                                type="range"
                                min="1"
                                max="3"
                                step="0.01"
                                value={scale}
                                onChange={(e) => setScale(parseFloat(e.target.value))}
                                className="w-full"
                            />
                            <label htmlFor="width" className="text-gray-700 mt-2">Width</label>
                            <input
                                id="width"
                                type="range"
                                min="50"
                                max="300"
                                step="1"
                                value={width}
                                onChange={(e) => setWidth(parseInt(e.target.value))}
                                className="w-full"
                            />
                            <label htmlFor="height" className="text-gray-700 mt-2">Height</label>
                            <input
                                id="height"
                                type="range"
                                min="50"
                                max="300"
                                step="1"
                                value={height}
                                onChange={(e) => setHeight(parseInt(e.target.value))}
                                className="w-full"
                            />
                            <div className="mt-4 flex justify-center space-x-2">
                                <button onClick={cropPhoto} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                                <button onClick={handleSaveCrop} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {generatedImage && (
                <div className="basis-1/2 mt-6">
                    <img
                        src={`data:image/jpeg;base64,${generatedImage}`}
                        alt="Generated Image"
                        className="max-w-full rounded-3xl"
                    />
                    <span>{predictedClass}: {confidence}</span>
                </div>
            )}

            <div className="justify-center gap-4 mt-4 grid grid-cols-2">
                <NavButton destination="/selection" text="Previous" />
                <NavButton destination="/gingivitis" text="Next" />
            </div>
        </div>
    );
}

export default Osmf;