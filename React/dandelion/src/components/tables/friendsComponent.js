import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { readRecord } from "../../utils/CRUD"

export default function FriendsComponent(props) {
  const data = useStaticQuery(graphql`
    query {
      friendsImage: file(relativePath: { eq: "tomatoes.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <div>
      <div className="friendsTable">
        <table className="friendList">
          <thead>
            <tr>
              <th>Username</th>
            </tr>
          </thead>

          {props.users
            ? props.users.map(friend => (
                <tbody key={friend.id}>
                  <td>{friend.username}</td>
                </tbody>
              ))
            : null}
        </table>
      </div>
      <div className="friends-image">
        <Img fluid={data.friendsImage.childImageSharp.fluid} />
      </div>
    </div>
  )
}
