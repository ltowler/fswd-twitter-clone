import React from 'react';
import TweetForm from './TweetForm';
import Tweet from './Tweet';
import Navbar from './Navbar';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      username: '',
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
            username: data.username
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
    fetch('/api/tweets', {
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
    if (this.state.loading) {
      return <p>Loading...</p>;
    }

    return (
  <div className="app-container">
    <Navbar />

    <main className="feed-container">
      <h1>Tweet Feed</h1>

      <p className="logged-in">
        Logged in as @{this.state.username}
      </p>

      <TweetForm onTweetCreated={this.loadTweets} />

      {this.state.error && (
        <p className="error-message">{this.state.error}</p>
      )}

      <div className="tweet-list">
        {this.state.tweets.map(tweet => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            currentUsername={this.state.username}
            onTweetDeleted={this.loadTweets}
          />
        ))}
      </div>
    </main>
  </div>
);
  }
}



export default Feed;