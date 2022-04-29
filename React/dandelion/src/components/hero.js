import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link, navigate } from "gatsby"
import { Trans, useTranslation } from "gatsby-plugin-react-i18next"
import CookieConsent, { Cookies } from "react-cookie-consent";
export const isBrowser = () => typeof window !== "undefined"

const Hero = () => {
  const data = useStaticQuery(graphql`
    query {
      heroImage: file(relativePath: { eq: "home-image.png" }) {
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
    return
  } else {
    return (
      <div className="hero-blurb">
        <CookieConsent
          location="bottom"
          buttonText="I understand"
          cookieName="gdpr-cookie"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
        >
          This website does not use cookies for marketing or analysis. Cookies are used to maintain the connection with the server. {" "}
          <span style={{ fontSize: "10px" }}>Please click the button to consent to these essential cookies.</span>
        </CookieConsent>
        <div className="inner-hero">
          <div className="images">
            <div className="feat-img">
              <div className="desktopImage">
                <Img fluid={data.heroImage.childImageSharp.fluid} />
              </div>
              <div className="mobileImage">
                <Img fluid={data.mobileHeroImage.childImageSharp.fluid} />
              </div>
            </div>
          </div>
          <div className="content">
            <h3>
              <Trans>The Dandelion Schools' Growing Initiative</Trans>
            </h3>
            <p>
              <Trans>
              464 schools, 114 Grow Cubes, tonnes of tatties – welcome to the biggest growing experiment Scotland’s ever seen.
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
    )
  }
}

export default Hero
