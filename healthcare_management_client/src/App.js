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
import { AddDoctor } from './components/Admin/addDoctor';
import {RequireAuth} from './utlis/RequireAuth'
import { AuthProvider } from './utlis/AuthProvider';
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
function App() {
  return (
     <AuthProvider>
    <Router>
        <div className="App">
          <Header/>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route path="/user/registartion" element={<UserRegistration/>} />
            <Route path="/user/login" element={<Login/>}/>
            <Route element={ <RequireAuth allowedRoles={["admin"]}/>}>
                <Route path="/user/admin" element={<Admin/>}/>
                <Route path="/add/doctor" element={<AddDoctor/>}/>
            </Route>
            <Route element={ <RequireAuth allowedRoles={["patient"]}/>}>
                <Route path="/user/patient" element={<Patient/>}/>
            </Route>
            <Route element={ <RequireAuth allowedRoles={["doctor"]}/>}>
              <Route path="/user/doctor" element={<Doctor/>}/>
              <Route path="/user/doctor/schedule" element={<ManageSchedule/>}/>
            </Route>
          </Routes>
          <Footer/>
        </div>
    </Router>
     </AuthProvider>
    
  );
}

export default App;
