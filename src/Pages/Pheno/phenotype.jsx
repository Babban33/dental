import React, {useState, useEffect} from "react";
import NavButton from "../../components/btn";

function Phenotype({onPredictionChange}){
    const [selectedImage, setSelectedImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    useEffect(() => {
        console.log("Prediction state:", prediction);
        onPredictionChange(prediction);
    }, [prediction, onPredictionChange]);
    
    const handleImageChange = async (e) => {
        try {
            const file = e.target.files[0];
            setSelectedImage(file);

            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("https://diseases.azurewebsites.net/phenotype", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Phenotype Detection Result:", data.result);

            setPrediction(data.result);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };
    
    return(
        <div>
            <h1 className="text-gray-800">Phenotype Detection</h1>
            <div className="mt-6 rounded-3xl text-center w-full flex flex-col sm:justify-center sm:items-center sm:gap-8 sm:pt-16 sm:pb-10 bg-white shadow-2xl border border-gray-300">
                <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer !border !border-transparent transition ease-in-out text-center no-underline hover:no-underline inline-flex items-center justify-center text-xl">
                    Upload Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
                <div className="hidden sm:flex flex-col gap-1.5 text-gray-800">
                    <p className="font-semibold text-xl text-typo-secondary">
                        or drop a file, or
                    </p>
                    <p className="text-xs text-typo-secondary">
                        paste an image
                    </p>
                </div>
                {selectedImage && (
                    <div className="flex justify-center items-center space-x-6">
                        <div className="flex flex-col items-center">
                            <p className="text-black mt-2">Selected Image</p>
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected Image"
                                className="max-w-full w-20 h-16"
                            />
                        </div>
                        {prediction && (
                            <div className="">
                                <h4 className="text-black mb-2">Prediction:</h4>
                                <p className="text-black">{prediction}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="justify-center gap-4 mt-8 grid grid-cols-2">
                <NavButton text="Previous" destination="/selection"/>
                <NavButton text="Next" destination="/calculus" />
            </div>
        </div>
    )
}
export default Phenotype;