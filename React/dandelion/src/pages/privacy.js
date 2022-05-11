import * as React from "react"
import Header from "../components/navigation/header"
import { useStaticQuery, graphql, navigate } from "gatsby"
import Layout from "../components/layout"
import image from '../images/banner3.jpeg';
import gif from '../images/404.gif';

import "../styles/App.scss"
export const isBrowser = () => typeof window !== "undefined"

const PrivacyPage = () => {
  if (!isBrowser) {
    return;
  } else {
    return (
      <div>
        <Header />
        <div className="privacy-container">
          <div className="privacy-content">
            <div className="banner-image">
              <img src={image}></img>
            </div>
            <div className="text-block">
              <div className="left-items">
                <div className="title-text">
                  <h2>404</h2>
                </div>
                <div className="text-link-block">
                 
                </div>
              </div>
              <div className="right-items">
                {/* <img src={gif}></img> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PrivacyPage