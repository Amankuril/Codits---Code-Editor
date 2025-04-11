import React, { useRef, forwardRef, useImperativeHandle } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = forwardRef(({ language = "java", defaultCode = "" }, ref) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  useImperativeHandle(ref, () => ({
    getValue: () => editorRef.current?.getValue(),
  }));

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      defaultValue={defaultCode}
      onMount={handleEditorDidMount}
      theme="vs-dark"
    />
  );
});

export default CodeEditor;
