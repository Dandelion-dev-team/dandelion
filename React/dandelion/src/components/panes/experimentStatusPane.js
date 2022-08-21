import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import Accordion from 'react-bootstrap/Accordion'
import {hasDetails} from "../../utils/validation"
import {hasTreatmentVariables} from "../../utils/validation"
import {hasResponseVariables} from "../../utils/validation"
import {hasActiveConditions} from "../../utils/validation"
import {hasUnits} from "../../utils/validation"
import {hasParticipants} from "../../utils/validation"

export default function ExperimentStatusPane(props) {

  return (
    <div>
      {props.experiment ? (
            <div className="experiment-status">
              <div className="scrollable-inner">
                <p>
                  When you have green ticks against the first six items below, your experiment is
                  ready and you can set its status to <b>active</b>. You also need to complete the
                  last two items before your participants can record any observations.
                </p>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{props.node ? <CheckCircleIcon/> : <ErrorIcon/>} Node registered</Accordion.Header>
                    {props.node ?
                        <Accordion.Body>
                          <p>Your node is correctly registered in the system - Good!</p>
                        </Accordion.Body>
                        :
                        <Accordion.Body>
                          <p>Your node is not yet registered. You can do this on the overview page via the left-hand menu.
                          You will need the MAC address of the node which you can find by putting it into
                          configuration mode. The instructions to do that can be found
                            <a href="https://dandelion.sruc.ac.uk/reference/" target="_blank">here</a>.</p>
                          <p>It is not essential for your node to be connected to WiFi to take part in the
                          Dandelion experiments, but it still needs to be registered.</p>
                        </Accordion.Body>
                    }
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>{hasDetails(props.experiment) ? <CheckCircleIcon/> : <ErrorIcon/>} Basic details</Accordion.Header>
                    {hasDetails(props.experiment) ?
                        <Accordion.Body>
                          <p>You have set up the basic details for your experiment. Please double-check them before
                          recording any observations or sharing the experiment with any other schools.</p>
                        </Accordion.Body>
                        :
                        <Accordion.Body>
                          <p>There seems to be something missing from your basic details. Please check them using the
                          button on the main panel.</p>
                        </Accordion.Body>
                    }
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>{hasTreatmentVariables(props.experiment) ? <CheckCircleIcon/> : <ErrorIcon/>} Treatment variables</Accordion.Header>
                    {hasTreatmentVariables(props.experiment) ?
                        <Accordion.Body>
                          <p>You have set up at least one treatment variable - Good!</p>
                        </Accordion.Body>
                        :
                        <Accordion.Body>
                          <p>You need to set up your treatment variables. These are the aspects of the experiment
                            that you will actively change in order to see their effects.</p>
                          <p>For example, you might
                          give different groups of seedlings different quantities of nutrient solution.</p>
                          <p>Note that <b>species</b> is a treatment variable: it is one of the factors that
                          changes from one set of measurements to another.</p>
                          <p>Treatment variables are divided into <b>levels</b>. For example, if you are comparing
                          four weekly drops of nutrient solution against eight, you have two levels - 4 drops and
                          8 drops.</p>
                        </Accordion.Body>
                    }
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>{hasResponseVariables(props.experiment) ? <CheckCircleIcon/> : <ErrorIcon/>} Response variables</Accordion.Header>
                    {hasResponseVariables(props.experiment) ?
                        <Accordion.Body>
                          <p>You have set up at least one response variable - Good!</p>
                        </Accordion.Body>
                        :
                        <Accordion.Body>
                          <p>You need to set up your response variables. These identify the measurements that
                          your participants will take. They are also where you expect to see the effects of
                          the treatment variables.</p>
                          <p>For example, changing the level of nutrients given to
                          different groups of seedlings might affect how quickly they grow. In that case
                          you might choose <b>height</b> as a response variable.</p>
                        </Accordion.Body>
                    }
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>
                      <CheckCircleIcon/>
                      Hypotheses
                    </Accordion.Header>
                    {props.experiment.hypotheses.length === 0 ?
                        <Accordion.Body>
                          <p>You have no hypotheses but that's OK because they are optional.</p>
                        </Accordion.Body>
                        :
                        <Accordion.Body>
                            <p>You have at least two hypotheses - Good!</p>
                        </Accordion.Body>
                    }
                  </Accordion.Item>
                  <Accordion.Item eventKey="5">
                    <Accordion.Header>{
                      hasActiveConditions(props.experiment) ? <CheckCircleIcon/> : <ErrorIcon/>}
                      Conditions
                    </Accordion.Header>
                    {hasActiveConditions(props.experiment) ?
                        <Accordion.Body>
                          <p>You have set up at least two active conditions - Good!</p>
                        </Accordion.Body>
                        :
                        <Accordion.Body>
                          <p>A condition is a particular combination of your treatment variables. For example,
                          if you have two treatment variables, nutrient solution with two levels and species
                            with six levels, then you will have 12 conditions in total (2 x 6).</p>
                          <p>In some cases, you can choose not to include all possible conditions in your experiment
                            but you need at least two so that you can compare the results.
                          </p>
                        </Accordion.Body>
                    }
                  </Accordion.Item>
                  <Accordion.Item eventKey="6">
                    <Accordion.Header>
                      {hasUnits(props.experiment) ? <CheckCircleIcon/> : <ErrorIcon/>}
                      GrowCube layout
                    </Accordion.Header>
                      {hasUnits(props.experiment) ?
                        <Accordion.Body>
                          <p>You have set out the arrangement of planting in the GrowCube - Good!</p>
                        </Accordion.Body>
                        :
                        <Accordion.Body>
                          <p>Each level of the GrowCube is divided into a 5 x 5 grid. One of the grid
                            squares is set aside for the sensors leaving 24 squares that can be allocated
                            to the different conditions in your experiment. You can use more than one square
                            for each condition. Multiple exmaples of one condition are
                            called <b>units</b> or <b>replicates</b>.</p>
                          <p>Your participants will take measurements for a square at a time. You need to
                            record your planting plan in advance so that they can record their observations
                            against the correct conditions.
                          </p>
                        </Accordion.Body>
                    }
                  </Accordion.Item>
                  <Accordion.Item eventKey="7">
                    <Accordion.Header>
                      {hasParticipants(props.experiment) ? <CheckCircleIcon/> : <ErrorIcon/>}
                      Participants
                    </Accordion.Header>
                    {hasParticipants(props.experiment) ?
                        <Accordion.Body>
                          <p>You have at least one person to make observations - Good!</p>
                        </Accordion.Body>
                        :
                        <Accordion.Body>
                          <p>You need to choose the people that will participate in this experiment
                            by making observations of the response variables on a regular basis.
                          </p>
                        </Accordion.Body>
                    }
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
      ) : null}
    </div>
  )
}
