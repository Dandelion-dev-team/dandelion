import React, { useEffect, useState } from "react"
import Header from "../components/header"
import "../styles/App.scss"
import {navigate} from 'gatsby'

const parse = require('../auth');

async function loginUser(credentials) {
  return fetch('http://127.0.0.1:5000/api/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const [logged] = parse.useAuth();

  const onSubmitClick = (e) => {
    e.preventDefault()
    console.log("You pressed login")
    let opts = {
      'username': username,
      'password': password,
      'roles': role,
    }
    console.log(opts)
    fetch("http://127.0.0.1:5000/api/login", {
      method: 'post',
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(token => {
        if (token.access_token) {
          parse.login(token)
          console.log(token.access_token)
        }
        else {
          console.log("Please type in correct username/password")
        }
      })
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  console.log('logged in', logged);

  return (
    <div>
      <Header />
      <div className="signin">
        <div className="container">
          <div className="hero-section">
            <div className="heading">
              <h3>Sign In Page</h3>
            </div>
            <div className="content">
              {!logged ? <form>
                <label>Username: </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your username"
                  name="username"
                  onChange={handleUsernameChange}
                />
                <label>Password: </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Your password"
                  name="pass"
                  onChange={handlePasswordChange}
                />
                <input
                  type="submit"
                  className="submitButton"
                  value="Log In"
                  onClick={onSubmitClick}
                ></input>

              </form>
                : navigate("/dashboard")}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}