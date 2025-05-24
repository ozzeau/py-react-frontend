import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import EditItem from './components/EditItem'; 
import Edit from './components/Edit';
import PrivateRoute from './components/PrivateRoute';
import ItemForm from './components/ItemForm'; // ✅ import the new component
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
