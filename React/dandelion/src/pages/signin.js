import React, { useEffect, useState } from "react"
import Header from "../components/header"
import "../styles/App.scss"
import { login, useAuth, logout } from "../auth"
import { navigate } from "gatsby"

export default function Login(props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  
  const [logged] = useAuth()
  const onSubmitClick = e => {
    e.preventDefault()
    console.log("You pressed login")
    let opts = {
      username: username,
      password: password,
      //roles: role,
    }
    console.log(opts)
    fetch("http://localhost:3000/logins", {
      method: "post",
      body: JSON.stringify(opts),
    })
      .then(r => r.json())
      .then(token => {
        if (token.access_token) {
          login(token)
          console.log(token)
          navigate("/")
        } else {
          console.log("Please type in correct username/password")
        }
      })
  }

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  console.log("logged in", logged)

  return (
    <div>
      <Header />
      <div className="about">
        <div className="container">
          <div className="hero-section">
            <div className="heading">
              <h3>Sign In Page</h3>
            </div>
            <div className="content">
              <form>
                <label>Username: </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your username"
                  name="username"
                  onChange={handleUsernameChange}
                  value={username} 
                />
                <label>Password: </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Your password"
                  name="pass"
                  onChange={handlePasswordChange}
                  value={password}
                />
                <input
                  type="submit"
                  className="submitButton"
                  value="Log In"
                  onClick={onSubmitClick}
                ></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
