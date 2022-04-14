import { StyledFilterPanel } from "./StyledFilterPanel";

const FilterPanel = () => {
  return (
    <StyledFilterPanel>
      <select name="Genre" id="genre">
        <option value="">Genre</option>
      </select>
      <select name="Author" id="author">
        <option value="">Author</option>
      </select>
    </StyledFilterPanel>
  );
};

export default FilterPanel;
