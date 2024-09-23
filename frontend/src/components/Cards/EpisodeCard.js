// src/components/Cards/EpisodeCard.js
import React, { useContext, useState, useEffect } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../context/AuthContext';

const EpisodeCard = ({ episode }) => {
  const { auth } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState('');

  // Check if episode is already a favorite
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await api.get('/favorites');
        const favorites = res.data.favorites;
        if (favorites.episodes.some((fav) => fav.id === episode.id)) {
          setIsFavorite(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (auth.token) {
      checkFavorite();
    }
  }, [auth.token, episode.id]);

  const handleFavorite = async () => {
    if (!auth.token) {
      alert('Please login to manage favorites.');
      return;
    }

    try {
      if (isFavorite) {
        await api.delete(`/favorites/episodes/${episode.id}`);
        setIsFavorite(false);
      } else {
        await api.post(`/favorites/episodes/${episode.id}`);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to update favorite.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col">
      <h3 className="text-xl font-bold">{episode.name}</h3>
      <p className="text-gray-700">Air Date: {episode.air_date}</p>
      <p className="text-gray-700">Episode: {episode.episode}</p>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        onClick={handleFavorite}
        className={`mt-auto px-4 py-2 rounded ${
          isFavorite ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        } hover:bg-opacity-80 transition duration-200`}
      >
        {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default EpisodeCard;
