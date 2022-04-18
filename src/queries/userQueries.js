import { gql } from "@apollo/client";

const getUsersQuery = gql`
  {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

const getUserQuery = gql`
  query ($id: ID) {
    user(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;

const getAllBooksForUser = gql`
query ($id: ID) {
  user(id: $id) {
    id
      books {
        id
        title
        image
      }
    }
  }
}
`;

const getBookshelfBooksForUser = gql`
query ($id: ID) {
  user(id: $id) {
    id
      bookshelfBooks {
        id
        title
        image
      }
    }
  }
}
`;

const getCurrentlReadingBooksForUser = gql`
query ($id: ID) {
  user(id: $id) {
    id
      currentlyReadingBooks {
        id
        title
        image
      }
    }
  }
}
`;

const getReviewedBooksForUser = gql`
query ($id: ID) {
  user(id: $id) {
    id
      reviewedBooks {
        id
        title
        image
      }
    }
  }
}
`;

const getAllBooksGroupedForUser = gql`
query ($id: ID) {
  user(id: $id) {
    id
      books {
        id
        title
        image
      }

      bookshelfBooks {
        id
        title
        image
      }

      currentlyReadingBooks {
        id
        title
        image
      }

      reviewedBooks {
        id
        title
        image
      }
    }
  }
}
`;

const getBookshelfAndCurrentlyReadingBooksForUser = gql`
query ($id: ID) {
  user(id: $id) {
    id
      bookshelf {
        id
        title
        image
      }

      currentlyReading {
        id
        title
        image
      }
    }
  }
}
`;

const addUserMutation = gql`
  mutation ($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addBook(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      id
    }
  }
`;

export {
  getUsersQuery,
  getUserQuery,
  addUserMutation,
  getAllBooksForUser,
  getBookshelfBooksForUser,
  getCurrentlReadingBooksForUser,
  getReviewedBooksForUser,
  getAllBooksGroupedForUser,
  getBookshelfAndCurrentlyReadingBooksForUser,
};
