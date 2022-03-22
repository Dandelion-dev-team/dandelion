import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import logo from '../../images/logo.svg';
import { user_logout } from "../../utils/logins";
//const parse = require('../../auth');

export default function Header() {
  const [logged, setLogged] = useState();
  useEffect(() => {
    let logged = localStorage.getItem("logged");
    if (logged == "true") 
    {
      setLogged(true);
    } 
    else if (logged == "false" || logged == null) 
    {
      setLogged(false);
    }
  }, []);
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
              {logged ? <Link to="/" onClick={() => user_logout()}>Logout</Link> : <Link to="/signin">Sign In</Link>}
            </nav>
          </div>
        </div>
      </div>

    </header>
  )
}