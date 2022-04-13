import { getAuthorsQuery, addBookMutation } from "../queries/queries";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { StyledAddBook } from "./styles/StyledAddBook";
import { StyledTitle } from "./styles/StyledTitle";
import Button from "./Button";

const AddBook = (props) => {
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);

    setBookData((prev) => {
      return { ...prev, image: base64 };
    });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [bookData, setBookData] = useState({
    title: "",
    description: "",
    numberOfPages: "",
    image: "",
    rating: "",
    genre: "",
    publicationDate: "",
    authorId: "",
  });

  const displayAuthors = () => {
    refetchAuthors();
    if (authorsLoading) {
      return <option disabled>Loading Authors</option>;
    } else {
      return authorsData.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.firstName}
          </option>
        );
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    console.log(bookData);

    addBook({
      variables: {
        title: bookData.title,
        description: bookData.description,
        numberOfPages: Number(bookData.numberOfPages),
        image: bookData.image,
        genre: bookData.genre,
        publicationDate: bookData.publicationDate,
        authorId: bookData.authorId,
      },
      // refetchQueries: [{ query: getBooksQuery }],
    });
  };

  const { data: authorsData, loading: authorsLoading, error: authorsError, refetch: refetchAuthors } = useQuery(getAuthorsQuery);
  const [addBook, { data, loading, error }] = useMutation(addBookMutation);

  if (loading) {
    return "Submitting...";
  }
  if (error) {
    return `Submission error! ${error.message}`;
  }

  return (
    <StyledAddBook>
      <StyledTitle className="large">Add Book</StyledTitle>
      <form id="add-book" onSubmit={(e) => submitForm(e)}>
        <div className="field">
          <label>Book title</label>
          <input
            type="text"
            onChange={(e) =>
              setBookData((prev) => {
                return { ...prev, title: e.target.value };
              })
            }
          />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea
            cols="35"
            rows="4"
            type="text"
            onChange={(e) =>
              setBookData((prev) => {
                return { ...prev, description: e.target.value };
              })
            }
          />
        </div>
        <div className="field">
          <label>Number of pages</label>
          <input
            type="number"
            onChange={(e) =>
              setBookData((prev) => {
                return { ...prev, numberOfPages: e.target.value };
              })
            }
          />
        </div>
        <div className="field">
          <label>Image</label>
          <input type="file" alt="none" onChange={(e) => uploadImage(e)} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={(e) =>
              setBookData((prev) => {
                return { ...prev, genre: e.target.value };
              })
            }
          />
        </div>
        <div className="field">
          <label>Publication date</label>
          <input
            type="text"
            onChange={(e) =>
              setBookData((prev) => {
                return { ...prev, publicationDate: e.target.value };
              })
            }
          />
        </div>
        <div className="field">
          <label>Author</label>
          <select
            onChange={(e) =>
              setBookData((prev) => {
                return { ...prev, authorId: e.target.value };
              })
            }
          >
            <option>Select author</option>
            {displayAuthors()}
          </select>
        </div>
        <Button text="Add Book" />
      </form>
    </StyledAddBook>
  );
};

export default AddBook;
