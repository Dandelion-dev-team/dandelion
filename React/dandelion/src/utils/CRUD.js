import React from 'react'
const parse = require("../auth")

export function createRecord(endpoint, body) {
    let  token = JSON.parse(localStorage.getItem('accessToken'));
    fetch(process.env.API_URL + endpoint, {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Authorization': 'Bearer ' + token,
            'Pragma': 'no-cache',
            'Expires': 0,
        }),
        body: body,
    })
        .then(console.log("PUT: " + endpoint))
        //.then(window.location.reload(false))
}

export function readRecord(endpoint, setter) {
    let  token = JSON.parse(localStorage.getItem('accessToken'));
    fetch(process.env.API_URL + endpoint, {
        method: "GET",
        headers: new Headers({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Authorization': 'Bearer ' + token,
            'Pragma': 'no-cache',
            'Expires': 0,
        })
    }).then(response => response.json())
        .then(data => setter(data.data))
}

export function updateRecord(endpoint, body) {
    let  token = JSON.parse(localStorage.getItem('accessToken'));
    fetch(process.env.API_URL + endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: body
      })
        .then(console.log("PUT: "+ endpoint))
        .then(window.location.reload(false))
}

export function deleteRecord(endpoint) {
    let  token = JSON.parse(localStorage.getItem('accessToken'));
    fetch(process.env.API_URL + endpoint, {
        method: "DELETE",
        headers: new Headers({ 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
     }),
    }).then(console.log("deleted: " + endpoint))//.then(window.location.reload(false))
}

