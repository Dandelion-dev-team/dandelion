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
            <Link to="/superuser/dashboard">Overview</Link>
            <Link to="/superuser/activity-maintenance">Activities</Link>
            {/* <Link to="/superuser/help">Help</Link> */}
            {/* <Link to="/superuser/alerts">Alerts</Link> */}
            <Link to="/superuser/school-user-maintenance">Students</Link>
            <Link to="/superuser/settings">Settings</Link>
            <Link to="/superuser/variable">Variables</Link>
            {/* <div className="news-pane">
              <h3>News</h3>
            </div> */}
          </nav>
        </div>
      </div>
    )
  }
}
