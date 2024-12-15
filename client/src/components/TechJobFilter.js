import React, { useState } from "react";

const TechJobFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: "",
    baitText: "",
    description: "",
    seniority: "",
    city: "",
    currency: "",
    sortBy: "id",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="my-3">
      <div className="row">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form-control col mx-2"
          onChange={handleInputChange}
        />
        <select
          name="city"
          className="form-control col mx-2"
          onChange={handleInputChange}
        >
          <option value="">Select City</option>
          <option value="PRAGUE">Prague</option>
          <option value="PLZEN">Plzen</option>
          <option value="CHEB">Cheb</option>
          <option value="PARDUBICE">Pardubice</option>
        </select>
        <input
          type="text"
          name="seniority"
          placeholder="Seniority"
          className="form-control col mx-2"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="currency"
          placeholder="Currency"
          className="form-control col mx-2"
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary col-auto mx-2">
          Filter
        </button>
      </div>
    </form>

  );
};

export default TechJobFilter;
