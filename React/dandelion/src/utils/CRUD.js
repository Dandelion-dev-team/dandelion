import React from "react"
import Cookies from "universal-cookie"
import { user_logout } from "./logins"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function handleErrors(response) {
  console.log("called")
  if (response.status !== 200) {
    console.log("Error")
    toast.error("Database Error " + response.status)
  }
  return response
}

export function createRecord(endpoint, body, callback=null) {
  const cookies = new Cookies()
  // var dummy = cookies.getAll()
  // for (var c in dummy) {
  //   console.log(c.toString());
  // }
  console.log(body)
  fetch(process.env.API_URL + endpoint, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-CSRF-TOKEN": cookies.get("csrf_access_token"),
      Pragma: "no-cache",
      Expires: 0,
    }),
    body: body,
  }).then(response => {
    if (response.status >= 200 && response.status <= 299) {
      if (callback) {
        response.json().then((data) => {callback(data)})
      }
      // window.location.reload(false)
    } else {
      return response.json().then((body) => {
          if ('error' in body)
              throw new Error(body.error)
          else
              throw new Error("Could not create record")
      })
      // throw Error(response.status)
    }
  })
  .catch(error => {
    if (error == 403) {
      console.log(error)
      // user_logout()
    }
    var messageArray = error.toString().split(":")
    toast.error(messageArray[messageArray.length - 1])
    // toast.error("Could not create record.")
  })
}

export function createRecordNavigate(endpoint, body) {
  const cookies = new Cookies()
  return fetch(process.env.API_URL + endpoint, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-CSRF-TOKEN": cookies.get("csrf_access_token"),
      Pragma: "no-cache",
      Expires: 0,
    }),
    body: body,
  })
  .then(response => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json()
    } else {
      return response.json().then((body) => {
          if ('error' in body)
              throw new Error(body.error)
          else
              throw new Error("Could not create record")
      })
      // throw Error(response.status)
    }
  })
  .catch(error => {
    if (error == 403) {
      console.log(error)
      // user_logout()
    }
    var messageArray = error.toString().split(":")
    toast.error(messageArray[messageArray.length - 1])
    // toast.error("Could not create record.")
  })
}

export function readRecord(endpoint, setter) {
  fetch(process.env.API_URL + endpoint, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: new Headers({
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: 0,
    }),
  })
    .then(response => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json()
      } else {
        return response.json().then((body) => {
            if ('error' in body)
                throw new Error(body.error)
            else
                throw new Error("Error reading from database")
        })
      }
    })
    .then(jsonResponse => {
      setter(jsonResponse)
    })
    .catch(error => {
      if (error != 404) {
        console.log(error)
        // user_logout()
      }
      var messageArray = error.toString().split(":")
      toast.error(messageArray[messageArray.length - 1])
      // toast.error("Database error " + error)
    })
}

export function readAdminRecord(endpoint) {
  return fetch(process.env.API_URL + endpoint, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: new Headers({
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: 0,
    }),
  })
    .then(response => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json()
      } else if (response.status == 401) {
        user_logout()
      } else {
        return response.json().then((body) => {
            if ('error' in body)
                throw new Error(body.error)
            else
                throw new Error("Could not read admin record")
        })
        // throw Error(response.statusText)
      }
    })
    .then(jsonResponse => {
      return jsonResponse
    })
    .catch(error => {
      var messageArray = error.toString().split(":")
      toast.error(messageArray[messageArray.length - 1])
      // toast.error("Database failure.")
      // console.log(error)
    })
}

export function uploadImage(endpoint, image) {
  const cookies = new Cookies()
  const formData = new FormData()

  formData.append("file", image)
  return fetch(process.env.API_URL + endpoint, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    body: formData,
    headers: new Headers({
      "X-CSRF-TOKEN": cookies.get("csrf_access_token"),
    }),
  })
    .then(response => {
      if (response.status == 200) {
        return response.json()
      } else {
        return response.json().then((body) => {
            if ('error' in body)
                throw new Error(body.error)
            else
                throw new Error("Could not upload image")
        })
        // throw Error(response.statusText)
      }
    })
    .then(jsonResponse => {
      return jsonResponse
    })
    .catch(error => {
      var messageArray = error.toString().split(":")
      toast.error(messageArray[messageArray.length - 1])
      // toast.error("Failed to upload image. Error " + error)
    })
}

export function updateRecord(endpoint, body) {
  const cookies = new Cookies()
  return fetch(process.env.API_URL + endpoint, {
    method: "PUT",
    credentials: "include",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: 0,
      "X-CSRF-TOKEN": cookies.get("csrf_access_token"),
    }),
    body: body,
  }).then(response => {
    if (response.status != 200) {
    //   window.location.reload(false)
    // }
    // else {
        return response.json().then((body) => {
            if ('error' in body)
                throw new Error(body.error)
            else
                throw new Error("Could not update record")
        })
    }
  })
  .catch(error => {
    var messageArray = error.toString().split(":")
    toast.error(messageArray[messageArray.length - 1])
  })
}

export function deleteRecord(endpoint) {
  const cookies = new Cookies()
  fetch(process.env.API_URL + endpoint, {
    method: "DELETE",
    credentials: "include",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": cookies.get("csrf_access_token"),
    }),
  })
  .then(response => {
    if (response.status == 200) {
      window.location.reload(false)
    }
    else {
      return response.json().then((body) => {
        console.log(body)
        if ('error' in body)
          throw new Error(body.error)
        else
          throw new Error("Could not delete record")
      })
    }})
    .catch(error => {
      var messageArray = error.toString().split(":")
      toast.error(messageArray[messageArray.length - 1])
      // toast.error("Failed to delete.")
    })
}

