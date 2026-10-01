import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends React.Component {
  handleLogout = () => {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');

    fetch('/api/sessions', {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.props.history.push('/login');
        }
      });
  };

  render() {
    return (
   <nav className="navbar">
        <Link to="/">Home</Link>

        <button onClick={this.handleLogout}>
          Log Out
        </button>
      </nav>
    );
  }
}

export default withRouter(Navbar);