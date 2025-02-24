import React, { useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

export default function Register() {
     const [name, setName] = useState('');
     const [address, setAddress] = useState('');
     const [contact, setContact] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const handleSubmit = (e) => {
          e.preventDefault();

          if (!name || !email || !address || !contact || !password) {
               Swal.fire({
                    title: "Fields Cannot be empty!",
                    text: "Please enter all data!",
                    icon: "error",
                    confirmButtonText: "Ok",
               });
          } else {
               const userData = { name, address, contact, email, password };

               axios
                    .post("http://localhost:3000/api/user/adduser", userData)
                    .then(() => {
                         setName("");
                         setAddress("");
                         setContact("");
                         setEmail("");
                         setPassword("");
                         Swal.fire({
                              title: "Success!",
                              text: "Successfully registered as a User",
                              icon: "success",
                              confirmButtonText: "Ok",
                         }).then((result) => {
                              if (result.isConfirmed) {
                                   window.location.href = '/login';
                              }
                         });
                    })
                    .catch(() => {
                         Swal.fire({
                              title: "Failed!",
                              text: "Registering Unsuccessful",
                              icon: "error",
                              confirmButtonText: "Ok",
                         });
                    });
          }
     };

     return (
          <div className="container-fluid d-flex flex-column min-vh-100">
               <div className="d-flex justify-content-between p-3">
                    <a href="/" className="btn btn-def" style={{ fontSize: "20px", textDecoration: "none" }}>Home</a>
                    <a href="/login" className="btn btn-def" style={{ fontSize: "20px", textDecoration: "none" }}>Login</a>
               </div>

               <div className="d-flex justify-content-center align-items-center flex-grow-1">
                    <div className="col-md-6">
                         <div className="card login-card">
                              <div className="card-body">
                                   <h3 className="text-center">Register</h3>
                                   <form className="loginForm" onSubmit={handleSubmit}>
                                        <div className="row">
                                             <div className="col-6 form-group ">
                                                  <label>Name</label>
                                                  <input type="text" className="form-control" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                                             </div>
                                             <div className="col-6 form-group ">
                                                  <label>Address</label>
                                                  <input type="text" className="form-control" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                             </div>
                                             <div className="col-6 form-group ">
                                                  <label>Contact No.</label>
                                                  <input type="text" className="form-control" placeholder="Enter your contact number" value={contact} onChange={(e) => setContact(e.target.value)} />
                                             </div>
                                             <div className="col-6 form-group ">
                                                  <label>Email Address</label>
                                                  <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                             </div>
                                             <div className="col-12 form-group ">
                                                  <label>Password</label>
                                                  <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                             </div>
                                        </div>
                                        <a href="/Pharmacist">Register As Pharmacist</a>
                                        <br /><br />
                                        <input type="submit" value="Register" className="btn btn-curved w-100" />
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
