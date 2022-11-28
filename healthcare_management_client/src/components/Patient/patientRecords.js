import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../../services/patientService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AdmitDetails from "../Reusable/admitDetails";
export const PatientRecords = (props) => {
  const [Appointments, setAppointment] = useState([]);
  const [show, setShow] = useState(false);
  const [details, setdetails] = useState({
    doctordetails: {
      firstname: "",
      lastName: "",
    },
    appointmentDetails: {
      height: "",
      weight: "",
      bloodGroup: "",
      bloodPressure: "",
      prescription: "",
      comment: "",
    },
    description: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    ViewAppointment("attended");
  }, []);
  const ViewAppointment = (status) => {
    axios.get("/get/appoitnments/" + status).then((res) => {
      setAppointment(res.data);
      //console.log(res.data);
    });
  };
  const ShowDetails = (e, details) => {
    e.preventDefault();
    setdetails(details);
    handleShow();
  };
  return (
    <div className="container-fluid">
      <Modal {...props} size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Patient Details</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-12">
              <div className="">
                <table className="table table-bordered table-striped">
                  <tbody>
                    <tr>
                      <th>Doctor Name</th>
                      <td>
                        {details.doctordetails.firstName +
                          " " +
                          details.doctordetails.lastName}
                      </td>
                    </tr>
                    <tr>
                      <th>Appoint ment Reason</th>
                      <td>{details.discription}</td>
                    </tr>
                    <tr>
                      <th>Height</th>
                      <td>{details.appointmentDetails.height}</td>
                    </tr>
                    <tr>
                      <th>Weight</th>
                      <td>{details.appointmentDetails.weight}</td>
                    </tr>
                    <tr>
                      <th>Blood Group</th>
                      <td>{details.appointmentDetails.bloodGroup}</td>
                    </tr>
                    <tr>
                      <th>Blood Pressure</th>
                      <td>{details.appointmentDetails.bloodPressure}</td>
                    </tr>
                    <tr>
                      <th>Sugar Level</th>
                      <td>{details.appointmentDetails.sugarLevel}</td>
                    </tr>
                    <tr>
                      <th>Doctor Comment</th>
                      <td>{details.appointmentDetails.comment}</td>
                    </tr>
                    <tr>
                      <th>Doctor Prescription</th>
                      <td>{details.appointmentDetails.prescription}</td>
                    </tr>
                  </tbody>
                </table>
                {details.admitDetails != undefined && (
                  <AdmitDetails admitDetails={details.admitDetails} />
                )}
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-12"></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row">
        <div className="col-sm-12">
          <h3 className="text-center mt-3 text-dark">Medical History</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="text-end">
            <button
              className="btn btn-success btn-sm"
              onClick={() => ViewAppointment("attended")}
            >
              Attended
            </button>
            &nbsp;
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => ViewAppointment("cancelled")}
            >
              Cancelled
            </button>
          </div>
        </div>
      </div>
      <div className="row g-0 mt-3">
        <div className="col-sm-12">
          {Appointments.length == 0 && (
            <div className="row border border-secondary mt-3">
              <div className="col-sm-12">
                <h3 className="text-secondary text-center p-5">
                  Patient Details Not Available
                </h3>
              </div>
            </div>
          )}
          {Appointments.length > 0 && (
            <table className="table table-bordered table-striped">
              <thead className="bg-info text-light">
                <tr>
                  <th>Sr.</th>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Appointments.map((appointment, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {new Date(
                          appointment.appointmentTimestamp
                        ).toLocaleString()}
                      </td>
                      <td>
                        {appointment.doctordetails.firstName +
                          " " +
                          appointment.doctordetails.lastName}
                      </td>
                      <td>{appointment.discription}</td>
                      {appointment.status == "cancelled" && (
                        <td>
                          <p className="text-danger">Appointment Cancelled</p>
                        </td>
                      )}
                      {appointment.status == "attended" && (
                        <td>
                          <button
                            className="btn btn-info btn-sm"
                            onClick={(e) => ShowDetails(e, appointment)}
                          >
                            View
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
