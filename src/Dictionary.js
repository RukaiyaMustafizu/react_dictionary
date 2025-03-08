import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";

export default function Dictionary() {
  let [keyword, setKeyword] = useState("");

  // Function to call API and get word definition
  function search(event) {
    event.preventDefault();
    alert(`Searching for ${keyword}`);

    const api_key = "tf315a00255a026o44c386706557b731";
    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${api_key}`;

    axios.get(apiUrl).then(handleResponse);
  }

  // Function to handle changes in the input field
  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  // Function to handle the API response
  function handleResponse(response) {
    console.log(response.data);
    // You can now process the response and display the results in your app
  }

  return (
    <div className="Dictionary">
      <h1>Dictionary</h1>
      <form onSubmit={search}>
        <h2>What word do you want to look up?</h2>
        <input
          type="search"
          value={keyword}
          autoFocus={true}
          onChange={handleKeywordChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
