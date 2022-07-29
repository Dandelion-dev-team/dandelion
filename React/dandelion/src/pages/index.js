import * as React from "react"
import '../styles/App.scss'
import Header from "../components/navigation/header"
import Footer from "../components/navigation/footer"
import Hero from "../components/hero"
export default function IndexPage() {
  if (typeof window !== `undefined`) {
  return (
    <div className="dandelion">
      <Header />
      <Hero />
      <Footer />
    </div>
  )} else return null;
}
