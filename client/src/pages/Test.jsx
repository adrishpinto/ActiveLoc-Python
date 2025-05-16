import React, { useState } from "react";

function NumberInput() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const raw = e.target.value.replace(/,/g, "");
    if (!isNaN(raw)) {
      const formatted = Number(raw).toLocaleString("en-US");
      setValue(formatted);
    }
  };

  return (
    <div className="w-1/2 mx-auto">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Enter number"
      />
    </div>
  );
}

export default NumberInput;
