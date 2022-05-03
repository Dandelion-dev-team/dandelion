import React, { useEffect, useState } from "react"
import Header from "../components/navigation/header"
import "../styles/App.scss"
import { navigate } from "gatsby"
import { user_login } from "../utils/logins"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useStepContext } from "@mui/material"
import { TrendingUpOutlined } from "@mui/icons-material"
import PasswordResetModal from "../components/modals/passwordResetModal"

export const isBrowser = () => typeof window !== "undefined"

export default function Login(props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [render, setRender] = useState("")
  const [showModal, setShowModal] = useState("")

  const onSubmitClick = e => {
    e.preventDefault()
    // setShowModal(true)
    if (username && password) {
      user_login(username, password, setShowModal);
    }
  }

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  useEffect(() => {
    let logged = localStorage.getItem("logged")
    if (logged == "true") {
      navigate("/dashboard")
    }
    if (logged == "false" || logged == null) {
      setRender(true)
    }
  }, [])

  if (!isBrowser) {
    return
  } else {
    if (render == true) {
      return (
        <div>
          {showModal ? <PasswordResetModal username={username} password={password}/> : null}

          <Header />
          <div className="signin">
            <ToastContainer />
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
    } else return null
  }
}
