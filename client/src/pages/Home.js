import React from "react";
import ApplicantList from "../applicants/ApplicantList";
import JobListAdmin from "../jobs/JobListAdmin";
import JobList from "../jobs/JobList"

export default function Home() {
  
  return (
    <div className="container">
      <div className="py-5">
      <JobList/>

      
      </div>
    </div>
  )
}