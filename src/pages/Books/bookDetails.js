import { StyledBookDetails } from "./StyledBookDetails";
import { useParams } from "react-router-dom";
import { getBookQuery } from "../../queries/queries";
import { useQuery } from "@apollo/client";
import { StyledTitle } from "../../components/styles/StyledTitle";

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
            <StyledTitle className="large">{data.book.title}</StyledTitle>
            <div className="description-container">
              <p className="description">{data.book.description}</p>
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
