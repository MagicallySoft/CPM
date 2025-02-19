import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form, Spinner, InputGroup } from "react-bootstrap";
import { addCustomField } from "../../redux/actions/customer/customerActions";
import { toast } from "react-toastify";
import { FaPlus, FaTimes } from "react-icons/fa";
import "../../assets/css/index.css"

const AddCustomFieldButton = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.customField || []);

  const [show, setShow] = useState(false);
  const [fieldData, setFieldData] = useState({
    fieldName: "",
    fieldType: "text",
    isRequired: false,
    options: [],
    isMultiSelect: false,
    newOption: "", // Temp input for adding options
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFieldData({
      ...fieldData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!fieldData.fieldName.trim()) errors.fieldName = "Field name is required!";
    if (fieldData.fieldType === "dropdown" && fieldData.options.length === 0)
      errors.options = "Dropdown must have at least one option!";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddOption = () => {
    let newOption = fieldData.newOption.trim();
    if (newOption && !fieldData.options.includes(newOption)) {
      setFieldData({
        ...fieldData,
        options: [...fieldData.options, newOption],
        newOption: "",
      });
    } else {
      toast.error("Option cannot be empty or duplicate!");
    }
  };

  const handleRemoveOption = (index) => {
    setFieldData({
      ...fieldData,
      options: fieldData.options.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(addCustomField(fieldData));
      setShow(false);
      setFieldData({ fieldName: "", fieldType: "text", isRequired: false, options: [], isMultiSelect: false });
    } catch (error) {
      toast.error("Failed to add custom field");
    }
  };

  return (
    <>
      <Button className="add-field-button m-1" onClick={() => setShow(true)}>
        <FaPlus /> Add Custom Field
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Custom Field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Field Name</Form.Label>
              <Form.Control
                type="text"
                name="fieldName"
                value={fieldData.fieldName}
                onChange={handleChange}
                isInvalid={!!errors.fieldName}
              />
              <Form.Control.Feedback type="invalid">{errors.fieldName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Field Type</Form.Label>
              <Form.Control
                as="select"
                name="fieldType"
                value={fieldData.fieldType}
                onChange={handleChange}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="email">Email</option>
                <option value="checkbox">Checkbox</option>
                <option value="dropdown">Dropdown</option>
              </Form.Control>
            </Form.Group>

            {fieldData.fieldType === "dropdown" && (
              <>
                <Form.Group>
                  <Form.Label>Dropdown Options</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="newOption"
                      value={fieldData.newOption}
                      onChange={handleChange}
                      placeholder="Enter option"
                    />
                    <Button variant="secondary" onClick={handleAddOption}>
                      Add
                    </Button>
                  </InputGroup>
                  {errors.options && <div className="text-danger">{errors.options}</div>}
                  <div className="mt-2">
                    {fieldData.options.map((opt, index) => (
                      //   <span key={index} className="badge badge-primary m-1 d-flex align-items-center p-2">
                      //   {opt}
                       
                      // </span>

                      <li key={index} className="badge d-flex justify-content-between">
                        {opt}
                        {/* <Button variant="danger" size="sm" onClick={() => handleRemoveOption(index)}>X</Button> */}
                        <FaTimes
                          className="ml-1 text-danger badge-close-icon"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemoveOption(index)}
                          aria-label="Remove option"
                        />
                      </li>

                    ))}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Allow Multi-Select"
                    name="isMultiSelect"
                    checked={fieldData.isMultiSelect}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Required Field"
                name="isRequired"
                checked={fieldData.isRequired}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" className="mt-3 btn-primary" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Save Field"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCustomFieldButton;



