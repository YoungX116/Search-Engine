import React, { Component } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./search_bar";

class Header extends Component {
  render() {
    //console.log("header loader:", this.props.handleLoader);
    return (
      <nav className="navbar bg-light">
        <Link to="/" className="navbar-brand text-danger mr-0">
          Esearch
        </Link>

        <ul className="navbar-nav col-sm-6 mr-auto">
          <li className="nav-item">
            <SearchBar handleLoader={this.props.handleLoader} />
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
