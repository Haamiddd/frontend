import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function PharmacyReg() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
  const [contact, setContact] = useState("");
  const [logo, setLogo] = useState("");
  const [opentime, setOpentime] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const file = e.target.files[0];

      if (!file) return alert("File does not exist.");
      if (file.size > 1024 * 1024) return alert("Size is too large!");
      if (file.type !== "image/jpeg" && file.type !== "image/png") return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");
      formData.append("cloud_name", "dswsu55n9");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dswsu55n9/image/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setLogo(res.data.url);
      setIsLoading(false);
    } catch (err) {
      console.log(err.response?.data?.msg || "Not uploaded");
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name.length === 0 || email.length === 0 || address.length === 0 ||
      town.length === 0 || contact.length === 0 || logo.length === 0 ||
      opentime.length === 0 || password.length === 0
    ) {
      Swal.fire({
        title: "Fields Cannot be empty!",
        text: "Please enter all data!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      const pharmData = { name, email, address, town, contact, logo, opentime, password };

      axios.post(`http://localhost:3000/api/pharmacy/addpharmacy`, pharmData)
        .then(() => {
          setname(""); setEmail(""); setAddress(""); setTown("");
          setContact(""); setLogo(""); setOpentime(""); setPassword("");
          Swal.fire({
            title: "Success!",
            text: "Successfully registered as a Pharmacist",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/Pharmlogin";
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
    <div className="loginIn container-fluid d-flex flex-column min-vh-100">
      {/* Top navigation bar */}
      <div className="d-flex justify-content-between p-3">
        <a href="/" className="btn btn-def" style={{ fontSize: "20px", textDecoration: "none" }}>Home</a>
        <a href="/Pharmlogin" className="btn btn-def" style={{ fontSize: "20px", textDecoration: "none" }}>Login as a Pharmacist</a>
      </div>

      {/* Centered Form */}
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div className="col-md-6">
          <div className="card login-card p-4">
            <div className="card-body">
              <h3 className="text-center mb-4">Pharmacy Register</h3>
              <form className="loginForm" onSubmit={handleSubmit}>
                
                {/* Two-column layout with spacing */}
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="form-group m-1">
                      <label>Name</label>
                      <input type="text" className="form-control" placeholder="Enter your name"
                        value={name} onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div className="form-group m-1">
                      <label>Address</label>
                      <input type="text" className="form-control" placeholder="Enter your Address"
                        value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="form-group m-1">
                      <label>Contact</label>
                      <input type="tel" className="form-control" placeholder="Enter your Contact"
                        value={contact} onChange={(e) => setContact(e.target.value)} />
                    </div>
                    <div className="form-group m-1">
                      <label>Logo</label>
                      <input type="file" accept="image/*" className="form-control"
                        onChange={handleImageChange} />
                    </div>
                  </div>

                  <div className="col-md-6 ">
                    <div className="form-group m-1">
                      <label>Email Address</label>
                      <input type="email" className="form-control" placeholder="Enter your email"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group m-1">
                      <label>Town</label>
                      <input type="text" className="form-control" placeholder="Enter your Town"
                        value={town} onChange={(e) => setTown(e.target.value)} />
                    </div>
                    <div className="form-group m-1">
                      <label>Opening Time</label>
                      <input type="time" className="form-control"
                        value={opentime} onChange={(e) => setOpentime(e.target.value)} />
                    </div>
                    <div className="form-group pt-2 m-1">
                      <label>Password</label>
                      <input type="password" className="form-control" placeholder="Enter your password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  </div>
                </div>

                <br />
                 <a href="/register">Register As Customer </a>
                <input type="submit" value="Register" className="btn btn-curved w-100 my-2" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
