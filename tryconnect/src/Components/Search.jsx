import React, { useState } from 'react';

const SearchInput = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleClick = () => {
    handleSearch(searchValue);
  };

  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="search"
        value={searchValue}
        onChange={handleChange}
        placeholder="Enter search query"
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default SearchInput;
