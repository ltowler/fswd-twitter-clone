import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
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

  fetch('/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      user: {
        username: this.state.username,
        password: this.state.password
      }
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        this.props.history.push('/');
      } else {
        this.setState({
          error: 'Invalid username or password.'
        });
      }
    })
    .catch(() => {
      this.setState({
        error: 'Unable to log in.'
      });
    });
};

  render() {
    return (
       <div className="auth-page">
      <div className="auth-card">
        <div className="twitter-logo">Twitter</div>

        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
           <div className="form-group">
            <label>Username</label>
            <br />
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
          </div>

         <div className="form-group">
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>

          {this.state.error && <p className="error-message">{this.state.error}</p>}

          <button className="auth-button" type="submit">Log In</button>
        </form>

         <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
      </div>
    );
  }
}

export default Login;