import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link, navigate } from "gatsby"
import { Trans, useTranslation } from "gatsby-plugin-react-i18next"

const Hero = () => {
  const data = useStaticQuery(graphql`
    query {
      heroImage: file(relativePath: { eq: "banner3.jpeg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const { t } = useTranslation();

  return (
    <div className="hero-blurb">
      <div className="container">
        <div className="inner-hero">
          <div className="images">
            <div className="feat-img">
              <Img fluid={data.heroImage.childImageSharp.fluid} />
            </div>
          </div>
          <div className="content">
            <h3>
              <Trans>The Dandelion School Growing Initiative</Trans>
            </h3>
            <p>
              <Trans>
                500 schools. 200 growing cubes. The largest community-led
                growing experiment ever undertaken in Scotland.
              </Trans>
            </p>
            <div className="btn-row">
              <button
                className="button"
                onClick={() => {
                  navigate("/signin")
                }}
              >
                {t('message')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero


