import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddApplicant = () => {
  let navigate = useNavigate();

  const [applicant, setApplicant] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    selfDescription: "",
    linkedInUrl: "",
  });

  const { name, surname, email, phoneNumber, selfDescription, linkedInUrl } = applicant;

  const onInputChange = (e) => {
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !surname || !email || !phoneNumber || !selfDescription) {
      alert("Please fill in all fields.");
      return;
    }

    const applicantToSave = {
      name,
      surname,
      email,
      phoneNumber,
      selfDescription,
      linkedInUrl,
    };

    try {
      await axios.post("http://localhost:8081/applicant/save", applicantToSave);
      navigate("/");
    } catch (error) {
      console.error("Error saving applicant:", error);
      
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center">Add Applicant</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">
                Surname
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter surname"
                name="surname"
                value={surname}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="selfDescription" className="form-label">
                Self Description
              </label>
              <textarea
                className="form-control"
                placeholder="Enter self description"
                name="selfDescription"
                value={selfDescription}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="linkedInUrl" className="form-label">
                LinkedIn URL
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter LinkedIn URL"
                name="linkedInUrl"
                value={linkedInUrl}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link to="/" className="btn btn-outline-danger mx-2">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddApplicant;

