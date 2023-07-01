import React from "react";
import Navbar from "./components/Navbar";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages'
import Diemdanh from './pages/diemdanh'
import Ketqua from './pages/ketqua'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/diem-danh' element={<Diemdanh/>}/>
        <Route path='/ket-qua' element={<Ketqua/>}/>
      </Routes>
    </Router>
  );
}

export default App;