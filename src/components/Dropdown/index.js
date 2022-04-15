import { useState } from "react";
import { StyledDropdown, StyledDropdownMenu, StyledDropdownItem } from "./StyledDropdown";
import { ReactComponent as Arrow } from "../../images/arrow_icon.svg";
import { OutCloseContainer } from "../OutCloseContainer";
import classNames from "classnames";

const Dropdown = ({ items }) => {
  const [hidden, setHidden] = useState(true);
  //TODO : null check needed
  var item = items[0];

  return (
    <StyledDropdown className={hidden ? "closed" : "open"}>
      <OutCloseContainer onOutsideClick={() => setHidden(true)} style={null} className="">
        {items.length > 1 ? (
          <div className="inner">
            <button onClick={() => setHidden(!hidden)}>
              <span>{item.title}</span>
              <div className="arrow-container">
                <Arrow width={27} height={27} className={hidden ? "down" : "up"} />
              </div>
            </button>
            <StyledDropdownMenu className={classNames(hidden ? "hidden" : "visible")}>
              {items && items.map((item) => <StyledDropdownItem key={item.id}>{item.title}</StyledDropdownItem>)}
            </StyledDropdownMenu>
          </div>
        ) : (
          <div className="organization-name">
            <span>{item.title}</span>
          </div>
        )}
      </OutCloseContainer>
    </StyledDropdown>
  );
};

export default Dropdown;
