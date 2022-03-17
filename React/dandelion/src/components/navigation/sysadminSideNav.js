import * as React from "react"
import { Link, navigate } from "gatsby"
import logo from "../../images/logo3.svg"
import { user_logout } from "../../utils/logins";

export default function SysSideNav() {
  return (
    <div className="wrapper">
      <div className="sidenav">
        <nav>
          <div className="logo">
            <Link to="/sysadmin/auth-maintenance" exact>
              <img src={logo} />
            </Link>
          </div>
          <Link to="/sysadmin/auth-maintenance">Authority</Link>
          <Link to="/sysadmin/node-maintenance">Node</Link>
          <Link to="/sysadmin/quantity-maintenance">Quantity</Link>
          <Link to="/sysadmin/school-maintenance">School</Link>
          <Link to="/sysadmin/sensor-maintenance">Sensor</Link>
          <Link to="/sysadmin/superuser-maintenance">Superuser</Link>
          <Link to="/sysadmin/tag-maintenance">Tag</Link>
          <div className="btn-row">
              <button
                className="button"
                onClick={() => {
                  user_logout();
                }}>
               Log Out
              </button>
            </div>
        </nav>
      </div>
    </div>
  )
}
