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
        return <li className="right"><a href="/auth/google" className="btn light-blue lighten-1">Login with Google</a></li>

      default:
        return [
          <li key="3" className="right black-text"><a href="/api/logout" className="black-text">Logout</a></li>,
          <li key="2" className="right" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
          <li key="1" className="right"><Payments /></li>
        ];
    }
  }

  render() {

    return(
      <nav style={{height: '80px'}}>
        <div className="nav-wrapper grey lighten-5 z-depth-0 black-text text-darken">
          <Link to={this.props.auth ? '/surveys' :'/'} className="left brand-logo"><img src="https://s3.eu-west-2.amazonaws.com/bedroom-bands/bedroom-bands.png" style={{height: '85px', width: '300px'}} /></Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
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
