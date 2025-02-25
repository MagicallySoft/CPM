import React, { useState } from 'react';
import { Card, Form, Row, Col, Button, Spinner, Dropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const CustomerSearch = ({ loading, handleSearch, handleChange, searchQuery }) => {
  // Default to 'companyName'
  const [selectedField, setSelectedField] = useState('companyName');

  // List of fields to choose from
  const fields = ['companyName', 'contactPerson', 'mobileNumber', 'tallySerialNo'];

  // Handler for dropdown selection
  const onDropdownSelect = (field) => {
    setSelectedField(field);
  };

  return (
    <Card.Header>
      <Card.Title as="h5" className="text-cstm fw-semibold">
        <FaSearch className="text-cstm fs-5" /> Customer Search
      </Card.Title>
      <Form onSubmit={handleSearch} >
        <Row className="align-items-center justify-content-between ">
          {/* Dropdown for selecting search field */}
          <Col xs={12} md={4} lg={3} className='mt-3'>
            <Dropdown  align={'start'} >
              <Dropdown.Toggle id="dropdown-search-field" className='bg-btn'>
                {selectedField.replace(/([A-Z])/g, ' $1').trim().toLocaleUpperCase()}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {fields.map((field) => (
                  <Dropdown.Item key={field} onClick={() => onDropdownSelect(field)}>
                    {field.replace(/([A-Z])/g, ' $1').trim().toLocaleUpperCase()}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          {/* Input for search query */}
          <Col xs={12} md={6} lg={6} className='mt-3'>
            <Form.Group>
              <Form.Control
                type="text"
                name={selectedField}
                value={searchQuery[selectedField]}
                onChange={handleChange}
                placeholder={`Search ${selectedField.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                className="bdr"
              />
            </Form.Group>
          </Col>

          {/* Search button */}
          <Col xs={12} md={2} className="text-end mt-3">
            <Button disabled={loading} className="bg-btn">
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
