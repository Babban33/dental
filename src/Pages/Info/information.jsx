import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import content from "../data.json";
import { isMobile } from "react-device-detect";

function InfoPage() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [village, setVillage] = useState("");
    const [isNameVisible, setIsNameVisible] = useState(false);
    const [isNumVisible, setIsNumVisible] = useState(false);
    const [isVillageVisible, setIsVillageVisible] = useState(false);
    const [layoutName, setLayoutName] = useState("default");
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate();

    useEffect(() => {
        const getLang = () => {
            const lang = localStorage.getItem('lang');
            setLanguage(lang);
        };
        getLang();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (localStorage.getItem("formData")) {
            localStorage.removeItem("formData");
        }
        const formData = {
            name: name,
            age: age,
            gender: gender,
            village: village
        };
        localStorage.setItem("formData", JSON.stringify(formData));
        if (isMobile) {
            navigate("/selection");
        } else {
            navigate("/opening");
        }
        console.log(formData);
    };

    // Virtual Keyboard
    const toggleNameKeyboard = () => {
        if (!isMobile) setIsNameVisible(true);
        setIsNumVisible(false);
        setIsVillageVisible(false);
    };

    const toggleAgeKeyboard = () => {
        if (!isMobile) setIsNumVisible(true);
        setIsNameVisible(false);
        setIsVillageVisible(false);
    };

    const toggleVillage = () => {
        if (!isMobile) setIsVillageVisible(true);
        setIsNumVisible(false);
        setIsNameVisible(false);
    };

    const handleShift = () => {
        const newLayoutName = layoutName === "default" ? "shift" : "default";
        setLayoutName(newLayoutName);
    };

    const onKeyPress = (button) => {
        console.log("Button Pressed", button);
        if (button === "{shift}") handleShift();
        else if (isNameVisible) setName(name + button);
        else if (isNumVisible) setAge(age + button);
        else if (isVillageVisible) setVillage(village + button);
    };

    return (
        <div className="text-black">
            <h1 className="font-serif text-4xl font-bold text-indigo-600 leading-tight">{content["Info"][language].title}</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4 flex flex-row items-center">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mr-2">{content["Info"][language]["input1"].label}</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={content["Info"][language]["input1"].holder}
                        className="border rounded-md px-3 py-2 w-full text-gray-700"
                        onFocus={toggleNameKeyboard}
                        required
                    />
                </div>
                {isNameVisible && !isMobile && (
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
                    <label htmlFor="age" className="block text-gray-700 text-sm font-bold mr-2">{content["Info"][language]["input2"].label}</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder={content["Info"][language]["input2"].holder}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="border rounded-md px-3 py-2 w-full text-gray-700"
                        required
                        onFocus={toggleAgeKeyboard}
                    />
                </div>
                {isNumVisible && !isMobile && (
                    <Keyboard
                        layout={{
                            default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp} {enter}"]
                        }}
                        theme="hg-theme-default hg-layout-numeric numeric-theme"
                        onKeyPress={onKeyPress}
                    />
                )}
                <div className="mb-4 flex flex-row items-center">
                    <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mr-2">{content["Info"][language]["input3"].label}</label>
                    <select
                        id="gender"
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="border rounded-md px-3 py-2 w-full text-gray-700"
                        required
                    >
                        <option value="">{content["Info"][language]["input3"].holder}</option>
                        <option value="male">{content["Info"][language]["input3"].option1}</option>
                        <option value="female">{content["Info"][language]["input3"].option2}</option>
                        <option value="other">{content["Info"][language]["input3"].option3}</option>
                    </select>
                </div>
                <div className="mb-4 flex flex-row items-center">
                    <label htmlFor="village" className="block text-gray-700 text-sm font-bold mr-2">{content["Info"][language]["input4"].label}</label>
                    <input
                        type="text"
                        id="village"
                        name="village"
                        value={village}
                        placeholder={content["Info"][language]["input4"].holder}
                        onChange={(e) => setVillage(e.target.value)}
                        className="border rounded-md px-3 py-2 w-full text-gray-700"
                        required
                        onFocus={toggleVillage}
                    />
                </div>
                {isVillageVisible && !isMobile && (
                    <Keyboard
                        layout={{
                            default: ["q w e r t y u i o p", "a s d f g h j k l {bksp}", "{shift} z x c v b n m done", "{space}"]
                        }}
                        theme="hg-theme-default hg-layout-numeric numeric-theme"
                        onKeyPress={onKeyPress}
                    />
                )}
                <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full mb-2">{content["Info"][language].buttonText}</button>
            </form>
        </div>
    );
}

export default InfoPage;