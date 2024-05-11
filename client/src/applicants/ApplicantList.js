import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([]);

  const cardStyle = {
    width: '50rem',
  };

  const loadApplicants = async () => {
    try {
      const result = await axios.get('http://localhost:8081/applicant/applicant-list');
      setApplicants(result.data);
    } catch (error) {
      console.error('Error loading applicants:', error);
      // Handle error as needed
    }
  };

  const deleteApplicant = async(id)=>{
    await axios.delete(`http://localhost:8081/applicant/${id}`)
    loadApplicants()
  }

  useEffect(() => {
    loadApplicants();
  }, []);

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">LinkedIn URL</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant, index) => (
              <tr key={index}>
                <td>{applicant.name}</td>
                <td>{applicant.surname}</td>
                <td>{applicant.email}</td>
                <td>{applicant.phoneNumber}</td>
                <td>{applicant.linkedInUrl}</td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewapplicant/${applicant.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/editapplicant/${applicant.id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteApplicant(applicant.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantList;
