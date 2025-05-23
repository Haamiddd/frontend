import React, { useEffect, useState } from "react";
import Header from '../../components/user/Header';
import Footer from '../../components/user/Footer';
import axios from "axios";
import Swal from "sweetalert2";

export default function Prescription() {
     const [hasAllergy, setHasAllergy] = useState('no');

     const handleAllergyChange = (e) => {
          setHasAllergy(e.target.value);
     };

     const [patientname, setPatientname] = useState("");
     const [address, setAddress] = useState("");
     const [age, setAge] = useState("");
     const [yourphone, setYourphone] = useState("");// Store the image URL here
     const [choosepharmacy, setChoosepharmacy] = useState("");
     const [gender, setGender] = useState("");
     const [allergy, setAllergy] = useState("");
     const [pic, setPic] = useState("");
     const [isLoading, setIsLoading] = useState(false);

     const [pharmacy, setPharmacy] = useState([]);
     const userId = localStorage.getItem('userId');

     useEffect(() => {
          axios
               .get("http://localhost:3000/api/pharmacy/")
               .then((res) => {
                    setPharmacy(res.data);
               })
               .catch((err) => {
                    console.log(err);
               });
     }, []);

     const handleImageChange = async (e) => {
          e.preventDefault();
          try {
               setIsLoading(true);
               const file = e.target.files[0];

               if (!file) return alert("File does not exist.");

               if (file.size > 1024 * 1024)
                    // 1MB
                    return alert("Size is too large!");

               if (file.type !== "image/jpeg" && file.type !== "image/png")
                    return alert("File format is incorrect.");

               let formData = new FormData();
               formData.append("file", file);
               formData.append("upload_preset", "ml_default");
               formData.append("cloud_name", "dswsu55n9");

               const res = await axios.post(
                    "https://api.cloudinary.com/v1_1/dswsu55n9/image/upload",
                    formData,
                    {
                         method: "post",
                         body: formData,
                         headers: {
                              "Content-Type": "multipart/form-data",
                         },
                    }
               );

               console.log(res.data.url);
               setPic(res.data.url); // Set the image URL in the state
               setIsLoading(false);
          } catch (err) {
               console.log(err.response.data.msg);
               setIsLoading(false);
               console.log("Not uploaded");
          }
     };

     const handleSubmit = (e) => {
          e.preventDefault();

          if (
               patientname.length === 0 ||
               age.length === 0 ||
               yourphone.length === 0 ||
               address.length === 0 ||
               choosepharmacy.length === 0 ||
               gender.length === 0 ||
               allergy.length === 0 ||
               pic.length === 0
          ) {
               Swal.fire({
                    title: "Fields Cannot be empty!",
                    text: "Please enter all data!",
                    icon: "error",
                    confirmButtonText: "Ok",
               });
          } else {
               const prescriptionData = {
                    patientname,
                    age,
                    yourphone,
                    address,
                    choosepharmacy,
                    gender,
                    allergy,
                    pic,
                    userId,
               };

               axios
                    .post(
                         "http://localhost:3000/api/prescription/addprescription",
                         prescriptionData
                    )
                    .then(function (res) {
                         setPatientname("");
                         setAge("");
                         setYourphone("");
                         setAddress("");
                         setChoosepharmacy("");
                         setGender("");
                         setAllergy("");
                         setPic("");

                         Swal.fire({
                              title: "Success!",
                              text: "Prescription Uploaded Successfully",
                              icon: "success",
                              confirmButtonText: "Ok",
                         }).then((result) => {
                              if (result.isConfirmed) {
                                   window.location.href = "/";
                              }
                         });
                    })
                    .catch(function (error) {
                         console.log(error);
                         Swal.fire({
                              title: "Failed!",
                              text: "Prescription uploading Unsuccessful",
                              icon: "error",
                              confirmButtonText: "Ok",
                         });
                    });
          }
     };



     return ( 
          <div style={{ backgroundColor: "#8eafd3" }}>
                <Header />
          <div>
               
              
               <div className="prescription-form-container" >
                    <h2>Prescription Form</h2>
                    <div className="form-columns">
                         <div className="form-column">
                         <form className="prescription-form" onSubmit={handleSubmit}>
                    <div className="form-columns">
                        <div className="form-column">
                            <div className="form-group">
                                <label>Patient Name:</label>
                                <input type="text" onChange={(e) => setPatientname(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Age:</label>
                                <input type="number" onChange={(e) => setAge(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Your Phone:</label>
                                <input type="tel" onChange={(e) => setYourphone(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Address:</label>
                                <input type="text" onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-column">
                            <div className="form-group">
                                <label>Choose Pharmacy:</label>
                                <select value={choosepharmacy} onChange={(e) => setChoosepharmacy(e.target.value)}>
                                    <option value="" disabled>Select Pharmacy</option>
                                    {pharmacy.map((pm) => (
                                        <option key={pm._id} value={pm._id}>{pm.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Gender:</label>
                                <div className="radio-group">
                                    <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
                                    <label htmlFor="male">Male</label>
                                    <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Do you have any Allergies?</label>
                                <textarea onChange={(e) => setAllergy(e.target.value)}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Attach your prescription:</label>
                                <input type="file" accept=".pdf,.jpg,.png" onChange={handleImageChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group submit-container">
                        <button type="submit">Submit</button>
                    </div>
                </form>
                         </div>
                    </div>
               </div>
               <div>
                    <Footer />
               </div>
          </div>
          </div>
     )
}
