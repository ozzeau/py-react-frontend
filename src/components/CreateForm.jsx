import React, { useState } from 'react';

function CreateForm({ onCreated }) {
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost/api/restaurants/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify({
        company_name: companyName,
        phone_number: phoneNumber
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to create restaurant");
        return res.json();
      })
      .then(data => {
        setSuccessMessage("Restaurant created successfully!");
        setErrorMessage(null);
        setCompanyName('');
        setPhoneNumber('');
        if (onCreated) {
          onCreated();  // notify parent to re-fetch
        }
      })
      .catch(err => {
        setErrorMessage("Error: " + err.message);
        setSuccessMessage(null);
      });
  };

  return (
    <div className="w-full md:w-1/2 p-8 bg-blue-100 flex flex-col justify-center h-[500px] mx-auto mt-10 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Create Restaurant
      </h1>

      {errorMessage && (
        <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            type="text"
            placeholder="e.g., Red Dragon Sushi"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="tel"
            placeholder="e.g., 1234567890"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-800 text-white py-2 rounded-md hover:bg-red-700 transition flex justify-center gap-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p>Create</p>
        </button>
      </form>
    </div>
  );
}

export default CreateForm;
