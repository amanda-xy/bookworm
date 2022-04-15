import { StyledMyBookshelf } from "./StyledMyBookshelf";
import FilterPanel from "../../components/FilterPanel";
import { StyledTitle } from "../../components/styles/StyledTitle";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../../queries/queries";
import BookList from "../../components/BookList";

const MyBookshelf = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  return (
    <StyledMyBookshelf>
      <div className="filter-panel-container">
        <FilterPanel />
      </div>
      <StyledTitle className="large">My Bookshelf</StyledTitle>
      <div className="books-container">{loading ? <p>Loading books</p> : <BookList books={data.books} updateProgress={false} />}</div>
    </StyledMyBookshelf>
  );
};

export default MyBookshelf;
