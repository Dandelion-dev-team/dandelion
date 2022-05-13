import * as React from "react"
import Header from "../components/navigation/header"
import { useStaticQuery, graphql, navigate } from "gatsby"
import Layout from "../components/layout"
import image from "../images/banner3.jpeg"
import gif from "../images/404.gif"

import "../styles/App.scss"
export const isBrowser = () => typeof window !== "undefined"

const PrivacyPage = () => {
  if (!isBrowser) {
    return
  } else {
    return (
      <div>
        <Header />
        <div className="privacy-container">
          <div className="privacy-content">
            <div className="banner-image">
              <img src={image}></img>
            </div>
            <div className="text-block">
              <div className="text-wrapper">
                <div className="privacy-heading">
                  <h3>Privacy</h3>
                  <p>
                    This privacy policy explains what happens to any personal
                    information that you provide to us when you interact with us
                    (for example, information that we collect from you whilst
                    you visit our site). It explains how we’ll store and handle
                    that data and keep it safe. We may need to update this
                    Privacy Notice from time to time. We’ll notify you of any
                    significant changes, but you’re welcome to come back and
                    check it whenever you wish.
                  </p>
                </div>
                <div className="privacy-item">
                  <div className="privacy-header">
                    <h3>Who We Are</h3>
                  </div>
                  <div className="privacy-text">
                    <p>
                      <strong>Dandelion 2022 Ltd </strong> <br />
                      51 Cadogan Street <br />
                      Glasgow <br />
                      Lanarkshire <br />
                      G2 7HF <br />
                      Scotland <br />
                      Dandelion 2022 Ltd is a limited company incorporated in
                      Scotland (Registered Number SC705578)
                    </p>
                  </div>
                </div>
                <div className="privacy-item">
                  <div className="privacy-header">
                    <h3>Legal Basis We Rely On</h3>
                  </div>
                  <div className="privacy-text">
                    <p>
                      The law on data protection sets out a number of different
                      reasons for which a company may collect and process your
                      personal data, including:
                    </p>
                  </div>
                </div>
                <div className="privacy-item">
                  <div className="privacy-header">
                    <h3>Fulfilment of a Contract</h3>
                  </div>
                  <div className="privacy-text">
                    <p>
                      In certain circumstances, we need your personal data to
                      comply with our contractual obligations. For example, if
                      we employ you to work on a Dandelion project, we’ll
                      collect your contact details in order to liaise with you
                      about that project and your role. Or we may need a
                      photocopy of your driver’s licence if we are employing you
                      to drive a vehicle as part of your job description.
                    </p>
                  </div>
                </div>
                <div className="privacy-item">
                  <div className="privacy-header">
                    <h3>Legal compliance</h3>
                  </div>
                  <div className="privacy-text">
                    <p>
                      If the law requires us to, we may need to collect and
                      process your data. For example, we can pass on details of
                      people involved in any kind of criminal activity affecting
                      the company to law enforcement.
                    </p>
                  </div>
                </div>
                <div className="privacy-item">
                  <div className="privacy-header">
                    <h3>Legitimate interest</h3>
                  </div>
                  <div className="privacy-text">
                    <p>
                      In specific situations, we require your data to pursue our
                      legitimate interests in a way which might reasonably be
                      expected as part of running our business and which does
                      not materially impact your rights, freedom or interests.
                      For example, we will send you or make available
                      information about upcoming events/projects or
                      participation opportunities. We may also use your address
                      details to send you direct marketing information by post,
                      telling you about events and projects that that we think
                      might interest you.
                    </p>
                  </div>
                </div>
                <div className="privacy-item">
                  <div className="privacy-header">
                    <h3>Consent</h3>
                  </div>
                  <div className="privacy-text">
                    <p>
                      In specific situations, we can collect and process your
                      data with your consent. For example, when you tick a box
                      to receive email newsletters. When collecting your
                      personal data, we’ll always make clear to you which data
                      is necessary in connection with a particular service.
                    </p>
                  </div>
                </div>
                <div className="privacy-item">
                  <div className="privacy-header">
                    <h3>When do we collect your personal data?</h3>
                  </div>
                  <div className="privacy-text">
                    <p>
                      We do not collect any of your personal data as part of
                      this site's functionality. All data on the system is
                      anonymous, including accounts generated by the system.
                    </p>
                  </div>
                </div>
                <div className="privacy-item">
                  <div className="privacy-header">
                    <h3>Information Commissioner’s Office</h3>
                  </div>
                  <div className="privacy-text">
                    <p>
                      Dandelion is registered with the Information
                      Commissioner’s Office as a Data Owner and Controller.  Our
                      registration number is ZB184618.
                    </p>
                  </div>
                </div>
                <div className="privacy-item">
                  <div className="privacy-header">
                    <h3>Contacting the Regulator</h3>
                  </div>
                  <div className="privacy-text">
                    <p>
                      If you feel that your data has not been handled correctly,
                      or you are unhappy with our response to any requests you
                      have made to us regarding the use of your personal data,
                      you have the right to lodge a complaint with the
                      Information Commissioner’s Office (ICO). You can contact
                      them by calling 0303 123 1113. Or go online to
                      www.ico.org.uk/concerns{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PrivacyPage
