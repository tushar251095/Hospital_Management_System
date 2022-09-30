import './App.css';
import Header from './components/Header'
import Footer from './components/footer'
import Homepage from './components/homepage'
import NavBar from './components/navbar'
import UserRegistration from './components/registrationForm'
import Test from './components/test'
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
function App() {
  return (
    <Router>
        <div className="App">
          <Header/>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route path="/user/registartion" element={<UserRegistration/>} />
            <Route path="/test" element={<Test/>}/>
          </Routes>
          <Footer/>
        </div>
    </Router>
    
  );
}

export default App;
