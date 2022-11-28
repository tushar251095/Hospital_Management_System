import React, { useEffect, useState } from "react";
import axios from '../../services/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export const Facility = (props) => {
    const [details, setDetails] = useState([]);
    const [IsDelete, setIsDelete] = useState(false)
    const [Editname, setEditName] = useState("");
    const [Editcount, setEditCount] = useState(0);
    const [EditremCount, setEditremCount] = useState(0);
    const [Editstatus, setEditStatus] = useState("Available");
    const [DeleteId, setDeleteId] = useState("")
    const [Edittype, setEdittype] = useState("room");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        getHospitalDetails()
    }, [])
    const getHospitalDetails = () => {
        axios.get("/get/hospital/details")
            .then(result => {
                setDetails(result.data)
            })
    }
    const openEdit = (data) => {
        setIsDelete(false)
        setEditName(data.name)
        setEditCount(data.count)
        setEditremCount(data.remCount)
        setEditStatus(data.status)
        setEdittype(data.type)
        handleShow()
    }
    const openDelete = (data) => {
        setIsDelete(true)
        setDeleteId(data._id)
        setEditName(data.name)
        handleShow()
    }
    const SaveEditDetails = (e) => {
        e.preventDefault()
        let obj = {
            name: Editname,
            count: Editcount,
            remCount: EditremCount,
            status: Editstatus,
            type:Edittype
        }
        axios.post('/update/hospital/details', obj)
            .then(result => {
                if (result.data) {
                    toast.success("Facility Updated successfully")
                    getHospitalDetails()
                    handleClose()

                } else {
                    toast.error("Something went wrong")
                }
            })
    }
    const DeleteDetails = () => {
        axios.delete('/delete/hospital/details/' + DeleteId)
            .then(result => {
                if (result.data) {
                    toast.success("Facility Deleted successfully")
                    getHospitalDetails()
                    handleClose()
                } else {
                    toast.error("Something went wrong")
                }
            })
    }
    return (
        <div className="container-fluid">
            <div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
            <Modal {...props} size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4>Hospital Details</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        IsDelete &&
                        <div>
                            <div className="row mt-3">
                                <div className="col-sm-12">
                                    <div className="text-center">
                                        <FontAwesomeIcon icon={faTrash} size="3x" style={{ color: 'red' }} className="ms-3 " />
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3 className="text-center text-secondary mt-3">Are you sure you want to Delete {Editname}?</h3>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        !IsDelete &&
                        <div>
                            <label>Total Count</label>
                            <input
                                type={"number"}
                                placeholder="Add Total quantity available"
                                value={Editcount}
                                className="form-control"
                                onChange={(e) => setEditCount(e.target.value)}
                            />
                            <label>Remaining Count</label>
                            <input
                                type={"number"}
                                placeholder="Add Remaining"
                                value={EditremCount}
                                className="form-control"
                                onChange={(e) => setEditremCount(e.target.value)}
                            />
                            <label>Status</label>
                            <select
                                className="form-control"
                                value={Editstatus}
                                onChange={(e) => setEditStatus(e.target.value)}
                            >
                                <option disabled>Please select one</option>
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                                <option value="Under-Maintainance">Under-Maintainance</option>
                                <option value="Damaged">Damaged</option>
                            </select>
                            <label>Type</label>
                            <select
                                className="form-control"
                                value={Edittype}
                                onChange={(e) => setEdittype(e.target.value)}
                            >
                                <option disabled>Please select one</option>
                                <option value="room">Room</option>
                                <option value="equipment">Equipment</option>
                            </select>
                        </div>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        !IsDelete && <Button variant="primary" onClick={(e) => SaveEditDetails(e)}>
                            Edit
                        </Button>
                    }
                    {
                        IsDelete && <Button variant="danger" onClick={(e) => DeleteDetails(e)}>
                            Delete
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
            <div className="row mt-3">
                <div className="col-sm-12">
                    {
                        details.length > 0 && <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Remaining</th>
                                    <th>Total</th>                                    
                                    {
                                                localStorage.getItem("role") == "admin" &&
                                                <th>Actions</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    details.map((equipment, index) => {
                                        return <tr key={index}>
                                            <td>{ equipment.name}</td>
                                            <td>{equipment.type}</td>
                                            <td>{equipment.status}</td>
                                            <td>{equipment.remCount}</td>
                                            <td>{equipment.count}</td>
                                            {
                                                localStorage.getItem("role") == "admin" &&
                                                <td>
                                                    <button className="btn btn-primary btn-sm" onClick={() => openEdit(equipment)}>Edit</button>&nbsp;
                                                    <button className="btn btn-secondary btn-sm" onClick={() => openDelete(equipment)}>Delete</button>
                                                </td>
                                            }

                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    }
                    {
                        details.length == 0 &&
                        <div className="row mt-3 p-3">
                            <div className="col-sm-12 border border-secondary">
                                <h3 className="p-5 text-secondary text-center">No Data Available</h3>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Facility;
