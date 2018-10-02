import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { fetchResults } from "../actions";
import "../style/search_bar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query:
        window.location.pathname === "/"
          ? ""
          : decodeURI(window.location.href).split("=")[1]
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ query: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();

    this.props.fetchResults(this.state.query);

    if (window.location.pathname === "/") {
      //console.log(this.props.history);
      this.props.history.push(`/results?q=${this.state.query}`);
      this.setState({ query: "" });
    } else {
      this.props.history.push(`?q=${this.state.query}`);
      this.props.handleLoader();
    }
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Enter computer science terminology"
          className="form-control rounded-0 form-control-no-border"
          value={this.state.query}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button
            type="submit"
            className="btn btn-primary rounded-0 form-control-no-border"
          >
            <i className="fa fa-search" />
          </button>
        </span>
      </form>
    );
  }
}

export default connect(
  null,
  { fetchResults }
)(withRouter(SearchBar));
