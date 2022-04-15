import { StyledFilterPanel } from "./StyledFilterPanel";
import Dropdown from "../Dropdown";
import { ReactComponent as SearchIcon } from "../../images/search_icon.svg";

const FilterPanel = () => {
  return (
    <StyledFilterPanel>
      <div className="genre-dropdown">
        <Dropdown
          items={[
            { title: "Genre", id: "1" },
            { title: "Test", id: "2" },
          ]}
        />
      </div>
      <div className="author-dropdown">
        <Dropdown
          items={[
            { title: "Author", id: "1" },
            { title: "Test", id: "2" },
          ]}
        />
      </div>
      <div className="search-input">
        <div className="searchbar-container">
          <input type="text" />
          <SearchIcon />
        </div>
      </div>
    </StyledFilterPanel>
  );
};

export default FilterPanel;
