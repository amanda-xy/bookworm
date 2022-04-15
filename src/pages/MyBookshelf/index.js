import { StyledMyBookshelf } from "./StyledMyBookshelf";
import FilterPanel from "../../components/FilterPanel";
import { StyledTitle } from "../../components/styles/StyledTitle";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../../queries/queries";

const MyBookshelf = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  return (
    <StyledMyBookshelf>
      <div className="filter-panel-container">
        <FilterPanel />
      </div>
      <StyledTitle className="large">My Bookshelf</StyledTitle>
      <div className="books-container">
        {loading ? (
          <p>Loading books</p>
        ) : (
          data.books.map((book) => (
            <Link to={`/books/${book.id}`} key={book.id}>
              <div className="book-container">
                <img src={book.image} alt={book.title} />
                <div className="book-info-container">
                  <p className="book-title">{book.title}</p>
                  <p className="book-genre">{book.genre}</p>
                  <p className="book-pages">{book.numberOfPages}</p>
                  <p className="book-author">{`${book.author.firstName} ${book.author.lastName}`}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </StyledMyBookshelf>
  );
};

export default MyBookshelf;
