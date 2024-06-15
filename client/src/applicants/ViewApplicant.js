import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ViewApplicant = () => {
  const [applicant, setApplicant] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    selfDescription: '',
    linkedInUrl: '',
  });

  const { id } = useParams();

  useEffect(() => {
    loadApplicant();
  }, []);

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
          <h2 className="text-center">Applicant Details</h2>

          <div className="card">
            <div className="card-header">
              Details of applicant id: {applicant.id}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Name: </b>
                {applicant.name}
              </li>

              <li className="list-group-item">
                <b>Surname: </b>
                {applicant.surname}
              </li>

              <li className="list-group-item">
                <b>Email: </b>
                {applicant.email}
              </li>

              <li className="list-group-item">
                <b>Phone Number: </b>
                {applicant.phoneNumber}
              </li>

              <li className="list-group-item">
                <b>LinkedIn URL: </b>
                {applicant.linkedInUrl}
              </li>

              <li className="list-group-item">
                <b>Self Description: </b>
                {applicant.selfDescription}
              </li>
            </ul>
          </div>

          <Link className="btn btn-primary my-2" to="/applicant-list">
            Back To Applicants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicant;
