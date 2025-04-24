import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Alert, Spinner, Form, Button, Row, Col } from "react-bootstrap";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import { CSVLink } from "react-csv";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DispatchedOrdersReport = ({ pharmacyId }) => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/order/getDispacthedOrders/${pharmacyId}`
        );
        const formattedData = response.data.map(record => ({
          date: `${record._id.year}-${record._id.month.toString().padStart(2, "0")}-${record._id.day.toString().padStart(2, "0")}`,
          month: `${record._id.year}-${record._id.month.toString().padStart(2, "0")}`,
          year: `${record._id.year}`,
          totalSales: record.totalSales,
          totalOrders: record.totalOrders
        }));
        setReportData(formattedData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dispatched orders report.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [pharmacyId]);

  const filteredData = () => {
    if (filterType === "date") {
      const selected = selectedDate.toISOString().split("T")[0];
      return reportData.filter(item => item.date === selected);
    } else if (filterType === "month") {
      const monthValue = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}`;
      return reportData.filter(item => item.month === monthValue);
    } else if (filterType === "year") {
      const yearValue = `${selectedDate.getFullYear()}`;
      return reportData.filter(item => item.year === yearValue);
    }
    return reportData;
  };

  const chartData = filteredData();

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Revanue Report</h2>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Filter Type:</Form.Label>
          <Form.Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Data</option>
            <option value="date">Specific Date</option>
            <option value="month">Specific Month</option>
            <option value="year">Specific Year</option>
          </Form.Select>
        </Col>

        {(filterType !== "all") && (
          <Col md={4}>
            <Form.Label>{filterType.charAt(0).toUpperCase() + filterType.slice(1)}:</Form.Label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat={
                filterType === "date" ? "yyyy-MM-dd" :
                filterType === "month" ? "yyyy-MM" :
                "yyyy"
              }
              showYearPicker={filterType === "year"}
              showMonthYearPicker={filterType === "month"}
              className="form-control"
            />
          </Col>
        )}
      </Row>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={filterType === "date" ? "date" : filterType === "month" ? "date" : filterType === "year" ? "month" : "date"} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalSales" fill="#8884d8" name="Total Sales (LKR)" />
              <Bar dataKey="totalOrders" fill="#82ca9d" name="Total Orders" />
            </BarChart>
          </ResponsiveContainer>

          <Button className="mt-3" variant="success">
            <CSVLink
              data={chartData}
              filename={`DispatchedOrdersReport-${filterType}.csv`}
              className="text-white text-decoration-none"
            >
              Download Report as CSV
            </CSVLink>
          </Button>
        </>
      )}
    </Container>
  );
};

export default DispatchedOrdersReport;
