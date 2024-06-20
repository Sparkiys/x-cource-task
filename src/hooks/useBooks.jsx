import {
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { PropTypes } from "prop-types";
import booksData from "../booksData/books.json"; // Імпортуємо JSON-файл

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    try {
      // Перевіряємо, чи існує поле 'books' у завантажених даних
      if (
        booksData &&
        booksData.books &&
        Array.isArray(booksData.books)
      ) {
        // Якщо 'booksData' містить поле 'books', яке є масивом, встановлюємо його як список книг
        setBooks(booksData.books);
      } else {
        // Якщо властивість 'books' не знайдена або не є масивом, видаємо помилку
        throw new Error(
          "booksData does not contain a valid array of books"
        );
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoaded(true);
    }
  }, []); // Пустий масив залежностей означає, що ефект буде виконаний при монтуванні компонента

  return (
    <BooksContext.Provider
      value={{ books, isLoaded, error }}
    >
      {" "}
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);

BooksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
