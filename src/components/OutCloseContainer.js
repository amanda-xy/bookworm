import { useEffect, useRef } from "react";

export const OutCloseContainer = (props) => {
  const component = useRef(null);
  const { onOutsideClick } = props;

  useEffect(() => {
    if (!component) return;

    const handleOutsideClick = (e) => {
      if (component.current && !component.current.contains(e.target)) {
        console.log(component.current);

        if (onOutsideClick) {
          onOutsideClick(e);
        }
      }
    };
    window.addEventListener("click", handleOutsideClick);

    return () => window.removeEventListener("click", handleOutsideClick);
  }, [onOutsideClick]);

  return (
    <div ref={component} style={props.style} className={props.className}>
      {props.children}
    </div>
  );
};
