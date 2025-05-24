import React, { useEffect, useState } from 'react';
import CreateForm from './CreateForm';
import RestaurantItem from './RestaurantItem';

function Edit() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [restaurants, setRestaurants] = useState([]);
  const [hasRestaurant, setHasRestaurant] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ company_name: '', phone_number: '' });

  const fetchRestaurants = () => {
    fetch("http://localhost/api/restaurants", {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setRestaurants(data);
        const match = data.some(rest => rest.user === user?.id);
        setHasRestaurant(match);
      })
      .catch(error => {
        console.error("Error fetching restaurants:", error);
      });
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleEditClick = (restaurant) => {
    setEditingId(restaurant.id);
    setEditData({
      company_name: restaurant.company_name,
      phone_number: restaurant.phone_number,
    });
  };

  const handleSave = (id) => {
    fetch(`http://localhost/api/restaurants/${id}/`, {
      method: 'PUT',
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editData)
    })
      .then(response => {
        if (!response.ok) throw new Error("Update failed");
        return response.json();
      })
      .then(() => {
        setEditingId(null);
        fetchRestaurants(); // Refresh data
      })
      .catch(error => {
        console.error("Error updating restaurant:", error);
      });
  };

  if (!hasRestaurant) {
    return <CreateForm onCreated={fetchRestaurants} />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome {user?.username}!</h1>
      <p>Your role: {user?.role}</p>
      <p>Your current token: {token}</p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Has restaurant registered?</h2>
        <p className="text-lg font-mono">{hasRestaurant ? "true" : "false"}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Restaurants:</h2>
        <ul className="bg-gray-100 p-4 mt-2 rounded list-disc list-inside">
          {restaurants
            .filter(rest => rest.user === user?.id)
            .map(rest => (
              <RestaurantItem
                key={rest.id}
                restaurant={rest}
                editingId={editingId}
                editData={editData}
                onEditClick={handleEditClick}
                onSave={handleSave}
                setEditData={setEditData}
                token={token}
                userId={user?.id}
              />

            ))}
        </ul>
      </div>
    </div>
  );
}

export default Edit;
