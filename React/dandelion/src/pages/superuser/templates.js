import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import { navigate } from "gatsby";
import { verify_superuser_storage } from "../../utils/logins";
export default function SuperUserTemplates(props) {
  const [logged, setLogged] = useState("");

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true);
    } else {
      navigate("/signin");
    }
  }, [])
  if (typeof window !== `undefined` && logged) {
    return (
    <div>
      <SideNav />
      <div className="help-container">
        <div className="help-content">
          
        </div>
      </div>
    </div>
  )
  } else {return null}
}