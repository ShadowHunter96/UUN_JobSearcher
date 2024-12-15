import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TechJobFilter from "../components/TechJobFilter";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({}); // Filtry pro backend

  const cardStyle = {
    width: "50rem",
    margin: "auto",
  };

  const loadJobs = async (filterParams = {}) => {
    try {
      // Odstraň prázdné hodnoty z objektu filtrů
      const filteredParams = Object.fromEntries(
        Object.entries(filterParams).filter(([_, value]) => value !== "" && value != null)
      );
  
      const params = new URLSearchParams(filteredParams);
      console.log("Query Params Sent:", params.toString()); // Debug log
  
      const result = await axios.get(`http://localhost:8081/techjob?${params}`);
      console.log("Response Data:", result.data); // Debug log
      setJobs(result.data);
    } catch (error) {
      console.error("Error loading job details:", error.response ? error.response.data : error.message);
    }
  };
  
  
  useEffect(() => {
    loadJobs(filters);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <TechJobFilter onFilterChange={handleFilterChange} />
      <div style={{ width: "100%", maxWidth: "960px" }}>
        {jobs.map((job) => (
          <div key={job.id} className="card border-0 my-2" style={cardStyle}>
            <div className="card-body">
              <Link to={`/job/${job.id}`} className="card-link d-flex justify-content-between align-items-center">
                {job.baitText}
              </Link>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">{job.name}</h5>
                  <p className="card-text">
                    {job.description} <i className="bi bi-map"></i> {job.city} {job.education}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="badge badge-success" style={{ color: "white", backgroundColor: "grey", marginRight: "5px" }}>
                    Level: {job.seniority}
                  </span>
                  <span className="badge badge-success" style={{ color: "white", backgroundColor: "green" }}>
                    Budget {job.budget} {job.currency}
                  </span>
                  <i className="bi bi-cursor ml-2"></i> <i className="material-icons ml-2">{job.city}</i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
