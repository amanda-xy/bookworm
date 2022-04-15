import { StyledBookList } from "./StyledBookList";
import BookListItem from "./BookListItem";
import { Link } from "react-router-dom";

const BookList = ({ books, updateProgress }) => {
  return (
    <StyledBookList>
      {books.map((book) => {
        return updateProgress ? (
          <BookListItem key={book.id} book={book} updateProgress={updateProgress} />
        ) : (
          <Link to={`/books/${book.id}`} key={book.id}>
            <BookListItem key={book.id} book={book} updateProgress={updateProgress} />
          </Link>
        );
      })}
    </StyledBookList>
  );
};

export default BookList;
