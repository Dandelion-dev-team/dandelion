import React, { useEffect, useState } from "react"
import Header from "../components/navigation/header"
import "../styles/App.scss"
import { navigate } from "gatsby"
import { useFormik } from "formik"
import Cookies from 'universal-cookie';
import axios from "axios"

const cookies = new Cookies();
const base64 = require('base-64');
export const isBrowser = () => typeof window !== "undefined"

export default function Login(props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const onSubmitClick = e => {
    e.preventDefault()
    if(username && password){
      let credentials = base64.encode(username + ":" + password);
      fetch(process.env.API_URL + "/user/login", {
        method: "POST",
        credentials: "include",
        mode: 'cors',
        headers: new Headers({
          "Authorization": "Basic Tm90aXM6MTI=",
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        }),
      }) 
      }
  }

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    }
  });

  if (!isBrowser) {
    return;
  } else {
    return (
      <div>
        <Header />
        <div className="signin">
          <div className="container">
            <div className="hero-section">
              <div className="heading">
                <div className="headline">
                  <h3>Sign In</h3>
                  <p>Sign in using the details your school has provided.</p>
                </div>
              </div>
              <div className="signin-form">
                {true ? (
                  <form>
                    <label>Username: </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your username"
                      name="username"
                      onChange={handleUsernameChange}
                    //value={formik.values.username}
                    />
                    <label>Password: </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Your password"
                      name="pass"
                      onChange={handlePasswordChange}
                    //value={formik.values.password}
                    />
                    <div className="submit-btn">
                      <input
                        type="submit"
                        className="submitButton"
                        value="Log In"
                        onClick={onSubmitClick}
                      ></input>
                    </div>
                  </form>
                ) : (
                  navigate("/superuser/dashboard")
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
