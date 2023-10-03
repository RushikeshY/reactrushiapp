import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

export default function ImageLabelInput({
  imgsrc,
  label,
  value,
  setValue,
  error,
  setError,
  type = "text",
  stringValidator,
  onChange,
  style = { padding: "0.5rem 0", width: "100%" },
  topRightChild,
  children,
  ...other
}) {
  return (
    <div style={{ ...style }}>
      <div
        className="ml-2"
        style={{
          marginBottom: "0.5rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {imgsrc && (
          <img
            src={imgsrc}
            style={{
              width: "1.15rem",
              marginRight: "0.5rem",
            }}
          ></img>
        )}
        <label className="font-bold text-sm font-segoe-ui text-gray-2000">
          {label}
        </label>
        {topRightChild}
      </div>
      {children || (
        <Input
          type={type}
          value={value}
          onChange={(e) => {
            if (stringValidator)
              setError(stringValidator.error(e.target.value));
            setValue(e.target.value);
            if (onChange) onChange(e);
          }}
          {...other}
        />
      )}
      {error && (
        <div
          className=""
          style={{
            color: "#d35b5b",
            textAlign: "right",
            fontSize: "0.75rem",
            paddingTop: "0.1rem",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

function Input({ className = "", ...other }) {
  return <input className={`input-1 text-sm ${className}`} {...other} />;
}

export function SuggestionInput({
  items,
  strict = true,
  value,
  setValue,
  className = "",
  onFocus = () => {},
  onChange = () => {},
  onSelect = () => {},
  style = {},
  readOnly,
  allowEdit = true,
  prefix = "",
  ...other
}) {
  const [visible, setVisible] = useState(false);
  const [filtered, setFiltered] = useState(items);
  const pregex = new RegExp(`/^${prefix}/`);
  function updateFilter(q) {
    setFiltered(items.filter((x) => x.toLowerCase().includes(q.toLowerCase())));
  }
  useEffect(() => {
    updateFilter(value);
  }, [items]);

  useEffect(() => {
    if (!visible && strict && !items.includes(value)) {
      setValue("");
    }
  }, [visible]);

  return (
    <div className={`relative ${className}`}>
      <Input
        onFocus={(e) => {
          if (readOnly) return;
          updateFilter("");
          if (allowEdit) e.target.setSelectionRange(0, e.target.value.length);
          setVisible(true);
          onFocus();
        }}
        value={prefix + value}
        onChange={(e) => {
          updateFilter(e.target.value.replace(pregex, ""));
          setValue(e.target.value.replace(pregex, ""));
        }}
        style={{
          position: "relative",
          zIndex: visible ? "1000" : "auto",
          ...style,
        }}
        readOnly={readOnly || !allowEdit}
        {...other}
      />
      <Dropdown
        items={filtered}
        visible={visible}
        setVisible={setVisible}
        hideOnFocusBG={false}
        onSelect={(v) => {
          setValue(filtered[v]);
          setVisible(false);
          onSelect(v, filtered[v]);
        }}
        style={{
          top: "calc(100% + 0.25rem)",
          boxShadow: filtered?.length ? "0 1px 5px 1px #00000055" : "",
          padding: "0 0.5rem",
        }}
        bgColor="#00000000"
      />
    </div>
  );
}
