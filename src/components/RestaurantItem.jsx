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
      .catch(err => {
        console.error("Error fetching items:", err);
      });
  }, [token, userId]);

  // Delete handler
  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteItem(token, itemId);
      setItems(items.filter(item => item.id !== itemId)); // remove from UI immediately
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  return (
    <li className="mb-2 flex justify-between items-start bg-red-600 p-2 rounded text-white">
      <div className="flex-1">
        {isEditing ? (
          <>
            <label className="mb-1">
              Restaurant Name:
              <input
                className="text-black px-2 py-1 rounded border"
                value={editData.company_name}
                onChange={(e) =>
                  setEditData({ ...editData, company_name: e.target.value })
                }
              />
            </label>
            <br />
            <label className="mb-1">
              Business Phone:
              <input
                className="text-black px-2 py-1 rounded border"
                value={editData.phone_number}
                onChange={(e) =>
                  setEditData({ ...editData, phone_number: e.target.value })
                }
              />
            </label>
            <br />

            Items:

            <span
            className="cursor-pointer underline"
            onClick={() => navigate(`/edit/${restaurant.id}/create-item/`)}
            >
            Add Item
            </span>

            
            {items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="bg-white text-black rounded-lg p-3 shadow-sm relative"
                  >
                    <h3 className="text-lg font-semibold mb-1">
                      {item.item_name}
                    </h3>
                    <p className="text-sm">
                      💵 Price:{' '}
                      <span className="font-medium">{item.prix} MAD</span>
                    </p>
                    <p className="text-sm">
                      🍽️ Category:{' '}
                      <span className="font-medium">{item.categorie}</span>
                    </p>
                    {item.images && item.images.length > 0 && (
                      <div className="flex gap-2 mt-2 overflow-x-auto">
                        {item.images.map(img => (
                          <img
                            key={img.id}
                            src={img.image_url}
                            alt={item.item_name}
                            className="w-16 h-16 object-cover rounded border"
                          />
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() =>
                          navigate(`/edit/itemN/${item.id}`, { state: { item } })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="ml-4 mt-1">No items found</p>
            )}
          </>
        ) : (
          <>
            Restaurant Name: <strong>{restaurant.company_name}</strong>
            <br />
            Business Phone: {restaurant.phone_number}
            <br />
            Items ({items.length}){' '}
            {items.length === 0 && (
              <span className="text-yellow-300 font-semibold">[ADD ITEMS]</span>
            )}
          </>
        )}
      </div>
      <div className="ml-4">
        {isEditing ? (
          <button
            className="bg-white text-black px-2 py-1 rounded"
            onClick={() => onSave(restaurant.id)}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-white text-black px-2 py-1 rounded"
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
