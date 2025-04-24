import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Alert, Spinner } from "react-bootstrap";

const DispatchedOrdersReport = ({ pharmacyId }) => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/order/getDispacthedOrders/${pharmacyId}`
        );
        setReportData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dispatched orders report.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [pharmacyId]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Dispatched Orders Report</h2>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Sales (LKR)</th>
              <th>Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((record, index) => (
              <tr key={index}>
                <td>
                  {record._id.year}-{record._id.month.toString().padStart(2, "0")}-{record._id.day.toString().padStart(2, "0")}
                </td>
                <td>{record.totalSales.toFixed(2)}</td>
                <td>{record.totalOrders}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default DispatchedOrdersReport;
