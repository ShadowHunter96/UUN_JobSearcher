import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';


const TechJobFilter = ({ onFilterChange, onFilterSubmit }) => {
  return (
    <Form onSubmit={onFilterSubmit}>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={(e) => onFilterChange('name', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBaitText">
            <Form.Label>Bait Text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter bait text"
              onChange={(e) => onFilterChange('baitText', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              onChange={(e) => onFilterChange('description', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
  
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formSeniority">
            <Form.Label>Seniority</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => onFilterChange('seniority', e.target.value)}
            >
              <option value="">Select Seniority</option>
              <option value="JUNIOR">Junior</option>
              <option value="MEDIOR">Medior</option>
              <option value="SENIOR">Senior</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formEducation">
            <Form.Label>Education</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => onFilterChange('education', e.target.value)}
            >
              <option value="">Select Education</option>
              <option value="ELEMENTARY">Elementary</option>
              <option value="HIGH_SCHOOL">High School</option>
              <option value="BACHELORS_DEGREE">Bachelors Degree</option>
              <option value="MASTERS_DEGREE">Masters Degree</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => onFilterChange('city', e.target.value)}
            >
              <option value="">Select City</option>
              <option value="PRAGUE">Prague</option>
              <option value="BRNO">Brno</option>
              <option value="CHEB">Cheb</option>
              <option value="PLZEN">Plzen</option>
              <option value="OSTRAVA">Ostrava</option>
              <option value="PARDUBICE">Pardubice</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
  
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formBudget">
            <Form.Label>Budget</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter budget"
              onChange={(e) => onFilterChange('budget', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCurrency">
            <Form.Label>Currency</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => onFilterChange('currency', e.target.value)}
            >
              <option value="">Select Currency</option>
              <option value="KČ">Kč</option>
              <option value="EUR">Eur</option>
              <option value="USD">Usd</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formApproved">
            <Form.Label>Approved</Form.Label>
            <Form.Check
              type="checkbox"
              label="Approved"
              onChange={(e) => onFilterChange('approved', e.target.checked)}
            />
          </Form.Group>
        </Col>
      </Row>
  
      <Button variant="primary" type="submit">
        Filter
      </Button>
    </Form>
  );
};

export default TechJobFilter;
