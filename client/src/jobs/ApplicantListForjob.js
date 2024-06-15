import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ApplicantListForJob = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplicants = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/${jobId}/applicants`);
        setApplicants(response.data);
      } catch (error) {
        console.error('Error loading applicants:', error);
      } finally {
        setLoading(false);
      }
    };

    loadApplicants();
  }, [jobId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h3>Applicants for this Job</h3>
      {applicants.length === 0 ? (
        <p>No applicants found for this job.</p>
      ) : (
        <div className="row">
          {applicants.map((applicant) => (
            <div key={applicant.id} className="col-md-4 mb-3">
              <div className="card border-0">
                <div className="card-body">
                  <h5 className="card-title">{applicant.name} {applicant.surname}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {applicant.email}<br />
                    <strong>Phone Number:</strong> {applicant.phoneNumber}<br />
                    <strong>Description:</strong> {applicant.selfDescription}<br />
                    <strong>LinkedIn:</strong> <a href={applicant.linkedInUrl} target="_blank" rel="noopener noreferrer">{applicant.linkedInUrl}</a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantListForJob;
