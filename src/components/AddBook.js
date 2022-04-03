// import { Component } from "react";
// import { graphql } from "react-apollo";
// import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";
// import { flowRight as compose } from "lodash";

// class AddBook extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "",
//       description: "",
//       numberOfPages: "",
//       image: "",
//       rating: "",
//       genre: "",
//       publicationDate: "",
//       authorId: "",
//     };
//   }
//   displayAuthors() {
//     let data = this.props.getAuthorsQuery;
//     if (data.loading) {
//       return <option disabled>Loading Authors</option>;
//     } else {
//       return data.authors.map((author) => {
//         return (
//           <option key={author.id} value={author.id}>
//             {author.firstName}
//           </option>
//         );
//       });
//     }
//   }
//   submitForm(e) {
//     e.preventDefault();
//     this.props.addBookMutation({
//       variables: {
//         title: this.state.title,
//         description: this.state.description,
//         numberOfPages: this.state.numberOfPages,
//         image: this.state.image,
//         rating: this.state.rating,
//         genre: this.state.genre,
//         publicationDate: this.state.publicationDate,
//         authorId: this.state.authorId,
//       },
//       refetchQueries: [{ query: getBooksQuery }],
//     });
//   }
//   render() {
//     return (
//       <form id="add-book" onSubmit={this.submitForm.bind(this)}>
//         <div className="field">
//           <label>Book title:</label>
//           <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
//         </div>
//         <div className="field">
//           <label>Description:</label>
//           <input type="text" onChange={(e) => this.setState({ description: e.target.value })} />
//         </div>
//         <div className="field">
//           <label>Number of pages:</label>
//           <input type="number" onChange={(e) => this.setState({ numberOfPages: e.target.value })} />
//         </div>
//         <div className="field">
//           <label>Image:</label>
//           <input type="image" alt="none" onChange={(e) => this.setState({ image: e.target.value })} />
//         </div>
//         <div className="field">
//           <label>Genre:</label>
//           <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
//         </div>
//         <div className="field">
//           <label>Publication date:</label>
//           <input type="text" onChange={(e) => this.setState({ publicationDate: e.target.value })} />
//         </div>
//         <div className="field">
//           <label>Author:</label>
//           <select onChange={(e) => this.setState({ authorId: e.target.value })}>
//             <option>Select author</option>
//             {this.displayAuthors()}
//           </select>
//         </div>
//         <button>+</button>
//       </form>
//     );
//   }
// }

// export default compose(graphql(getAuthorsQuery, { name: "getAuthorsQuery" }), graphql(addBookMutation, { name: "addBookMutation" }))(AddBook);
