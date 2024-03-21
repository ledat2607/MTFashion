import React, { useState } from "react";
import SimpleMDEEditor from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import ReactMarkdown from "react-markdown";

const MyMarkdownEditor = ({ onChange }) => {
  const [markdown, setMarkdown] = useState("");

  // Hàm xử lý sự kiện thay đổi giá trị Markdown
  const handleChange = (value) => {
    setMarkdown(value);
    // Gọi hàm onChange và truyền giá trị Markdown lên component cha
    onChange(value);
  };

  return (
    <div className="w-full flex">
      <div className="markdown-editor w-[50%] h-[45vh] overflow-hidden overflow-y-scroll">
        <SimpleMDEEditor value={markdown} onChange={handleChange} />
      </div>
      <div className="markdown-preview ml-4 w-[45%] h-[45vh] overflow-hidden overflow-y-scroll">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MyMarkdownEditor;
