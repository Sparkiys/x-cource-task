import { useParams } from "react-router-dom";
import { useBooks } from "../../hooks";
import notFoundImage from "../images/imageNotFound.png";
import "./specificBook.scss";
import { CartBook } from "./cartBook";

export function SpecificBook() {
  /*   const [book, setBook] = useState({}); */
  const { books } = useBooks();
  const { id } = useParams();
  const book = books.find((elem) => elem.id === Number(id));

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <section className="container">
      <div className="specific-book">
        <div className="specific-book__container">
          <div className="specific-book__image">
            <img
              src={book.image || notFoundImage}
              alt={book.title}
            />
          </div>
          <ul className="specific-book__info">
            <li>
              <h2 className="specific-book__title">
                {book.title}
              </h2>
            </li>
            <li>
              {" "}
              <p>Author(s): {book.author}</p>
            </li>
            <li>
              {" "}
              <p>Book level: {book.level}</p>
            </li>
            <li>
              <p>
                Book tags:{" "}
                {book.tags.map((elem, index) =>
                  index < book.tags.length - 1
                    ? elem + ", "
                    : elem
                )}
              </p>
            </li>
          </ul>
        </div>

        <CartBook book={book} />
        <div className="specific-book__desc">
          <p className="specific-book__desc-info">
            {book.description}
          </p>
        </div>
      </div>
    </section>
  );
}
