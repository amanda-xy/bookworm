import { StyledFilterPanel } from "./StyledFilterPanel";
import Dropdown from "../Dropdown";

const FilterPanel = () => {
  return (
    <StyledFilterPanel>
      <Dropdown
        items={[
          { title: "Genre", id: "1" },
          { title: "Test", id: "2" },
        ]}
      />
      <select name="Genre" id="genre">
        <option value="">Genre</option>
      </select>
      <select name="Author" id="author">
        <option value="">Author</option>
      </select>
      <input type="text" />
    </StyledFilterPanel>
  );
};

export default FilterPanel;
