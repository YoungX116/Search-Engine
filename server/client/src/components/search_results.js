import React, { Component } from "react";
import JwPagination from "jw-react-pagination";
import ReactHtmlParser from "react-html-parser";
import Loader from "react-loader";
import Truncate from "react-truncate";
import { connect } from "react-redux";

import { fetchResults } from "../actions";
import Header from "./header";
import "../style/search_results.css";

const customLabels = {
  previous: "<<",
  next: ">>"
};

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultArray: [],
      pageOfItems: [],
      query: decodeURI(window.location.href).split("=")[1]
    };

    this.onChangePage = this.onChangePage.bind(this);
    this.renderList = this.renderList.bind(this);
    this.handleLoader = this.handleLoader.bind(this);
  }

  componentWillMount() {
    this.props.fetchResults(this.state.query);
  }

  handleLoader() {
    this.setState({ query: decodeURI(window.location.href).split("=")[1] });
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }

  renderList() {
    console.log(this.state.query);
    if (this.props.results.total === 0) {
      return (
        <div>
          <h3>No Results!</h3>
        </div>
      );
    }

    const hits = this.props.results.hits;
    if (hits) {
      return (
        <div>
          {this.state.pageOfItems.map(result => {
            const content = result.highlight.content[0].replace(
              /\s\s+|[^\w/<>=]|<body>|<\\body>/g,
              " "
            );

            return (
              <div className="card pl-0" key={result._id} style={{ border: 0 }}>
                <div className="card-body col-sm-7">
                  <h4 className="card-title">{result._source.filename}</h4>
                  <a href={`https://${result._source.link}`}>
                    <Truncate width={500}>
                      {`https://${result._source.link}`}
                    </Truncate>
                  </a>
                  <p className="card-text">{ReactHtmlParser(content)}</p>
                </div>
              </div>
            );
          })}
          <div />
          <div className="row">
            <div className="col-sm-4" />
            <div>
              <JwPagination
                items={hits}
                onChangePage={this.onChangePage}
                disableDefaultStyles={true}
                labels={customLabels}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Header handleLoader={this.handleLoader} />
        <Loader
          loaded={this.props.results.query === this.state.query ? true : false}
        >
          <div className="result-list">{this.renderList()}</div>
        </Loader>
      </div>
    );
  }
}

function mapStateToProps({ results }) {
  return { results };
}

export default connect(
  mapStateToProps,
  { fetchResults }
)(SearchResults);
