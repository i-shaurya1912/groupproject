import React from "react";
import { Leaf } from "lucide-react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

import Register from "./pages/Register";
import Calender from "./pages/Calender";
import Events from "./pages/Events";
import Reset from "./pages/Reset";
import Check from "./pages/Check";
import Arijit from "./pages/Arijit";

import Front from "./pages/Front";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="Welcome" element={<Welcome />}></Route>
        <Route path="/Calender" element={<Calender />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/Events" element={<Events />}></Route>
        <Route path="/Reset" element={<Reset />}></Route>
        <Route path="/Check" element={<Check />}></Route>
        
        <Route path="/" element={<Front />}></Route>
         <Route path="/Arijit" element={<Arijit />}></Route>
      </Routes>
    </div>
  );
};

export default App;
