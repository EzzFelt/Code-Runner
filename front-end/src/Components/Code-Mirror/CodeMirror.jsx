import React, { useContext, useEffect, useRef, useState } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";
import "./codemirror-custom.css"; 
import "../../utils/codeMirrorSetup";
import styles from './styles.module.css';
import { UserContext } from "../../Contexts/UserContext";

const MyCodeMirror = () => {
  const { user, setUser } = useContext(UserContext);
  const editorRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [code, setCode] = useState("");
  const [consoleOutput, setConsoleOutput] = useState([]);

  useEffect(() => {
    console.log("Inicializando CodeMirror...");
    if (!editorRef.current) {
      editorRef.current = CodeMirror.fromTextArea(
        document.getElementById("Editor"),
        {
          mode: "javascript",
          theme: "material-darker",
          lineNumbers: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          tabSize: 2,
        }
      );

      editorRef.current.on("change", (editor) => {
        setCode(editor.getValue());
      });
    }
  }, []);

  const changeLanguage = (language) => {
    if (editorRef.current) {
      const mode = language === "python" ? "python" : "javascript";
      editorRef.current.setOption("mode", mode);
      setSelectedLanguage(language === "python" ? "Python" : "JavaScript");
    }
  };

  const handleRun = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      setConsoleOutput((prevOutput) => [...prevOutput, "Token não encontrado"]);
      return;
    }
  
    try {
      const response = await fetch("/api/auth/validateCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code, testCase: 1 }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setConsoleOutput((prevOutput) => [...prevOutput, "Parabéns, seu código passou!"]);
  
        // Update user state with incremented lessonsCompleted
        const updatedUser = {
          ...user,
          lessonsCompleted: (user?.lessonsCompleted || 0) + 1
        };
        
        // Update both localStorage and context
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        setConsoleOutput((prevOutput) => [...prevOutput, data.message || "Há algo a melhorar..."]);
      }
    } catch (error) {
      setConsoleOutput((prevOutput) => [...prevOutput, "Erro ao enviar código para validação"]);
    }
  };

  const handleClean = () => {
    setConsoleOutput([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.languageButtons}>
        <button 
          onClick={() => changeLanguage("javascript")} 
          className={selectedLanguage === "JavaScript" ? styles.selected : ""}
        >
          JavaScript
        </button>
        <button 
          onClick={() => changeLanguage("python")} 
          className={selectedLanguage === "Python" ? styles.selected : ""}
        >
          Python
        </button>
      </div>
      <p className={styles.selectedLanguage}>Linguagem: {selectedLanguage}</p>
      <textarea id="Editor" style={{ display: "none" }} />
      <div className={styles.containerOutput}>
        <div className={styles.buttonContainer}>
          <button onClick={handleRun}>Run</button>
          <button onClick={handleClean}>Clean</button>
        </div>
        <div id="console" className={styles.console}>
          {consoleOutput.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCodeMirror;