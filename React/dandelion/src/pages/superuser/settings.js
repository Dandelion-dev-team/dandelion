import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import NodeInfoComponent from "../../components/cards/nodeInfoCard"
import { readRecord } from "../../utils/CRUD"
import { verify_superuser_storage } from "../../utils/logins"
import { navigate } from "gatsby"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from "@mui/icons-material/Edit"

export default function SuperuserSettings() {
  const [fetchedSchool, setSchool] = useState("")
  const [logged, setLogged] = useState("")

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      let school_id = localStorage.getItem("school_id")
      readRecord("/school/" + school_id, setSchool)
      setLogged(true)
    } else {
      navigate("/signin")
    }
  }, [])

  if (typeof window !== `undefined` && logged) {
    return (
      <div>
        <SideNav />
        <div className="settings-container">
          <ToastContainer />
          <div className="title">
            {fetchedSchool ? <h3>{fetchedSchool.school.name}</h3> : null}
          </div>
          <div className="content">
            <div className="settings-pane">
              <div className="school-image">
                {fetchedSchool ? <img src={fetchedSchool.school.image_full} /> : null}
                  <div className='edit-circle'>
                    <EditIcon className='edit-icon' />
                  </div>
              </div>
              <div className="spacer" />
              <div className="node-settings">
                <h3>Node Settings</h3>
              </div>
            </div>
            <div className="details-pane">
              <div className="details">
                {fetchedSchool ? <h3>Authority ID: {fetchedSchool.school.authority_id}</h3> : null}
                {fetchedSchool ? <h3>Name: {fetchedSchool.school.name}</h3> : null}
                {fetchedSchool ? <h3>Address: {fetchedSchool.school.address_line_1}</h3> : null}
                {fetchedSchool ? <h3>Town: {fetchedSchool.school.town}</h3> : null}
                {fetchedSchool ? <h3>Email: {fetchedSchool.school.email}</h3> : null}
                {fetchedSchool ? <h3>Phone: {fetchedSchool.school.telephone}</h3> : null}
              </div>
            </div>
            <div className="spacer" />
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}


//  <div>
//         <SideNav />
//         <div className="settings-container">
//           <div className="settings-content">
//             {fetchedSchool ? <h3>{fetchedSchool.school.name}</h3> : null}
//             <div className="settings-pane">
//               <div className="school-image"></div>
//               <div className="node-settings">
//                 {fetchedSchool ? (
//                   <NodeInfoComponent node={fetchedSchool.school.nodes} />
//                 ) : null}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> 