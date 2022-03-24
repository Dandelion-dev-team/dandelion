import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link, navigate } from "gatsby"
import { Trans, useTranslation } from "gatsby-plugin-react-i18next"
export const isBrowser = () => typeof window !== "undefined"

const Hero = () => {
  const data = useStaticQuery(graphql`
    query{
      heroImage: file(relativePath: { eq: "banner3.jpeg" }) {
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
  const { t } = useTranslation()
  if (!isBrowser) {
    return;
  } else {
    return (
      <div className="hero-blurb">
        <div className="container">
          <div className="inner-hero">
            <div className="images">
              <div className="feat-img">
                <div className="desktopImage">
                  <Img fluid={data.heroImage.childImageSharp.fluid} />
                </div>
                <div className="mobileImage">
                  <Img
                    fluid={data.mobileHeroImage.childImageSharp.fluid} />
                </div>
              </div>
            </div>
            <div className="content">
            <h3>
              <Trans>The Dandelion Schools' Growing Initiative</Trans>
            </h3>
            <p>
              <Trans>
                500 schools. 100 growing cubes. The largest community-led
                growing experiment ever undertaken in Scotland.
              </Trans>
            </p>
            <div className="btn-row">
              {/*localStorage.getItem("logged") ? null : null*/}
              <button
                className="button"
                onClick={() => {
                  navigate("/signin")
                }}
              >
                {t("Log In")}
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Hero
