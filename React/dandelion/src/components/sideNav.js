import * as React from "react"
import { Link, navigate } from "gatsby"
import logo from "../images/logo3.svg"
import { user_logout } from "../utils/logout"

export default function SideNav() {
  return (
    <div className="wrapper">
      <div className="sidenav">
        <nav>
          <div className="logo">
            <Link to="/maintenance/superuser/superuser-dashboard" exact>
              <img src={logo} />
            </Link>
          </div>
          <Link to="/maintenance/superuser/superuser-dashboard">Dashboard</Link>
          <Link to="/maintenance/superuser/project-maintenance">Projects</Link>
          <Link to="/maintenance/superuser/superuser-help">Help</Link>
          <Link to="/maintenance/superuser/superuser-alerts">Alerts</Link>
          <Link to="/maintenance/superuser/school-user-maintenance">Students</Link>
          <Link to="/maintenance/superuser/superuser-templates">Templates</Link>
          <Link to="/maintenance/superuser/superuser-settings">Settings</Link>
          <div className="news-pane">
            <h3>News</h3>
          </div>
          <div className="btn-row">
              <button
                className="button"
                onClick={() => {
                  user_logout();
                }}
              >
               Log Out
              </button>
            </div>
        </nav>
      </div>
    </div>
  )
}
