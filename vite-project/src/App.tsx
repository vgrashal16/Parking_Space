import './App.css';
import Homepage from './components/homepage';
import ParkingLot from './components/parkingLot';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Car from './components/car';

const App: React.FC = () => { {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/lot" element={<ParkingLot />} />
          <Route path="/lot/register" element={<Register />} />
          <Route path="/lot/car" element={<Car/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
