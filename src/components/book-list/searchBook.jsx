import { useState } from "react";
import { PropTypes } from "prop-types";
import { useBooks } from "../../hooks";
import { useFilterTask } from "../../hooks/useFilterTask";

export function SearchBook({ handleFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Функція для пошуку книг
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    handleFilterChange(value);
  };

  return (
    <div className="book__search">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Enter book name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit">
        <img
          src="https://prometheus-platform.github.io/Example_of_course_project_2/static/media/searchIcon.faea7e5f368e59b38ec7fcf14c37394f.svg"
          alt="search"
        />
      </button>
    </div>
  );
}

SearchBook.propTypes = {
  handleFilterChange: PropTypes.func,
};
