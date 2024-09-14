import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import './SearchResults.css'; // Ensure this path is correct

const SearchResults = ({ results }) => {
  return (
    <ul className="search-results">
      {results.map((result, index) => (
        <li key={index} className="search-result-item">
          <FaSearch className="search-icon" /> {/* Add search icon */}
          {result.name} {/* Just display the name */}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
