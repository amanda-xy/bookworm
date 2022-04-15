import { gql } from "@apollo/client";

const getBooksQuery = gql`
  {
    books {
      id
      title
      description
      numberOfPages
      image
      genre
      publicationDate
      author {
        id
        firstName
        lastName
      }
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      id
      firstName
      lastName
    }
  }
`;

const addBookMutation = gql`
  mutation ($title: String!, $description: String!, $numberOfPages: Int!, $image: String!, $genre: String!, $publicationDate: String!, $authorId: ID!) {
    addBook(
      title: $title
      description: $description
      numberOfPages: $numberOfPages
      image: $image
      genre: $genre
      publicationDate: $publicationDate
      authorId: $authorId
    ) {
      title
      id
    }
  }
`;

const getBookQuery = gql`
  query ($id: ID) {
    book(id: $id) {
      id
      title
      description
      numberOfPages
      image
      genre
      publicationDate
      author {
        id
        firstName
        lastName

        books {
          id
          title
        }
      }
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };
