import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { deleteRecord, readRecord } from "../../utils/CRUD"
export default function QuantityComponent(props) {
  const [quantityList, setQuantities] = useState(0);
  //TESTED
  useEffect(() => {
    readRecord('/quantity', setQuantities);
  }, []);


  const editUser = (user) => {
    props.parentCallback(user);
  }

  return (
    <div className="school-maintenance dandelion-component scrollable-container">
      <div className="scrollable-header">
        <h2>
          Quantities
        </h2>
      </div>
      <div className="dandelion-table scrollable-content">
          <table className="tableList">
      {quantityList ? 
      <div>
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

        {quantityList.data.map(quantity => (

          <tbody key={quantity.id}>
            <td>{quantity.id}</td>
            <td>{quantity.name}</td>
            <td>{quantity.unit}</td>
            <td><a href={quantity.help_url} target="_blank">{quantity.help_url}</a></td>

            <td>
              <div className="btn-container">
                <input
                  type="submit"
                  className="dandelion-button"
                  value="Edit"
                  onClick={() => { editUser(quantity) }}
                ></input>
              </div>
            </td>
            <td>
              <input
                type="submit"
                className="dandelion-button"
                value="Delete"
                onClick={() => { deleteRecord("/quantity/" + quantity.id) }}
              ></input>
            </td>
          </tbody>
        ))}
      </div> 
      : null}
      </table>
      </div>
    </div>
  )
}
