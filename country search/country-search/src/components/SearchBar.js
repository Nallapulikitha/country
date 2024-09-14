import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce'; // Ensure this path is correct
import { fetchCountries } from '../utils/fetchCountries'; // Ensure this path is correct
import SearchResults from './SearchResults'; // Ensure this path is correct
import { FaSearch } from 'react-icons/fa'; // Import search icon
import './SearchBar.css'; // Ensure this path is correct

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredResults = countries
      .flatMap(country => {
        const matchesCountry = country.name?.common.toLowerCase().startsWith(debouncedQuery.toLowerCase());
        const matchesCapital = country.capital?.[0]?.toLowerCase().startsWith(debouncedQuery.toLowerCase());

        return [
          ...(matchesCountry ? [{ name: country.name.common }] : []),
          ...(matchesCapital ? [{ name: country.capital[0] }] : [])
        ];
      });

    setSearchResults(filteredResults);
  }, [debouncedQuery, countries]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by country or capital..."
          value={query}
          onChange={handleInputChange}
        />
      </div>
      {searchResults.length > 0 && (
        <SearchResults results={searchResults} />
      )}
    </div>
  );
};

export default SearchBar;
