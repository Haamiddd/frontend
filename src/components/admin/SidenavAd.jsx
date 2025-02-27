import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import axios from "axios";
import logo from "../../images/logo.png";
import { FaUser, FaBell, FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdInventory2 } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPrescription2 } from "react-icons/bs";
import Swal from "sweetalert2";
import "../../style.css"; // Add your custom styles

export default function SidenavAd() {
  const [pharmacy, setPharmacy] = useState({});
  const pharmacyId = localStorage.getItem("pharmacyId");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/pharmacy/${pharmacyId}`)
      .then((res) => {
        setPharmacy(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("pharmacyId");
    Swal.fire({
      icon: "success",
      title: "Logout Successful",
      text: "You have been successfully logged out.",
    }).then(() => {
      window.location.href = "/Pharmlogin";
    });
  };

  return (
    <div>
      {/* Top Navbar */}
      <Navbar
                    expand="lg"
                    className="navbar navbar-expand-lg   ftco_navbar ftco-navbar-light"
                    style={{backgroundColor:'#2a52857e',color:'white'}}
               >
        <Container>
          {/* Logo */}
          <Navbar.Brand href="/Admindashboard">
            <img src={logo} className="nav-logo" alt="logo" />
          </Navbar.Brand>

          {/* Navigation Links */}
          <Nav className="ml-auto">
            <Nav.Link href="/Admindashboard">
              <FaHome /> Dashboard
            </Nav.Link>
            <Nav.Link href="/Productdashboard">
              <MdInventory2 /> Products
            </Nav.Link>
            <Nav.Link href="/OrderManagement">
              <AiOutlineShoppingCart /> Orders
            </Nav.Link>
            <Nav.Link href="/PrescriptionManagement">
              <BsPrescription2 /> Prescriptions
            </Nav.Link>
            <Nav.Link href="/Profilead">
              <CgProfile /> Profile
            </Nav.Link>
          </Nav>

          {/* Right Side Icons */}
          <div className="nav-icons">
            <FaBell className="icon" />
            <button className="logout-btn" onClick={handleLogout}>
              <FaUser /> Log out
            </button>
          </div>
        </Container>
      </Navbar>

      {/* Content Area */}
      <div className="content">
        <h1 className="welcome">Hello {pharmacy.name}!</h1>
      </div>
    </div>
  );
}
