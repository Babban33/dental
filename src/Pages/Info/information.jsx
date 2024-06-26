import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function InfoPage() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [village, setVillage] = useState("");
    const [isNameVisible, setIsNameVisible] = useState(false);
    const [isNumVisible, setIsNumVisible] = useState(false);
    const [isVillageVisible, setIsVillageVisible] = useState(false);
    const [layoutName, setLayoutName] = useState("default");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            age: age,
            gender: gender,
            village: village
        };
        localStorage.setItem("formData", JSON.stringify(formData));
        navigate("/opening");
        console.log(formData);
    };

    // Virtual Keyboard
    const toggleNameKeyboard = () => {
        setIsNameVisible(true);
        setIsNumVisible(false);
        setIsVillageVisible(false);
    };
    
    const toggleAgeKeyboard = () => {
        setIsNumVisible(true);
        setIsNameVisible(false);
        setIsVillageVisible(false);
    };
    
    const toggleVillage = () => {
        setIsVillageVisible(true);
        setIsNumVisible(false);
        setIsNameVisible(false);
    }

    const handleShift = () =>{
        const newLayoutName = layoutName === "default" ? "shift" : "default";
        setLayoutName(newLayoutName);
    }

    const onKeyPress = button => {
        console.log("Button Pressed", button);
        if (button === "{shift}") handleShift();
        else if (isNameVisible) setName(name + button);
        else if (isNumVisible) setAge(age + button);
        else if (isVillageVisible) setVillage(village + button);
    }

    return(
        <div className="text-black">
            <h1 className="font-serif text-4xl font-bold text-indigo-600 leading-tight">Patient Information</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4 flex flex-row items-center">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mr-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your Name"
                        className="border rounded-md px-3 py-2 w-full text-gray-700"
                        onFocus={toggleNameKeyboard}
                        required
                    />
                </div>
                {isNameVisible && (
                    <Keyboard
                        layout={{
                            default: ["q w e r t y u i o p", "a s d f g h j k l {bksp}", "{shift} z x c v b n m next", "{space}"],
                            shift: ["Q W E R T Y U I O P", "A S D F G H J K L {bksp}", "{shift} Z X C V B N M Next", "{space}"],
                        }}
                        theme="hg-theme-default hg-layout-numeric numeric-theme"
                        layoutName={layoutName}
                        onKeyPress={onKeyPress}
                    />
                )}
                <div className="mb-4 flex flex-row items-center">
                    <label htmlFor="age" className="block text-gray-700 text-sm font-bold mr-2">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="Enter your Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="border rounded-md px-3 py-2 w-full text-gray-700"
                        required
                        onFocus={toggleAgeKeyboard}
                    />
                </div>
                {isNumVisible && (
                    <Keyboard
                        layout={{
                            default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp} {enter}"]
                        }}
                        theme="hg-theme-default hg-layout-numeric numeric-theme"
                        onKeyPress={onKeyPress}
                    />
                )}
                <div className="mb-4 flex flex-row items-center">
                    <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mr-2">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
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
                        value={village}
                        placeholder="Enter your Village Name"
                        onChange={(e) => setVillage(e.target.value)}
                        className="border rounded-md px-3 py-2 w-full text-gray-700"
                        required
                        onFocus={toggleVillage}
                    />
                </div>
                {isVillageVisible && (
                    <Keyboard
                        layout={{
                            default: ["q w e r t y u i o p", "a s d f g h j k l {bksp}", "{shift} z x c v b n m done", "{space}"]
                        }}
                        theme="hg-theme-default hg-layout-numeric numeric-theme"
                        onKeyPress={onKeyPress}
                    />
                )}
                <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full mb-2">Submit</button>
            </form>
        </div>
    );
}

export default InfoPage;