import React from "react";
import "./Dictionary.css";

export default function Results(props) {
  if (!props.results) {
    return (
      <div className="Results">
        <h2>No results to display</h2>
      </div>
    );
  }

  return (
    <div className="Results">
      <h2>Word: {props.results.word}</h2>
      <p>
        <strong>Phonetic:</strong> {props.results.phonetic}
      </p>

      {props.results.meanings.map((meaning, index) => (
        <div key={index} className="Meaning">
          <h3>({meaning.partOfSpeech})</h3>

          {meaning.definitions.length > 0 ? (
            meaning.definitions.map((definition, defIndex) => (
              <div key={defIndex} className="Definition">
                <p>
                  <strong>Definition:</strong> {definition.definition}
                </p>
                {definition.example && (
                  <p>
                    <strong>Example:</strong> {definition.example}
                  </p>
                )}
                {definition.synonyms && definition.synonyms.length > 0 && (
                  <p>
                    <strong>Synonyms:</strong> {definition.synonyms.join(", ")}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p>No definitions available.</p>
          )}
        </div>
      ))}
    </div>
  );
}
