import React from "react"
import { Link, navigate } from "gatsby"
import Header from "../components/navigation/header"
import Footer from "../components/navigation/footer"
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
        <div className="help page-container">
            <div className="panel">
              <div className="panel-title">
                <h2>
                  <Trans>Help links</Trans>
                </h2>
                <h4>
                  Stuck? Use the links below to find the help you need.
                </h4>
              </div>
              <div className="panel-content">
                <div className="inner">
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
        <Footer />
    </div>
  )
}

export default Help
