import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditItem() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state?.item;

  const [itemName, setItemName] = useState(item?.item_name || "");
  const [price, setPrice] = useState(item?.prix || "");
  const [category, setCategory] = useState(item?.categorie || "");

  const [existingImages, setExistingImages] = useState(item?.images || []);
  const [newImages, setNewImages] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const token = localStorage.getItem("token");

  if (!item) {
    return <p>No item data was passed.</p>;
  }

  // Delete image immediately on remove
  const handleRemoveExistingImage = (id) => {
    fetch(`http://localhost/api/items/${item.id}/delete_image/?image_id=${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to delete image");
        // On success, update UI
        setExistingImages(existingImages.filter(img => img.id !== id));
      })
      .catch(err => {
        setErrorMessage("Error deleting image: " + err.message);
      });
  };

  const handleNewImagesChange = (e) => {
    setNewImages([...newImages, ...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append("item_name", itemName);
    formData.append("prix", price);
    formData.append("categorie", category);

    newImages.forEach((file) => {
      formData.append("new_images", file);
    });

    fetch(`http://localhost/api/items/${item.id}/`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update item");
        return res.json();
      })
      .then((data) => {
        setSuccessMessage("Item updated successfully!");
        setErrorMessage(null);
        setTimeout(() => navigate("/edit"), 1500);
      })
      .catch((err) => {
        setErrorMessage("Error: " + err.message);
        setSuccessMessage(null);
      });
  };

  return (
    <div className="w-full max-w-md p-8 bg-blue-100 mx-auto mt-10 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Edit Item
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

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block mb-1 font-medium">Item Name</label>
          <input
            type="text"
            placeholder="e.g., Spicy Tuna Roll"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price (MAD)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g., 45.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            placeholder="e.g., Sushi"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Existing Images</label>
          <div className="flex flex-wrap gap-4 mb-2">
            {existingImages.length === 0 && <p>No existing images</p>}
            {existingImages.map((img) => (
              <div key={img.id} className="relative">
                <img
                  src={img.image_url}
                  alt="existing"
                  className="w-20 h-20 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(img.id)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Add New Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleNewImagesChange}
            className="w-full"
          />
          {newImages.length > 0 && (
            <p className="mt-1 text-sm text-gray-600">
              {newImages.length} new image(s) selected
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-red-800 text-white py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
