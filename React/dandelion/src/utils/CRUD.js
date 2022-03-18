import React from 'react'
import Cookies from 'universal-cookie';
import { user_logout } from './logins';

export function createRecord(endpoint, body) {
    const cookies = new Cookies();
    fetch(process.env.API_URL + endpoint, {
        method: "POST",
        credentials: "include",
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0,
            'X-CSRF-TOKEN': cookies.get('csrf_access_token')
        }),
        body: body,
    }).then(window.location.reload(false))
}

export function readRecord(endpoint, setter) {
    fetch(process.env.API_URL + endpoint, {
        method: "GET",
        credentials: "include",
        mode: 'cors',
        headers: new Headers({  
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0,
        })
    }).then(response => {
        if(response.status == 401){
            user_logout();
    } else return response.json()}).then(data => console.log(data))
}

export function updateRecord(endpoint, body) {
    fetch(process.env.API_URL + endpoint, {
        method: "PUT",
        credentials: "include",
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0,
        }),
        body: body
      }).then(window.location.reload(false))
}

export function deleteRecord(endpoint) {
    const cookies = new Cookies();
    fetch(process.env.API_URL + endpoint, {
        method: "DELETE",
        credentials: "include",
        mode: 'cors',
        headers: new Headers({ 
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': cookies.get('csrf_access_token')
        }),
    }).then(window.location.reload(false))
}

