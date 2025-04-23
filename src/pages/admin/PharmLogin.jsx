import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function PharmLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
    <div className='loginIn'>

    <div  style={styles.loginIn}>
      <div style={styles.container}>
        <div style={styles.navButtons}>
          <a href="/" className='btn btn-def'>Home</a>
          <a href="/Pharmacist" className='btn btn-def'>Register as a Pharmacist</a>
        </div>

        <div style={styles.loginCard}>
          <h2 style={{ color: 'black' }}>Log In As A Pharmacist</h2>
          <form style={styles.cardBody} onSubmit={handleLogin}>
            <div style={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <a href="#">Forgot Password?</a>
            <a href="/login">Login as a User</a>
            <a href="/Adminlogin">Login as a Super Admin</a>
            <br />
            <input type="submit" value="Login" className="btn btn-curved w-100" />
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

// CSS styles in JavaScript
const styles = {
  loginIn: {
    backgroundImage: 'url(./images/loginBg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  navButtons: {
    position: 'absolute',
    top: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    textDecoration: 'none',
    fontSize: '18px',
  },
  loginCard: {
    backgroundColor: '#ffffffce',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'center',
    margin: 'auto',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
  },
};

