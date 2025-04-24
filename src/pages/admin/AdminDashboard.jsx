import React, { useEffect, useState } from "react";
import Sidenav from '../../components/admin/SidenavAd';
import { GrNotes } from 'react-icons/gr';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPrescription2 } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import DispatchedOrdersReport from "./DispatchedOrdersReport"; // 👈 import your report component

export default function AdminDashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    const pharmacyId = localStorage.getItem('pharmacyId');
    if (!pharmacyId) {
      navigate('/Pharmlogin');
    }
  }, [navigate]);

  const [prescriptionCount, setPrescriptionCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrdersCount] = useState(0);

  const pharmacyId = localStorage.getItem("pharmacyId");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/prescription/getprescriptioncount/" + pharmacyId)
      .then((res) => {
        setPrescriptionCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pharmacyId]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product/getproductcount/" + pharmacyId)
      .then((res) => {
        setProductCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pharmacyId]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/order/ordercount/" + pharmacyId)
      .then((res) => {
        setOrdersCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pharmacyId]);

  return (
    <div>
      <Sidenav />
      <div className="row px-2">
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

            {/* Income Report Section */}
            <div className="mt-4">
              <h5 className="mb-3">Income Report</h5>
              <DispatchedOrdersReport pharmacyId={pharmacyId} />
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
