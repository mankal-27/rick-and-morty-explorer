// src/components/Cards/CharacterCard.js
import React, { useContext, useState, useEffect } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../context/AuthContext';

const CharacterCard = ({ character }) => {
  const { auth } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState('');

  // Check if character is already a favorite
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await api.get('/favorites');
        const favorites = res.data.favorites;
        if (favorites.characters.some((fav) => fav.id === character.id)) {
          setIsFavorite(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (auth.token) {
      checkFavorite();
    }
  }, [auth.token, character.id]);

  const handleFavorite = async () => {
    if (!auth.token) {
      alert('Please login to manage favorites.');
      return;
    }

    try {
      if (isFavorite) {
        await api.delete(`/favorites/characters/${character.id}`);
        setIsFavorite(false);
      } else {
        await api.post(`/favorites/characters/${character.id}`);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to update favorite.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col">
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-xl font-bold mt-2">{character.name}</h3>
      <p className="text-gray-700">Status: {character.status}</p>
      <p className="text-gray-700">Species: {character.species}</p>
      <p className="text-gray-700">Gender: {character.gender}</p>
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

export default CharacterCard;
