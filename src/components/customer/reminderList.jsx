// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchReminders } from "../../redux/actions/customer/customerActions";
// import {
//     Card, Table, Row, Col, Form, Button, Spinner, Container,
//     Modal, ListGroup, Badge, ButtonGroup, Stack
// } from "react-bootstrap";
// import { toast, ToastContainer } from "react-toastify";
// import { FaSearch, FaFileExcel, FaFilePdf, FaCalendarAlt } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// import { utils as xlsxUtils, writeFile as writeExcelFile } from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable'


// // Add these utility functions
// const formatFileName = (baseName) => {
//     const date = new Date().toISOString().split('T')[0];
//     return `${baseName}_${date}`;
// };

// const flattenDataForExport = (reminders) => {
//     return reminders.flatMap(customer =>
//         customer.products?.map(product => ({
//             'Company Name': customer.companyName,
//             'Contact Person': customer.contactPerson,
//             'Mobile Number': customer.mobileNumber,
//             'Email': customer.email,
//             'Product Name': product.productName,
//             'Purchase Date': new Date(product.purchaseDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
//             'Renewal Date': new Date(product.renewalDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
//             'Product Details': product.details
//         })) || []
//     );
// };

// const ReminderList = () => {
//     const [searchQuery, setSearchQuery] = useState({ reminderType: "thisMonth" });
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const dispatch = useDispatch();
//     const { reminders, loading, error } = useSelector(state => state.customerReminder) || { reminders: [] };

//     useEffect(() => { dispatch(fetchReminders(searchQuery)) }, [dispatch, searchQuery]);
//     useEffect(() => { error && toast.error(error) }, [error]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setSearchQuery(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (searchQuery.reminderType === "custom") {
//             if (!searchQuery.startDate || !searchQuery.endDate) {
//               // Optionally, you could show an alert or set an error message here
//               return;
//             }
//             // Also check that endDate is not earlier than startDate
//             if (searchQuery.endDate < searchQuery.startDate) {
//               return;
//             }
//           }
//         dispatch(fetchReminders(searchQuery));
//       };


//     const calculatePriority = (renewalDate) => {
//         const today = new Date();
//         const diffDays = Math.ceil((new Date(renewalDate) - today) / (86400000));
//         if (diffDays <= 7) return { label: 'High', variant: 'danger' };
//         if (diffDays <= 15) return { label: 'Medium', variant: 'warning' };
//         return { label: 'Low', variant: 'success' };
//     };

//     // Placeholder for export handlers
//     // const handleExportExcel = () => toast.info("Excel export feature coming soon!");
//     // const handleExportPDF = () => toast.info("PDF export feature coming soon!");

//     const handleExportExcel = () => {
//         const worksheet = xlsxUtils.json_to_sheet(flattenDataForExport(reminders));
//         const workbook = xlsxUtils.book_new();
//         xlsxUtils.book_append_sheet(workbook, worksheet, "Renewals");
//         writeExcelFile(workbook, `${formatFileName('Renewals')}.xlsx`);
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         const headers = [
//             'Company Name',
//             'Contact Person',
//             'Mobile',
//             'Email',
//             'Product',
//             'Renewal Date',
//             'Details'
//         ];

//         const data = flattenDataForExport(reminders)?.map(item => [
//             item['Company Name'],
//             item['Contact Person'],
//             item['Mobile Number'],
//             item['Email'],
//             item['Product Name'],
//             item['Renewal Date'],
//             item['Product Details']
//         ]);

//         doc.autoTable({
//             head: [headers],
//             body: data,
//             theme: 'grid',
//             styles: { fontSize: 8 },
//             headerStyles: { fillColor: [41, 128, 185], textColor: 255 },
//             margin: { top: 20 }
//         });

//         doc.text(`Renewal Report - ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}`, 14, 15);
//         doc.save(`${formatFileName('Renewals')}.pdf`);
//     };


//     return (
//         <Container fluid className="p-lg-4 p-2">
//             <ToastContainer position="top-right" autoClose={3000} />

//             {/* Search Card */}
//             <Card className="mb-4 shadow-sm">
//                 <Card.Body>
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h5 className="mb-0">Filter Renewals</h5>
//                         <ButtonGroup>
//                             <Button variant="outline-success" onClick={handleExportExcel}>
//                                 <FaFileExcel className="me-2" /> Excel
//                             </Button>
//                             <Button variant="outline-danger" onClick={handleExportPDF}>
//                                 <FaFilePdf className="me-2" /> PDF
//                             </Button>
//                         </ButtonGroup>
//                     </div>

//                     <Form onSubmit={handleSearch}>
//                         <Row className="g-3">
//                             <Col md={4}>
//                                 <Form.Select name="reminderType" value={searchQuery.reminderType} onChange={handleChange}>
//                                     <option value="thisWeek">This Week</option>
//                                     <option value="in15Days">Next 15 Days</option>
//                                     <option value="thisMonth">This Month</option>
//                                     <option value="nextMonth">Next Month</option>
//                                     <option value="custom">Custom Date Range</option>
//                                 </Form.Select>
//                             </Col>

//                             {searchQuery.reminderType === "custom" && (
//                                 <>
//                                     <Col md={3}>
//                                         <Form.Control type="date" name="startDate" onChange={handleChange} />
//                                     </Col>
//                                     <Col md={3}>
//                                         <Form.Control
//                                             type="date"
//                                             name="endDate"
//                                             onChange={handleChange}
//                                             min={searchQuery.startDate || ''}
//                                         />
//                                     </Col>
//                                 </>
//                             )}

//                             <Col md={2}>
//                                 <Button type="submit" variant="primary" className="w-100">
//                                     <FaSearch className="me-2" /> Search
//                                 </Button>
//                             </Col>
//                         </Row>
//                     </Form>
//                 </Card.Body>
//             </Card>

//             {/* Customer List */}
//             {loading ? (
//                 <div className="text-center py-5">
//                     <Spinner animation="border" variant="primary" />
//                     <p className="mt-2">Loading Renewals...</p>
//                 </div>
//             ) : (
//                 <Row className="g-4">
//                     {reminders?.length > 0 ? reminders?.map(customer => (
//                         <Col key={customer._id} xs={12} lg={6} xl={4}>
//                             <Card className="h-100 shadow-sm">
//                                 <Card.Body>
//                                     <Stack direction="horizontal" className="mb-3" gap={2}>
//                                         <div>
//                                             <h5 className="mb-1">{customer.companyName}</h5>
//                                             <p className="text-muted mb-0">{customer.contactPerson}</p>
//                                             <div className="d-flex flex-wrap gap-2">
//                                                 <a
//                                                     href={`tel:${customer.mobileNumber}`}
//                                                     className="text-decoration-none text-primary"
//                                                     style={{ cursor: 'pointer' }}
//                                                 >
//                                                     {customer.mobileNumber}
//                                                 </a>
//                                                 <span>•</span>
//                                                 <a
//                                                     href={`mailto:${customer.email}`}
//                                                     className="text-decoration-none text-primary"
//                                                     style={{ cursor: 'pointer' }}
//                                                 >
//                                                     {customer.email}
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </Stack>

//                                     <div className="border-top pt-3">
//                                         <h6 className="text-muted mb-3">Upcoming Renewals:</h6>
//                                         <Stack gap={2}>
//                                             {customer.products?.map((product, index) => {
//                                                 const priority = calculatePriority(product.renewalDate);
//                                                 return (
//                                                     <Button
//                                                         key={index}
//                                                         variant="outline-secondary"
//                                                         className="d-flex justify-content-between align-items-center text-start"
//                                                         onClick={() => setSelectedProduct(product)}
//                                                     >
//                                                         <div>
//                                                             <div className="fw-bold">{product.productName}</div>
//                                                             <small className="text-muted">
//                                                                 <FaCalendarAlt className="me-1" />
//                                                                 {new Date(product.renewalDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
//                                                             </small>
//                                                         </div>
//                                                         <Badge bg={priority.variant} className="ms-2">
//                                                             {priority.label}
//                                                         </Badge>
//                                                     </Button>
//                                                 );
//                                             })}
//                                         </Stack>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     )) : (
//                         <Col xs={12}>
//                             <div className="text-center py-5 text-muted">
//                                 <h5>No Upcoming Renewals Found</h5>
//                                 <p>Try adjusting your search filters</p>
//                             </div>
//                         </Col>
//                     )}
//                 </Row>
//             )}

//             {/* Product Detail Modal */}
//             <Modal show={!!selectedProduct} onHide={() => setSelectedProduct(null)} size="lg" centered>
//                 {selectedProduct && (
//                     <>
//                         <Modal.Header closeButton className="border-bottom-0">
//                             <Modal.Title className="text-primary">{selectedProduct.productName}</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             <ListGroup variant="flush">
//                                 <ListGroup.Item className="d-flex justify-content-between">
//                                     <span>Purchase Date:</span>
//                                     <span className="text-muted">
//                                         {new Date(selectedProduct.purchaseDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
//                                     </span>
//                                 </ListGroup.Item>
//                                 <ListGroup.Item className="d-flex justify-content-between">
//                                     <span>Renewal Date:</span>
//                                     <span className="fw-bold text-primary">
//                                         {new Date(selectedProduct.renewalDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
//                                     </span>
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <div className="mb-2">Additional Details:</div>
//                                     <div className="text-muted">
//                                         {selectedProduct.details || "No additional details provided"}
//                                     </div>
//                                 </ListGroup.Item>
//                             </ListGroup>

//                             {/* Future Action Buttons */}
//                             <div className="mt-4 d-flex gap-2 justify-content-end">
//                                 <Button variant="outline-danger">Cancel Renewal</Button>
//                                 <Button variant="primary">Update Renewal Date</Button>
//                             </div>
//                         </Modal.Body>
//                     </>
//                 )}
//             </Modal>
//         </Container>
//     );
// };

// export default ReminderList;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReminders } from "../../redux/actions/customer/customerActions"; // Updated action should now return data.data.products
import { listProductDetails } from "../../redux/actions/product/productActions.js";
import {
    Card,
    Table,
    Row,
    Col,
    Form,
    Button,
    Spinner,
    Container,
    Modal,
    ListGroup,
    Badge,
    ButtonGroup,
    Stack,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { FaSearch, FaFileExcel, FaFilePdf, FaCalendarAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { utils as xlsxUtils, writeFile as writeExcelFile } from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Select from "react-select";
import { FaWhatsapp } from "react-icons/fa";
import { CiShare1 } from "react-icons/ci";

// Utility functions for export
const formatFileName = (baseName) => {
    const date = new Date().toISOString().split("T")[0];
    return `${baseName}_${date}`;
};

const flattenDataForExport = (reminders) => {
    return reminders.flatMap((renewal) => {
        const customer = renewal.customerId;
        const product = renewal.productDetailId;
        return [
            {
                "Company Name": customer.companyName,
                "Contact Person": customer.contactPerson,
                "Mobile Number": customer.mobileNumber,
                "Email": customer.email,
                "Product Name": product.name,
                "Purchase Date": new Date(renewal.purchaseDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }),
                "Renewal Date": new Date(renewal.renewalDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }),
                "Product Details": renewal.details,
            },
        ];
    });
};

const calculatePriority = (renewalDate) => {
    const today = new Date();
    const diffDays = Math.ceil((new Date(renewalDate) - today) / 86400000);
    if (diffDays <= 7) return { label: "High", variant: "danger" };
    if (diffDays <= 15) return { label: "Medium", variant: "warning" };
    return { label: "Low", variant: "success" };
};

const ReminderList = () => {
    const dispatch = useDispatch();
    // Updated initial searchQuery state to match API parameters
    const [searchQuery, setSearchQuery] = useState({
        period: "thisWeek",
        startDate: "",
        endDate: "",
        product: "",
        reference: "",
        page: 1,
        limit: 10,
    });

    // Also get product details from store for filtering
    const { productDetails } = useSelector((state) => state.product) || { productDetails: [] };
    const { reminders, loading, error } = useSelector((state) => state.customerReminder) || { reminders: [] };
    // console.log("Component",reminders);

    // Build options for product filter dropdown
    const productOptions = productDetails.map((prod) => ({
        value: prod._id,
        label: prod.name,
    }));
    // console.log(productDetails);

    useEffect(() => {
        dispatch(fetchReminders(searchQuery));
        dispatch(listProductDetails());
    }, [dispatch, searchQuery]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    // Handle changes in the filter form
    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (selectedOption, { name }) => {
        setSearchQuery((prev) => ({
            ...prev,
            [name]: selectedOption ? selectedOption.value : "",
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // For custom period, ensure dates are set and valid.
        if (searchQuery.period === "custom") {
            if (!searchQuery.startDate || !searchQuery.endDate) return;
            if (searchQuery.endDate < searchQuery.startDate) return;
        }
        dispatch(fetchReminders(searchQuery));
    };

    const getShareText = (renewal) => {
        const { customerId: customer, productDetailId: product, renewalDate } = renewal;
        const formattedDate = new Date(renewalDate).toLocaleDateString("en-GB");
        
        let shareText = `*Subject: Renewal Reminder - ${product.name}*\n\n` +
                        `Dear ${customer.contactPerson || customer.companyName},\n\n` +
                        `Your *${product.name}* subscription with *Shivansh Infosys* is due for renewal on *${formattedDate}*.\n\n` +
                        `To continue uninterrupted access to real-time business insights, reports, and automation features, kindly renew before the due date.\n\n` +
                        `For renewal assistance, contact us at 📞 *8141703007* or ✉ *shivanshinfosys@gmail.com*\n`;
        
        // Append reference details if available
        if (customer.referenceDetail) {
          const refName = customer.referenceDetail.referenceName || "";
          const refContact = customer.referenceDetail.referenceContact || customer.referenceDetail.email || "";
          shareText += `or\n${refName ? refName + ": " : ""}${refContact}\n\n`;
        } else {
          shareText += `\n`;
        }
        
        shareText += `Renew today and stay ahead in business! 🚀\n\n` +
                     `Best Regards,\nShivansh Infosys`;
        
        return shareText;
      };
      

    // Helper function to format phone numbers
    const getFormattedPhone = (phone) => {
        let formattedPhone = phone.replace(/\D/g, ""); // Strip non-numeric characters
        // If the phone number does not start with '91', prepend it
        if (!formattedPhone.startsWith("91")) {
            formattedPhone = "91" + formattedPhone;
        }
        return formattedPhone;
    };


    // Local state for modal (selected renewal record)
    const [selectedRenewal, setSelectedRenewal] = useState(null);

    return (
        <Container fluid className="p-lg-4 p-2">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Search Filter Card */}
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Filter Renewals</h5>
                        <ButtonGroup>
                            <Button variant="outline-success" onClick={() => window.location.reload()}>
                                Refresh
                            </Button>
                            {/* Export buttons */}
                            <Button variant="outline-success" onClick={() => {
                                const worksheet = xlsxUtils.json_to_sheet(flattenDataForExport(reminders));
                                const workbook = xlsxUtils.book_new();
                                xlsxUtils.book_append_sheet(workbook, worksheet, "Renewals");
                                writeExcelFile(workbook, `${formatFileName("Renewals")}.xlsx`);
                            }}>
                                <FaFileExcel className="me-2" /> Excel
                            </Button>
                            <Button variant="outline-danger" onClick={() => {
                                const doc = new jsPDF();
                                const headers = [
                                    "Company Name",
                                    "Contact Person",
                                    "Mobile",
                                    "Email",
                                    "Product",
                                    "Renewal Date",
                                    "Details",
                                ];
                                const data = flattenDataForExport(reminders)?.map((item) => [
                                    item["Company Name"],
                                    item["Contact Person"],
                                    item["Mobile Number"],
                                    item["Email"],
                                    item["Product Name"],
                                    item["Renewal Date"],
                                    item["Product Details"],
                                ]);
                                doc.autoTable({
                                    head: [headers],
                                    body: data,
                                    theme: "grid",
                                    styles: { fontSize: 8 },
                                    headerStyles: { fillColor: [41, 128, 185], textColor: 255 },
                                    margin: { top: 20 },
                                });
                                doc.text(
                                    `Renewal Report - ${new Date().toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}`,
                                    14,
                                    15
                                );
                                doc.save(`${formatFileName("Renewals")}.pdf`);
                            }}>
                                <FaFilePdf className="me-2" /> PDF
                            </Button>
                        </ButtonGroup>
                    </div>

                    <Form onSubmit={handleSearch}>
                        <Row className="g-3">
                            <Col md={3}>
                                <Form.Select
                                    name="period"
                                    value={searchQuery.period}
                                    onChange={handleSearchChange}
                                >
                                    <option value="thisWeek">This Week</option>
                                    <option value="in15Days">Next 15 Days</option>
                                    <option value="thisMonth">This Month</option>
                                    <option value="nextMonth">Next Month</option>
                                    <option value="custom">Custom Date Range</option>
                                </Form.Select>
                            </Col>

                            {searchQuery.period === "custom" && (
                                <>
                                    <Col md={3}>
                                        <Form.Control
                                            type="date"
                                            name="startDate"
                                            value={searchQuery.startDate}
                                            onChange={handleSearchChange}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            type="date"
                                            name="endDate"
                                            value={searchQuery.endDate}
                                            onChange={handleSearchChange}
                                            min={searchQuery.startDate || ""}
                                        />
                                    </Col>
                                </>
                            )}

                            <Col md={3}>
                                <Select
                                    name="product"
                                    options={productOptions}
                                    placeholder="Select Product"
                                    value={
                                        productOptions.find(
                                            (opt) => opt.value === searchQuery.product
                                        ) || null
                                    }
                                    onChange={handleSelectChange}
                                />
                            </Col>

                            <Col md={3}>
                                <Form.Control
                                    type="text"
                                    name="reference"
                                    placeholder="Reference filter"
                                    value={searchQuery.reference}
                                    onChange={handleSearchChange}
                                />
                            </Col>

                            <Col md={2}>
                                <Button type="submit" variant="primary" className="w-100">
                                    <FaSearch className="me-2" /> Search
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

            {/* Renewal List */}
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Loading Renewals...</p>
                </div>
            ) : reminders?.length > 0 ? (
                <Row className="g-4">

                    {reminders.map((renewal) => {
                          const customer = renewal.customerId;
                          const product = renewal.productDetailId;
                          const priority = calculatePriority(renewal.renewalDate);
                        
                          // Build share text (using your updated getShareText function)
                          const shareMessage = getShareText(renewal);
                        
                          // Format phone numbers for customer and reference
                          const customerPhone = getFormattedPhone(customer.mobileNumber);
                          const customerShareUrl = `https://wa.me/${customerPhone}?text=${encodeURIComponent(shareMessage)}`;
                        
                          const referenceShareUrl =
                            customer.referenceDetail && customer.referenceDetail.referenceContact
                              ? `https://wa.me/${getFormattedPhone(customer.referenceDetail.referenceContact)}?text=${encodeURIComponent(shareMessage)}`
                              : null;

                        return (
                            <Col key={renewal._id} xs={12} lg={6} xl={4}>
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
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {customer.mobileNumber}
                                                    </a>
                                                    <span>•</span>
                                                    <a
                                                        href={`mailto:${customer.email}`}
                                                        className="text-decoration-none text-primary"
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {customer.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </Stack>

                                        {customer.referenceDetail && (
                                            <div>
                                                <h6>Reference:</h6>
                                                {customer.referenceDetail.referenceId ? (
                                                    <div>
                                                        <h6 className="mb-1 text-muted">
                                                            {customer.referenceDetail.username}
                                                        </h6>
                                                        <a
                                                            href={`mailto:${customer.referenceDetail.email}`}
                                                            className="text-decoration-none text-primary"
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {customer.referenceDetail.email}
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <h6 className="mb-1 text-muted">
                                                            {customer.referenceDetail.referenceName}
                                                        </h6>
                                                        <a
                                                            href={`tel:${customer.referenceDetail.referenceContact}`}
                                                            className="text-decoration-none text-primary"
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {customer.referenceDetail.referenceContact}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="border-top pt-3">
                                            <h6 className="text-muted mb-3">Upcoming Renewal:</h6>
                                            <Button
                                                variant="outline-secondary"
                                                className="d-flex justify-content-between align-items-center w-100 text-start"
                                                onClick={() => setSelectedRenewal(renewal)}
                                            >
                                                <div>
                                                    <div className="fw-bold">{product.name}</div>
                                                    <small>
                                                        <FaCalendarAlt className="me-1" />
                                                        {new Date(renewal.renewalDate).toLocaleDateString("en-GB", {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                        })}
                                                    </small>
                                                </div>
                                                <Badge bg={priority.variant} className="ms-2">
                                                    {priority.label}
                                                </Badge>
                                            </Button>

                                            {/* Share Button for Customer */}
                                            <a
                                                href={customerShareUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary  mt-2  "
                                            >
                                                <FaWhatsapp style={{padding: "0 0 3px 0", fontSize: "19px" }} /> <span>Customer</span>
                                                <CiShare1 style={{padding: "0 0 3px 0", fontSize: "19px" }}/>
                                            </a>

                                            {/* Conditional Share Button for Reference */}
                                            {referenceShareUrl && (
                                                <a
                                                    href={referenceShareUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-info mt-2  "
                                                >
                                                    <FaWhatsapp style={{padding: "0 0 3px 0", fontSize: "19px" }} /> <span>Reference</span> <CiShare1 style={{padding: "0 0 3px 0", fontSize: "19px" }}/>
                                                </a>
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}


                </Row>
            ) : (
                <Row>
                    <Col xs={12}>
                        <div className="text-center py-5 text-muted">
                            <h5>No Upcoming Renewals Found</h5>
                            <p>Try adjusting your search filters</p>
                        </div>
                    </Col>
                </Row>
            )}

            {/* Renewal Detail Modal */}
            <Modal
                show={!!selectedRenewal}
                onHide={() => setSelectedRenewal(null)}
                size="lg"
                centered
            >
                {selectedRenewal && (
                    <>
                        <Modal.Header closeButton className="border-bottom-0">
                            <Modal.Title className="text-primary">
                                {selectedRenewal.productDetailId.name}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Purchase Date:</span>
                                    <span className="text-muted">
                                        {new Date(selectedRenewal.purchaseDate).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Renewal Date:</span>
                                    <span className="fw-bold text-primary">
                                        {new Date(selectedRenewal.renewalDate).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="mb-2">Additional Details:</div>
                                    <div className="text-muted">
                                        {selectedRenewal.details || "No additional details provided"}
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
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
