import React from 'react'
import { Link, navigate } from "gatsby"
const base64 = require('base-64');

export function user_logout() {
    if (typeof window !== `undefined`) {
        localStorage.setItem("logged", "false"); //set to false rather than NULL as if you check for null it will be set before localstorage.getItem retrieves
        navigate("/signin");
    }
}

export function user_login(username, password) {
    let credentials = base64.encode(username + ":" + password);
    fetch(process.env.API_URL + "/user/login", {
        method: "POST",
        credentials: "include",
        mode: 'cors',
        headers: new Headers({
            "Authorization": "Basic " + credentials,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
        }),
    }).then(response => {
        if (response.status == 200) {
            localStorage.setItem("logged", true);
            navigate("/dashboard")
        }
    })
}

export function retrieve_user(){

}

export function check_logged() {

}

export function verify_logged() {

}