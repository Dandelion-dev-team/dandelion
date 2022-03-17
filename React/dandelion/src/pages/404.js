import * as React from "react"
import Header from "../components/navigation/header"
import { useStaticQuery, graphql, navigate } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import image from '../images/banner3.jpeg';
import gif from '../images/404.gif';

import "../styles/App.scss"
export const isBrowser = () => typeof window !== "undefined"

const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
    query{
      heroImage: file(relativePath: { eq: "banner2.jpeg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

      mobileHeroImage: file(relativePath: { eq: "Group.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  if (!isBrowser) {
    return;
  } else {
    return (
      <div>
        <Header />
        <div className="notfound-container">
          <div className="notfound-content">
            <div className="banner-image">
              <img src={image}></img>
            </div>
            <div className="text-block">
              <div className="left-items">
                <div className="title-text">
                  <h2>404</h2>
                </div>
                <div className="text-link-block">
                  <h3>We're sorry, but that page was not found.</h3>
                  <h4 onClick={() => {
                    navigate("/")
                  }}>Go back to home page.</h4>
                </div>
              </div>
              <div className="right-items">
                <img src={gif}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFoundPage
