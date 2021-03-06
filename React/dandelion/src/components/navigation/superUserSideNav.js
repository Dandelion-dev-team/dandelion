import * as React from "react"
import { Link } from "gatsby"
import logo from "../../images/logo3.svg"
import { user_logout } from "../../utils/logins"

export default function SideNav() {
  if (typeof window !== `undefined`) {
    return (
      <div className="wrapper">
        <div className="sidenav">
          <nav>
            <div className="logo">
              <Link to="/dashboard" exact>
                <img src={logo} />
              </Link>
            </div>
            <Link to="/superuser/dashboard">Overview</Link>
            <Link to="/superuser/activity-maintenance">Activities</Link>
            {/* <Link to="/superuser/help">Help</Link> */}
            {/* <Link to="/superuser/alerts">Alerts</Link> */}
            <Link to="/superuser/school-user-maintenance">Students</Link>
            <Link to="/superuser/settings">Settings</Link>
            {/* <div className="news-pane">
              <h3>News</h3>
            </div> */}
            <div className="spacer"/>
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
}
