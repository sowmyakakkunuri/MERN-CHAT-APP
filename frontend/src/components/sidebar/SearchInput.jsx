import React from "react";
import { FaSearch } from "react-icons/fa";
const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full w-full max-w-xs"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <FaSearch className="w-4 h-4 outline-none"/>
      </button>
    </form>
  );
};

export default SearchInput;
