import React from 'react';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      error: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

 handleSubmit = (event) => {
  event.preventDefault();

  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

  fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      user: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.user) {
        this.props.history.push('/login');
      } else {
        this.setState({
          error: data.errors
            ? data.errors.join(', ')
            : 'Unable to create account.'
        });
      }
    })
    .catch(() => {
      this.setState({
        error: 'Unable to create account.'
      });
    });
};

  render() {
    return (
         <div className="auth-page">
      <div className="auth-card">
        <div className="twitter-logo">Twitter</div>
        <h1>Sign Up</h1>

        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
          </div>

         <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>

         <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>

          {this.state.error &&  <p className="error-message">{this.state.error}</p>}

          <button className="auth-button" type="submit">Sign Up</button>
        </form>

    <p className="auth-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
         </div>
    );
  }
}

export default Signup;