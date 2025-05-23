import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Col, Row, Form } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function GenerOrderReport() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pharmacy, setPharmacy] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();
  const pharmacyId = localStorage.getItem("pharmacyId");

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/order/pharmacy/" + pharmacyId)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/pharmacy/" + pharmacyId)
      .then((res) => {
        setPharmacy(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredOrder = orders.filter((or) => {
    const orderDate = new Date(or.orderDate);
    const matchesDateRange =
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate);
    return matchesDateRange;
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Button className="btn btn-curved me-3" onClick={handleShow}>
        Report
      </Button>

      <Modal show={show} size="lg" centered>
        <Modal.Header className="modal-header-custom">
          <Modal.Title id="contained-modal-title-vcenter">
            Generate Order Report
          </Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body>
            <div className="d-flex justify-content-center">
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
            <br />
            <div ref={componentRef}>
              <br />
              <h2 className="text-center">
                Orders available for {pharmacy.name} pharmacy
              </h2>
              <br />
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th>Order Date</th>
                    <th>No. of Items</th>
                    <th>Total Price</th>
                    <th>Contact Number</th>
                    <th>Patient Address</th>
                    <th>Payment Method</th>
                    <th>Order Status</th>
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
                      <td
                        className={
                          or.orderStatus === "Pending"
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {or.orderStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 text-center">
                <p className="text-muted">
                  &copy; {new Date().getFullYear()} {pharmacy.name}. All rights
                  reserved.
                </p>
              </div>
            </div>
            <div className="float-right ml-auto">
              <Button variant="success" onClick={handlePrint}>
                Print Report
              </Button>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Exit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
