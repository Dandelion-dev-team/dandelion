import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../styles/App.scss"
import { deleteRecord, readRecord } from "../utils/CRUD"
export default function QuantityComponent(props) {
  const [quantityList, setQuantities] = useState(0);
  //TESTED
  useEffect(() => {
    readRecord('http://localhost:3000/quantity', setQuantities);
  }, []);


  const editUser = (user) => {
    props.parentCallback(user);
  }

  return (
    <div className="recordTable">
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
                onClick={() => { deleteRecord("http://localhost:3000/quantity/" + quantity.id) }}
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