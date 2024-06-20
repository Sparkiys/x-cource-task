import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { PropTypes } from "prop-types";

// Створюємо контекст
const CartContext = createContext();

// Функція для завантаження стану з localStorage
const loadState = () => {
  try {
    const localState = localStorage.getItem("cart");
    if (localState === null) {
      return [];
    }
    return JSON.parse(localState);
  } catch (err) {
    return [];
  }
};

// Функція для збереження стану в localStorage
const saveState = (state) => {
  try {
    const localState = JSON.stringify(state);
    localStorage.setItem("cart", localState);
  } catch (err) {
    // Ігноруємо помилки
  }
};

// Компонент для провайдера контексту
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(loadState);
  const [error, setError] = useState("");
  const [isButtonVisible, setIsButtonVisible] =
    useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    saveState(cart);
  }, [cart]);

  const addToCart = (book, count) => {
    setCart((prevCart) => {
      // Перевіряємо чи книга вже є в корзині
      const availableBookIndex = prevCart.findIndex(
        (item) => item.book.id === book.id
      );
      if (availableBookIndex >= 0) {
        // Оновлюємо кількість книги в корзині
        const updatedCart = prevCart.map((item) =>
          item.book.id === book.id
            ? {
                ...item,
                count:
                  item.count + count > item.book.amount
                    ? item.count
                    : item.count + count,
              }
            : item
        );

        const currentCount =
          updatedCart[availableBookIndex].count;
        console.log(currentCount);
        const available = book.amount - updatedCart.count;

        if (currentCount > book.amount) {
          setError(
            `Maximum number of books for ordering - ${book.amount}. Books available - ${available}`
          );
          setMessage("");
          setIsButtonVisible(false);
          setTimeout(() => {
            setError("");
            setIsButtonVisible(true);
          }, 5000);
          return prevCart;
        }

        if (!error) {
          setMessage("Book has been added successfully");
          setIsButtonVisible(false);
          setTimeout(() => {
            setMessage("");
            setIsButtonVisible(true);
          }, 5000);
        }

        console.log(updatedCart);
        return updatedCart;
      } else {
        // Додаємо нову книгу в корзину
        return [
          ...prevCart,
          {
            book,
            count,
          },
        ];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        clearCart,
        error,
        setError,
        isButtonVisible,
        message,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Хук для використання контексту
export const useCart = () => useContext(CartContext);

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
