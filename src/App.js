import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signin from './component/pages/Signin';
import Signup from './component/pages/Signup';
import ProtectedRoute from "./component/sharedcomponent/ProtectedRoute"
import Notfound from './component/sharedcomponent/NotFound';
import Unauthorized from './component/sharedcomponent/Unauthorized';
import User from './component/pages/User';
import Task from './component/pages/Task';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/task" element={<ProtectedRoute role='Admin' element={<Task/>} />} />
        <Route path="/user" element={<ProtectedRoute role='Admin' element={<User/>} />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
