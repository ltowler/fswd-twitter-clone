import React from 'react';
import { Link } from 'react-router-dom';

class Tweet extends React.Component {
  handleDelete = () => {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');

    fetch(`/api/tweets/${this.props.tweet.id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.props.onTweetDeleted();
        }
      });
  };

  render() {
    const { tweet, currentUsername } = this.props;

    return (
       <div className="tweet-card">
        <h3>
          <Link to={`/${tweet.username}`}>
            @{tweet.username}
          </Link>
        </h3>

        <p>{tweet.message}</p>

        {tweet.image && (
          <img
            src={tweet.image}
            alt="Tweet"
            style={{ maxWidth: '300px' }}
          />
        )}

        {tweet.username === currentUsername && (
          <button onClick={this.handleDelete}>
            Delete
          </button>
        )}

       
      </div>
    );
  }
}

export default Tweet;