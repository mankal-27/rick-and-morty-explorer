// src/components/Favorites/FavoriteItem.js
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../api/api';
import { AuthContext } from '../../context/AuthContext';

const FavoriteItem = ({ item, type, onRemove }) => {
  const { auth } = useContext(AuthContext); // Utilize auth if needed
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    if (!auth.token) {
      setError('You must be logged in to remove favorites.');
      return;
    }

    const confirm = window.confirm(`Are you sure you want to remove this ${type.slice(0, -1)} from your favorites?`);
    if (!confirm) return;

    setLoading(true);
    setError('');

    try {
      await api.delete(`/favorites/${type}/${item.id}`);
      onRemove(item.id); // Inform parent component to remove the item from the state
    } catch (err) {
      console.error(err);
      setError('Failed to remove favorite.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col">
      {type === 'characters' && item.image && (
        <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded" />
      )}
      <h3 className="text-xl font-bold mt-2">{item.name}</h3>
      {type === 'characters' && (
        <>
          <p className="text-gray-700">Status: {item.status}</p>
          <p className="text-gray-700">Species: {item.species}</p>
          <p className="text-gray-700">Gender: {item.gender}</p>
        </>
      )}
      {type === 'episodes' && (
        <>
          <p className="text-gray-700">Air Date: {item.air_date}</p>
          <p className="text-gray-700">Episode: {item.episode}</p>
        </>
      )}
      {type === 'locations' && (
        <>
          <p className="text-gray-700">Type: {item.type}</p>
          <p className="text-gray-700">Dimension: {item.dimension}</p>
        </>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        onClick={handleRemove}
        disabled={loading}
        className={`mt-auto px-4 py-2 rounded ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-red-500 text-white hover:bg-red-600'
        } transition duration-200`}
        aria-label={`Remove ${item.name} from favorites`}
      >
        {loading ? 'Removing...' : 'Remove Favorite'}
      </button>
    </div>
  );
};

FavoriteItem.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['characters', 'episodes', 'locations']).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FavoriteItem;
