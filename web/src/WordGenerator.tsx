// WordGenerator.tsx
import React, { useState } from "react";
import { fetchWord } from "./service/wordService";

const WordGenerator: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const [length, setLength] = useState<number>(7);
  const [error, setError] = useState<string>("");

  const handleGenerateWord = async () => {
    try {
      const generatedWord = await fetchWord(length); // fetchWord is a function that fetches a random word from the API
      setWord(generatedWord);
      setError("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Random Word Generator</h1>
      <label>
        Word Length:
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          min="5"
          max="10"
        />
      </label>
      <button onClick={handleGenerateWord}>Generate Word</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {word && <p>Generated Word: {word}</p>}
    </div>
  );
};

export default WordGenerator;
