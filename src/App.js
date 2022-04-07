// components
// import BookList from "./components/BookList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Books from "./pages/books";
import Authors from "./pages/authors";

function App() {
  return (
    <Router>
      <div className="content">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
