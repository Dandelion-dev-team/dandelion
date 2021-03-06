import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import logo from "../../images/logo.svg"
import { user_logout } from "../../utils/logins"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

export default function Header() {
  const [logged, setLogged] = useState()
  useEffect(() => {
    let logged = localStorage.getItem("logged")
    if (logged == "true") {
      setLogged(true)
    } else if (logged == "false" || logged == null) {
      setLogged(false)
    }
  }, [])

  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)
  return (
    <header>
      <div className="inner-header">
        <div className="logo">
          {logged ? (
            <Link to="/dashboard" exact>
              <img src={logo} />
            </Link>
          ) : (
            <Link to="/" exact>
              <img src={logo} />
            </Link>
          )}
        </div>
        <div className={click ? "navigation active" : "navigation"}>
          <nav>
            <Link to="/data" onClick={closeMobileMenu}>
              Data
            </Link>
            <Link to="/map" onClick={closeMobileMenu}>
              Map
            </Link>
            <a
              target="_blank"
              href="https://dandelion.scot/schools/growing-cubes/"
              onClick={closeMobileMenu}
            >
              About
            </a>
            <Link to="/help" onClick={closeMobileMenu}>
              Help
            </Link>
            {/*
            <a
              target="_blank"
              href="https://dandelion.sruc.ac.uk/reference"
              onClick={closeMobileMenu}
            >
              FAQ
            </a>
            */}
            {logged ? (
              <Link to="/" onClick={() => user_logout()}>
                Logout
              </Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {/* <Link to="/data" onClick={closeMobileMenu}>
              Report Issue
            </Link> */}
          </nav>
        </div>
        <div className="mobile-menu" onClick={handleClick}>
          {click ? (
            <CloseIcon className="menu-icon" />
          ) : (
            <MenuIcon className="menu-icon" />
          )}
        </div>
      </div>
    </header>
  )
}
