import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomFields, deleteField } from "../../redux/actions/customer/customerActions";
import { Card, Table, Row, Col, Form, Button, Spinner, Container, Pagination, Badge, ButtonGroup, Alert } from "react-bootstrap";
import { FaSearch, FaEye, FaEdit, FaTrash, FaStar, FaBan, FaInfoCircle } from "react-icons/fa";
import AddCustomFieldButton from "./AddCustomFieldButton";
import UpdateCustomFieldModal from "./UpdatingCustomFields";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminCustomFieldsList = () => {
    const dispatch = useDispatch();
    const { loading, customFields, error } = useSelector((state) => state.customField);
    const [selectedField, setSelectedField] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    useEffect(() => {
        dispatch(getCustomFields());
    }, [dispatch]);

    useEffect(() => {
        // Ensure the current page is valid after deleting a field
        if (customFields.length && currentPage > Math.ceil(customFields.length / itemsPerPage)) {
            setCurrentPage(Math.max(1, Math.ceil(customFields.length / itemsPerPage)));
        }
    }, [customFields, currentPage]);

    // Calculate the displayed fields
    const indexOfLastField = currentPage * itemsPerPage;
    const indexOfFirstField = indexOfLastField - itemsPerPage;
    const currentFields = customFields.slice(indexOfFirstField, indexOfLastField);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDeleteField = (fieldId) => {
        if (window.confirm("Are you sure you want to delete this Field?")) {
            dispatch(deleteField(fieldId)) // This will automatically update Redux
                .catch(() => {
                    toast.error("Failed to delete the field.");
                });
        }
    };


    const handleUpdateField = (field) => {
        setSelectedField(field);
        setShowUpdateModal(true);
    };

    return (
        <div className="container mt-4">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Show Error */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Show Loader */}
            {loading ? (
                <Spinner animation="border" />
            ) : (
                <>
                    <Card className="shadow-lg border-0">
                        <Card.Body className="p-">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                                <div className="d-flex align-items-center mb-3 mb-md-0">
                                    <div>
                                        <h4 className="m-0 fw-semibold text-cstm">Custom Field</h4>
                                        <p className="m-0 text-muted small">Real-time custom field overview</p>
                                    </div>
                                </div>
                                <AddCustomFieldButton />
                            </div>

                            {currentFields?.length > 0 ? (
                                <div className="table-responsive rounded-3">
                                    <Table hover className="align-middle mb-0">
                                        <thead className="gradient-header">
                                            <tr>
                                                <th className="ps-4">#</th>
                                                <th>Field Name</th>
                                                <th>Field Type</th>
                                                <th>Required</th>
                                                <th className="pe-4 text-end">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentFields.map((field, index) => (
                                                <tr key={field._id} className={`cursor-pointer`}>
                                                    <td className={`ps-4 fw-medium text-secondary cursor-pointer`}>{index + 1}</td>
                                                    <td className={`cursor-pointer`}>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <div className="fw-semibold">{field.fieldName}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={`cursor-pointer`}>{field.fieldType}</td>
                                                    <td className={`cursor-pointer`}>{field.isRequired ? "Yes" : "No"}</td>
                                                    <td className={`cursor-pointer pe-4 text-end`}>
                                                        <ButtonGroup className="action-buttons">
                                                            <Button
                                                                variant="link"
                                                                className="btn-icon"
                                                                onClick={() => handleUpdateField(field)}
                                                            >
                                                                <FaEdit className="text-warning" />
                                                            </Button>
                                                            <Button
                                                                variant="link"
                                                                className="btn-icon"
                                                                onClick={() => handleDeleteField(field._id)}
                                                            >
                                                                <FaTrash className="text-danger" />
                                                            </Button>
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="empty-state text-center py-5">
                                    <div className="empty-state-icon bg-light-danger text-danger mb-4">
                                        <FaBan className="display-4" />
                                    </div>
                                    <h4 className="text-dark mb-3">No Custom Field</h4>
                                    <p className="text-muted">Try Refreesh to find Custom Field</p>
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2">
                                <div className="mb-3 mb-md-0 text-muted small">
                                    Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, customFields.length)} of {customFields.length}
                                </div>
                                <Pagination className="mb-0">
                                    <Pagination.Prev
                                        disabled={currentPage === 1}
                                        onClick={() => paginate(currentPage - 1)}
                                        className="page-link-hover"
                                    />
                                    {Array.from({ length: Math.ceil(customFields.length / itemsPerPage) }, (_, index) => (
                                        <Pagination.Item
                                            key={index + 1}
                                            active={index + 1 === currentPage}
                                            onClick={() => paginate(index + 1)}
                                            className="mx-1 page-link-hover"
                                        >
                                            {index + 1}
                                        </Pagination.Item>
                                    ))}
                                    <Pagination.Next
                                        disabled={currentPage === Math.ceil(customFields.length / itemsPerPage)}
                                        onClick={() => paginate(currentPage + 1)}
                                        className="page-link-hover"
                                    />
                                </Pagination>
                            </div>
                        </Card.Body>
                    </Card>
                </>
            )}

            {/* Update Modal */}
            {selectedField && (
                <UpdateCustomFieldModal
                    fieldToEdit={selectedField}
                    show={showUpdateModal}
                    handleClose={() => setShowUpdateModal(false)}
                />
            )}
        </div>
    );
};

export default AdminCustomFieldsList;