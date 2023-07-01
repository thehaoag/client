import React from "react";
import {Nav, NavLink, NavMenu} from './NavbarElements'

const Navbar = () => {
    return (
        <Nav>
            <NavLink to="/">
                <img src={require('../../Images/logo.png')} width="50px" alt="Logo"/>
            </NavLink>

            <NavMenu>
                <NavLink to="/" activestyle='false'>
                    Trang chủ
                </NavLink>
                <NavLink to="/diem-danh" activestyle='false'>
                    Điểm danh
                </NavLink>
                <NavLink to="/ket-qua" activestyle='false'>
                    Kết quả
                </NavLink>
            </NavMenu>
        </Nav>
    )
}

export default Navbar