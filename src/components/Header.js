import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Header = ({showToolbar, startLogout}) => {

  const onShowToolbar = () => {
    showToolbar(true);
  }

  return(
    <header className="header">
        <div className="header__content">
          <button className="button--show--toolbar" onClick={onShowToolbar}><FontAwesomeIcon icon="bars"/></button>
          <Link className="header__title" to="/dashboard">
            <h1>Your Training Log</h1>
          </Link>
          <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </header>
  );
  };

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
