import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AdminLogin() {

     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const navigate = useNavigate(); // Initialize useNavigate

     useEffect(() => {
          // Check if the user is already logged in (e.g., check if a token or user data exists in local storage)
          const superadminId = localStorage.getItem('superadminId');
          if (superadminId) {
               navigate('/Supadmindashboard'); // Redirect to the dashboard if logged in
          }
     }, [navigate]);

     const handleLogin = async (e) => {
          e.preventDefault();

          try {
               const response = await fetch('http://localhost:3000/api/superadmin/authenticate', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password }), // Include name in the request
               });

               if (response.status === 200) {
                    // Authentication successful, get the superadmin _id from the response (assuming your API returns the _id)
                    const data = await response.json();
                    const superadminId = data._id;

                    // Store the superadmin _id in local storage
                    localStorage.setItem('superadminId', superadminId);

                    // Show a success Swal notification
                    Swal.fire({
                         icon: 'success',
                         title: 'Login Successful',
                         text: 'You have been successfully logged in as a Superadmin.',
                    }).then(() => {
                         // Redirect to the Superadmin dashboard
                         navigate('/Supadmindashboard');
                    });
               } else {
                    // Authentication failed, show an error Swal notification
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
       <div className='loginIn'>
            <div className="container-fluid">
                 <div className="row bg-image login-image">
                      <div className="row bg-trans-yellow">
                           <div className="col-md-8">
                                <div className="pic-body">
                                     <br />
                                     <br />
                                     {/* <a href="/" style={{ fontSize: "30px", textDecoration: "none" }}>Back to home</a> */}
                                     <br />
                                     <br />
                                     <br />
                                     <br />
                                     <br />
                                     <br />
                                     <div className="topic">
                                          Simplify your <span className="blue">life</span>
                                     </div>
                                </div>
                           </div>
                           <div className="col-md-4 login-sec">
                                <div style={{ height: '11vh' }}> </div>
                                <div className="card login-card">
                                     <span className="card-body">
                                          <br />
                                          <br />
                                          <span className="card-title">Admin Login</span>
                                          <br />
                                          <br />
                                          <span className="card-text">
                                               <form className="loginForm" onSubmit={handleLogin}>
                                                    <div className="form group">
                                                         <label htmlFor="email">Email</label>
                                                         <input
                                                              type="email"
                                                              className="form-control"
                                                              placeholder="Enter your email"
                                                              value={email}
                                                              onChange={(e) => setEmail(e.target.value)}
                                                         />
                                                    </div>
                                                    <div className="form group">
                                                         <label htmlFor="password">Password</label>
                                                         <input
                                                              type="password"
                                                              className="form-control"
                                                              placeholder="Enter your password"
                                                              value={password}
                                                              onChange={(e) => setPassword(e.target.value)}
                                                         />
                                                    </div>
                                                    <a href="">Forgot Password</a>
                                                    <br />
                                                    <br />
                                                    <input
                                                         type="submit"
                                                         value="Login"
                                                         className="btn btn-curved"
                                                         style={{ width: '100%' }}
                                                    />
                                               </form>
                                          </span>
                                     </span>
                                </div>
                           </div>
                      </div>
                 </div>
            </div>
       </div>
  )
}
