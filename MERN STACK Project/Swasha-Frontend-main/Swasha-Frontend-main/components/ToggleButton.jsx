export default function ToggleButton({ state, setState, className, ...other }) {
  return (
    <span
      className={`toggle-button ${className}`}
      data-chk={state}
      onClick={(e) => {
        if (state === "active") {
          setState("disabled");
        } else {
          setState("active");
        }
      }}
      {...other}
    >
      <span></span>
    </span>
  );
}
