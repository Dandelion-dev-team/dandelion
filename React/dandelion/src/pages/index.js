import * as React from "react"
import '../styles/App.scss'
import Header from "../components/navigation/header"
import Footer from "../components/navigation/footer"
import Hero from "../components/hero"
import {ToastContainer} from "react-toastify";
export default function IndexPage() {
    if (typeof window !== `undefined`) {
        return (
        <div className="dandelion">
            <ToastContainer />
            <Header />
            <div className="page-container">
                <Hero />
            </div>
            <Footer />
        </div>
    )} else return null;
}
