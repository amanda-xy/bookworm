import { StyledBooks } from "../styles/StyledBooks";
import { StyledTitle } from "../components/styles/StyledTitle";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import SearchPanel from "../components/SearchPanel";
import Button from "../components/Button";
import AddBook from "../components/AddBook";
import { useState } from "react";
import classNames from "classnames";
import { OutCloseContainer } from "../components/OutCloseContainer";

const Books = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [addBookVisible, setAddBookVisible] = useState(false);

  return (
    <StyledBooks>
      <div className="books-content">
        <div style={{ justifySelf: "flex-end", alignSelf: "flex-end" }}></div>
        <SearchPanel
          fontFamily="Quicksand"
          fontSize="24px"
          labelText="My Bookshelf"
          searchBarPlaceholder="Search book..."
          iconWidth={25}
          iconHeight={25}
          spaceBetween={false}
        />

        <div className="bookshelf-container">{loading ? <p>Loading books</p> : data.books.map((book) => <img key={book.id} src={book.image} alt={book.title} />)}</div>
        <SearchPanel
          fontFamily="Quicksand"
          fontSize="24px"
          labelText="Currently Reading"
          searchBarPlaceholder="Search book..."
          iconWidth={25}
          iconHeight={25}
          spaceBetween={false}
        />
        <div className="currently-reading-container">
          {loading ? <p>Loading books</p> : data.books.map((book) => <img key={book.id} src={book.image} alt={book.title} />)}
        </div>
      </div>

      <OutCloseContainer onOutsideClick={() => setAddBookVisible(false)}>
        <Button
          className="add-book-button"
          text="Add Book"
          onClickHandler={() => {
            setAddBookVisible(!addBookVisible);
          }}
        />
        <div className={classNames("add-book-container", addBookVisible ? "visible" : "hidden")}>
          <AddBook />
        </div>
      </OutCloseContainer>
    </StyledBooks>
  );
};

export default Books;
