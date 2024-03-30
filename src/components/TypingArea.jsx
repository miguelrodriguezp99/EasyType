import { useRef } from "react";
import { useWordsStore } from "../store/useWords";
import "./styles/TypingArea.css";
import useTyping from "../hooks/useTyping";
import BlurEffect from "./BlurEffect";
import Timer from "./Timer";

const TypingArea = () => {
  const { words, isFocused } = useWordsStore();
  const inputRef = useRef(null);
  const paragraphRef = useRef(null);

  useTyping(inputRef, paragraphRef); // Asegúrate de que useTyping pueda manejar esta estructura también

  // Función para determinar la clase basada en el estado de la letra
  const getLetterClass = (state) => {
    switch (state) {
      case "correct":
        return "letter correct";
      case "incorrect":
        return "letter incorrect";
      case "active":
        return "letter active";
      case "correct active last":
        return "letter correct active is-last";
      case "incorrect active last":
        return "letter incorrect active is-last";
      default:
        return "letter";
    }
  };

  return (
    <main className="typing-area">
      <time className="timer">
        <Timer />
      </time>
      <div className="blur-wrapper">
        <div
          id="paragraph"
          className={`words-container ${!isFocused && "2blurred"}`}
          ref={paragraphRef}
        >
          {words.map((wordObject, wordIndex) => (
            <span
              id={`word-${wordIndex}`}
              key={`word-${wordIndex}`}
              className="word"
            >
              {wordObject.map(({ letter, index, state }) => (
                <span
                  key={`${wordIndex}-${index}`}
                  className={getLetterClass(state)}
                >
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </div>
        <BlurEffect />
      </div>

      <input className="typing-area-input" autoFocus ref={inputRef}></input>
    </main>
  );
};

export default TypingArea;