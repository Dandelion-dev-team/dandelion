import React from "react"
import {graphql, Link, useStaticQuery} from "gatsby"
import licence from "../../images/by-nc-sa.svg"
import github from "../../images/GitHub_Logo_White.png"
import Img from "gatsby-image";
import logo from "../../images/logo.svg";

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
        <Link to="https://creativecommons.org/licenses/by-nc-sa/4.0/">
          <img src={licence} />
        </Link>
        <span className="smallprint">
          We are on&nbsp;
          <Link to="https://github.com/Dandelion-dev-team/dandelion">
            <img src={github}/>
            {/*<Img fluid={data.githubImage.childImageSharp.fluid} />*/}
          </Link>
        </span>
      </div>
    </footer>
  )
}
