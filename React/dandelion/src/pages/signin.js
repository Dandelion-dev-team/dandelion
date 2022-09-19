import React, { useEffect, useState } from "react"
import Header from "../components/navigation/header"
import Footer from "../components/navigation/footer"
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
    if (logged === "true") {
      navigate("/dashboard")
    }
    if (logged === "false" || logged == null) {
      setRender(true)
    }
  }, [])

  if (!isBrowser) {
    return
  } else {
    if (render === true) {
      return (
        <div className="dandelion">
          <ToastContainer />
          <Header />
          <div className="signin page-container">
                <div className="heading">
                  <div className="headline">
                    <h1>Sign In</h1>
                    <p className="subheading">Sign in using the details your school has provided.</p>
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
                      <div className="btn-container">
                        <input
                          type="submit"
                          className="dandelion-button large-button"
                          value="Sign In"
                          onClick={onSubmitClick}
                        />
                      </div>
                    </form>
                  ) : (
                    navigate("/superuser/dashboard")
                  )}
                </div>
            </div>
          <Footer />
          <PasswordResetModal
              show={showModal}
              setShow={setShowModal}
              username={username}
              password={password}/>
          </div>
      )
    } else return null
  }
}
