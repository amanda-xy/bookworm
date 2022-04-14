import { StyledBookDetails } from "./StyledBookDetails";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();

  return <StyledBookDetails>{id}</StyledBookDetails>;
};

export default BookDetails;
