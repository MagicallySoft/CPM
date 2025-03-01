// src/components/CustomerSearch.jsx
import React from 'react';
import { Card, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const CustomerSearch = ({ loading, handleSearch, handleChange, searchTerm }) => {
  // console.log(loading);
  // console.log( handleSearch);
  // console.log( handleChange);
  // console.log( searchTerm);
  
  return (
    <Card.Header>
      <Card.Title as="h5" className="text-cstm fw-semibold">
        <FaSearch className="text-cstm fs-5" /> Customer Search
      </Card.Title>
      <Form onSubmit={handleSearch}>
        <Row className="align-items-center">
          {/* Global search input */}
          <Col xs={12} md={9} className="mt-3">
            <Form.Group>
              <Form.Control
                type="text"
                name="search"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search customers..."
                className="bdr"
              />
            </Form.Group>
          </Col>
          {/* Search button */}
          <Col xs={12} md={3} className="text-end mt-3">
            <Button disabled={loading} className="bg-btn" type="submit">
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <span className="responsive-text">
                  Search <FaSearch className="ms-2 responsive-text" />
                </span>
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card.Header>
  );
};

export default CustomerSearch;
