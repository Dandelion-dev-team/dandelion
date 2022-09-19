import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import Header from "../../components/navigation/header"
import SideNav from "../../components/navigation/sideNav"
import VariableComponent from "../../components/tables/variableComponent"
import VariablePane from "../../components/panes/variablePane"
import { readRecord } from "../../utils/CRUD"
import { verify_superuser_storage } from "../../utils/logins"
import { navigate } from "gatsby"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import VariableModal from "../../components/modals/variableModal";

export default function VariableMaintenance(props) {
  const [quantities, setQuantities] = useState("")
  const [viewedUser, setViewedUser] = useState("")
  const [logged, setLogged] = useState("")
  const [levels, setLevels] = useState([])
  const [data, setData] = useState(null)
  const [showVariable, setShowVariable] = useState(false)

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true)
        readRecord("/quantity", setQuantities)
    } else {
      navigate("/signin")
    }
  }, [])

  const handleCallback = childData => {
    setData(childData)
    readRecord("/levelbyvariable/" + childData.id, setLevels)
  }

  const stripDataWrapper = data => {
    setData(data.data)
  }

  const newVariable = () => {
    readRecord("/variable/blank", stripDataWrapper);
    setShowVariable(true)
  }

  const editVariable = (variable) => {
    setData(variable)
    setShowVariable(true)
  }

  if (typeof window !== `undefined` && logged) {
    return (
      <div className="dandelion">
        <Header />
        <div className="page-container">
          <SideNav />
          <ToastContainer />
          <div className="main-content">
            <div className="content-area">
                <div className="left-panel">
                  <div className="panel-body">
                    <VariableComponent parentCallback={handleCallback} />
                  </div>
                  <div className="panel-footer">
                    <div className="dandelion-button-group">
                      <button
                        className="dandelion-button large-button"
                        onClick={() => {newVariable()}}
                      >
                        New Variable
                      </button>
                    </div>
                  </div>
                </div>
                <div className="right-panel">
                  <div className={"panel-body"}>
                    {data ? (
                    <VariablePane
                      variable={data}
                      levels={levels}
                      editVariable={editVariable}
                    />
                    ) : (
                        <div className="dandelion-hint">
                            &larr; Click a variable to see the details or click the button &#8601; to create a new one
                          <br/><br/>
                          Note that variables are shared - any variables you create can be used by other people
                        </div>
                    )}
                  </div>
                </div>
            </div>
          </div>
        </div>
          {data ?
            <VariableModal
              show={showVariable}
              setShow={setShowVariable}
              quantities={quantities}
              variable={data}
            />
            : null
          }
      </div>
    )
  } else {
    return null
  }
}
