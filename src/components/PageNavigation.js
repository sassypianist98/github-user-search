import React from "react";
import "./PageNavigation.scss";

// Used parts of code from this tutorial for the loading + pagination functionality: https://codeytek.com/live-search-search-react-live-search-in-react-axios-autocomplete-pagination/.

class PageNavigation extends React.Component {
  render() {
    return (
      <div className="nav-link-container">
        <a
          href="#"
          className={`nav-link 
            ${this.props.showPrevLink ? "show" : "hide"} `}
          onClick={this.props.handlePrevClick}
        >
          Prev
        </a>
        <a
          href="#"
          className={`nav-link 
            ${this.props.showNextLink ? "show" : "hide"}
            `}
          onClick={this.props.handleNextClick}
        >
          Next
        </a>
      </div>
    );
  }
}

export default PageNavigation;
