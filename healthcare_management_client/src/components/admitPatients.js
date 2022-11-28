import React, { useState, useEffect } from "react";
import axios from "../services/axios";
import Daxios from '../services/doctorService'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AdmitDetails from "./Reusable/admitDetails";
export const AdmitPatients = (props) => {
  const [admitPatientDetails, setAdmitpatientDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [admitData, setadmitData] = useState({});
  const [modalType, setmodalType] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [sugarLevel, setSugarLevel] = useState("");
  const [comment, setComment] = useState("");
  const [prescription, setPrescription] = useState("");
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getRequestDetails("admitted");
  }, []);
  const openViewInfo = (type, data) => {
    setmodalType(type);
    setadmitData(data);
    handleShow();
  };
  const getRequestDetails = (status) => {
    axios.post("/get/admit", { status: status }).then((result) => {
      setAdmitpatientDetails(result.data);
    });
  };
  const openRoundmodal = (type, data) => {
    setmodalType(type);
    setadmitData(data);
    handleShow();
  };
  const editRound=()=>{
    let obj={
      _id:admitData._id,
      patientId:admitData.patientId,
      height:height,
      weight:weight,
      bloodPressure:bloodPressure,
      sugarLevel:sugarLevel,
      comment:comment,
      prescription:prescription,
      roundDate:new Date(),
      doctor:localStorage.getItem('name')
    }
    Daxios.post('/update/round/details',obj)
    .then(result=>{
      if(result.data){
        handleClose()
        window.location.reload()
      }
    })
    
  }

  const openDischargemodal=(type,data)=>{
    setmodalType(type);
    setadmitData(data);
    handleShow();
  }
  const dischargepatient=()=>{
        let obj={
          appId:admitData._id,
          isAdmitted:"discharged"
        }
        Daxios.put('/discharge/patient',obj)
        .then(result=>{
          if(result.data){
            handleClose()
            getRequestDetails("admitted")
          }else{
            alert("something went wrong")
          }
        })
        .then(err=>{
          console.log(err)
        })
  }
  return (
    <div className="container-fluid">
      <Modal {...props} size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Patient Details</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType == "round" && (
            <div className="row">
              <div className="col-sm-12">
                <table className="table table-border table-striped">
                  <tbody>
                    <tr>
                      <th>Height</th>
                      <td>
                        <input
                          className="form-control"
                          type={"text"}
                          placeholder="Enter current height"
                          value={height}
                          onChange={(e) => {
                            setHeight(e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Weight</th>
                      <td>
                        <input
                          className="form-control"
                          type={"text"}
                          placeholder="Enter current weight"
                          value={weight}
                          onChange={(e) => {
                            setWeight(e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Blood Pressure</th>
                      <td>
                        <input
                          className="form-control"
                          type={"text"}
                          placeholder="Enter current blood pressure"
                          value={bloodPressure}
                          onChange={(e) => {
                            setBloodPressure(e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Sugar Level</th>
                      <td>
                        <input
                          className="form-control"
                          type={"text"}
                          placeholder="Enter current sugar Level"
                          value={sugarLevel}
                          onChange={(e) => {
                            setSugarLevel(e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Comments</th>
                      <td>
                        <input
                          className="form-control"
                          type={"text"}
                          placeholder="Enter some comment"
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Prescription</th>
                      <td>
                        <input
                          className="form-control"
                          type={"text"}
                          placeholder="Enter prescription"
                          value={prescription}
                          onChange={(e) => {
                            setPrescription(e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {modalType == "info" && (
            <div className="row mt-3">
              <div className="col-sm-12">
                <table className="table table-bordered table-striped">
                  <tbody>
                    <tr>
                      <th>Patient Name</th>
                      <td>
                        {admitData.patientDetails.firstName +
                          " " +
                          admitData.patientDetails.lastName}
                      </td>
                    </tr>
                    <tr>
                      <th>Doctor Name</th>
                      <td>
                        {admitData.doctordetails.firstName +
                          " " +
                          admitData.doctordetails.lastName}
                      </td>
                    </tr>
                    <tr>
                      <th>Gender</th>
                      <td>{admitData.patientDetails.gender}</td>
                    </tr>
                    <tr>
                      <th>Height</th>
                      <td>{admitData.patientDetails.height}</td>
                    </tr>
                    <tr>
                      <th>Weight</th>
                      <td>{admitData.patientDetails.weight}</td>
                    </tr>
                    <tr>
                      <th>Blood Pressure</th>
                      <td>{admitData.patientDetails.bloodPressure}</td>
                    </tr>
                    <tr>
                      <th>Sugar Level</th>
                      <td>{admitData.patientDetails.sugarLevel}</td>
                    </tr>
                    <tr>
                      <th>Blood group</th>
                      <td>{admitData.patientDetails.bloodGroup}</td>
                    </tr>
                  </tbody>
                </table>
                <h4 className="text-dark mt-3 m-0 p-0">Admit Details</h4>
                <hr className="m-0 p-0 mb-2"/>
                <AdmitDetails admitDetails={admitData.admitDetails}/>
              </div>
            </div>
          )}

          {
            modalType=='discharge' &&
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                          <h3 className="text-secondary text-center p-5">Are you sure you want to give discharge to this patient?</h3>
                    </div>
                </div>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          {
            modalType=='round' &&
            <Button variant="primary" onClick={()=>editRound()} >
            Submit
          </Button>
          }
         {
            modalType=='discharge' &&
            <Button variant="primary" onClick={()=>dischargepatient()} >
            Submit
          </Button>
          }
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row mt-3">
        <div className="col-sm-12">
          <h3 className="text-dark text-center">Admitted Patients</h3>
        </div>
      </div>
      <div className="row mt-3 p-3">
        <div className="col-sm-12">
          <div className="text-end">
          <button className="btn btn-primary" onClick={()=>getRequestDetails("admitted")}>Amitted Patient</button>
          &nbsp;<button className="btn btn-warning" onClick={()=>getRequestDetails("discharged")}>Discharged Patient</button>
          </div>
          
          {admitPatientDetails.length > 0 && (
            <table className="table table-bordered table-striped mt-3">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Room Type</th>
                  <th>Room Number</th>
                  <th>Admit Date</th>
                  <th>Doctor Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admitPatientDetails.map((detail, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {detail.patientDetails.firstName +
                          " " +
                          detail.patientDetails.lastName}
                      </td>
                      <td>{detail.admitDetails.roomType}</td>
                      <td>{detail.admitDetails.roomNo}</td>
                      <td>
                        {new Date(detail.admitDetails.admitDate).toDateString()}
                      </td>
                      <td>
                        {detail.doctordetails.firstName +
                          " " +
                          detail.doctordetails.lastName}
                      </td>
                      <td>
                        {localStorage.getItem("role") == "doctor" &&  detail.isAdmitted=="admitted" && (
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => openRoundmodal("round", detail)}
                          >
                            Add Round Details
                          </button>
                        )}
                        &nbsp;
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            openViewInfo("info", detail);
                          }}
                        >
                          View Info
                        </button>
                        &nbsp;
                        {localStorage.getItem("role") == "doctor" && detail.isAdmitted=="admitted" && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => openDischargemodal("discharge", detail)}
                          >
                            Discharge
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {admitPatientDetails.length == 0 && (
            <div className="row border border-secondary mt-3">
              <div className="col-sm-12">
                <h3 className="text-secondary text-center p-5">
                  No data available
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmitPatients;
