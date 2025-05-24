import React, { useEffect, useState } from 'react';
import CreateForm from './CreateForm';
import RestaurantItem from './RestaurantItem';
import Header from '../layout/Header';

import { fetchRestaurants, updateRestaurant } from '../api/apiRestaurants';

function Edit() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [restaurants, setRestaurants] = useState([]);
  const [hasRestaurant, setHasRestaurant] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ company_name: '', phone_number: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRestaurants(token);
      setRestaurants(data);

      const userHasRestaurant = data.some(rest => rest.user === user?.id);
      setHasRestaurant(userHasRestaurant);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  const handleEditClick = (restaurant) => {
    setEditingId(restaurant.id);
    setEditData({
      company_name: restaurant.company_name,
      phone_number: restaurant.phone_number,
    });
  };

  const handleSave = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await updateRestaurant(token, id, editData);
      setEditingId(null);
      await loadRestaurants();
    } catch (err) {
      console.error("Error updating restaurant:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main
        className="flex-grow container mx-auto px-6 pb-10 max-w-5xl"
        style={{
          paddingTop: '5rem',
        }}
      >
        {loading && (
          <p className="mb-6 text-blue-600 font-medium animate-pulse">
            Loading...
          </p>
        )}
        {error && (
          <p className="mb-6 text-red-600 font-semibold bg-red-100 p-3 rounded-md border border-red-300">
            Error: {error}
          </p>
        )}

        {!hasRestaurant ? (
          <CreateForm onCreated={loadRestaurants} />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight">
              Your Restaurants
            </h2>
            <ul className="space-y-4">
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
          </>
        )}
      </main>
    </div>
  );
}

export default Edit;
