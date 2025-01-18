import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signin from './component/Signin';
import Signup from './component/Signup';
import Dashboard from './component/Dashboard';
import ProtectedRoute from './component/ProtectedRoute';
import NotFound from './component/NotFound';
import Unauthorized from './component/Unauthorized';
import Teams from './component/Teams';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute role='Admin' element={<Dashboard/>} />} />
        <Route path="/teams" element={<ProtectedRoute role='Admin' element={<Teams/>} />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
