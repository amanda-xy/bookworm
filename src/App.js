// components
// import BookList from "./components/BookList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import BookDetails from "./pages/Books/bookDetails";
import MyBookshelf from "./pages/MyBookshelf";
import CurrentlyReading from "./pages/CurrentlyReading";

function App() {
  return (
    <Router>
      <div className="content">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/my-bookshelf" element={<MyBookshelf />} />
          <Route path="/books/currently-reading" element={<CurrentlyReading />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/authors" element={<Authors />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
