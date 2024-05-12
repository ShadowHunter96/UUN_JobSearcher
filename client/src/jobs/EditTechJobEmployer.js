
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditTechJobEmployer() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [techJob, setTechJob] = useState({
    name: "",
    baitText: "",
    description: "",
    seniority: "JUNIOR",
    education: "BACHELORS_DEGREE",
    city: "PRAGUE",
    budget: 0,
    currency: "EUR",
    companyId: "",
  });

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { name, baitText, description, seniority, education, city, budget, currency, companyId } = techJob;

  const onInputChange = (e) => {
    setTechJob({ ...techJob, [e.target.name]: e.target.value });
  };




  const onSubmit = async (e) => {
    e.preventDefault();
    const techJobToUpdate = {
      name,
      baitText,
      description,
      seniority,
      education,
      city,
      budget,
      currency,
      company: { id: companyId },
    };

    try {
      await axios.put(`http://localhost:8081/techJob/${id}`, techJobToUpdate);
      navigate("/");
    } catch (error) {
      console.error("Error updating tech job:", error);
      setError("An error occurred while updating the tech job.");
    }
  };

  const loadTechJob = async () => {
    try {
      const result = await axios.get(`http://localhost:8081/techJob/${id}`);
      setTechJob(result.data);
    } catch (error) {
      console.error("Error fetching tech job:", error);
      setError("An error occurred while fetching the tech job.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:8081/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    loadTechJob();
    fetchCompanies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center">Edit Tech Job</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Job Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter job name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="baitText" className="form-label">
                Bait Text
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter bait text"
                name="baitText"
                value={baitText}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                placeholder="Enter job description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="seniority" className="form-label">
                Seniority
              </label>
              <select
                className="form-select"
                name="seniority"
                value={seniority}
                onChange={(e) => onInputChange(e)}
              >
                <option value="JUNIOR">Junior</option>
                <option value="MEDIOR">Mid</option>
                <option value="SENIOR">Senior</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="education" className="form-label">
                Education
              </label>
              <select
                className="form-select"
                name="education"
                value={education}
                onChange={(e) => onInputChange(e)}
              >
                <option value="BACHELORS_DEGREE">Bachelor's Degree</option>
                <option value="MASTERS_DEGREE">Master's Degree</option>
                <option value="ELEMENTARY">ELEMENTARY SCHOOL</option>
                <option value="HIGH_SCHOOL">HIGH_SCHOOL</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <select
                className="form-select"
                name="city"
                value={city}
                onChange={(e) => onInputChange(e)}
              >
                <option value="PRAGUE">Prague</option>
                <option value="BRNO">Brno</option>
                <option value="OLOMOUC">Olomouc</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="budget" className="form-label">
                Budget
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter job budget"
                name="budget"
                value={budget}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="currency" className="form-label">
                Currency
              </label>
              <select
                className="form-select"
                name="currency"
                value={currency}
                onChange={(e) => onInputChange(e)}
              >
                <option value="EUR">Euro</option>
                <option value="USD">US Dollar</option>
                <option value="KČ">Czech Koruna</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="companyId" className="form-label">
                Company
              </label>
              <select
                className="form-select"
                name="companyId"
                value={companyId}
                onChange={(e) => onInputChange(e)}
              >
                <option value="" disabled>
                  Select a company
                </option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="approved" className="form-label">
                Approved
              </label>
              <input
                type="checkbox"
                className="form-check-input"
                id="approved"
                name="approved"
                checked={techJob.approved}
                onChange={() => { }}
                disabled
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
}
