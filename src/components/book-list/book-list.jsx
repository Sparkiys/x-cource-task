import React from "react";
import { useBooks } from "../../hooks";
import { Book } from "../book/index";
import { SearchBook } from "./index";
import { useFilterTask } from "../../hooks/useFilterTask";
import { CustomSelect } from "./customSelect";

export function BookList() {
  const { books } = useBooks();
  const { filteredItems, handleFilterChange } =
    useFilterTask(books);

  return (
    <section className="container">
      <div>
        <div className="book">
          <SearchBook
            handleFilterChange={handleFilterChange}
          />
          <CustomSelect
            handleFilterChange={handleFilterChange}
          />
        </div>
        <ul className="books__list">
          {filteredItems.length !== 0 ? (
            filteredItems.map((book) => (
              <Book book={book} key={book.id} />
            ))
          ) : (
            <p>No results</p>
          )}
        </ul>
      </div>
    </section>
  );
}
