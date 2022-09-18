import './App.css';
import Header from './components/Header';
import Footer from './components/footer'
import Homepage from './components/homepage'
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
function App() {
  return (
    <Router>
        <div className="App">
          <Header/>
          <Routes>
            <Route path="/" element={<Homepage/>} />
          </Routes>
          <Footer/>
        </div>
    </Router>
    
  );
}

export default App;
