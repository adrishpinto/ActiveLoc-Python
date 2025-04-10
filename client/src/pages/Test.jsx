import React from "react";

function App() {
  return (
    <div className="p-10">
      <div
        contentEditable={true}
        suppressContentEditableWarning
        className="border p-2 rounded min-h-[100px]"
      >
        This is editable text
        <span
          contentEditable={false}
          className="bg-gray-200 text-gray-500 px-1 mx-1 rounded"
        >
          &lt;run1&gt;
        </span>
        and this is more editable text.
      </div>
    </div>
  );
}

export default App;
