import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">CodeLingo</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/learn" className="text-gray-700 hover:text-gray-900">
              Learn
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-gray-900">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
