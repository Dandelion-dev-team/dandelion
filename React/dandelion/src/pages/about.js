import React from "react"
import Header from "../components/navigation/header"
import "../styles/App.scss"
import { Trans, useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"
import image from "../images/banner3.jpeg"

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`

const About = () => {
  return (
    <div>
      <Header />
      <div className="about">
        <div className="content">
          <div className="feature-image">
            <img src={image} />
          </div>
          <div className="hero-text">
            <div className="title">
              <h3>
                <Trans>The Dandelion School Growing Initiative</Trans>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// <div className="about">
// <div className="container">
//   <div className="hero-section">
//     <div className="heading">
//       <h3>
//         <Trans>The Dandelion School Growing Initiative</Trans>
//       </h3>
//       <p>
//         <Trans>
//         500 schools. 200 growing cubes. The largest community-led growing experiment ever undertaken in Scotland.
//         </Trans>

//       </p>
//     </div>
//     <div className="content"></div>
//   </div>
// </div>
// </div>

export default About
