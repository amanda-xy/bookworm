import { gql } from "@apollo/client";

const getAuthorsQuery = gql`
  {
    authors {
      id
      firstName
      lastName
      biography
      birthDate
      averageRating
      image

      books {
        id
        title
        rating
        genre
      }
    }
  }
`;

const addAuthorMutation = gql`
  mutation ($firstName: String!, $lastName: String!, $image: String!, $birthDate: String!, $biography: String!) {
    addAuthor(firstName: $firstName, lastName: $lastName, biography: $biography, image: $image, birthDate: $birthDate) {
      id
    }
  }
`;

export { getAuthorsQuery, addAuthorMutation };
