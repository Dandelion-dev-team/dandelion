import { navigate } from "gatsby"
import Img from "gatsby-image"
import React, { useEffect, useState, Image } from "react"
import { verify_superuser_storage } from "../../utils/logins"
import { createRecordNavigate, readRecord } from "../../utils/CRUD"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "../../components/navigation/header";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col';
import ExperimentPane from "../../components/panes/experimentPane";
import ExperimentModal from "../../components/modals/experimentModal";

export default function ExperimentMaintenance(props) {
  //Tested
  const [experiment, setExperiment] = useState(null)
  const [logged, setLogged] = useState()
  const [userList, setUsers] = useState([])

  const [addUserList, setAddUsers] = useState([])
  const [removeUserList, setRemoveUsers] = useState([])

  // Modals
  const [showExperiment, setShowExperiment] = useState(false)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true)
      if (props.location.state) {
        readRecord(
          "/experiment/" + props.location.state.experiment.id,
          setExperiment
        )
        let school_id = localStorage.getItem("school_id")
        readRecord(
          "/user/byschoolandexperiment/" +
            school_id +
            "/" +
            props.location.state.experiment.id,
          setUsers
        )
      } else {
        if (typeof window !== `undefined`) {
          navigate("/superuser/activity-maintenance")
        }
      }
    } else {
      navigate("/signin")
    }
  }, [])

  const updateExperimentCallback = (new_data) => {
    setExperiment(new_data)
  }

  // useEffect(() => {
  //   if (reload) {
  //       readRecord(
  //         "/experiment/" + props.location.state.experiment.id,
  //         setExperiment
  //       )
  //       let school_id = localStorage.getItem("school_id")
  //       readRecord(
  //         "/user/byschoolandexperiment/" +
  //           school_id +
  //           "/" +
  //           props.location.state.experiment.id,
  //         setUsers
  //       )
  //     // setReload(false)
  //   }
  // }, [reload])

  // const onUpdateClick = () => {
  //   if (addUserList.length > 0) {
  //     addUserList.forEach(element => {
  //       let body = JSON.stringify({
  //         status: element.status,
  //       })
  //       createRecordNavigate(
  //         "/experiment_participant/" +
  //           props.location.state.experiment.id +
  //           "/" +
  //           element.id,
  //         body
  //       )
  //     })
  //   }
  //   window.location.reload(false)
  // }

  const User = user => {
    const [checked_value, setCheckedValue] = useState(false)
    useEffect(() => {
      if (addUserList.includes(user.user) || user.user.is_participant == true) {
        setCheckedValue(true)
      }
    }, [])

    const checkboxChange = e => {
      if (checked_value == false) {
        if (user.user.is_participant == false) {
          setAddUsers(arr => [...arr, user.user])
        }
      } else {
        if (addUserList.includes(user.user)) {
          let copy = [...addUserList]
          copy = copy.filter(item => item !== user.user)
          setAddUsers(copy)
        }
      }
    }

    return (
      <Row>
        <Col sm={1}>
          <input
              className="checkmark"
              type="checkbox"
              checked={checked_value}
              onChange={() => {
                checkboxChange(user)
              }}
          />
        </Col>
        <Col>
          <p>{user.user.username}</p>
        </Col>
      </Row>
    )
  }

  const editExperiment = () => {
    setShowExperiment(true)
  }

  if (typeof window !== `undefined` && logged && experiment) {
    return (
      <div className="dandelion">
        <Header />
        <div className="user-maintenance page-container">
          <SideNav />
          <ToastContainer />
          <div className="main-content">
            <div className="content-area">
              <div className="left-panel">
                <div className="panel-body">
                    <ExperimentPane
                      experiment={experiment}
                      project={props.location.state.project}
                      show_use_option={false}
                      show_edit_options={true}
                      editExperiment={editExperiment}
                      reload={reload}
                      setReload={setReload}
                    />
                </div>
              </div>
              <div className="right-panel">
                <div className="panel-body scrollable-container">
                  <div className="scrollable-header">
                    <h3>Select users for experiment:</h3>
                  </div>
                  <div className="scrollable-content">
                    <div className="user-list">
                      <Container fluid="sm">
                        {userList.users
                          ? userList.users.map(user => <User user={user} />)
                          : null}
                      </Container>
                    </div>
                  </div>
                  <div className="scrollable-footer">
                    {addUserList.length > 0 || removeUserList.length > 0 ? (
                      // <div className="finish-btn">
                        <input
                          type="submit"
                          className="dandelion-button"
                          value="Save"
                          // onClick={() => {
                          //   onUpdateClick()
                          // }}
                        ></input>
                      // </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {experiment ?
            <ExperimentModal
                show={showExperiment}
                setShow={setShowExperiment}
                experiment={experiment}
                setReload={setReload}
                updateExperiment={updateExperimentCallback}
            />
            : null
        }
      </div>
    )
  } else return null
}
