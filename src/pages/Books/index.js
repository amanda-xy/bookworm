import { StyledBooks } from "./StyledBooks";
import { StyledTitle } from "../../components/Navbar/styles/StyledTitle";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../../queries/queries";
import SearchPanel from "../../components/SearchPanel";
import Button from "../../components/Button/index";
import AddBook from "../../components/AddBook";
import { useState } from "react";
import classNames from "classnames";
import { OutCloseContainer } from "../../components/OutCloseContainer";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "../../images/thin_arrow_icon.svg";
import { ReactComponent as Arrow } from "../../images/arrow_icon.svg";

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

        <div className="bookshelf-container">
          <div className="books-container">
            {loading ? (
              <p>Loading books</p>
            ) : (
              data.books.map((book) => (
                <Link to={`/books/${book.id}`} key={book.id}>
                  <img src={book.image} alt={book.title} />{" "}
                </Link>
              ))
            )}
          </div>
          <div className="arrow-container">
            <Link to="/books/my-bookshelf">
              <ArrowIcon className="arrow-icon" />
            </Link>
          </div>
        </div>

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
          <div className="books-container">
            {loading ? (
              <p>Loading books</p>
            ) : (
              data.books.map((book) => (
                <Link to={`/books/${book.id}`} key={book.id}>
                  <img src={book.image} alt={book.title} />{" "}
                </Link>
              ))
            )}
          </div>
          <div className="arrow-container">
            <Link to="/books/currently-reading">
              <ArrowIcon className="arrow-icon" />
            </Link>
          </div>
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
