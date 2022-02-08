import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import '../styles/App.scss'
import Header from "../components/header"
import Hero from "../components/hero"

const IndexPage = () => (
  <div>
    <Header/>
    <Hero/>
  </div>
)

export default IndexPage
