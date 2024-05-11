import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Well done!</h4>
            <p>Your application has been successfully submitted. We will get back to you soon.</p>
            <hr />
            <p className="mb-0">Thank you for using our platform.</p>
          </div>
          <Link to="/" className="btn btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
