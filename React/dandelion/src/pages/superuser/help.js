import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/sideNav"
import { navigate } from "gatsby";
import { verify_superuser_storage } from "../../utils/logins";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SuperuserHelp(props) {
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
        <ToastContainer/>
        <div className="help-content">
          
        </div>
      </div>
    </div>
  )
  } else {return null}
}
