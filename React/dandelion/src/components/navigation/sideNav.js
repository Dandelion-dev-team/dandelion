import * as React from "react"
import { Link } from "gatsby"
import {isSuperuser, isSysadmin} from "../../utils/validation"

export default function SideNav() {
  if (typeof window !== `undefined`) {
    if (isSysadmin()) {
      return (
        <div className="wrapper">
          <div className="sidenav">
            <nav>
              <Link to="/sysadmin/auth-maintenance">Authority</Link>
              <Link to="/sysadmin/node-maintenance">Node</Link>
              <Link to="/sysadmin/quantity-maintenance">Quantity</Link>
              <Link to="/sysadmin/school-maintenance">School</Link>
              <Link to="/sysadmin/sensor-maintenance">Sensor</Link>
              <Link to="/sysadmin/superuser-maintenance">Superuser</Link>
              <Link to="/sysadmin/tag-maintenance">Tag</Link>
              <Link to="/sysadmin/issue-maintenance">Issues</Link>
            </nav>
          </div>
        </div>
      )
    }
    else if (isSuperuser()) {
      return (
        <div className="wrapper">
          <div className="sidenav">
            <nav>
              <Link to="/superuser/dashboard">Overview</Link>
              <Link to="/superuser/activity-maintenance">Activities</Link>
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
  return (<div></div>)
}
