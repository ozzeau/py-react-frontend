import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import EditItem from './components/EditItem'; 
import Edit from './components/Edit';
import PrivateRoute from './components/PrivateRoute';
import ItemForm from './components/ItemForm'; 
import './App.css';

function App() {
  const token = localStorage.getItem('token'); 

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/edit" replace /> : <LandingPage />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/edit" replace /> : <LoginForm />}
        />
        <Route
          path="/edit"
          element={
            <PrivateRoute>
              <Edit />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/itemN/:editItemId"
          element={
            <PrivateRoute>
              <EditItem />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:restaurantId/create-item/"
          element={
            <PrivateRoute>
              <ItemForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
