import React, { useEffect, useState } from "react"
import SideNav from "../../components/navigation/sideNav"
import Header from "../../components/navigation/header"
import "../../styles/App.scss"
import SchoolComponent from "../../components/tables/schoolComponent"
import SchoolModal from "../../components/modals/schoolModal"
import { readRecord } from "../../utils/CRUD"
import { verify_sysadmin_storage } from "../../utils/logins"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SchoolMaintenance(props) {
  const [logged, setLogged] = useState("");
  const [authList, setAuthorities] = useState(0)

  const [showSchool, setShowSchool] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
      if (verify_sysadmin_storage() == true) {
        setLogged(true);
        readRecord("/authority", setAuthorities)
      }
  }, [])

  const editSchool = school_id => {
    readRecord("/school/" + school_id, setData);
    setShowSchool(true)
  }

  const newSchool = () => {
    readRecord("/school/blank", setData);
    setShowSchool(true)
  }

  if (logged) {
    return (
      <div className="dandelion">
        <ToastContainer />
        <Header />
        <div className="page-container">
          <SideNav />
          <div className="main-content">
            <div className="content-area">
                <div className="one-panel">
                  <div className="panel-body">
                    <SchoolComponent editSchool={editSchool} />
                  </div>
                  <div className="panel-footer">
                    <div className="dandelion-button-group">
                      <button
                        className="dandelion-button large-button"
                        onClick={() => {newSchool()}}
                      >
                        New school
                      </button>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        {data ?
          <SchoolModal
              show={showSchool}
              setShow={setShowSchool}
              school={data.school}
              authList={authList}
          />
          : null}
      </div>
    )
  } else return null;
}
