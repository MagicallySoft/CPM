import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReminders } from "../../redux/actions/customer/customerActions";
import {
    Card, Table, Row, Col, Form, Button, Spinner, Container,
    Modal, ListGroup, Badge, ButtonGroup, Stack
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { FaSearch, FaFileExcel, FaFilePdf, FaCalendarAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

import { utils as xlsxUtils, writeFile as writeExcelFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable'


// Add these utility functions
const formatFileName = (baseName) => {
    const date = new Date().toISOString().split('T')[0];
    return `${baseName}_${date}`;
};

const flattenDataForExport = (reminders) => {
    return reminders.flatMap(customer =>
        customer.products?.map(product => ({
            'Company Name': customer.companyName,
            'Contact Person': customer.contactPerson,
            'Mobile Number': customer.mobileNumber,
            'Email': customer.email,
            'Product Name': product.productName,
            'Purchase Date': new Date(product.purchaseDate).toLocaleDateString(),
            'Renewal Date': new Date(product.renewalDate).toLocaleDateString(),
            'Product Details': product.details
        })) || []
    );
};

const ReminderList = () => {
    const [searchQuery, setSearchQuery] = useState({ reminderType: "thisMonth" });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();
    const { reminders, loading, error } = useSelector(state => state.customerReminder) || { reminders: [] };

    useEffect(() => { dispatch(fetchReminders(searchQuery)) }, [dispatch, searchQuery]);
    useEffect(() => { error && toast.error(error) }, [error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => { e.preventDefault(); dispatch(fetchReminders(searchQuery)) };

    const calculatePriority = (renewalDate) => {
        const today = new Date();
        const diffDays = Math.ceil((new Date(renewalDate) - today) / (86400000));
        if (diffDays <= 7) return { label: 'High', variant: 'danger' };
        if (diffDays <= 15) return { label: 'Medium', variant: 'warning' };
        return { label: 'Low', variant: 'success' };
    };

    // Placeholder for export handlers
    // const handleExportExcel = () => toast.info("Excel export feature coming soon!");
    // const handleExportPDF = () => toast.info("PDF export feature coming soon!");

    const handleExportExcel = () => {
        const worksheet = xlsxUtils.json_to_sheet(flattenDataForExport(reminders));
        const workbook = xlsxUtils.book_new();
        xlsxUtils.book_append_sheet(workbook, worksheet, "Renewals");
        writeExcelFile(workbook, `${formatFileName('Renewals')}.xlsx`);
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        const headers = [
            'Company Name',
            'Contact Person',
            'Mobile',
            'Email',
            'Product',
            'Renewal Date',
            'Details'
        ];

        const data = flattenDataForExport(reminders)?.map(item => [
            item['Company Name'],
            item['Contact Person'],
            item['Mobile Number'],
            item['Email'],
            item['Product Name'],
            item['Renewal Date'],
            item['Product Details']
        ]);

        doc.autoTable({
            head: [headers],
            body: data,
            theme: 'grid',
            styles: { fontSize: 8 },
            headerStyles: { fillColor: [41, 128, 185], textColor: 255 },
            margin: { top: 20 }
        });

        doc.text(`Renewal Report - ${new Date().toLocaleDateString()}`, 14, 15);
        doc.save(`${formatFileName('Renewals')}.pdf`);
    };


    return (
        <Container fluid className="p-lg-4 p-2">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Search Card */}
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Filter Renewals</h5>
                        <ButtonGroup>
                            <Button variant="outline-success" onClick={handleExportExcel}>
                                <FaFileExcel className="me-2" /> Excel
                            </Button>
                            <Button variant="outline-danger" onClick={handleExportPDF}>
                                <FaFilePdf className="me-2" /> PDF
                            </Button>
                        </ButtonGroup>
                    </div>

                    <Form onSubmit={handleSearch}>
                        <Row className="g-3">
                            <Col md={4}>
                                <Form.Select name="reminderType" value={searchQuery.reminderType} onChange={handleChange}>
                                    <option value="thisWeek">This Week</option>
                                    <option value="in15Days">Next 15 Days</option>
                                    <option value="thisMonth">This Month</option>
                                    <option value="nextMonth">Next Month</option>
                                    <option value="custom">Custom Date Range</option>
                                </Form.Select>
                            </Col>

                            {searchQuery.reminderType === "custom" && (
                                <>
                                    <Col md={3}>
                                        <Form.Control type="date" name="startDate" onChange={handleChange} />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control type="date" name="endDate" onChange={handleChange} />
                                    </Col>
                                </>
                            )}

                            <Col md={2}>
                                <Button type="submit" variant="primary" className="w-100">
                                    <FaSearch className="me-2" /> Search
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

            {/* Customer List */}
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Loading Renewals...</p>
                </div>
            ) : (
                <Row className="g-4">
                    {reminders?.length > 0 ? reminders?.map(customer => (
                        <Col key={customer._id} xs={12} lg={6} xl={4}>
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <Stack direction="horizontal" className="mb-3" gap={2}>
                                        <div>
                                            <h5 className="mb-1">{customer.companyName}</h5>
                                            <p className="text-muted mb-0">{customer.contactPerson}</p>
                                            <div className="d-flex flex-wrap gap-2">
                                                <a
                                                    href={`tel:${customer.mobileNumber}`}
                                                    className="text-decoration-none text-primary"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {customer.mobileNumber}
                                                </a>
                                                <span>•</span>
                                                <a
                                                    href={`mailto:${customer.email}`}
                                                    className="text-decoration-none text-primary"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {customer.email}
                                                </a>
                                            </div>
                                        </div>
                                    </Stack>

                                    <div className="border-top pt-3">
                                        <h6 className="text-muted mb-3">Upcoming Renewals:</h6>
                                        <Stack gap={2}>
                                            {customer.products?.map((product, index) => {
                                                const priority = calculatePriority(product.renewalDate);
                                                return (
                                                    <Button
                                                        key={index}
                                                        variant="outline-secondary"
                                                        className="d-flex justify-content-between align-items-center text-start"
                                                        onClick={() => setSelectedProduct(product)}
                                                    >
                                                        <div>
                                                            <div className="fw-bold">{product.productName}</div>
                                                            <small className="text-muted">
                                                                <FaCalendarAlt className="me-1" />
                                                                {new Date(product.renewalDate).toLocaleDateString()}
                                                            </small>
                                                        </div>
                                                        <Badge bg={priority.variant} className="ms-2">
                                                            {priority.label}
                                                        </Badge>
                                                    </Button>
                                                );
                                            })}
                                        </Stack>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )) : (
                        <Col xs={12}>
                            <div className="text-center py-5 text-muted">
                                <h5>No Upcoming Renewals Found</h5>
                                <p>Try adjusting your search filters</p>
                            </div>
                        </Col>
                    )}
                </Row>
            )}

            {/* Product Detail Modal */}
            <Modal show={!!selectedProduct} onHide={() => setSelectedProduct(null)} size="lg" centered>
                {selectedProduct && (
                    <>
                        <Modal.Header closeButton className="border-bottom-0">
                            <Modal.Title className="text-primary">{selectedProduct.productName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Purchase Date:</span>
                                    <span className="text-muted">
                                        {new Date(selectedProduct.purchaseDate).toLocaleDateString()}
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Renewal Date:</span>
                                    <span className="fw-bold text-primary">
                                        {new Date(selectedProduct.renewalDate).toLocaleDateString()}
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="mb-2">Additional Details:</div>
                                    <div className="text-muted">
                                        {selectedProduct.details || "No additional details provided"}
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>

                            {/* Future Action Buttons */}
                            <div className="mt-4 d-flex gap-2 justify-content-end">
                                <Button variant="outline-danger">Cancel Renewal</Button>
                                <Button variant="primary">Update Renewal Date</Button>
                            </div>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </Container>
    );
};

export default ReminderList;