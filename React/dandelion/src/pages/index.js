import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import '../styles/App.scss'
import Header from "../components/navigation/header"
import Hero from "../components/hero"
export default function IndexPage() {
  if (typeof window !== `undefined`) {
  return (
    <div>
      <Header />
      <Hero />
    </div>
  )} else return null;
}
