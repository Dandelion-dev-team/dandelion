import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../styles/App.scss"

export default function QuantityComponent(props) {
  const [quantityList, setQuantities] = useState(0);
  //TESTED
  useEffect(() => {
    // Update the document title using the browser API
    fetch("http://localhost:3000/quantities", {
      method: "GET",
      headers: new Headers({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
      })
    }).then(response => response.json())
      .then(
        data => setQuantities(data))
  }, []);



  const deleteUser = index => {
    fetch("http://localhost:3000/quantities/" + index, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
    }).then(console.log("delete " + index)).then(window.location.reload(false))
  }

  const editUser = (user) => {
    props.parentCallback(user);
  }

  return (
    <div className="authTable">
      <table className="tableList">
      {quantityList ? 
      <div>
        {console.log(quantityList)}
         <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Unit</th>
            <th>Helper URL</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        {quantityList.map(quantity => (

          <tbody key={quantity.id}>
            <td>{quantity.id}</td>
            <td>{quantity.name}</td>
            <td>{quantity.unit}</td>
            <td><a href={quantity.help_url} target="_blank">{quantity.help_url}</a></td>

            <td>
              <div className="submit-btn">
                <input
                  type="submit"
                  className=""
                  value="Edit"
                  onClick={() => { editUser(quantity) }}
                ></input>
              </div>
            </td>
            <td>
              <input
                type="submit"
                className=""
                value="Delete"
                onClick={() => { deleteUser(quantity.id) }}
              ></input>
            </td>
          </tbody>
        ))}
      </div> 
      : null}
      </table>
    </div>
  )
}