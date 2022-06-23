import './App.css';
import Navbar from './Pages/Shared/Navbar';
import { Routes, Route} from "react-router-dom";
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home> } />
        <Route path="/about" element={<About></About>} />
        <Route path="/login" element={<Login></Login>} />
      </Routes>
      <button className="btn w-64 rounded-full bg-primary">Button</button>
    </div>
  );
}

export default App;
