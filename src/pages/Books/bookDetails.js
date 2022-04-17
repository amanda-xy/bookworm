import { StyledBookDetails } from "./StyledBookDetails";
import { useParams } from "react-router-dom";
import { getBookQuery } from "../../queries/queries";
import { useQuery } from "@apollo/client";
import { StyledTitle } from "../../components/styles/StyledTitle";
import Button from "../../components/Button";

const BookDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: id },
  });

  return (
    <StyledBookDetails>
      {loading ? (
        <p>Loading book...</p>
      ) : (
        <div className="styled-book-details">
          <div className="main-container">
            <div className="title">
              <StyledTitle className="large">{data.book.title}</StyledTitle>
              <StyledTitle>
                by {data.book.author.firstName} {data.book.author.lastName}
              </StyledTitle>
            </div>
            <div className="description-container">
              <p className="description">{data.book.description}</p>
              <img className="book-image" src={data.book.image} alt={data.book.title} />
            </div>
            <div className="book-info">
              <p>Genre: {data.book.genre}</p>
              <p>Number of pages: {data.book.numberOfPages}</p>
              <p>Rating: {data.book.rating} of 5 stars</p>
              <p>Publication date: {data.book.publicationDate}</p>
            </div>
            <div className="buttons-container">
              <Button text="Add to bookshelf" />
              <Button text="Add to currently reading" />
            </div>
          </div>
          <div className="side-container">
            <StyledTitle className="small">Other books by this author</StyledTitle>
          </div>
        </div>
      )}
    </StyledBookDetails>
  );
};

export default BookDetails;
