import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signin from './component/Signin';
import Signup from './component/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/login" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
