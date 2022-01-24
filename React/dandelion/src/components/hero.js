import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link, navigate } from "gatsby"

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
            <h3>The Dandelion School Growing Initiative</h3>
            <p>
              500 schools. 200 growing cubes. The largest community-led growing
              experiment ever undertaken in Scotland.
            </p>
            <div className="btn-row">
              <button
                className="button"
                onClick={() => {
                  navigate("/signin")
                }}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
