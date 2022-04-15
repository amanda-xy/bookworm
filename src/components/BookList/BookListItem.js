import { StyledBookListItem } from "./StyledBookListItem";
import ProgressBar from "../../components/ProgressBar";
import { ReactComponent as Arrow } from "../../images/arrow_icon.svg";
import { useState } from "react";
import { StyledTitle } from "../styles/StyledTitle";
import Button from "../../components/Button";
import classNames from "classnames";

const BookListItem = ({ book, updateProgress }) => {
  const [updateProgressVisible, setUpdateProgressVisible] = useState(false);

  return (
    <StyledBookListItem updateProgress={updateProgress}>
      <div className="book-info-progress-container">
        <div className="book-image-info-container">
          <img src={book.image} alt={book.title} />
          <div className="book-info-container">
            <div className="book-title-container">
              <p className="book-title">{book.title}</p>
              <Arrow className={updateProgressVisible ? "up" : "down"} onClick={() => setUpdateProgressVisible(!updateProgressVisible)} />
            </div>
            <p className="book-genre">{book.genre}</p>
            <p className="book-pages">{`240 of ${book.numberOfPages} pages`}</p>
            <p className="book-author">{`${book.author.firstName} ${book.author.lastName}`}</p>
          </div>
        </div>
        <div className="progress-bar-container">
          <ProgressBar completed={40} />
        </div>
      </div>
      <div className={classNames("update-progress-container", updateProgressVisible ? "visible" : "hidden")}>
        <p className="title">Update progress</p>
        <div className="update-progress-content">
          <div className="update-progress-input-container">
            <span>I'm on page</span>
            <input placeholder="100" type="number" />
            <span>of {book.numberOfPages}</span>
          </div>
          <div className="update-button-container">
            <Button text="Update" />
          </div>
        </div>
      </div>
    </StyledBookListItem>
  );
};

export default BookListItem;
