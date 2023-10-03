import { useRef } from "react";
import PopupHolder, { popupChildStyle } from "./PopupHolder";

// remember to make parent's position relative
export default function ({
  items,
  visible,
  setVisible,
  onSelect,
  hideOnFocusBG = true,
  bgColor,
  style = {},
}) {
  return (
    <PopupHolder
      visible={visible}
      setVisible={setVisible}
      hideOnFocusBG={hideOnFocusBG}
      bgColor={bgColor}
    >
      <div
        className="no-scrollbar divide-y divide-x-0 divide-solid divide-[#00000033]"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          minWidth: "100%",
          maxHeight: "15rem",
          transform: "translate(-50%,0)",
          position: "absolute",
          left: "50%",
          top: "100%",
          filter: "blur(0px)",
          overflowX: "hidden",
          overflowY: "scroll",
          whiteSpace: "nowrap",
          ...style,
          ...popupChildStyle,
        }}
      >
        {items.map((x, i) => {
          return (
            <button
              className="w-full block text-start px-4 py-2 text-[0.9rem]"
              key={x}
              onClick={(e) => {
                onSelect(i);
              }}
            >
              {x}
            </button>
          );
        })}
      </div>
    </PopupHolder>
  );
}
