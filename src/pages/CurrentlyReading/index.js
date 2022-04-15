import { StyledCurrentlyReading } from "./StyledCurrentlyReading";
import FilterPanel from "../../components/FilterPanel";
import { StyledTitle } from "../../components/styles/StyledTitle";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../../queries/queries";
import BookList from "../../components/BookList";

const CurrentlyReading = () => {
  const { loading, error, data } = useQuery(getBooksQuery);

  return (
    <StyledCurrentlyReading>
      <div className="filter-panel-container">
        <FilterPanel />
      </div>
      <StyledTitle className="large">Currently Reading</StyledTitle>
      <div className="books-container">{loading ? <p>Loading books</p> : <BookList updateProgress={true} books={data.books} />}</div>
    </StyledCurrentlyReading>
  );
};

export default CurrentlyReading;
