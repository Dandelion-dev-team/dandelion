import React from "react"
import {graphql, Link, useStaticQuery} from "gatsby"
import licence from "../../images/by-nc-sa.svg"
import Img from "gatsby-image";

export default function Footer() {
  const data = useStaticQuery(graphql`
    query {
      githubImage: file(relativePath: { eq: "GitHub_Logo_White.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <footer>
      <div className="inner-footer">
        <a
          target="_blank"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
        >
          <img src={licence} />
        </a>
          <p className="smallprint">
            We are on&nbsp;
            <a
                target="_blank"
                href="https://github.com/Dandelion-dev-team/dandelion"
            >
              <Img fluid={data.githubImage.childImageSharp.fluid} />
            </a>
          </p>
      </div>
    </footer>
  )
}
