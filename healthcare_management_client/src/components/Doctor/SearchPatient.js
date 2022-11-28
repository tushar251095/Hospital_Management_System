import React from "react";
import axios from "../../services/patientService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const SearchPatient = (props) => {
  const [field, setField] = useState("firstName");
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const displayPatientProfile = (e, id) => {
    axios.get("/profile/" + id).then((result) => {
      setProfile(result.data);
      handleShow();
      console.log(result);
    });
  };
  const getPatientHistory = (e, id) => {
    e.preventDefault();
    localStorage.setItem("patientId", id);
    navigate("/user/doctor/patient/history");
  };
  const getPatients = (e) => {
    e.preventDefault();
    let obj = {
      query: query,
      field: field,
    };
    axios
      .post("/search", obj)
      .then((result) => {
        setList(result.data);
        //console.log(result.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Serach Patient</h3>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-12">
          <label className="lables">Select Field to search</label>
          <select
            className="form-control w-25"
            value={field}
            onChange={(e) => setField(e.target.value)}
          >
            <option className="form-control" value="firstName">
              First Name
            </option>
            <option className="form-control" value="lastName">
              Last Name
            </option>
          </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-12">
          <div className="input-group">
            <div className="form-outline  w-25">
              <input
                type={"search"}
                placeholder={"Search patient"}
                className="form-control"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: "100px" }}
              onClick={(e) => getPatients(e)}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {list.length > 0 && (
        <div className="row mt-3">
          <div className="col-sm-12">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Patient Email</th>
                  <th>Patient Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((patient, index) => (
                  <tr key={index}>
                    <td>{patient.firstName + " " + patient.lastName}</td>
                    <td>{patient.email}</td>
                    <td>{patient.contact}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={(e) =>
                          displayPatientProfile(e, patient.patientId)
                        }
                      >
                        Profile
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={(e) => getPatientHistory(e, patient.patientId)}
                      >
                        Records
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {list.length == 0 && (
        <div className="row border border-secondary mt-3">
          <div className="col-sm-12">
            <h3 className="text-secondary text-center p-5">
              Patient Details Not Available
            </h3>
          </div>
        </div>
      )}
      <Modal {...props} size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Patient Profile</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="lables">Full Name: &nbsp;</label>
          <span style={{ fontSize: "18px" }}>
            {profile.firstName + " " + profile.lastName}
          </span>{" "}
          <br />
          <label className="lables">Age: &nbsp;</label>
          <span style={{ fontSize: "18px" }}>{profile.age}</span> <br />
          <label className="lables">Gender: &nbsp;</label>
          <span style={{ fontSize: "18px" }}>{profile.gender}</span>
          <br />
          <label className="lables">Weight: &nbsp;</label>
          {profile.weight == undefined && (
            <span style={{ fontSize: "18px" }}>
              N/A
              <br />
            </span>
          )}
          {profile.weight != undefined && (
            <span style={{ fontSize: "18px" }}>
              {profile.weight}
              <br />
            </span>
          )}
          <label className="lables">Height: &nbsp;</label>
          {profile.height == undefined && (
            <span style={{ fontSize: "18px" }}>
              N/A
              <br />
            </span>
          )}
          {profile.height != undefined && (
            <span style={{ fontSize: "18px" }}>
              {profile.height}
              <br />
            </span>
          )}
          <label className="lables">Blood Pressure: &nbsp;</label>
          {profile.bloodPressure == undefined && (
            <span style={{ fontSize: "18px" }}>
              N/A
              <br />
            </span>
          )}
          {profile.bloodPressure != undefined && (
            <span style={{ fontSize: "18px" }}>
              {profile.bloodPressure}
              <br />
            </span>
          )}
          <label className="lables">Sugar Level: &nbsp;</label>
          {profile.sugarLevel == undefined && (
            <span style={{ fontSize: "18px" }}>
              N/A
              <br />
            </span>
          )}
          {profile.sugarLevel != undefined && (
            <span style={{ fontSize: "18px" }}>
              {profile.sugarLevel}
              <br />
            </span>
          )}
          <label className="lables">Blood Group: &nbsp;</label>
          {profile.bloodGroup == undefined && (
            <span style={{ fontSize: "18px" }}>
              N/A
              <br />
            </span>
          )}
          {profile.bloodGroup != undefined && (
            <span style={{ fontSize: "18px" }}>
              {profile.bloodGroup}
              <br />
            </span>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default SearchPatient;
