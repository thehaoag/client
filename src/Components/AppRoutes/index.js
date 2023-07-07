import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Ketqua";
import Dashboard from "../../Pages/Trangchu";
import Inventory from "../../Pages/Diemdanh";
import Orders from "../../Pages/Import";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
    </Routes>
  );
}
export default AppRoutes;
