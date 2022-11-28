import React from "react";
import { useEffect, useState } from "react";
import axios from "../../services/patientService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AdmitDetails from "../Reusable/admitDetails";
import PatientRecords from "../Patient/patientRecords";
export const PatientHistory = (props) => {
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [appdata, setAppdata] = useState({});
  const handleShow = () => setShow(true);
  const [record, setRecord] = useState([]);
  const showData = (e, data) => {
    e.preventDefault();
    setAppdata(data);
    //console.log(appdata)
    handleShow();
  };
  useEffect(() => {
    axios
      .get("/history/" + localStorage.getItem("patientId"))
      .then((result) => {
        setRecord(result.data);
        //console.log(result.data)
      });
  }, []);
  return (
    <div className="container-fluid">
      <div className="row g-0">
        <div className="col-sm-12">
          <h3 className="text-center mt-4">Patient Records</h3>
        </div>
      </div>
      <div className="row g-0 mt-3">
        <div className="col-sm-12">
          {record.length == 0 && (
            <div className="row border border-secondary mt-3">
              <div className="col-sm-12">
                <h3 className="text-secondary text-center p-5">
                  Patient Details Not Available
                </h3>
              </div>
            </div>
          )}
          {record.length > 0 && (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Date</th>
                  <th>Appointment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {record.map((rec, index) => (
                  <tr key={index}>
                    <td>
                      {rec.doctordetails.firstName +
                        " " +
                        rec.doctordetails.lastName}
                    </td>
                    <td>
                      {new Date(rec.appointmentTimestamp).toLocaleString()}
                    </td>
                    <td>{rec.status}</td>
                    <td>
                      <div className="text-center">
                        {rec.status == "attended" && (
                          <button
                            className="btn btn-info btn-sm"
                            onClick={(e) => showData(e, rec)}
                          >
                            View Details
                          </button>
                        )}
                        {rec.status != "attended" && (
                          <p className="text-danger">No action to perform</p>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {Object.keys(appdata).length != 0 && (
        <Modal {...props} size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Appointment Details</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <table className="table table-bordered table-striped">
                <tbody>
                  <tr>
                    <th>Doctor Name</th>
                    <td>
                      {appdata.doctordetails.firstName +
                        " " +
                        appdata.doctordetails.lastName}
                    </td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>
                      {new Date(appdata.appointmentTimestamp).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <th>Height</th>
                    <td>{appdata.appointmentDetails.height}</td>
                  </tr>
                  <tr>
                    <th>Weight</th>
                    <td>{appdata.appointmentDetails.weight}</td>
                  </tr>
                  <tr>
                    <th>Blood Group</th>
                    <td>{appdata.appointmentDetails.bloodGroup}</td>
                  </tr>
                  <tr>
                    <th>Blood Pressure</th>
                    <td>{appdata.appointmentDetails.bloodPressure}</td>
                  </tr>
                  <tr>
                    <th>Sugar Level</th>
                    <td>{appdata.appointmentDetails.sugarLevel}</td>
                  </tr>
                  <tr>
                    <th>Consultation</th>
                    <td>{appdata.appointmentDetails.comment}</td>
                  </tr>
                  <tr>
                    <th>Prescription</th>
                    <td>{appdata.appointmentDetails.prescription}</td>
                  </tr>
                </tbody>
              </table>
              {appdata.admitDetails != undefined && (
                <AdmitDetails admitDetails={appdata.admitDetails} />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
export default PatientHistory;
