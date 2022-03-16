import React from 'react'
import Cookies from 'universal-cookie';

export function createRecord(endpoint, body) {
    console.log(body);
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
    })
        .then(console.log("PUT: " + endpoint))
        .then(window.location.reload(false))
}

export function readRecord(endpoint, setter) {
    console.log(process.env.API_URL + endpoint);
    fetch(process.env.API_URL + endpoint, {
        method: "GET",
        credentials: "include",
        mode: 'cors',
        headers: new Headers({  
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0,
        })
    }).then(response => response.json())
        .then(data => setter(data.data))
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
      })
        .then(console.log("PUT: "+ endpoint))
        .then(window.location.reload(false))
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
    }).then(console.log("deleted: " + endpoint))
        .then(window.location.reload(false))
}

