import React from 'react'
import { Link, navigate } from "gatsby"
const parse = require("../auth")

export function user_logout(){
    parse.logout();
    localStorage.setItem("accessToken", null);
    navigate("/signin");
}