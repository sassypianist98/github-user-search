import React from "react";
import ReactDOM from "react-dom";

import Search from "./components/Search.js";

import "./app.scss";

class App extends React.Component {
  render() {
    return (
      <div className="content">
        <header className="search-header">
          <h1>
            GitHub <span>User</span> Search
          </h1>
        </header>
        <main>
          <Search />
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
