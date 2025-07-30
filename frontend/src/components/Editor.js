// frontend/src/components/Editor.js
import React, { useEffect, useState } from "react";
import socket from "../socket/socketClient";

function Editor() {
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.on("load-document", (data) => setContent(data));
    socket.on("receive-changes", (data) => setContent(data));

    return () => {
      socket.off("load-document");
      socket.off("receive-changes");
    };
  }, []);

  const handleChange = (e) => {
    const newVal = e.target.value;
    setContent(newVal);
    socket.emit("send-changes", newVal);
  };

  const saveDoc = () => {
    socket.emit("save-document");
    alert("Document saved (in memory only)");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Real-Time Editor</h2>
      <textarea
        value={content}
        onChange={handleChange}
        rows="15"
        cols="100"
        placeholder="Start typing..."
      />
      <br />
      <button onClick={saveDoc}>Save</button>
    </div>
  );
}

export default Editor;
