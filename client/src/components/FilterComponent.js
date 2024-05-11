import React from 'react';
import { Link } from "react-router-dom"

const FilterComponent = () => {
  return (
    <form className="form-check form-check-inline">
      <div className="form-row align-items-center">
        <div className="col-auto">
          <label htmlFor="email" className="mr-sm-2">Key Words</label>
          <input className="form-control form-control-sm mb-2" type="search" placeholder="Search" aria-label="Search" />
        </div>
        <div className="col-auto">
          <label htmlFor="pwd" className="mr-sm-2">City</label>
          <input type="password" className="form-control form-control-sm mb-2" id="pwd" />
        </div>
      </div>
    </form>
  );
};

export default FilterComponent;
