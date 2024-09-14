import React from 'react';

const CountryCard = ({ country }) => {
  return (
    <li className="country-card">
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Region: {country.region}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <img src={country.flags[1]} alt={`${country.name.common} flag`} width="100" />
    </li>
  );
};

export default CountryCard;
