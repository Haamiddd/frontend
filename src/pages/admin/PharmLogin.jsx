import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function PharmLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const pharmacyId = localStorage.getItem('pharmacyId');
    if (pharmacyId) {
      navigate('/Admindashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/pharmacy/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('pharmacyId', data._id);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have been successfully logged in.',
        }).then(() => {
          navigate('/Admindashboard');
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
    <div className="login-container loginIn">
      {/* Buttons in corners */}
      <a href="/" className="btn-def corner-button left">Home</a>
      <a href="/Pharmacist" className="corner-button right">Register as a Pharmacist</a>

      <div className="login-card">
        <h2>Log In As A Pharmacist</h2>
        <form className="loginForm" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a href="#">Forgot Password?</a>
          <br />
          <a href="/login">Login as a User</a>
          <br />
          <input type="submit" value="Login" className="btn btn-curved" />
        </form>
      </div>

      {/* Styles */}
      <style>
        {`
          .login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            position: relative;
          }

          .login-card {
            width: 400px;
            padding: 30px;
              background-color:rgba(0, 0, 0, 0.71);
            border-radius: 10px;
            text-align: center;
          }

          .form-group {
            margin-bottom: 15px;
            text-align: left;
          }

          .form-control {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }

          .btn-curved {
            width: 100%;
            padding: 10px;
            background-color: #8eafd3;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .btn-curved:hover {
            background-color:rgb(0, 0, 0);
          }

          .corner-button {
            position: absolute;
            top: 20px;
            font-size: 18px;
            text-decoration: none;
            padding: 10px 15px;
            background: #8eafd3;
            color: white;
            border-radius: 5px;
          }

          .corner-button.left {
            left: 20px;
          }

          .corner-button.right {
            right: 20px;
          }

          .corner-button:hover {
            background:rgb(0, 0, 0);
          }
        `}
      </style>
    </div>
  );
}
