import React, { useEffect, useState } from "react"
import SysSideNav from "../../components/navigation/sysadminSideNav"
import "../../styles/App.scss"
import Select from "react-select"
import SchoolComponent from "../../components/tables/schoolComponent"
import { createRecord, readRecord, updateRecord } from "../../utils/CRUD"

export default function SuperuserMaintenance(props) {
  const [authList, setAuthorities] = useState(0)
  const [editing, setEditing] = useState("")
  const [adding, setAdding] = useState("")
  const [auth_id, setAuthID] = useState("")
  const [editing_school_id, setSchoolID] = useState("")

  //DATA ENTRY
  const [entered_school_name, setSchoolName] = useState("")
  const [authority_selected, setAuthority] = useState("")
  const [addressLineOne, setAddress1] = useState("")
  const [addressLineTwo, setAddress2] = useState("")
  const [entered_town, setTown] = useState("")
  const [entered_postcode, setPostcode] = useState("")
  const [entered_latitude, setLatitude] = useState("")
  const [entered_longitude, setLongitude] = useState("")
  const [entered_telephone, setTelephone] = useState("")
  const [entered_email, setEmail] = useState("")
  const [entered_image_link, setImage] = useState("")

  const handleNameChange = e => {
    setSchoolName(e.target.value)
  }
  const handleAddress1Change = e => {
    setAddress1(e.target.value)
  }
  const handleAddress2Change = e => {
    setAddress2(e.target.value)
  }
  const handleTownChange = e => {
    setTown(e.target.value)
  }
  const handlePostcodeChange = e => {
    setPostcode(e.target.value)
  }
  const handleLatChange = e => {
    setLatitude(e.target.value)
  }
  const handleLongChange = e => {
    setLongitude(e.target.value)
  }
  const handleTelephoneChange = e => {
    setTelephone(e.target.value)
  }
  const handleEmailChange = e => {
    setEmail(e.target.value)
  }
  const handleImageChange = e => {
    setImage(e.target.value)
  }

  const onCreateClick = e => {
    var lat_num = Number(entered_latitude)
    var lng_num = Number(entered_longitude)
    if (
      entered_school_name &&
      authority_selected &&
      addressLineOne &&
      addressLineTwo &&
      entered_town &&
      entered_postcode &&
      lat_num &&
      lng_num &&
      entered_telephone &&
      entered_email &&
      entered_image_link
    ) {
      let body = JSON.stringify({
        id: 1234,
        authority_id: authority_selected.id,
        name: entered_school_name,
        address_line_1: addressLineOne,
        address_line_2: addressLineTwo,
        town: entered_town,
        postcode: entered_postcode,
        latitude: lat_num,
        longitude: lng_num,
        telephone: entered_telephone,
        email: entered_email,
        school_image_link: entered_image_link,
        status: "active",
      })
      createRecord("/school", body);
    } else {
      console.log("did not have all information")
    }
  }

  const onUpdateClick = e => {
    if (
      entered_school_name &&
      addressLineOne &&
      addressLineTwo &&
      entered_town &&
      entered_postcode &&
      entered_latitude &&
      entered_longitude &&
      entered_telephone &&
      entered_email &&
      entered_image_link
    ) {

      let body = JSON.stringify({
        id: editing_school_id,
        authority_id: authority_selected.id,
        name: entered_school_name,
        address_line_1: addressLineOne,
        address_line_2: addressLineTwo,
        town: entered_town,
        postcode: entered_postcode,
        latitude: entered_latitude,
        longitude: entered_longitude,
        telephone: entered_telephone,
        email: entered_email,
        school_image_link: entered_image_link,
        status: "active",
      });
      updateRecord("/school/" + editing_school_id, body)
    }
  }

  useEffect(() => {
    readRecord("/authority", setAuthorities)
  }, [])

  const handleCallback = childData => {
    setAuthID(childData.authority_id)
    //SET FIELDS USING PASSED DATA FROM CHILD
    setSchoolName(childData.name)
    setAddress1(childData.address_line_1)
    setAddress2(childData.address_line_2)
    setTown(childData.town)
    setPostcode(childData.postcode)
    setLatitude(childData.latitude)
    setLongitude(childData.longitude)
    setTelephone(childData.telephone)
    setEmail(childData.email)
    setImage(childData.school_image_link)

    setSchoolID(childData.id)

    setEditing(true)
    setAdding(true)
  }
  return (
    <div>
      <SysSideNav />
      <div className="school-maintenance-container">
        <div className="school-content">
          <div className="content-wrapper">
            <div className="edit-school">
              {adding ? (
                //SHOW IF ADDING SCHOOL
                <div>
                  <div className="authorityPicker">
                    <h3>Local Authority:</h3>
                    {editing ? (
                      //IF EDITING SHOW SCHOOL AUTH ID
                      <h3>{auth_id}</h3>
                    ) : (
                      //IF NOT EDITING SHOW PICKER
                      <Select
                        name="authority_id_picker"
                        options={authList}
                        value={authority_selected}
                        defaultValue={authority_selected}
                        onChange={setAuthority}
                        getOptionLabel={authList => authList.name}
                        getOptionValue={authList => authList.id} // It should be unique value in the options. E.g. ID
                      />
                    )}
                  </div>
                  <div className="schoolEnterList">
                    <div className="nameBox">
                      <h3>School Name:</h3>
                      <input
                        type="text"
                        placeholder="School Name"
                        name="usernameBox"
                        value={entered_school_name}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div className="nameBox">
                      <h3>Address Line 1:</h3>
                      <input
                        type="text"
                        placeholder="Address line 1"
                        name="usernameBox"
                        value={addressLineOne}
                        onChange={handleAddress1Change}
                      />
                    </div>
                    <div className="nameBox">
                      <h3>Address Line 2:</h3>
                      <input
                        type="text"
                        placeholder="Address line 2"
                        name="usernameBox"
                        value={addressLineTwo}
                        onChange={handleAddress2Change}
                      />
                    </div>
                    <div className="nameBox">
                      <h3>Town:</h3>
                      <input
                        type="text"
                        placeholder="Town"
                        name="usernameBox"
                        value={entered_town}
                        onChange={handleTownChange}
                      />
                    </div>
                    <div className="nameBox">
                      <h3>Postcode:</h3>
                      <input
                        type="text"
                        placeholder="Postcode"
                        name="usernameBox"
                        value={entered_postcode}
                        onChange={handlePostcodeChange}
                      />
                    </div>
                    <div className="nameBox">
                      <h3>Latitude:</h3>
                      <input
                        type="text"
                        placeholder="Latitude"
                        name="usernameBox"
                        value={entered_latitude}
                        onChange={handleLatChange}
                      />
                    </div>
                    <div className="nameBox">
                      <h3>Longitude:</h3>
                      <input
                        type="text"
                        placeholder="Longitude"
                        name="usernameBox"
                        value={entered_longitude}
                        onChange={handleLongChange}
                      />
                    </div>
                    <div className="nameBox">
                      <h3>Telephone:</h3>
                      <input
                        type="text"
                        placeholder="Telephone"
                        name="usernameBox"
                        value={entered_telephone}
                        onChange={handleTelephoneChange}
                      />
                    </div>
                    <div className="nameBox">
                      <h3>Email:</h3>
                      <input
                        type="text"
                        placeholder="Email"
                        name="usernameBox"
                        value={entered_email}
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className="nameBox">
                      <h3>School Image:</h3>
                      <input
                        type="text"
                        placeholder="Image Link"
                        name="usernameBox"
                        value={entered_image_link}
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  {editing ? (
                    //IF EDITING SHOW UPDATE BUTTON
                    <div>
                      <div>
                        <input
                          type="submit"
                          className="createButton"
                          value="Update"
                          onClick={onUpdateClick}
                        ></input>
                      </div>
                    </div>
                  ) : (
                    //IF NOT EDITING SHOW CREATE BUTTON
                    <div>
                      <input
                        type="submit"
                        className="createButton"
                        value="Create"
                        onClick={onCreateClick}
                      ></input>
                    </div>
                  )}
                </div>
              ) : (
                //SHOW IF NOT ADDING SCHOOL
                <div>
                  <input
                    type="submit"
                    className="createButton"
                    value="Add School"
                    onClick={() => {
                      setAdding(true)
                    }}
                  ></input>
                </div>
              )}
            </div>
            <div className="table">
              <h3>School Maintenance</h3>
              <SchoolComponent parentCallback={handleCallback} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}