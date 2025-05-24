import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateItemForm() {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const token = localStorage.getItem("token");

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("item_name", itemName);
    formData.append("prix", price);
    formData.append("categorie", category);
    images.forEach((file) => formData.append("uploaded_images", file));

    fetch("http://localhost/api/items/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        // No need to set Content-Type manually for FormData
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create item");
        return res.json();
      })
      .then((data) => {
        setSuccessMessage("Item created successfully!");
        setTimeout(() => navigate("/edit"), 500);
      })
      .catch((err) => {
        setErrorMessage("Error: " + err.message);
      });
  };

  return (
    <div className="w-full max-w-md p-8 mx-auto bg-blue-50 rounded shadow mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Create New Item</h1>

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

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Price (MAD)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {images.length > 0 && (
            <p className="mt-1 text-sm text-gray-600">
              {images.length} image(s) selected
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
