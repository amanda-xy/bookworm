import { StyledCurrentlyReading } from "./StyledCurrentlyReading";
import FilterPanel from "../../components/FilterPanel";
import { StyledTitle } from "../../components/styles/StyledTitle";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../../queries/queries";
import ProgressBar from "../../components/ProgressBar";

const CurrentlyReading = () => {
  const { loading, error, data } = useQuery(getBooksQuery);

  return (
    <StyledCurrentlyReading>
      <div className="filter-panel-container">
        <FilterPanel />
      </div>
      <StyledTitle className="large">Currently Reading</StyledTitle>
      <div className="books-container">
        {loading ? (
          <p>Loading books</p>
        ) : (
          data.books.map((book) => (
            <div className="book-container">
              <div className="book-image-info-container">
                <img src={book.image} alt={book.title} />
                <div className="book-info-container">
                  <p className="book-title">{book.title}</p>
                  <p className="book-genre">{book.genre}</p>
                  <p className="book-pages">{`240 of ${book.numberOfPages} pages`}</p>
                  <p className="book-author">{`${book.author.firstName} ${book.author.lastName}`}</p>
                </div>
              </div>
              <div className="progress-bar-container">
                <ProgressBar completed={40} />
              </div>
            </div>
          ))
        )}
      </div>
    </StyledCurrentlyReading>
  );
};

export default CurrentlyReading;
