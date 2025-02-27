import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

export default function Login() {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const navigate = useNavigate();

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          if (userId) {
               navigate('/Userdashboard');
          }
     }, [navigate]);

     const handleLogin = async (e) => {
          e.preventDefault();

          try {
               const response = await fetch('http://localhost:3000/api/user/authenticate', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
               });

               if (response.status === 200) {
                    const data = await response.json();
                    const userId = data._id;
                    localStorage.setItem('userId', userId);

                    Swal.fire({
                         icon: 'success',
                         title: 'Login Successful',
                         text: 'You have been successfully logged in.',
                    }).then(() => {
                         navigate('/');
                    });
               } else {
                    Swal.fire({
                         icon: 'error',
                         title: 'Login Failed',
                         text: 'Authentication error. Please check your credentials and try again.',
                    });
               }
          } catch (error) {
               console.error('API call error', error);
          }
     };

     return (
          <div className="container-fluid loginIn d-flex flex-column min-vh-100">
               <div className="d-flex justify-content-between py-3">
                    <a href="/" className="btn btn-def" style={{ fontSize: "20px", textDecoration: "none" }}>Home</a>
                    <a href="/register" className="btn btn-def" style={{ fontSize: "20px", textDecoration: "none" }}>Register</a>
               </div>

               <div className="d-flex justify-content-center align-items-center flex-grow-1">
                    <div className="col-md-4">
                         <div className="card login-card">
                              <div className="card-body">
                                   <h3 className="card-title">Log In</h3>
                                   <form className="loginForm" onSubmit={handleLogin}>
                                        <div className="form-group">
                                             <label>Email</label>
                                             <input type="email" className="form-control" placeholder="Enter your email"
                                                  value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                             <label>Password</label>
                                             <input type="password" className="form-control" placeholder="Enter your password"
                                                  value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <a href="#">Forgot Password</a>
                                        <br />
                                        <a href="/Pharmlogin">Login as a Pharmacist</a>
                                        <br /><br />
                                        <input type="submit" value="Login" className="btn btn-curved w-100" />
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
