import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import HomePage from "./Home";
import Register from "./features/user/register";
import Login from "./features/user/login";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<HomePage/>}
          />
          <Route
            path="/login"
            element={<Login/>}
          />
          <Route
            path="/register"
            element={<Register/>}
          />
          <Route
            path="/*"
            element={<Navigate replace to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
