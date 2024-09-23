// src/components/Layout/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Rick and Morty Explorer
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          <Link to="/characters" className="text-white hover:underline">
            Characters
          </Link>
          <Link to="/episodes" className="text-white hover:underline">
            Episodes
          </Link>
          <Link to="/locations" className="text-white hover:underline">
            Locations
          </Link>
          {auth.token ? (
            <>
              <Link to="/favorites" className="text-white hover:underline">
                Favorites
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-white hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
