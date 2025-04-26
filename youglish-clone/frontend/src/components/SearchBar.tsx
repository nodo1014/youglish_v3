import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = (event.target as HTMLFormElement).elements.namedItem('search') as HTMLInputElement;
    onSearch(query.value);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-end items-center p-4">
      <input
        type="text"
        name="search"
        placeholder="Enter search term..."
        className="border rounded shadow p-2 mr-2 flex-1"
      />
      <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
        Search
      </button>
    </form>
  );
};

export default SearchBar; 