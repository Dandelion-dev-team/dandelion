import { navigate } from "gatsby"
import React, { useEffect, useState, Image } from "react"
import { verify_superuser_storage } from "../../utils/logins"
import {readRecord } from "../../utils/CRUD"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/sideNav"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "../../components/navigation/header";
import ExperimentStatusPane from "../../components/panes/experimentStatusPane"
import ExperimentPane from "../../components/panes/experimentPane";
import ExperimentModal from "../../components/modals/experimentModal";
import TreatmentModal from "../../components/modals/treatmentModal"
import ResponseModal from "../../components/modals/responseModal"
import ParticipantsModal from "../../components/modals/participantsModal"
import UnitsModal from "../../components/modals/unitsModal"
import HypothesesModal from "../../components/modals/hypothesesModal"
import ConditionsModal from "../../components/modals/conditionsModal"
import StatusModal from "../../components/modals/statusModal"

export default function ExperimentMaintenance(props) {
  //Tested
  const [experiment, setExperiment] = useState(null)
  const [logged, setLogged] = useState(false)

  // Modals
  const [showExperiment, setShowExperiment] = useState(false)
  const [showTreatment, setShowTreatment] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [showHypotheses, setShowHypotheses] = useState(false)
  const [showConditions, setShowConditions] = useState(false)
  const [showUnits, setShowUnits] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [showStatus, setShowStatus] = useState(false)

  const [node, setNode] = useState(false)
  const [imageToggle, setImageToggle] = useState(false)
  const [reloadToggle, setReloadToggle] = useState(false)

  useEffect(() => {
    if (verify_superuser_storage() === true) {
      setLogged(true)
      if (props.location.state) {
        readRecord(
          "/experiment/" + props.location.state.experiment_id,
          setExperiment
        )
      } else {
        if (typeof window !== `undefined`) {
          navigate("/superuser/activity-maintenance")
        }
      }
      // ToDo: Allow for more than one node per school
      let school_id = localStorage.getItem("school_id")
      readRecord(
      "/node/byschool/" + school_id,
      setNode
      )
    } else {
      navigate("/signin")
    }
  }, [reloadToggle])

  const updateExperimentCallback = (new_data) => {
    setExperiment(new_data)
  }

  const editExperiment = () => {setShowExperiment(true)}
  const editTreatment = () => {setShowTreatment(true)}
  const editResponse = () => {setShowResponse(true)}
  const editHypotheses = () => {setShowHypotheses(true)}
  const editConditions = () => {setShowConditions(true)}
  const editParticipants = () => {setShowParticipants(true)}
  const editUnits = () => {setShowUnits(true)}
  const editStatus = () => {setShowStatus(true)}

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
                      logged={logged}
                      experiment={experiment}
                      show_use_option={false}
                      show_edit_options={true}
                      editExperiment={editExperiment}
                      editTreatment={editTreatment}
                      editResponse={editResponse}
                      editHypotheses={editHypotheses}
                      editConditions={editConditions}
                      editParticipants={editParticipants}
                      editUnits={editUnits}
                      editStatus={editStatus}
                      reload={imageToggle}
                      setReload={setImageToggle}
                    />
                </div>
              </div>
              <div className="right-panel">
                <div className="panel-body scrollable-container">
                  <div className="scrollable-header">
                    <h3>Experiment status: {experiment.status}</h3>
                  </div>
                  <div className="scrollable-content">
                    <ExperimentStatusPane
                        experiment={experiment}
                        node={node}
                    />
                  </div>
                  <div className="scrollable-footer">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ExperimentModal
            show={showExperiment}
            setShow={setShowExperiment}
            experiment={experiment}
            reload={imageToggle}
            setReload={setImageToggle}
            updateExperiment={updateExperimentCallback}
            project={props.location.state.project}
        />
        <TreatmentModal
            show={showTreatment}
            setShow={setShowTreatment}
            experiment={experiment}
            reload={reloadToggle}
            setReload={setReloadToggle}
        />
        <ResponseModal
            show={showResponse}
            setShow={setShowResponse}
            experiment={experiment}
            reload={reloadToggle}
            setReload={setReloadToggle}
        />
        <ConditionsModal
            show={showConditions}
            setShow={setShowConditions}
            experiment={experiment}
            reload={reloadToggle}
            setReload={setReloadToggle}
        />
        <ParticipantsModal
            show={showParticipants}
            setShow={setShowParticipants}
            experiment={experiment}
            reload={reloadToggle}
            setReload={setReloadToggle}
        />
        <UnitsModal
            show={showUnits}
            setShow={setShowUnits}
            experiment={experiment}
            reload={reloadToggle}
            setReload={setReloadToggle}
            node={node}
        />
        <HypothesesModal
            show={showHypotheses}
            setShow={setShowHypotheses}
            experiment={experiment}
            reload={reloadToggle}
            setReload={setReloadToggle}
        />
        <StatusModal
            show={showStatus}
            setShow={setShowStatus}
            experiment={experiment}
            reload={reloadToggle}
            setReload={setReloadToggle}
        />
      </div>
    )
  } else return null
}
