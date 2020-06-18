import React from "react";
import axios from "axios";

import "./ProfileInfo.scss";

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: 0,
      followers_url: "",
      following: 0,
      following: "",
      repos: 0,
      repos: "",
    };
  }

  render() {
    axios
      .get(this.props.userUrl, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
        },
      })
      .then((res) => {
        this.setState({
          followers: res.data.followers,
          followers_url: `https://github.com/${res.data.login}?tab=followers`,
          following: res.data.following,
          following_url: `https://github.com/${res.data.login}?tab=following`,
          repos: res.data.public_repos,
          repos_url: `https://github.com/${res.data.login}?tab=repositories`,
        });
      })
      .catch((error) => console.log("Error loading user details."));

    return (
      <div className="user-info">
        <div className="info-section">
          <a href={this.state.repos_url}>Repositories: {this.state.repos}</a>
        </div>
        <div className="info-section">
          <a href={this.state.followers_url}>
            Followers: {this.state.followers}
          </a>
        </div>
        <div className="info-section">
          <a href={this.state.following_url}>
            Following: {this.state.following}
          </a>
        </div>
      </div>
    );
  }
}

export default ProfileInfo;
