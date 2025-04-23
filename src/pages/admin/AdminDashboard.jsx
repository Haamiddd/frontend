import React, { useEffect, useState } from "react";
import Sidenav from '../../components/admin/SidenavAd'
import { GrNotes } from 'react-icons/gr'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPrescription2 } from "react-icons/bs";
import { useNavigate  } from 'react-router-dom';
import axios from "axios";


export default function AdminDashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in (e.g., check if a token or user data exists in local storage)
    const pharmacyId = localStorage.getItem('pharmacyId');
    if (!pharmacyId) {
      navigate('/Pharmlogin'); // Redirect to the dashboard if logged in
    }
  }, [navigate]);



  const [prescriptionCount, setPrescriptionCount] = useState(0);
  const [productCount, setProductCount] = useState();
  const [orderCount, setOrdersCount] = useState(0);

  const pharmacyId = localStorage.getItem("pharmacyId");
  console.log(pharmacyId)

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/prescription/getprescriptioncount/" + pharmacyId) 
      .then((res) => {
        setPrescriptionCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product/getproductcount/" + pharmacyId) 
      .then((res) => {
        setProductCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/order/ordercount/" + pharmacyId)
      .then((res) => {
        setOrdersCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{backgroundColor:''}}>
      <Sidenav />
      <div className="row px-2" style={{backgroundColor:'',}}>
        <div className="col-md-12">
          <main className="main-container">
            <h5 className="text-center">Admin Dashboard</h5>
            <div className="main-cards">
              <div className="cards">
                <i className="bx"><GrNotes /></i>
                <span>
                  <h5>Products</h5>
                  <p>{productCount}</p>
                </span>  
              </div>
              <div className="cards">
                <i className="bx"><AiOutlineShoppingCart /></i>
                <span>
                  <h5>Orders</h5>
                  <p>{orderCount}</p>
                </span>
                  
              </div>
              <div className="cards">
                <i className="bx"><BsPrescription2 /></i>
                  <span>
                    <h5>Prescriptions</h5>
                    <p>{prescriptionCount}</p>
                  </span>
              </div>

            </div>
            <div>
              <h1>Income report </h1>
            </div>
           
           
            
          </main>
        </div>
      </div>
    </div>
  )
}
