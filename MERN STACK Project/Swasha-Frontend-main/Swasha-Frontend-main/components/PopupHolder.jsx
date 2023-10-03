import { useRef } from "react";

export const popupChildStyle = { zIndex: 500 };
// remember to make parent's position relative
export default function ({
  visible = false,
  hideOnFocusBG = false,
  setVisible,
  children,
  bgColor = "#00000055",
}) {
  const focused = useRef(false);
  function hide() {
    setVisible(false);
    focused.current = false;
  }
  if (!visible) return <></>;
  return (
    <>
      <div
        onMouseEnter={(e) => {
          focused.current = true;
        }}
      >
        {children}
      </div>
      <div
        style={{
          backgroundColor: bgColor,
          position: "fixed",
          left: -16,
          top: 0,
          width: "110vw",
          height: "100vh",
          zIndex: 400,
        }}
        onMouseEnter={(e) => {
          if (!hideOnFocusBG) return;
          if (focused.current) {
            hide();
          }
        }}
        onClick={(e) => hide()}
      ></div>
    </>
  );
}
