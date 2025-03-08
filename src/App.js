import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Dictionary from "./Dictionary";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header"></header>
        <main>
          <Dictionary />
        </main>
        <footer className="text-center">
          Coded by Rukaiya Mustafizu Muhammad hosted on{" "}
          <a href="https://shimmering-griffin-b9dbeb.netlify.app">Netlify</a>
          and open source on
          <a href="https://github.com/RukaiyaMustafizu/react_dictionary">
            Github
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
