import PopupHolder, { popupChildStyle } from "./PopupHolder";

export default function ({
  visible,
  setVisible,
  hideOnFocusBG,
  padding = "1rem",
  children,
}) {
  return (
    <PopupHolder
      visible={visible}
      setVisible={setVisible}
      hideOnFocusBG={hideOnFocusBG}
    >
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          maxHeight: "80%",
          transform: "translate(-50%,-50%)",
          padding: padding,
          whiteSpace: "normal",
          ...popupChildStyle,
        }}
        className="bg-white rounded-md overflow-y-auto no-scrollbar"
      >
        {children}
      </div>
    </PopupHolder>
  );
}
