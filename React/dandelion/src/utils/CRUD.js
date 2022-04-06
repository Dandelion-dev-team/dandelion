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

export function createRecordNavigate(endpoint, body) {
    const cookies = new Cookies();
    return fetch(process.env.API_URL + endpoint, {
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
    }).then((response) => response.json()).then((responseData) => {
        return responseData;
    })
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
        if (response.status == 401) {
            user_logout();
        } else return response.json()
    }).then(data => setter(data))
}

export function readAdminRecord(endpoint) {
    //THIS FUNCTION RETURNS DATA DIRECTLY RATHER THAN THROUGH A SETTER
    //USEFUL FOR SYSADMIN PAGES WHEN EDITING
    return fetch(process.env.API_URL + endpoint, {
        method: "GET",
        credentials: "include",
        mode: 'cors',
        headers: new Headers({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0,
        })
    }).then(response => {
        if (response.status == 401) {
            user_logout();
        }else {
            return response.json()
        }
    }).then((responseData) => {
        return responseData;
    })
}

export function uploadExperimentImage(endpoint, image) {
    const cookies = new Cookies();
    const formData = new FormData();

    formData.append('file', image);
    console.log(image)
    return fetch(process.env.API_URL + endpoint, {
        method: "POST",
        mode: 'cors',
        body: formData,
    })
}

export function updateRecord(endpoint, body) {
    const cookies = new Cookies();
    fetch(process.env.API_URL + endpoint, {
        method: "PUT",
        credentials: "include",
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0,
            'X-CSRF-TOKEN': cookies.get('csrf_access_token')
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

