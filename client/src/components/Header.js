import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

  componentDidMount() {

  }

  renderContent() {
    switch(this.props.auth) {
      case null:
        return;
        
      case false:
        return <li className="right"><a href="/auth/google">Login with Google</a></li>

      default:
        return [
          <li key="3" className="right"><a href="/api/logout">Logout</a></li>,
          <li key="2" className="right" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
          <li key="1" className="right"><Payments /></li>
        ];
    }
  }

  render() {

    return(
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? '/surveys' :'/'} className="left brand-logo">Emaily</Link>
          <ul>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({auth}) {
  return { auth };
}


export default connect(mapStateToProps)(Header);
