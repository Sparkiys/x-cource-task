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

  const handleTimeout = () => {
    setIsButtonVisible(false);
    setTimeout(() => {
      setMessage("");
      setError("");
      setIsButtonVisible(true);
    }, 2000);
  };

  const handleExceedError = (book, available) => {
    setError(
      `Maximum number of books for ordering - ${book.amount}. Available to order - ${available}`
    );
    setMessage("");
    handleTimeout();
  };

  const handleSuccess = (newCart) => {
    setMessage("Book has been added successfully");
    setError("");
    handleTimeout();
    return newCart;
  };

  const addToCart = (book, count) => {
    setCart((prevCart) => {
      // Перевіряємо чи книга вже є в корзині
      const availableBookIndex = prevCart.findIndex(
        (item) => item.book.id === book.id
      );

      const currentCount =
        availableBookIndex >= 0
          ? prevCart[availableBookIndex].count
          : 0;
      const newCount = currentCount + count;

      if (newCount > book.amount) {
        const available = book.amount - currentCount;
        handleExceedError(book, available);
        return prevCart;
      }

      if (availableBookIndex >= 0) {
        // Оновлюємо кількість книги в корзині
        const updatedCart = prevCart.map((item) =>
          item.book.id === book.id
            ? {
                ...item,
                count: newCount,
              }
            : item
        );

        return handleSuccess(updatedCart);
      } else {
        // Додаємо нову книгу в корзину
        const newCart = [
          ...prevCart,
          {
            book,
            count,
          },
        ];

        return handleSuccess(newCart);
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
