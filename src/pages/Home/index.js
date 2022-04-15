import { StyledHome } from "./StyledHome";
import { StyledTitle } from "../../components/styles/StyledTitle";
import ProgressBar from "../../components/ProgressBar";
import Button from "../../components/Button/index";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <StyledHome>
      <div className="reading-data-container">
        <div className="reading-progress-container">
          <StyledTitle className="large">How's your reading going?</StyledTitle>
          <div className="book-progress-container">
            <div className="book-progress">
              <img src={require("../../images/dearEdward.jpg")} alt="" />
              <div className="progress-bar-container">
                <ProgressBar completed={60} />
              </div>
            </div>
            <div className="book-progress">
              <img src={require("../../images/tattooist.jpg")} alt="" />
              <div className="progress-bar-container">
                <ProgressBar completed={30} />
              </div>
            </div>
          </div>
        </div>
        <div className="reading-summary-container">
          <div className="achievements">
            <p>
              <span className="achievement-text">Pages read this week:</span>
              <span className="achievement-result">278</span>
            </p>
            <p>
              <span className="achievement-text">Books read this month:</span>
              <span className="achievement-result">5</span>
            </p>
            <p>
              <span className="achievement-text">Favorite genre this month:</span>
              <span className="achievement-result">Fantasy</span>
            </p>
          </div>
          <div className="update-button-container">
            <Link to="/books/currently-reading">
              <Button text="Update your progress" />
            </Link>
          </div>
        </div>
      </div>
      <div className="recommended-for-you-container">
        <StyledTitle className="large">Recommended for you</StyledTitle>
        <div className="recommended-books-container">
          <img src={require("../../images/theDoorsOfEden.jpg")} alt="" />
          <img src={require("../../images/queenOfNothing.jpg")} alt="" />
          <img src={require("../../images/songOfAchilles.jpg")} alt="" />
          <img src={require("../../images/sunSister.jpg")} alt="" />
        </div>
      </div>
    </StyledHome>
  );
};

export default Home;
