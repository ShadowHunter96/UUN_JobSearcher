import React from "react";
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">JobSearcher</Link>
        <div className="d-flex justify-content-between w-100">
          <form className="d-flex" role="search">
            <Link className="btn btn-success mx-2" to="/">Home</Link>
            <Link className="btn btn-success mx-2" to="/addtechjob">AddTechJob</Link>
            <Link className="btn btn-success mx-2" to="/addapplicant">AddApplicant</Link>
          </form>
          <form className="d-flex" role="search">
            <Link className="btn btn-info mx-2" to="/joblistadmin">JobListAdmin</Link>
            <Link className="btn btn-info mx-2" to="/joblist">Joblist</Link>
            <Link className="btn btn-info mx-2" to="/applicant-list">ApplicantList</Link>
            <Link className="btn btn-info mx-2" to="/joblistadmin">JobListAdmin</Link>

          </form>
        </div>
      </div>
    </nav>
  )
} 