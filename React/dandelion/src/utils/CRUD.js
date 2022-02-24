import React from 'react'

export function createRecord(url, body) {
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
    })
        .then(console.log("PUT: " + url))
        .then(window.location.reload(false))
}

export function readRecord(url, setter) {
    fetch(url, {
        method: "GET",
        headers: new Headers({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0,
        })
    }).then(response => response.json())
        .then(data => setter(data))
}

export function updateRecord(url, body) {
    fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: body
      })
        .then(console.log("PUT: "+ url))
        .then(window.location.reload(false))
}

export function deleteRecord(url) {
    fetch(url, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    }).then(console.log("deleted: " + url)).then(window.location.reload(false))
}

