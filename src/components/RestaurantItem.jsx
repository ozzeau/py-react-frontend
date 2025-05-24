import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserItems, deleteItem } from '../api/apiItems';

function RestaurantItem({
  restaurant,
  editingId,
  editData,
  onEditClick,
  onSave,
  setEditData,
  token,
  userId,
}) {
  const isEditing = editingId === restaurant.id;
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userId) return;

    fetchUserItems(token, userId)
      .then(userItems => setItems(userItems))
      .catch(console.error);
  }, [token, userId]);

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteItem(token, itemId);
      setItems(items.filter(item => item.id !== itemId));
    } catch {
      alert("Failed to delete item. Please try again.");
    }
  };

  return (
    <li className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:justify-between md:items-start space-y-6 md:space-y-0 md:space-x-8">
      <div className="flex-1 text-gray-900">
        {isEditing ? (
          <>
            <label className="block text-sm font-semibold mb-2">
              Restaurant Name:
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-red-700 focus:ring-2 focus:ring-red-600 focus:ring-opacity-30"
                value={editData.company_name}
                onChange={e =>
                  setEditData({ ...editData, company_name: e.target.value })
                }
              />
            </label>
            <label className="block text-sm font-semibold mb-2 mt-6">
              Business Phone:
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-red-700 focus:ring-2 focus:ring-red-600 focus:ring-opacity-30"
                value={editData.phone_number}
                onChange={e =>
                  setEditData({ ...editData, phone_number: e.target.value })
                }
              />
            </label>

            <div className="mt-6">
              <span
                className="inline-block text-sm font-semibold text-red-700 hover:underline cursor-pointer"
                onClick={() => navigate(`/edit/${restaurant.id}/create-item/`)}
              >
                + Add Item
              </span>
            </div>

            {items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="bg-red-50 rounded-xl p-5 shadow relative"
                  >
                    <h3 className="text-lg font-bold mb-1 text-red-800">
                      {item.item_name}
                    </h3>
                    <p className="text-sm text-red-700">
                      💵 Price: <span className="font-semibold">{item.prix} MAD</span>
                    </p>
                    <p className="text-sm text-red-700">
                      🍽️ Category: <span className="font-semibold">{item.categorie}</span>
                    </p>
                    {item.images && item.images.length > 0 ? (
                      <div className="flex gap-3 mt-4 overflow-x-auto h-16 items-center">
                        {item.images.map(img => (
                          <img
                            key={img.id}
                            src={img.image_url}
                            alt={item.item_name}
                            className="w-16 h-16 object-cover rounded-lg border border-red-300"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="h-16 mt-4" />
                    )}
                    <div className="flex gap-4 mt-6">
                      <button
                        className="flex-1 bg-red-700 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-800 transition"
                        onClick={() =>
                          navigate(`/edit/itemN/${item.id}`, { state: { item } })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="flex-1 bg-red-300 text-red-800 py-2 rounded-lg text-sm font-semibold hover:bg-red-400 transition"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm text-red-600 font-semibold">
                No items found
              </p>
            )}
          </>
        ) : (
          <>
            <p className="font-bold text-xl mb-2 text-red-800">{restaurant.company_name}</p>
            <p className="text-red-700 mb-2">Business Phone: {restaurant.phone_number}</p>
            <p className="text-red-700 font-semibold">
              Items ({items.length}){" "}
              {items.length === 0 && (
                <span className="text-red-600 font-bold">[ADD ITEMS]</span>
              )}
            </p>
          </>
        )}
      </div>

      <div className="flex-shrink-0 flex items-center md:items-start">
        {isEditing ? (
          <button
            className="px-6 py-2 bg-white border border-red-700 rounded-lg shadow-sm text-red-700 font-semibold hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            onClick={() => onSave(restaurant.id)}
          >
            Save
          </button>
        ) : (
          <button
            className="px-6 py-2 bg-white border border-red-700 rounded-lg shadow-sm text-red-700 font-semibold hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            onClick={() => onEditClick(restaurant)}
          >
            Edit
          </button>
        )}
      </div>
    </li>
  );
}

export default RestaurantItem;
