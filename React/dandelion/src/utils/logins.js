import React from 'react'
import { navigate } from "gatsby"
import Cookies from 'universal-cookie';

const base64 = require('base-64');

export function user_logout() {
    if (typeof window !== `undefined`) {
        localStorage.removeItem("is_superuser")
        localStorage.removeItem("is_sysadmin")
        localStorage.removeItem("school_id")
        localStorage.removeItem("user_id")

        localStorage.setItem("logged", "false"); //set to false rather than NULL as if you check for null it will be set before localstorage.getItem retrieves
        navigate("/");
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
            fetch(process.env.API_URL + "/user/" + username, {
                method: "GET",
                credentials: "include",
                mode: 'cors',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cache-Control': 'no-cache',
                }),
            }).then(response => {
                if (response.status == 200) {
                    return response.json();
                }
            }).then(data => {
                localStorage.setItem("is_superuser", data.is_superuser);
                localStorage.setItem("is_sysadmin", data.is_sysadmin);
                localStorage.setItem("school_id", data.school_id);
                localStorage.setItem("user_id", data.user_id);
                if (data.is_sysadmin == true) {
                    navigate("/sysadmin/dashboard/")
                }
                else if (data.is_superuser == true) {
                    navigate("/superuser/dashboard/")
                }
                else {
                    navigate("/dashboard")
                }
            })
        }
    })
}

export function retrieve_user() {

}

export function verify_superuser_storage() {
    let is_superuser = localStorage.getItem("is_superuser");
    if (is_superuser == "true" ) 
    {
        return true;
    } 
    else if (is_superuser == "false") 
    {
        return false;
    }
}

export function verify_sysadmin_storage() {
    let is_sysadmin = localStorage.getItem("is_sysadmin");
    if (is_sysadmin == "true") 
    {
        return true;
    } 
    else if (is_sysadmin == "false" || is_sysadmin == null) 
    {
        return false;
    }
}