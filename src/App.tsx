import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import HomePage from "./Home";
import Register from "./features/user/register";
import Login from "./features/user/login";
import Navbar from "./features/navbar";
import Profile from "./features/profile/profile";
import Orders from "./features/orderHistory/orders";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navbar/>}>
            <Route index  element={<HomePage/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/orders" element={<Orders/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/*" element={<Navigate replace to="/" />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
