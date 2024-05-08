import React, { useState } from "react";
function InfoPage(){
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [village, setVillage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            age: age,
            gender: gender,
            village: village
        };
        window.location.href = "/opening";
        console.log(formData);
    };

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
                        required
                    />
                </div>
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
                    />
                </div>
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
                    />
                </div>
                <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full mb-2">Submit</button>
            </form>
        </div>
    );
}

export default InfoPage;