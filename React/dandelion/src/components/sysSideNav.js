import * as React from "react"
import { Link, navigate } from "gatsby"
import logo from "../images/logo3.svg"

export default function SysSideNav() {
  return (
    <div className="wrapper">
      <div className="sidenav">
        <nav>
          <div className="logo">
            <Link to="/maintenance/sysadmin/sysadmin-dashboard" exact>
              <img src={logo} />
            </Link>
          </div>
          <Link to="/maintenance/sysadmin/auth-maintenance">Authority</Link>
          <Link to="/maintenance/sysadmin/node-maintenance">Node</Link>
          <Link to="/maintenance/sysadmin/quantity-maintenance">Quantity</Link>
          <Link to="/maintenance/sysadmin/school-maintenance">School</Link>
          <Link to="/maintenance/sysadmin/sensor-maintenance">Sensor</Link>
          <Link to="/maintenance/sysadmin/superuser-maintenance">Superuser</Link>
          <Link to="/maintenance/sysadmin/tag-maintenance">Tag</Link>
          <div className="btn-row">
              <button
                className="button"
                onClick={() => {
                  navigate("/signin")
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
