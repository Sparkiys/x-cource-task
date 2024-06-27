import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import {
  Layout,
  NotFoundPage,
  LoginPage,
  Cart,
} from "../routes";
import { BookList } from "../components/book-list";
import { SpecificBook } from "../components/specific-book";
import { LoginProvider } from "../hooks/useLogin";
import { BooksProvider } from "../hooks/useBooks";
import { CartProvider } from "../hooks/useCart";

import "./App.scss";
import { PrivateRoute, ScrollToTop } from "../hooks";
import { useEffect } from "react";

function App() {
  return (
    <BrowserRouter basename="/x-cource-task">
      <BooksProvider>
        <CartProvider>
          <LoginProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<LoginPage />} />
                <Route
                  path="bookList"
                  element={
                    <PrivateRoute>
                      <BookList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="specificBook/:id"
                  element={
                    <PrivateRoute>
                      <SpecificBook />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="cart"
                  element={
                    <PrivateRoute>
                      <Cart />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="*"
                  element={<NotFoundPage />}
                />
              </Route>
            </Routes>
          </LoginProvider>
        </CartProvider>
      </BooksProvider>
    </BrowserRouter>
  );
}

export default App;
