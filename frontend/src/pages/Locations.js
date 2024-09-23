// src/pages/Locations.js
import React, { useState, useEffect } from 'react';
import api from '../api/api';
import LocationCard from '../components/Cards/LocationCard';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [info, setInfo] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLocations = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/locations', { params: { page, name: search } });
      setLocations(res.data.results);
      setInfo(res.data.info);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch locations.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 on new search
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Locations</h1>
      <input
        type="text"
        placeholder="Search locations"
        value={search}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setPage(page - 1)}
              disabled={!info.prev}
              className={`px-4 py-2 rounded ${
                info.prev
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-700 cursor-not-allowed'
              } transition duration-200`}
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={!info.next}
              className={`px-4 py-2 rounded ${
                info.next
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-700 cursor-not-allowed'
              } transition duration-200`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Locations;
