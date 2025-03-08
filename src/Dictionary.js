import React, { useState, useEffect } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("hello");
  const [results, setResults] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");

  const pexelsApiKey =
    "KfRMWXGcsO7GqfNSlBgPpGszyMuNf9wxHyMgcmhHJsCuUZ55AjI7wltb";

  useEffect(() => {
    search();
  }, [search]);

  function search(event) {
    if (event) {
      event.preventDefault();
    }

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(apiUrl).then(handleResponse).catch(handleError);
    fetchImage(keyword);
  }

  function fetchImage(word) {
    const imageApiUrl = `https://api.pexels.com/v1/search?query=${word}&per_page=9`; // 9 images per query
    axios
      .get(imageApiUrl, { headers: { Authorization: pexelsApiKey } })
      .then((response) => {
        const images = response.data.photos.map((photo) => ({
          url: photo.src.medium,
          link: photo.url,
        }));
        setImageUrls(images);
      })
      .catch(() => {
        setImageUrls([]);
      });
  }

  function handleResponse(response) {
    if (response.data && response.data[0]) {
      const wordData = response.data[0];
      setResults({
        word: wordData.word,
        phonetic: wordData.phonetic || "No phonetic available",
        meanings: wordData.meanings.map((meaning) => ({
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions.slice(0, 2),
        })),
      });

      // Extract pronunciation audio if available
      const audio = wordData.phonetics.find((phonetic) => phonetic.audio);
      setAudioUrl(audio ? audio.audio : "");
    } else {
      setResults(null);
    }
  }

  function handleError() {
    setResults(null);
  }

  function clearSearch() {
    setKeyword("");
  }

  return (
    <div className="Dictionary">
      <h1>Dictionary</h1>

      <form onSubmit={search}>
        <h2>What word do you want to look up?</h2>
        <div className="search-container">
          <input
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            autoFocus={true}
          />
        </div>
      </form>

      {audioUrl && (
        <div className="audio-container">
          <h3>Listen to the Pronunciation:</h3>
          <audio controls key={audioUrl}>
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {results && <Results results={results} />}

      {imageUrls.length > 0 && (
        <div className="image-grid">
          <h3>Images related to "{keyword}":</h3>
          <div className="image-container">
            {imageUrls.map((image, index) => (
              <a
                href={image.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <img src={image.url} alt={`Image for ${keyword}`} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
