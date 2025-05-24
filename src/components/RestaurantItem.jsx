import React, { useEffect, useState } from 'react';

function RestaurantItem({ restaurant, editingId, editData, onEditClick, onSave, setEditData, token, userId }) {
  const isEditing = editingId === restaurant.id;
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost/api/items/", {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        const userItems = data.filter(item => item.user === userId);
        setItems(userItems);
      })
      .catch(err => {
        console.error("Error fetching items:", err);
      });
  }, [token, userId]);

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
            {items.length > 0 ? (
              <ul className="list-disc list-inside ml-4 mt-1">
                {items.map(item => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
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
            Items ({items.length}) {items.length === 0 && <span className="text-yellow-300 font-semibold">[ADD ITEMS]</span>}
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
