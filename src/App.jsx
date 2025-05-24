import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import Edit from './components/Edit';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/edit"
          element={
            <PrivateRoute>
              <Edit />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
