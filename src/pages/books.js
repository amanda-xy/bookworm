import { StyledBooks } from "../styles/StyledBooks";
import { StyledTitle } from "../components/styles/StyledTitle";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import SearchPanel from "../components/SearchPanel";

const Books = () => {
  const { loading, error, data } = useQuery(getBooksQuery);

  return (
    <StyledBooks>
      <SearchPanel
        fontFamily="Quicksand"
        fontSize="24px"
        labelText="My Bookshelf"
        searchBarPlaceholder="Search book..."
        iconWidth={25}
        iconHeight={25}
        spaceBetween={false}
      />

      <div className="bookshelf-container">{loading ? <p>Loading books</p> : data.books.map((book, index) => <p key={index}>{book.title}</p>)}</div>
      <SearchPanel
        fontFamily="Quicksand"
        fontSize="24px"
        labelText="Currently Reading"
        searchBarPlaceholder="Search book..."
        iconWidth={25}
        iconHeight={25}
        spaceBetween={false}
      />
      <div className="currently-reading-container">{loading ? <p>Loading books</p> : data.books.map((book) => <p>{book.title}</p>)}</div>
    </StyledBooks>
  );
};

export default Books;
