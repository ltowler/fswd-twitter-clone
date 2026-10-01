import React from 'react';
import Tweet from './Tweet';
import Navbar from './Navbar';

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      currentUsername: '',
      loading: true,
      error: ''
    };
  }

  componentDidMount() {
    fetch('/api/authenticated', {
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(data => {
        if (data.authenticated) {
          this.setState({
            currentUsername: data.username
          });

          this.loadTweets();
        } else {
          this.props.history.push('/login');
        }
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'Unable to verify login.'
        });
      });
  }

  loadTweets = () => {
    const username = this.props.match.params.username;

    fetch(`/api/users/${username}/tweets`, {
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          tweets: data.tweets,
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'Unable to load tweets.'
        });
      });
  };

  render() {
    const username = this.props.match.params.username;

    if (this.state.loading) {
      return <p>Loading...</p>;
    }

    return (
  <div className="app-container">
    <Navbar />

    <main className="profile-container">
      <div className="profile-header">
        <button
          className="back-button"
          onClick={() => this.props.history.push('/')}
        >
          ← Back
        </button>

        <h1>@{username}</h1>
        <p>Latest Tweets</p>
      </div>

      {this.state.error && (
        <p className="error-message">{this.state.error}</p>
      )}

      <div className="profile-tweets">
        {this.state.tweets.map(tweet => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            currentUsername={this.state.currentUsername}
            onTweetDeleted={this.loadTweets}
          />
        ))}
      </div>
    </main>
  </div>
);
  }
}

export default UserPage;