import React from 'react'
import { Link, navigate } from "gatsby"

export function user_logout(){
    if (typeof window !== `undefined`) {
    localStorage.setItem("accessToken", null);
    navigate("/signin");
    }
}