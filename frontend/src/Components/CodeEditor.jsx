import React, { useRef, forwardRef, useImperativeHandle } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = forwardRef(({ language = "javascript", defaultCode = "" }, ref) => {
  const editorRef = useRef(null);


  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  useImperativeHandle(ref, () => ({
    getValue: () => editorRef.current?.getValue(),
    setValue: (value) => editorRef.current?.setValue(value),
  }));

  return (
    <Editor
      height="100%"
      language={language}
      // defaultLanguage="javascript"
      defaultValue={defaultCode}
      onMount={handleEditorDidMount}
      theme="vs-dark"
      options={{
        padding: {
          top: 20,
          bottom: 16
        }
      }}
    />
  );
});

export default CodeEditor;
