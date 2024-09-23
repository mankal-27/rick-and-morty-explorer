// src/components/Favorites/Favorites.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api';
import FavoriteItem from './FavoriteItem';

const Favorites = () => {
  const { auth } = useContext(AuthContext);
  const [favorites, setFavorites] = useState({
    characters: [],
    episodes: [],
    locations: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFavorites = async () => {
    try {
      const res = await api.get('/favorites');
      setFavorites(res.data.favorites);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch favorites.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.token) {
      fetchFavorites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>

      {/* Characters */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Characters</h2>
        {favorites.characters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.characters.map((char) => (
              <FavoriteItem key={char.id} item={char} type="characters" />
            ))}
          </div>
        ) : (
          <p>You have no favorite characters.</p>
        )}
      </section>

      {/* Episodes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
        {favorites.episodes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.episodes.map((ep) => (
              <FavoriteItem key={ep.id} item={ep} type="episodes" />
            ))}
          </div>
        ) : (
          <p>You have no favorite episodes.</p>
        )}
      </section>

      {/* Locations */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Locations</h2>
        {favorites.locations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.locations.map((loc) => (
              <FavoriteItem key={loc.id} item={loc} type="locations" />
            ))}
          </div>
        ) : (
          <p>You have no favorite locations.</p>
        )}
      </section>
    </div>
  );
};

export default Favorites;
