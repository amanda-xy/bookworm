import { gql } from "@apollo/client";

const getReadingLogsQuery = gql`
  {
    readingLogs {
      id
      startDate
      endDate

      entries {
        id
        date
        pageNumber
      }

      book {
        id
        title
        rating
      }
    }
  }
`;

const getReadingLogQuery = gql`
  query ($id: ID) {
    readingLog(id: $id) {
      id
      startDate
      endDate

      entries {
        id
        date
        pageNumber
      }

      book {
        id
        title
        rating
      }
    }
  }
`;

const addReadingLogMutation = gql`
  mutation ($startDate: String!, $userId: ID!, $bookId: ID!) {
    addReadingLog(startDate: $startDate, userId: $userId, bookId: $bookId) {
      id
    }
  }
`;

export { getReadingLogsQuery, getReadingLogQuery, addReadingLogMutation };
