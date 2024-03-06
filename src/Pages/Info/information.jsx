import React, { useState, useRef, useEffect } from "react";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import NavButton from "../../components/btn";
function InfoPage() {
    const [patientInfo, setPatientInfo] = useState({
        name: "",
        age: "",
        gender: "",
        village: ""
    });

    const [keyboard, setKeyboard] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, you can send patientInfo to backend or perform any other action
        console.log(patientInfo);
    };

    const onKeyPress = (button) => {
        let inputValue = button;

        // Handle special cases
        if (button === "{bksp}") {
            inputValue = patientInfo.name.slice(0, -1); // Remove last character
        }

        setPatientInfo(prevState => ({
            ...prevState,
            name: inputValue // Assuming we are only focusing on the name input
        }));
    };

    return (
        <div className="text-black">
            <h1 className="font-serif text-4xl font-bold text-indigo-600 leading-tight">Patient Information</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4 flex flex-row items-center">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mr-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={patientInfo.name}
                        onChange={handleChange}
                        onFocus={() => setKeyboard("name")}
                        className="border rounded-md px-3 py-2 w-full text-gray-700"
                        required
                    />
                </div>
                <div className="mb-4 flex flex-row items-center">
                    <label htmlFor="age" className="block text-gray-700 text-sm font-bold mr-2">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={patientInfo.age}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 w-full text-gray-700"
                        required
                    />
                </div>
                <div className="mb-4 flex flex-row items-center">
                    <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mr-2">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={patientInfo.gender}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 w-full text-gray-700"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="mb-4 flex flex-row items-center">
                    <label htmlFor="village" className="block text-gray-700 text-sm font-bold mr-2">Village:</label>
                    <input
                        type="text"
                        id="village"
                        name="village"
                        value={patientInfo.village}
                        onChange={handleChange}
                        onFocus={() => setKeyboard("village")}
                        className="border rounded-md px-3 py-2 w-full text-gray-700"
                        required
                    />
                </div>
                <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full">Submit</button>
            </form>
            {keyboard && (
                <div className="mt-4">
                    <KeyboardReact
                        layout={{
                            default: ["q w e r t y u i o p", "a s d f g h j k l {bksp}", "{shift} z x c v b n m , . {shift}", "{space}"]
                        }}
                        theme="hg-theme-default hg-layout-numeric numeric-theme"
                        inputName={keyboard}
                        onChange={(input) => setPatientInfo(prevState => ({...prevState, [keyboard]: input}))}
                        onKeyPress={onKeyPress}
                    />
                </div>
            )}

            <NavButton destination="/opening" text="Next"/>
        </div>
    );
}

export default InfoPage;