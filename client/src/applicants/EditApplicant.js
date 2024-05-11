import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditApplicant = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [applicant, setApplicant] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    selfDescription: '',
    linkedInUrl: '',
  });

  const { name, surname, email, phoneNumber, selfDescription, linkedInUrl } =
    applicant;

  const onInputChange = (e) => {
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadApplicant();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/applicant/${id}`, applicant);
      navigate('/applicants');
    } catch (error) {
      console.error('Error updating applicant:', error);
      
    }
  };

  const loadApplicant = async () => {
    try {
      const result = await axios.get(`http://localhost:8081/applicant/${id}`);
      setApplicant(result.data);
    } catch (error) {
      console.error('Error loading applicant details:', error);
      
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center">Edit Applicant</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
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
                placeholder="Enter your surname"
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
                type="text"
                className="form-control"
                placeholder="Enter your email"
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
                placeholder="Enter your phone number"
                name="phoneNumber"
                value={phoneNumber}
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
                placeholder="Enter your LinkedIn URL"
                name="linkedInUrl"
                value={linkedInUrl}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="selfDescription" className="form-label">
                Self Description
              </label>
              <textarea
                className="form-control"
                placeholder="Enter your self description"
                name="selfDescription"
                value={selfDescription}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link to="/applicants" className="btn btn-outline-danger mx-2">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditApplicant;
