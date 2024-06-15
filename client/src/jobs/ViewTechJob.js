import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewTechJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [techJob, setTechJob] = useState(null);

  useEffect(() => {
    const loadTechJob = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/techJob/${id}`);
        setTechJob(response.data);
      } catch (error) {
        console.error('Error loading tech job details:', error);
      }
    };

    loadTechJob();
  }, [id]);

  if (!techJob) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-body">
          <h3 className="card-title">Name: {techJob.name}</h3>
          <p className="card-text"><strong>Bait Text:</strong> {techJob.baitText}</p>
          <p className="card-text"><strong>Description:</strong> {techJob.description}</p>
          <p className="card-text"><strong>Seniority:</strong> {techJob.seniority}</p>
          <p className="card-text"><strong>Education:</strong> {techJob.education}</p>
          <p className="card-text"><strong>City:</strong> {techJob.city}</p>
          <p className="card-text"><strong>Budget:</strong> {techJob.budget} {techJob.currency}</p>
          <p className="card-text"><strong>Company:</strong> {techJob.company ? techJob.company.name : 'N/A'}</p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary mx-2" onClick={() => navigate(`/applytechjob/${id}`)}>Apply</button>
            <button className="btn btn-primary mx-2" onClick={() => navigate(`/techjob/${id}/applicants`)}>Answers</button>
            <Link to="/" className="btn btn-secondary mx-2">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTechJob;
