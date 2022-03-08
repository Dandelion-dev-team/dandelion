import React, { useEffect, useState, useRef } from "react"
import "../../../styles/App.scss"
import TuneIcon from '@mui/icons-material/Tune';
import VariableListComponent from "../../../components/cards/variableListComponent";
import ViewDetailedVariable from "../../../components/modals/viewDetailedVariable";
import VariableSelectedComponent from "../../../components/cards/variableSelectedComponent";
import PaginationComponent from "../../../components/navigation/pagination";
import { navigate } from "gatsby";

export default function ResponseVariables(props) {
    const [search_value, changeSearch] = useState("");
    const [variable_list, setVariables] = useState("");
    const [show_details, setShowDetails] = useState("");
    const [full_detail_variable, setDetailVariable] = useState("")
    const [modal_editing, setModalEditing] = useState();

    const [selected_list, updateSelectedList] = useState([]);
    const [treatment_variables_list, setTreatmentVariables] = useState([]);

    const handleSearchValueChange = e => {
        changeSearch(e.target.value)
    }

    const modalCallback = e => {
        setShowDetails(false);
    }

    const checkboxCallback = e => {
        let val = e.data;
        if (e.value == true) {
            updateSelectedList(arr => [...arr, val]);
        } else {
            updateSelectedList(selected_list.filter(item => item !== val));
        }
    }

    const handleDetailCallback = index => {
        fetch("http://localhost:3000/responseVariableFull/" + index, {
            method: "GET",
            headers: new Headers({
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                Expires: 0,
            }),
        })
            .then(response => response.json())
            .then(data => setDetailVariable(data)).then(setModalEditing(false)).then(setShowDetails(true));
    }
    const handleEditCallback = index => {
        fetch("http://localhost:3000/responseVariableFull/" + index, {
            method: "GET",
            headers: new Headers({
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                Expires: 0,
            }),
        })
            .then(response => response.json())
            .then(data => setDetailVariable(data)).then(setModalEditing(true)).then(setShowDetails(true));
    }

    useEffect(() => {
        setTreatmentVariables(props.location.state.treatmentVariables);
        // Update the document title using the browser API
        fetch("http://localhost:3000/responseVariableShortlist", {
            method: "GET",
            headers: new Headers({
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': 0,
            })
        }).then(response => response.json())
            .then(
                data => setVariables(data));
    }, []);

    return (
        <div>
            {show_details ? <ViewDetailedVariable callback={modalCallback} variable={full_detail_variable} startEditing={modal_editing} /> : null}
            <div className="treatment-container">
                <div className="content">
                    <div className="content-wrapper">
                        <div className="treatment-pane">
                            <div className="treatment-content">
                                <div className="title">
                                    <h3>Add Response Variables</h3>
                                </div>
                                <div className="search-tune-row">
                                    <input
                                        type="text"
                                        className="search-box"
                                        placeholder="Search"
                                        value={search_value}
                                        onChange={handleSearchValueChange}
                                    />
                                    <div className="tune-margin">
                                        <TuneIcon onClick={() => {
                                            console.log("clicked tune");
                                        }} className="tune-icon" />
                                    </div>
                                </div>
                                <div className="treatment-list">
                                    {variable_list
                                        ? variable_list.map(variable => (
                                            <VariableListComponent mappedValue={variable} detailCallback={handleDetailCallback} checkCallback={checkboxCallback} />
                                        )) : <h3>No Experiments found</h3>}
                                </div>
                                <PaginationComponent pageIndex={3} numPages={4} />
                            </div>
                        </div>
                        <div className="treatment-selected-pane">
                            <div className="treatment-selected-content">
                                <div className="title">
                                    <h3>Your Response Variables</h3>
                                </div>
                                <div className="selected-list">
                                    {selected_list ? selected_list.map(variable => (<VariableSelectedComponent editCallback={handleEditCallback} data={variable} />)) : null}
                                </div>
                                <div className="btn-row">
                                    <input
                                        type="submit"
                                        className="add-new-btn"
                                        value="Add new variable"
                                        onClick={() => {
                                            console.log("");
                                        }}
                                    ></input>
                                    {selected_list.length > 0 ? <input
                                        type="submit"
                                        className="continue-btn"
                                        value="Continue"
                                        onClick={() => {
                                            if (typeof window !== `undefined`) {
                                            navigate("/activities/create-experiment/select-conditions",
                                            {
                                                state: {treatmentVariables: treatment_variables_list, responseVariables: selected_list},
                                            });
                                        }
                                        }}
                                    ></input> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}