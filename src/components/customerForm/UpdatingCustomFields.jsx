import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { updateCustomField } from "../../redux/actions/customer/customerActions";
import { toast } from "react-toastify";
import { FaPlus, FaTimes } from "react-icons/fa";
import "../../assets/css/index.css"

const UpdateCustomFieldModal = ({ fieldToEdit, show, handleClose }) => {

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.customField);

    const [fieldData, setFieldData] = useState({
        fieldName: "",
        fieldType: "text",
        isRequired: false,
        options: []
    });

    useEffect(() => {
        if (fieldToEdit) {
            setFieldData({
                fieldName: fieldToEdit.fieldName,
                fieldType: fieldToEdit.fieldType,
                isRequired: fieldToEdit.isRequired,
                options: fieldToEdit.options || []
            });
        }
    }, [fieldToEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFieldData({
            ...fieldData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleAddOption = () => {
        if (fieldData.newOption) {
            setFieldData({
                ...fieldData,
                options: [...fieldData.options, fieldData.newOption],
                newOption: ""
            });
        }
    };

    const handleRemoveOption = (index) => {
        setFieldData({
            ...fieldData,
            options: fieldData.options.filter((_, i) => i !== index)
        });
    };

    // console.log("Updated Data ID", fieldToEdit._id)
    // console.log("Updated Data", fieldData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fieldToEdit) return;

        try {
            await dispatch(updateCustomField(fieldToEdit._id, fieldData));
            // toast.success("Custom field updated successfully!");
            handleClose();
        } catch (error) {
            // toast.error("Failed to update custom field");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Custom Field</Modal.Title>
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
                            required
                        />
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
                        <Form.Group>
                            <Form.Label>Dropdown Options</Form.Label>
                            <div className="d-flex">
                                <Form.Control
                                    type="text"
                                    name="newOption"
                                    value={fieldData.newOption || ""}
                                    onChange={handleChange}
                                />
                                <Button onClick={handleAddOption} className="ms-2">Add</Button>
                            </div>
                            <ul className="mt-2">
                                {fieldData.options.map((option, index) => (
                                    <li key={index} className="badge d-flex justify-content-between">
                                        {option}
                                        {/* <Button variant="danger" size="sm" onClick={() => handleRemoveOption(index)}>X</Button> */}
                                        <FaTimes
                                            className="ml-1 text-danger badge-close-icon"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleRemoveOption(index)}
                                            aria-label="Remove option"
                                        />
                                    </li>
                                ))}
                            </ul>
                        </Form.Group>
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
                        {loading ? <Spinner animation="border" size="sm" /> : "Update Field"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateCustomFieldModal;

