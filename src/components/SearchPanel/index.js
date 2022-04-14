import { useState } from "react";
import { StyledSearchPanel } from "./StyledSearchPanel";
import { ReactComponent as SearchIcon } from "../../images/search_icon.svg";
import { OutCloseContainer } from "../OutCloseContainer";

export default function SearchPanel(props) {
  const [searchBarActive, setSearchBarActive] = useState(false);

  return (
    <OutCloseContainer onOutsideClick={() => setSearchBarActive(false)}>
      <StyledSearchPanel
        fontSize={props.fontSize}
        fontFamily={props.fontFamily}
        className={searchBarActive ? "active" : ""}
        marginTop={props.marginTop}
        spaceBetween={props.spaceBetween}
      >
        <div className="searchbar-container">
          <label className={searchBarActive ? "hidden" : "visible"}>{props.labelText}</label>
          <input placeholder={props.searchBarPlaceholder} type="text" className={searchBarActive ? "visible" : "hidden"} />
        </div>
        <div className="search-icon-container">
          <SearchIcon width={props.iconWidth} height={props.iconHeight} onClick={() => setSearchBarActive(!searchBarActive)} className="search-icon"></SearchIcon>
        </div>
      </StyledSearchPanel>
    </OutCloseContainer>
  );
}
