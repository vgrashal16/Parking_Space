import './App.css';
import Homepage from './components/homepage';
import ParkingLot from './components/parkingLot';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register';

const App: React.FC = () => { {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/lot" element={<ParkingLot />} />
          <Route path="/lot/register" element={<Register />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
