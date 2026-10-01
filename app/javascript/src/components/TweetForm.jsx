import React from 'react';

class TweetForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      error: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      message: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');

    fetch('/api/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        tweet: {
          message: this.state.message
        }
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.tweet) {
          this.setState({
            message: '',
            error: ''
          });

          this.props.onTweetCreated();
        } else {
          this.setState({
            error: 'Unable to post tweet.'
          });
        }
      })
      .catch(() => {
        this.setState({
          error: 'Unable to post tweet.'
        });
      });
  };
render() {
 return (
  <div className="tweet-form">
    <h2>Post a Tweet</h2>

    <form onSubmit={this.handleSubmit}>
      <textarea
        value={this.state.message}
        onChange={this.handleChange}
        placeholder="What's happening?"
        required
      />

      <br />

      <button type="submit">
        Tweet
      </button>
    </form>

    {this.state.error && (
      <p className="error-message">{this.state.error}</p>
    )}
  </div>
);
  }
}

export default TweetForm;