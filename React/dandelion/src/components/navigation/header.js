import * as React from "react"
import { Link } from "gatsby"
import logo from '../../images/logo.svg';
import { user_logout } from "../../utils/logout";
//const parse = require('../../auth');

export default function Header() {
  //const [logged] = parse.useAuth();
  //Tested
  return (
    <header>
      <div className="container">
        <div className="inner-header">
          <div className="logo">
            <Link to='/' exact>
              <img src={logo} />
            </Link>
          </div>
          <div className="navigation">
            <nav>
              <Link to="/data">Data</Link>
              <Link to="/map">Map</Link>
              <Link to="/about">About</Link>
              {true ? <Link to="/signin" onClick={() => user_logout()}>Logout</Link> : <Link to="/signin">Sign In</Link> }
            </nav>
          </div>
        </div>
      </div>

    </header>
  )
}