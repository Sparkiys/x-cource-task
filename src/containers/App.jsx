import {
  BrowserRouter,
  Route,
  Routes,
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

function App() {
  return (
    <BrowserRouter>
      <BooksProvider>
        <CartProvider>
          <LoginProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<LoginPage />} />
                <Route
                  path="bookList"
                  element={<BookList />}
                />
                <Route
                  path="specificBook/:id"
                  element={<SpecificBook />}
                />
                <Route path="cart" element={<Cart />} />

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
