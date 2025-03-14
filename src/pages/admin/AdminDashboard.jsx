import React, { useEffect, useState } from "react";
import Sidenav from '../../components/admin/SidenavAd'
import { LineChart, Line, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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


  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
            <div className="charts">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                  <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                </BarChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
