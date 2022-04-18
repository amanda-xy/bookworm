import { gql } from "@apollo/client";

const getReviewsQuery = gql`
  {
    reviews {
      id
      title
      text
      rating
      publicationDate

      user {
        id
        firstName
        lastName
      }

      book {
        id
        title
        rating
      }
    }
  }
`;

const getReviewQuery = gql`
  query ($id: ID) {
    review(id: $id) {
      id
      title
      text
      rating
      publicationDate

      user {
        id
        firstName
        lastName
      }

      book {
        id
        title
        rating
      }
    }
  }
`;

const addReviewMutation = gql`
  mutation ($title: String!, $text: String!, $rating: Int!, $publicationDate: String!, $userId: ID!, $bookId: ID!) {
    addBook(title: $title, text: $text, rating: $rating, publicationDate: $publicationDate, userId: $userId, bookId: $bookId) {
      id
    }
  }
`;

export { getReviewsQuery, getReviewQuery, addReviewMutation };
