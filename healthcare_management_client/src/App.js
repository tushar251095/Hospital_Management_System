import './App.css';
import Header from './components/Reusable/Header';
import Footer from './components/Reusable/footer';
import Homepage from './components/homepage'
import Navbar from './components/Reusable/navbar';
import UserRegistration from './components/registrationForm'
import Login from './components/login'
import Admin from './components/Admin/adminLandingPage'
import Patient from './components/Patient/patientLandingPage'
import Doctor from './components/Doctor/doctorLandingPage'
import ManageSchedule from './components/Doctor/manageSchedule';
import Specialities from './components/Patient/specialities';
import DoctorList from './components/Patient/doctorList';
import MyAppointment from './components/Patient/myAppointment';
import ViewAppointment from './components/Doctor/viewAppointment';
import SearchPatient from './components/Doctor/SearchPatient';
import GetDoctors from './components/Admin/getDoctors';
import PatientRecords from './components/Patient/patientRecords';
import HospitalDetails from './components/Admin/hospitalDetails';
import Profile from './components/profile';
import PatientList from './components/Admin/patientList';
import { AddDoctor } from './components/Admin/addDoctor';
import BookAppointment from './components/Patient/bookAppointment';
import {RequireAuth} from './utlis/RequireAuth'
import { AuthProvider } from './utlis/AuthProvider';
import PatientHistory from './components/Doctor/patientHistory';
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import ViewFacility from './components/Doctor/viewFacility';
import ViewAdmitRequest from './components/Admin/viewAdmitRequest';
import AdmitPatients from './components/admitPatients';
function App() {
  return (
     <AuthProvider>
    <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Header/>
          {
            localStorage.getItem('token') !=null &&  <Navbar/>
          }
         
          <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route path="/user/registartion" element={<UserRegistration/>} />
            <Route path="/user/login" element={<Login/>}/>
            <Route element={ <RequireAuth allowedRoles={["admin"]}/>}>
                <Route path="/user/admin" element={<Admin/>}/>
                <Route path="/user/admin/patient/list" element={<PatientList/>}/>
                <Route path="/view/doctors" element={<GetDoctors/>}/>
                <Route path="/hospital/details" element={<HospitalDetails/>}/>
                <Route path="/add/doctor" element={<AddDoctor/>}/>
                <Route path="/admin/view/admit/request" element={<ViewAdmitRequest/>}/>
            </Route>
            <Route element={ <RequireAuth allowedRoles={["patient"]}/>}>
                <Route path="/user/patient" element={<Patient/>}/>
                <Route path="/user/patient/records" element={<PatientRecords/>}/>
                <Route path="/user/patient/specialities" element={<Specialities/>}/>
                <Route path="/user/patient/bookappointment" element={<BookAppointment/>}/>
                <Route path="/user/patient/doctorlist" element={<DoctorList/>}/>
                <Route path="/user/patient/appointments" element={<MyAppointment/>}/>
            </Route>
            <Route element={ <RequireAuth allowedRoles={["doctor"]}/>}>
              <Route path="/user/doctor" element={<Doctor/>}/>
              <Route path="/user/doctor/schedule" element={<ManageSchedule/>}/>
              <Route path="/user/doctor/view/appointments" element={<ViewAppointment/>}/>
              <Route path="/user/doctor/view/facility/details" element={<ViewFacility/>}/>
            </Route>
            <Route element={ <RequireAuth allowedRoles={["doctor","admin"]}/>}>
              <Route path="/user/doctor/search/patient" element={<SearchPatient/>}/>
              <Route path="/user/doctor/patient/history" element={<PatientHistory/>}/>
              <Route path="/view/admit/patient" element={<AdmitPatients/>}/>
            </Route>
            <Route element={ <RequireAuth allowedRoles={["doctor","patient"]}/>}>
              <Route path="/user/profile" element={<Profile/>}/>
            </Route>
          </Routes>
          <Footer/>
        </div>
    </Router>
     </AuthProvider>
    
  );
}

export default App;
