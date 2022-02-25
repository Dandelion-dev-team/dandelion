import React from 'react'

export function createRecord(endpoint, body) {
    fetch(process.env.API_URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
    })
        .then(console.log("PUT: " + endpoint))
        .then(window.location.reload(false))
}

export function readRecord(endpoint, setter) {
    fetch(process.env.API_URL + endpoint, {
        method: "GET",
        headers: new Headers({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0,
        })
    }).then(response => response.json())
        .then(data => setter(data))
}

export function updateRecord(endpoint, body) {
    fetch(process.env.API_URL + endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: body
      })
        .then(console.log("PUT: "+ endpoint))
        .then(window.location.reload(false))
}

export function deleteRecord(endpoint) {
    fetch(process.env.API_URL + endpoint, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    }).then(console.log("deleted: " + endpoint)).then(window.location.reload(false))
}

