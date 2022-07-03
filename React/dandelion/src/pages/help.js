import React from "react"
import { Link, navigate } from "gatsby"
import Header from "../components/navigation/header"
import "../styles/App.scss"
import { Trans, useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"

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

const Help = () => {
  return (
    <div className="dandelion">
      <Header />
      <div className="common-container">
        <div className="help">
          <div className="content common-content-panel">
            <div className="hero-text">
              <div>
                <h2>
                  <Trans>Help links</Trans>
                </h2>
              </div>
            </div>
            <div className="content-main">
              <h4>
                Stuck? Use the links below to find the help you need.
              </h4>
              <ul>
                <li>
                  <Link to="/glossary">
                    Glossary
                  </Link>
                </li>
                <li>
                  <a href="https://dandelion.sruc.ac.uk/reference" target="_blank">
                    IoT node user guide
                  </a>
                </li>
              </ul>
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

export default Help
