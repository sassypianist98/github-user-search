import React from "react";
import axios from "axios";

import Loader from "../loader.gif";
import PageNavigation from "./PageNavigation";
import ProfileInfo from "./ProfileInfo";
import "./Search.scss";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
      totalResults: 0,
      totalPages: 0,
      currentPageNo: 0,
    };
    this.cancel = "";
  }

  getPageCount = (total, denominator) => {
    const divisible = 0 === total % denominator;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  };

  fetchSearchResults = (updatedPageNo = "", query) => {
    const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : "";
    const searchUrl = `https://api.github.com/search/users?q=${query}${pageNumber}`;

    if (this.cancel) {
      this.cancel.cancel();
    }

    this.cancel = axios.CancelToken.source();

    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
        },
      })
      .then((res) => {
        const total = res.data.total_count;
        const totalPagesCount = this.getPageCount(total, 20);
        const resultNotFoundMsg = !res.data.items.length
          ? "There are no more search results. Please try a new search."
          : "";
        this.setState({
          results: res.data.items,
          message: resultNotFoundMsg,
          totalResults: total,
          totalPages: totalPagesCount,
          currentPageNo: updatedPageNo,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fetch the data. Please check network.",
          });
        }
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    if (!query) {
      this.setState({
        query,
        results: {},
        message: "",
        totalPages: 0,
        totalResults: 0,
      });
    } else {
      this.setState({ query: query, loading: true, message: "" }, () => {
        this.fetchSearchResults(1, query);
      });
    }
  };

  handlePageClick = (type) => {
    event.preventDefault();
    const updatedPageNo =
      "prev" === type
        ? this.state.currentPageNo - 1
        : this.state.currentPageNo + 1;

    if (!this.state.loading) {
      this.setState({ loading: true, message: "" }, () => {
        this.fetchSearchResults(updatedPageNo, this.state.query);
      });
    }
  };

  renderSearchResults = () => {
    const { results } = this.state;
    const totalResults = this.state.totalResults;

    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          <p>Total of {totalResults} results.</p>
          {results.map((result) => {
            const userUrl = result.url;

            return (
              <div className="card">
                <a href={result.html_url}>
                  <img src={result.avatar_url}></img>
                </a>
                <div className="details">
                  <a
                    key={result.id}
                    href={result.html_url}
                    className="username"
                  >
                    {result.login}
                  </a>
                  <ProfileInfo userUrl={userUrl} />
                </div>
              </div>
            );
          })}
          <div className="clearfloat"></div>
        </div>
      );
    }
  };

  render() {
    const { query, loading, message, currentPageNo, totalPages } = this.state;

    const showPrevLink = 1 < currentPageNo;
    const showNextLink = totalPages > currentPageNo;

    return (
      <div className="section">
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            name="query"
            value={query}
            name="query"
            id="search-input"
            placeholder="Search username..."
            onChange={this.handleOnInputChange}
          ></input>
        </label>

        {/* {message && <p className="message">{message}</p>} */}

        <img
          src={Loader}
          className={`search-loading ${loading ? "show" : "hide"}`}
          alt="loader"
        ></img>

        <PageNavigation
          loading={loading}
          showPrevLink={showPrevLink}
          showNextLink={showNextLink}
          handlePrevClick={() => this.handlePageClick("prev", event)}
          handleNextClick={() => this.handlePageClick("next", event)}
        />

        {this.renderSearchResults()}

        <PageNavigation
          loading={loading}
          showPrevLink={showPrevLink}
          showNextLink={showNextLink}
          handlePrevClick={() => this.handlePageClick("prev", event)}
          handleNextClick={() => this.handlePageClick("next", event)}
        />
      </div>
    );
  }
}

export default Search;
