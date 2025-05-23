import React, { useEffect, useState } from "react";
import SidenavSuperAd from '../../components/admin/SidenavSuperAd'
import { LineChart, Line, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";
import {MdLocalPharmacy } from 'react-icons/md'
import { BiUserCircle } from 'react-icons/bi'


export default function SuperAdminDashboard() {

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

  const [pharmacyCount, setPharmacyCount] = useState(0);
  const [userCount, setUserCount] = useState(0);


  useEffect(() => {
    axios
      .get("http://localhost:3000/api/pharmacy/getpharmacycount") 
      .then((res) => {
        setPharmacyCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/getusercount") 
      .then((res) => {
        setUserCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <div>
      <SidenavSuperAd />
      <br />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-8">
          <main className="main-container">
            <h2 className="text-center">Super Admin Dashboard</h2>
            <br />
            <div className="main-cards">
              <div className="cards">
                <i className="bx"><MdLocalPharmacy /></i>
                <span>
                  <h3>Pharmacies</h3>
                  <p>{pharmacyCount}</p>
                </span>
              </div>
              <div className="cards">
                <i className="bx"><BiUserCircle /></i>
                <span>
                  <h3>Users</h3>
                  <p>{userCount}</p>
                </span>
              </div>
              {/* <div className="cards">
                <div className="card-inner">
                  <h3>Pharmacies</h3>
                  <h1>20</h1>
                </div>
              </div>
              <div className="cards">
                <div className="card-inner">
                  <h3>Alerts</h3>
                  <h1>20</h1>
                </div>
              </div> */}

            </div>
            {/* <div className="charts">
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
            </div> */}
          </main>
        </div>
      </div>
    </div>
  )
}
