import React, { useEffect, useState, useRef } from "react"
import SysSideNav from "../../components/navigation/sysadminSideNav"
import { createRecord, readAdminRecord, readRecord, updateRecord } from "../../utils/CRUD"
import {ToastContainer} from "react-toastify";

export default function IssueMaintenance(props) {
    return (
        <div>
            <div>
                <SysSideNav/>
                <ToastContainer />
                <div className="issue-maintenance-container">
                    <div className="issue-content">
                        <div className="content-wrapper">
                            <div className="table">
                                {/* table */}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
