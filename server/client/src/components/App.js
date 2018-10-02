import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Homepage from "./homepage";
import SearchResults from "./search_results";

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <Route exact path="/results" component={SearchResults} />
            <Route exact path="/" component={Homepage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
