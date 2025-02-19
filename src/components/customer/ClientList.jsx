import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCustomer, deleteCustomer } from "../../redux/actions/customer/customerActions";
import { Card, Table, Row, Col, Form, Button, Spinner, Container, Pagination, Badge, ButtonGroup } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { FaSearch, FaEye, FaEdit, FaTrash, FaStar, FaBan, FaInfoCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import CustomerDetailModal from "./CustomerDetailModal";
import UpdateCustomerModal from "../customerForm/updateModel";
import "../../assets/css/index.css";

const ClientList = () => {
    const [searchQuery, setSearchQuery] = useState({
        companyName: "",
        mobileNumber: "",
        contactPerson: "",
        tallySerialNo: ""
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [primeColor, setPrimeColor] = useState(localStorage.getItem("primeColor") || "#ffc1072a");
    const [blacklistedColor, setBlacklistedColor] = useState(localStorage.getItem("blacklistedColor") || "#dc354636");

    useEffect(() => {
        localStorage.setItem("primeColor", primeColor);
    }, [primeColor]);

    useEffect(() => {
        localStorage.setItem("blacklistedColor", blacklistedColor);
    }, [blacklistedColor]);

    const limit = 10;
    const dispatch = useDispatch();
    const { customers, loading, error, pagination } = useSelector(state => state.customer);
    const { user } = useSelector(state => state.auth);
    const isAdmin = user?.role === "admin";

    useEffect(() => {
        dispatch(searchCustomer({}, currentPage, limit));
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setCurrentPage(newPage);
            dispatch(searchCustomer(searchQuery, newPage, limit));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery(prev => ({ ...prev, [name]: value }));
        dispatch(searchCustomer({ ...searchQuery, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(searchCustomer(searchQuery, 1, limit));
    };

    const handleViewDetails = (customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
    };

    const handleDeleteCustomer = (customerId) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            dispatch(deleteCustomer(customerId))
                .then(() => dispatch(searchCustomer({})))
                .catch(() => toast.error("Failed to delete customer"));
        }
    };

    const handleUpdateCustomer = (customer) => {
        // console.log("OPEN");

        setSelectedCustomer(customer);
        setShowUpdateModal(true);
    };

    // Inside your CustomerList component

    // Helper function to generate pagination items with ellipsis
    const getPaginationItems = () => {
        const total = pagination.totalPages;
        const current = currentPage;
        const delta = 2; // Number of pages to show on each side of the current page

        // If total pages are small, show all
        if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        const pages = [];
        // Always show the first page
        pages.push(1);

        // Add left ellipsis if needed
        if (current - delta > 2) {
            pages.push('ellipsis');
        } else {
            // Add the pages between 2 and the start of the range if no ellipsis is needed
            for (let i = 2; i < Math.max(2, current - delta); i++) {
                pages.push(i);
            }
        }

        // Determine the range of pages around the current page
        const start = Math.max(2, current - delta);
        const end = Math.min(total - 1, current + delta);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Add right ellipsis if needed
        if (current + delta < total - 1) {
            pages.push('ellipsis');
        } else {
            // Add the pages between the end of the range and the last page if no ellipsis is needed
            for (let i = current + delta + 1; i < total; i++) {
                pages.push(i);
            }
        }

        // Always show the last page
        pages.push(total);
        return pages;
    };


    return (
        <>
            <Container className="client-list-container">
                <ToastContainer position="top-right" autoClose={3000} />

                {/* Search Card */}
                <Card className="mb-4 shadow-sm border-0">
                    <Card.Body className="p-4">
                        <div className="d-flex align-items-center mb-4">
                            <div className="search-icon-wrapper">
                                <FaSearch className="text-cstm fs-5" />
                            </div>
                            <h4 className="m-0 ms-3 fw-semibold text-cstm">Customer Search</h4>
                        </div>
                        <Form onSubmit={handleSearch}>
                            <Row className="g-4">
                                {['companyName', 'contactPerson', 'mobileNumber', 'tallySerialNo'].map(field => (
                                    <Col xs={12} md={6} lg={3} key={field}>
                                        <Form.Group>
                                            <Form.Label className="small mb-2 text-muted">
                                                {field.replace(/([A-Z])/g, ' $1').trim()}
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name={field}
                                                value={searchQuery[field]}
                                                onChange={handleChange}
                                                placeholder={`Search ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                                                className="bdr"
                                            />
                                        </Form.Group>
                                    </Col>
                                ))}
                                <Col className="d-flex justify-content-end">
                                    <Button
                                        // variant="primary" 
                                        disabled={loading}
                                        className="px-4 bg-btn"
                                    >
                                        {loading ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : (
                                            <span className="responsive-text">Search <FaSearch className="ms-2" /></span>
                                        )}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>

                {/* Results Section */}
                <Card className="shadow-lg border-0 responsive-card">
                    <Card.Body className="responsive-card-body">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                            <div className="d-flex align-items-center mb-3 mb-md-0">
                                <div>
                                    <h4 className="m-0 responsive-heading text-cstm">Customer Results</h4>
                                    <p className="m-0 text-muted responsive-text small">
                                        Real-time customer data overview
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="vr mx-3" style={{ height: '2rem' }}></div>
                                <div className="text-end">
                                    <div className="text-cstm fw-medium responsive-text">
                                        {pagination?.totalItems} Total Records
                                    </div>
                                    <div className="text-muted responsive-text small">
                                        Page {currentPage} of {pagination?.totalPages}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {customers?.length > 0 ? (
                            <div className="table-responsive rounded-3">
                                <Table className="align-middle mb-0 customer-table">
                                    <thead className="gradient-header">
                                        <tr>
                                            <th className="ps-4 responsive-text">#</th>
                                            <th className="responsive-text">Company</th>
                                            <th className="responsive-text">Contact Person</th>
                                            <th className="responsive-text">Mobile</th>
                                            <th className="pe-4 text-end responsive-text">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map((customer, index) => {
                                            // Determine row background based on customer status
                                            const rowBg =
                                                customer.prime
                                                    ? primeColor
                                                    : customer.blacklisted
                                                        ? blacklistedColor
                                                        : "inherit";
                                            return (
                                                <tr
                                                    key={customer._id}
                                                    className="cursor-pointer"
                                                    style={{ backgroundColor: rowBg }}
                                                    onClick={() => handleViewDetails(customer)}
                                                >
                                                    <td
                                                        className="ps-4 fw-medium responsive-text cursor-pointer"
                                                        style={{ backgroundColor: rowBg }}
                                                    >
                                                        {(currentPage - 1) * limit + index + 1}
                                                    </td>
                                                    <td
                                                        className="cursor-pointer responsive-text"
                                                        style={{ backgroundColor: rowBg }}
                                                    >
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <div className="fw-semibold">{customer.companyName}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className="cursor-pointer responsive-text"
                                                        style={{ backgroundColor: rowBg }}
                                                    >
                                                        {customer.contactPerson}
                                                    </td>
                                                    <td
                                                        className="cursor-pointer responsive-text"
                                                        style={{ backgroundColor: rowBg }}
                                                    >
                                                        {customer.mobileNumber}
                                                    </td>
                                                    <td
                                                        className="cursor-pointer pe-4 text-end responsive-text"
                                                        style={{ backgroundColor: rowBg }}
                                                    >
                                                        <ButtonGroup className="action-buttons">
                                                            <Button
                                                                variant="link"
                                                                className="btn-icon"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleViewDetails(customer);
                                                                }}
                                                            >
                                                                <FaEye className="text-primary" />
                                                            </Button>
                                                            {isAdmin && (
                                                                <>
                                                                    <Button
                                                                        variant="link"
                                                                        className="btn-icon"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleUpdateCustomer(customer);
                                                                        }}
                                                                    >
                                                                        <FaEdit className="text-warning" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="link"
                                                                        className="btn-icon"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleDeleteCustomer(customer._id);
                                                                        }}
                                                                    >
                                                                        <FaTrash className="text-danger" />
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        ) : (
                            <div className="empty-state text-center py-5">
                                <div className="empty-state-icon bg-light-danger text-danger mb-4">
                                    <FaBan className="display-4" />
                                </div>
                                <h4 className="text-dark mb-3 responsive-heading">No Customers Found</h4>
                                <p className="text-muted responsive-text">
                                    Try adjusting your search filters to find customers
                                </p>
                            </div>
                        )}

                        {/* Color Picker */}
                        <div className="mt-3 d-flex gap-3 align-items-center">
                            <div className="d-flex align-items-center gap-2">
                                <label className="d-flex align-items-center gap-2 cursor-pointer">
                                    <input
                                        type="color"
                                        value={primeColor}
                                        onChange={(e) => setPrimeColor(e.target.value)}
                                        style={{
                                            width: "17px",
                                            height: "17px",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: "0",
                                        }}
                                        className="shadow-sm"
                                    />
                                    <span className="fw-semibold text-dark responsive-text">Prime</span>
                                </label>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <label className="d-flex align-items-center gap-2 cursor-pointer">
                                    <input
                                        type="color"
                                        value={blacklistedColor}
                                        onChange={(e) => setBlacklistedColor(e.target.value)}
                                        style={{
                                            width: "17px",
                                            height: "17px",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: "0",
                                        }}
                                        className="shadow-sm"
                                    />
                                    <span className="text-dark responsive-text">Blacklisted</span>
                                </label>
                            </div>
                        </div>

                        {/* Pagination */}
                        {pagination?.totalPages > 1 && (
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                                <div className="mb-3 mb-md-0 text-muted responsive-text">
                                    Showing {((currentPage - 1) * limit) + 1} - {Math.min(currentPage * limit, pagination.totalItems)} of {pagination.totalItems}
                                </div>
                                <Pagination className="mb-0">
                                    <Pagination.Prev
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className="page-link-hover responsive-text"
                                    />
                                    {getPaginationItems().map((item, index) =>
                                        item === 'ellipsis' ? (
                                            <Pagination.Ellipsis key={`ellipsis-${index}`} disabled className="mx-1" />
                                        ) : (
                                            <Pagination.Item
                                                key={item}
                                                active={item === currentPage}
                                                onClick={() => handlePageChange(item)}
                                                className="mx-1 page-link-hover responsive-text"
                                            >
                                                <span className="responsive-text">{item}</span>
                                            </Pagination.Item>
                                        )
                                    )}
                                    <Pagination.Next
                                        disabled={currentPage === pagination.totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className="page-link-hover responsive-text"
                                    />
                                </Pagination>
                            </div>
                        )}


                        {/* {pagination?.totalPages > 1 && (
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                                <div className="mb-3 mb-md-0 text-muted responsive-text">
                                    Showing {((currentPage - 1) * limit) + 1} - {Math.min(currentPage * limit, pagination.totalItems)} of {pagination.totalItems}
                                </div>
                                <Pagination className="mb-0">
                                    <Pagination.Prev
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className="page-link-hover responsive-text"
                                    />
                                    {Array.from({ length: pagination.totalPages }, (_, index) => (
                                        <Pagination.Item
                                            key={index + 1}
                                            active={index + 1 === currentPage}
                                            onClick={() => handlePageChange(index + 1)}
                                            className="mx-1 page-link-hover responsive-text"
                                        >
                                            <span className="responsive-text">{index + 1}</span>
                                        </Pagination.Item>
                                    ))}
                                    <Pagination.Next
                                        disabled={currentPage === pagination.totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className="page-link-hover responsive-text"
                                    />
                                </Pagination>
                            </div>
                        )} */}
                    </Card.Body>
                </Card>

                {/* Modals */}
                {selectedCustomer && <CustomerDetailModal show={showModal} onHide={() => setShowModal(false)} customer={selectedCustomer} />}
                {selectedCustomer && <UpdateCustomerModal show={showUpdateModal} handleClose={() => setShowUpdateModal(false)} customerData={selectedCustomer} />}
            </Container>
        </>
    );
};

export default ClientList;


