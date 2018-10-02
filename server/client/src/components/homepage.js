import React, { Component } from "react";

import SearchBar from "./search_bar";
import "../style/homepage.css";

class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <div className="logo text-center text-danger mb-5">
          <h1>Esearch</h1>
        </div>
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <SearchBar />
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
