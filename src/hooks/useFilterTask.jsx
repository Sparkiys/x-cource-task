import { useEffect, useState } from "react";

export function useFilterTask(books) {
  const [filteredItems, setFilteredItems] = useState(books);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    filterBooks(searchTerm, priceRange);
  }, [books, searchTerm, priceRange]);

  const filterBooks = (search, price) => {
    let filtered = books;

    if (search) {
      filtered = filtered.filter((book) =>
        book.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (price && price !== "Any price") {
      if (price === "Up to $15") {
        filtered = filtered.filter((book) =>
          book.price
            ? book.price > 0 && book.price < 15
            : false
        );
      } else if (price === "$15-$30") {
        filtered = filtered.filter((book) =>
          book.price
            ? book.price > 15 && book.price < 30
            : false
        );
      } else if (price === "$30+") {
        filtered = filtered.filter((book) =>
          book.price ? book.price > 30 : false
        );
      }
    }
    setFilteredItems(filtered);
  };

  // Функція для фільтрації елементів
  const handleFilterChange = (value) => {
    if (
      value === "Any Price" ||
      value === "Up to $15" ||
      value === "$15-$30" ||
      value === "$30+"
    ) {
      setPriceRange(value);
    } else {
      setSearchTerm(value);
    }
  };

  return {
    filteredItems,
    handleFilterChange,
  };
}
