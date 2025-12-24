import Dashboard from "./pages/Dashboard";
import Signup from "./pages/signup"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {AuthProvider,useAuth} from './context/AuthContext'
import Login from "./pages/Login";
function App() {
  

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
