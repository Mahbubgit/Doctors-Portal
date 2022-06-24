import './App.css';
import Navbar from './Pages/Shared/Navbar';
import { Routes, Route} from "react-router-dom";
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import Appointment from './Pages/Appointment/Appointment';

function App() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home> } />
        <Route path="/about" element={<About></About>} />
        <Route path="/appointment" element={<Appointment></Appointment>} />
        <Route path="/login" element={<Login></Login>} />
      </Routes>
      <button className="btn w-64 rounded-full bg-primary">Button</button>
    </div>
  );
}

export default App;
