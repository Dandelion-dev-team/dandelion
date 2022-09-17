import React, { useEffect, useState, useRef } from "react"
import SideNav from "../../components/navigation/sideNav"
import Header from "../../components/navigation/header"
import "../../styles/App.scss"
import QuantityComponent from "../../components/tables/quantityComponent"
import { createRecord, updateRecord } from "../../utils/CRUD"
import { verify_sysadmin_storage } from "../../utils/logins"
import { navigate } from "gatsby"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SuperuserMaintenance(props) {
  const [logged, setLogged] = useState("");

  const [entered_name, setName] = useState("")
  const [entered_unit, setUnit] = useState("")
  const [entered_link, setLink] = useState("")
  const [editing_id, setQuantity] = useState("")

  const [editing, setEditing] = useState("")

  useEffect(() => {
    if (verify_sysadmin_storage() == true) {
      setLogged(true);
    } else {
      navigate("/signin");
    }
  }, [])

  const handleNameChange = e => {
    setName(e.target.value)
  }
  const handleUnitChange = e => {
    setUnit(e.target.value)
  }
  const handleLinkChange = e => {
    setLink(e.target.value)
  }

  const handleCallback = childData => {
    //SET FIELDS USING PASSED DATA FROM CHILD
    setName(childData.name)
    setUnit(childData.unit)
    setLink(childData.help_url)
    setQuantity(childData.id)

    setEditing(true)
  }

  const onCreateQuantity = e => {
    if (entered_name && entered_unit && entered_link) {
      let appended_url = entered_link
      if (
        !appended_url.startsWith("https://") &&
        !appended_url.startsWith("http://")
      ) {
        appended_url = `https://${appended_url}`
      }
      let body = JSON.stringify({
        id: 3, name: entered_name, unit: entered_unit, help_url: appended_url,
      });
      createRecord("/quantity", body);
    } else {
      toast.error("More information needed.")
    }
  }

  const onUpdateQuantity = e => {
    if (entered_name && entered_link && entered_unit) {
      let body = JSON.stringify({
        id: editing_id, name: entered_name, unit: entered_unit, help_url: entered_link,
      });
      updateRecord("/quantity/" + editing_id, body);
    }
  }
  if (logged) {

    return (
      <div className="dandelion">
        <ToastContainer />
        <Header />
        <div className="quantity-maintenance page-container">
          <SideNav />
          <ToastContainer />
          <div className="main-content">
            <div className="content-area">
              <div className="main-content">
                <div className="content-area">
                  <div className="left-panel">
                    <div className="panel-body">
                      <QuantityComponent parentCallback={handleCallback} />
                    </div>
                  </div>
                  <div className="right-panel">
                    <div className="pane-container">
                      <div className="pane-content">
                        <div className="textbox">
                          <h3>Name:</h3>
                          <input
                            type="text"
                            placeholder="Quantity name"
                            value={entered_name}
                            onChange={handleNameChange}
                          />
                        </div>
                        <div className="textbox">
                          <h3>Unit:</h3>
                          <input
                            type="text"
                            placeholder="Measurement"
                            name="usernameBox"
                            value={entered_unit}
                            onChange={handleUnitChange}
                          />
                        </div>
                        <div className="textbox">
                          <h3>Help URL:</h3>
                          <input
                            type="text"
                            placeholder="Help URL"
                            value={entered_link}
                            onChange={handleLinkChange}
                          />
                        </div>
                        {editing ? (
                          <div className="submit-btn">
                            <input
                              type="submit"
                              className="submitButton"
                              value="Update"
                              onClick={onUpdateQuantity}
                            ></input>
                          </div>
                        ) : (
                          <div className="submit-btn">
                            <input
                              type="submit"
                              className="submitButton"
                              value="Create"
                              onClick={onCreateQuantity}
                            ></input>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null;

}
