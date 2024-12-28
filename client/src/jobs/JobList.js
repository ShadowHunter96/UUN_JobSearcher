import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TechJobFilter from "../components/TechJobFilter";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const JobList = () => {
  const { theme } = useTheme(); // Access the theme context
  const { language } = useLanguage(); // Access the language context
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});

  const translations = {
    en: {
      jobLevel: "Level",
      budget: "Budget",
      city: "City",
      education: "Education",
    },
    cz: {
      jobLevel: "Úroveň",
      budget: "Rozpočet",
      city: "Město",
      education: "Vzdělání",
    },
  };

  const loadJobs = async (filterParams = {}) => {
    try {
      const filteredParams = Object.fromEntries(
        Object.entries(filterParams).filter(([_, value]) => value !== "" && value != null)
      );
      const result = await axios.post("http://localhost:8081/filter", filteredParams);
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

  const t = translations[language]; // Select the appropriate translations

  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{
        backgroundColor: theme === "light" ? "#f9f9f9" : "#1e1e1e",
        color: theme === "light" ? "#000000" : "#ffffff",
        minHeight: "100vh", // Ensure it covers the full viewport height
        padding: "20px",
      }}
    >
      <TechJobFilter onFilterChange={handleFilterChange} />
      <div style={{ width: "100%", maxWidth: "960px" }}>
        {jobs.map((job) => (
          <div
            key={job.id}
            className="card border-0 my-2"
            style={{
              width: "50rem",
              margin: "auto",
              backgroundColor: theme === "light" ? "#ffffff" : "#333333",
              color: theme === "light" ? "#000000" : "#ffffff",
            }}
          >
            <div className="card-body">
              <Link
                to={`/job/${job.id}`}
                className="card-link d-flex justify-content-between align-items-center"
                style={{ color: theme === "light" ? "#007bff" : "#80bfff" }}
              >
                {job.baitText}
              </Link>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">{job.name}</h5>
                  <p className="card-text">
                    {job.description} <i className="bi bi-map"></i> {t.city}: {job.city}, {t.education}: {job.education}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <span
                    className="badge badge-success"
                    style={{
                      color: "white",
                      backgroundColor: "grey",
                      marginRight: "5px",
                    }}
                  >
                    {t.jobLevel}: {job.seniority}
                  </span>
                  <span
                    className="badge badge-success"
                    style={{
                      color: "white",
                      backgroundColor: "green",
                    }}
                  >
                    {t.budget}: {job.budget} {job.currency}
                  </span>
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
