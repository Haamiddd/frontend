import React, { useEffect, useState } from "react";
import SidenavAd from "../../components/admin/SidenavAd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ViewProductModal from "../../components/modals/ViewProductModal";
import { BsFillHandThumbsUpFill, BsFillTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import GenerOrderReport from "../../components/modals/GenerOrderReport";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const pharmacyId = localStorage.getItem("pharmacyId");

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Check if the user is already logged in
    if (!pharmacyId) {
      navigate("/Pharmlogin");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/order/pharmacy/" + pharmacyId)
      .then((res) => {
        setOrders(res.data);

        // Calculate total sales for Dispatched orders and round to 2 decimal places
        const sales = res.data
          .filter((order) => order.orderStatus === "Dispatched")
          .reduce((total, order) => total + order.totalPrice, 0);
        const roundedSales = Math.round(sales * 100) / 100; // Round to 2 decimal places
        setTotalSales(roundedSales);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pharmacyId]);

  const handleDeleteOrder = (orderId) => {
    Swal.fire({
      title: "Delete Order",
      text: "Are you sure to delete the order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/api/order/deleteorder/${orderId}`)
          .then(() => {
            setOrders((prevOrder) =>
              prevOrder.filter((or) => or._id !== pharmacyId)
            );

            Swal.fire({
              title: "Success",
              text: "Order Deleted Successfully!",
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const handleDoneOrder = (orderId) => {
    Swal.fire({
      title: "Confirm Dispatch",
      text: "Are you sure the order has been Dispatched?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // Update order status to "Dispatched"
        axios
          .put(`http://localhost:3000/api/order/updateorder/${orderId}`, {
            orderStatus: "Dispatched",
          })
          .then(() => {
            Swal.fire({
              title: "Order Dispatched",
              text: "Order Successfully Dispatched",
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            console.error("Error updating order status:", error);
            Swal.fire({
              title: "Error",
              text: "Failed to update order status.",
              icon: "error",
            });
          });
      }
    });
  };

  const filteredOrder = orders.filter((or) => {
    const orderDate = new Date(or.orderDate);
    const matchesDateRange =
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate);
    return matchesDateRange;
  });

  return (
    <div>
      <SidenavAd />

      <div className="row px-5">
        <div className="col-md-12">
          <h2 className="text-center">Order Dashboard</h2>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="text-center" style={{ width: "50%" }}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="form-control me-2"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                placeholderText="End Date"
                className="form-control"
              />
            </div>
            <div>
              <GenerOrderReport />
            </div>
            <div
              className="text-center"
              style={{
                background: "black",
                color: "white",
                padding: "12px",
                borderRadius: "5px",
                paddingBottom: "0px",
              }}
            >
              <h4 style={{ fontWeight: "bold" }}>Total Sales: {totalSales}</h4>
            </div>
          </div>
          <br />
          <table className="table">
            <thead className="thead-dark">
              <tr>
                {/* <th>Order ID</th> */}
                <th>Order Date</th>
                <th>No. of Items</th>
                <th>Total Price</th>
                <th>Contact Number</th>
                <th>Patient Address</th>
                <th>Payment Method</th>
                <th>Order Status</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrder.map((or) => (
                <tr key={or._id}>
                  <td>{or.orderDate}</td>
                  <td>{or.noOfItems}</td>
                  <td>{or.totalPrice}</td>
                  <td>{or.contactNumber}</td>
                  <td>{or.patientAddress}</td>
                  <td>{or.paymentMethod}</td>
                  <td>
                    <span
                      style={{
                        backgroundColor:
                          or.orderStatus === "Pending" ? "red" : "green",
                        color: "white",
                        borderRadius: 6,
                        fontWeight: "bold",
                        padding: 6,
                        textAlign: "center",
                      }}
                    >
                      {or.orderStatus}
                    </span>
                  </td>
                  <td>
                    <ViewProductModal products={or.products} />
                    <button
                      onClick={() => handleDoneOrder(or._id)}
                      className="btn btn-success btn-sm me-1"
                    >
                      <BsFillHandThumbsUpFill />
                    </button>

                    <button
                      onClick={() => handleDeleteOrder(or._id)}
                      className="btn btn-danger btn-sm"
                    >
                      <BsFillTrashFill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
        </div>
      </div>
    </div>
  );
}
