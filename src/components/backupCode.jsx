/* ========================= */
/* AdminCustomFieldsList.jsx */
/* ========================= */


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Modal, Button, Form, Spinner } from "react-bootstrap";
// import { addCustomField } from "../redux/actions/customerActions"; // Redux action
// import { toast } from "react-toastify";
// import "../assets/css/index.css"; // Import custom CSS
// import { FaPlus  } from "react-icons/fa";

// const AddCustomFieldButton = () => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.customField || []);

//   // console.log(loading);
  
//   const [show, setShow] = useState(false);
//   const [fieldData, setFieldData] = useState({
//     fieldName: "",
//     fieldType: "text",
//     isRequired: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFieldData({
//       ...fieldData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(addCustomField(fieldData)); // Dispatch Redux action
//       // toast.success("Custom field added successfully!");
//       setShow(false); // Close modal
//       setFieldData({ fieldName: "", fieldType: "text", isRequired: false }); // Reset form
//     } catch (error) {
//       toast.error("Failed to add custom field");
//     }
//   };

//   return (
//     <>
//       {/* Button to open modal */}
//       <Button className="add-field-button" onClick={() => setShow(true)}>
//         <FaPlus/> Add Custom Field
//       </Button>

//       {/* Modal */}
//       <Modal show={show} onHide={() => setShow(false)} centered className="custom-modal">
//         <Modal.Header closeButton>
//           <Modal.Title>Add Custom Field</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group>
//               <Form.Label>Field Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="fieldName"
//                 value={fieldData.fieldName}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Field Type</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="fieldType"
//                 value={fieldData.fieldType}
//                 onChange={handleChange}
//               >
//                 <option value="text">Text</option>
//                 <option value="number">Number</option>
//                 <option value="date">Date</option>
//                 <option value="email">Email</option>
//                 <option value="checkbox">Checkbox</option>
//               </Form.Control>
//             </Form.Group>

//             <Form.Group>
//               <Form.Check
//                 type="checkbox"
//                 label="Required Field"
//                 name="isRequired"
//                 checked={fieldData.isRequired}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Button type="submit" className="mt-3 btn-primary" disabled={loading}>
//                {loading ? <Spinner animation="border" size="sm" /> : "Save Field "}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default AddCustomFieldButton;


/* ========================= */
/* AdminCustomFieldsList.jsx [Drop-down] */
/* ========================= */


// import React, { useState } from "react";
// import Select from "react-select";  // Import react-select
// import { useDispatch, useSelector } from "react-redux";
// import { Modal, Button, Form, Spinner } from "react-bootstrap";
// import { addCustomField } from "../redux/actions/customerActions";
// import { toast } from "react-toastify";
// import { FaPlus } from "react-icons/fa";

// const AddCustomFieldButton = () => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.customField || []);

//   const [show, setShow] = useState(false);
//   const [fieldData, setFieldData] = useState({
//     fieldName: "",
//     fieldType: "text",
//     isRequired: false,
//     options: [],
//     isMultiSelect: false,
//   });

//   const [newOption, setNewOption] = useState("");
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFieldData({
//       ...fieldData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const validateForm = () => {
//     let errors = {};
//     if (!fieldData.fieldName.trim()) errors.fieldName = "Field name is required!";
//     if (fieldData.fieldType === "dropdown" && fieldData.options.length === 0)
//       errors.options = "Dropdown must have at least one option!";
//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleAddOption = () => {
//     if (newOption.trim() && !fieldData.options.includes(newOption)) {
//       setFieldData({
//         ...fieldData,
//         options: [...fieldData.options, newOption],
//       });
//       setNewOption(""); // Reset input
//     } else {
//       toast.error("Option cannot be empty or duplicate!");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       await dispatch(addCustomField(fieldData));
//       setShow(false);
//       setFieldData({ fieldName: "", fieldType: "text", isRequired: false, options: [], isMultiSelect: false });
//     } catch (error) {
//       toast.error("Failed to add custom field");
//     }
//   };

//   return (
//     <>
//       <Button className="add-field-button" onClick={() => setShow(true)}>
//         <FaPlus /> Add Custom Field
//       </Button>

//       <Modal show={show} onHide={() => setShow(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Custom Field</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group>
//               <Form.Label>Field Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="fieldName"
//                 value={fieldData.fieldName}
//                 onChange={handleChange}
//                 isInvalid={!!errors.fieldName}
//               />
//               <Form.Control.Feedback type="invalid">{errors.fieldName}</Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Field Type</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="fieldType"
//                 value={fieldData.fieldType}
//                 onChange={handleChange}
//               >
//                 <option value="text">Text</option>
//                 <option value="number">Number</option>
//                 <option value="date">Date</option>
//                 <option value="email">Email</option>
//                 <option value="checkbox">Checkbox</option>
//                 <option value="dropdown">Dropdown</option>
//               </Form.Control>
//             </Form.Group>

//             {fieldData.fieldType === "dropdown" && (
//               <>
//                 <Form.Group>
//                   <Form.Label>Dropdown Options</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter option"
//                     value={newOption}
//                     onChange={(e) => setNewOption(e.target.value)}
//                   />
//                   <Button className="mt-2" variant="secondary" onClick={handleAddOption}>
//                     Add Option
//                   </Button>
//                   {errors.options && <div className="text-danger mt-1">{errors.options}</div>}
//                 </Form.Group>

//                 <Form.Group>
//                   <Form.Label>Options Preview</Form.Label>
//                   <Select
//                     options={fieldData.options.map((opt) => ({ label: opt, value: opt }))}
//                     isMulti={fieldData.isMultiSelect}
//                     // isDisabled
//                     placeholder="Options will appear here"
//                   />
//                 </Form.Group>

//                 <Form.Group>
//                   <Form.Check
//                     type="checkbox"
//                     label="Allow Multi-Select"
//                     name="isMultiSelect"
//                     checked={fieldData.isMultiSelect}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </>
//             )}

//             <Form.Group>
//               <Form.Check
//                 type="checkbox"
//                 label="Required Field"
//                 name="isRequired"
//                 checked={fieldData.isRequired}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Button type="submit" className="mt-3 btn-primary" disabled={loading}>
//               {loading ? <Spinner animation="border" size="sm" /> : "Save Field"}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default AddCustomFieldButton;



/* ========================= */
/* ClientForm.jsx */
/* ========================= */


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addCustomer, getCustomFields } from "../redux/actions/customerActions";
// import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AddCustomFieldButton from "./AddCustomFieldButton";
// import "../assets/css/index.css";

// const ClientForm = () => {
//     const dispatch = useDispatch();
//     const { loading } = useSelector((state) => state.customer || []);
//     // console.log(loading);

//     const { customFields } = useSelector((state) => state.customField) || { customFields: [] };

//     const [formData, setFormData] = useState({
//         companyName: "",
//         contactPerson: "",
//         mobileNumber: "",
//         email: "",
//         tallySerialNo: "",
//         prime: false,
//         blacklisted: false,
//         remark: "",
//         dynamicFields: {},
//     });

//     const [errors, setErrors] = useState({});
//     useEffect(() => {
//         dispatch(getCustomFields()); // Fetch custom fields on load
//     }, [dispatch]);

//     const validateForm = () => {
//         let newErrors = {};

//         // Basic field validations
//         if (!formData.companyName.trim()) newErrors.companyName = "Company name is required.";
//         if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required.";
//         if (!formData.mobileNumber.match(/^[0-9]{10}$/)) newErrors.mobileNumber = "Mobile number must be 10 digits.";
//         if (!formData.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
//             newErrors.email = "Invalid email format.";
//         }
//         if (!formData.tallySerialNo) {
//             newErrors.tallySerialNo = "Tally Serial Number must be a number.";
//         }

//         // Validate dynamic fields
//         customFields.forEach((field) => {
//             if (field.isRequired && !formData.dynamicFields[field.fieldName]?.trim()) {
//                 newErrors[field.fieldName] = `${field.fieldName} is required.`;
//             }
//         });

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     // const handleChange = (e) => {
//     //     const { name, value, type, checked } = e.target;
//     //     setFormData({
//     //         ...formData,
//     //         [name]: type === "checkbox" ? checked : value,
//     //     });
//     // };

//     const handleChange = (e) => {
//         const {  name, value, type, checked } = e.target;

//         if (name === "blacklisted" && checked) {
//             setFormData({
//                 ...formData,
//                 blacklisted: true,
//                 prime: false, // Automatically deselect Prime
//             });
//         } else if (name === "prime" && checked) {
//             setFormData({
//                 ...formData,
//                 blacklisted: false, // Automatically deselect Blacklisted
//                 prime: true,
//             });
//         } else {
//         setFormData({
//             ...formData,
//             [name]: type === "checkbox" ? checked : value,
//         });
//         }
//     };


//     const handleDynamicChange = (e, fieldName) => {
//         const { value, type, checked } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             dynamicFields: {
//                 ...prevData.dynamicFields,
//                 [fieldName]: type === "checkbox" ? checked : value,
//             },
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (validateForm()) {
//             dispatch(addCustomer(formData))
//                 .then(() => {
//                     setFormData({
//                         companyName: "",
//                         contactPerson: "",
//                         mobileNumber: "",
//                         email: "",
//                         tallySerialNo: "",
//                         prime: false,
//                         blacklisted: false,
//                         remark: "",
//                         dynamicFields: {},
//                     });
//                     // toast.success("Customer added successfully!");
//                 })
//                 .catch(() => toast.error("Failed to add customer."));
//         }
//     };

//     return (
//         <Container>
//             <ToastContainer position="top-right" autoClose={3000} />
//             <AddCustomFieldButton />
//             <Row className="justify-content-md-center">
//                 <Col md={8}>
//                     <div className="client-form-container">
//                         <h2 className="text-center my-4">Add Customer</h2>
//                         <Form onSubmit={handleSubmit} className="client-form">
//                             <Form.Group>
//                                 <Form.Label>Company Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="companyName"
//                                     value={formData.companyName}
//                                     onChange={handleChange}
//                                     isInvalid={!!errors.companyName}
//                                 />
//                                 <Form.Control.Feedback type="invalid">{errors.companyName}</Form.Control.Feedback>
//                             </Form.Group>
//                             <Form.Group>
//                                 <Form.Label>Contact Person</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="contactPerson"
//                                     value={formData.contactPerson}
//                                     onChange={handleChange}
//                                     isInvalid={!!errors.contactPerson}
//                                 />
//                                 <Form.Control.Feedback type="invalid">{errors.contactPerson}</Form.Control.Feedback>
//                             </Form.Group>

//                             <Form.Group>
//                                 <Form.Label>Mobile Number</Form.Label>
//                                 <Form.Control
//                                     type="tel"
//                                     name="mobileNumber"
//                                     value={formData.mobileNumber}
//                                     onChange={handleChange}
//                                     isInvalid={!!errors.mobileNumber}
//                                 />
//                                 <Form.Control.Feedback type="invalid">{errors.mobileNumber}</Form.Control.Feedback>
//                             </Form.Group>

//                             <Form.Group>
//                                 <Form.Label>Email</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     isInvalid={!!errors.email}
//                                 />
//                                 <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
//                             </Form.Group>

//                             <Form.Group>
//                                 <Form.Label>Tally Serial Number</Form.Label>
//                                 <Form.Control
//                                     type="number"
//                                     name="tallySerialNo"
//                                     value={formData.tallySerialNo}
//                                     onChange={handleChange}
//                                     isInvalid={!!errors.tallySerialNo}
//                                 />
//                                 <Form.Control.Feedback type="invalid">{errors.tallySerialNo}</Form.Control.Feedback>
//                             </Form.Group>

//                             <div className="d-flex align-items-center gap-4">
//                                 <Form.Group controlId="blacklisted" className="d-flex align-items-baseline">
//                                     <Form.Label className="me-2">Blacklisted</Form.Label>
//                                     <Form.Check
//                                         type="switch"
//                                         id="blacklisted-switch"
//                                         name="blacklisted"
//                                         checked={!!formData.blacklisted} // Ensure boolean value
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>

//                                 <Form.Group controlId="prime" className="d-flex align-items-baseline">
//                                     <Form.Label className="me-2">Prime</Form.Label>
//                                     <Form.Check
//                                         type="switch"
//                                         id="prime-switch"
//                                         name="prime"
//                                         checked={!!formData.prime} // Ensure boolean value
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </div>



//                             <Form.Group>
//                                 <Form.Label>Remark</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="remark"
//                                     value={formData.remark}
//                                     onChange={handleChange}
//                                 />
//                             </Form.Group>

//                             {/* Dynamic Custom Fields */}
//                             {customFields.map((field) => (
//                                 <Form.Group key={field._id} className="dynamic-field-group ">
//                                     <Form.Label>{field.fieldName}</Form.Label>
//                                     {field.fieldType === "text" && (
//                                         <Form.Control
//                                             type="text"
//                                             name={field.fieldName}
//                                             value={formData.dynamicFields[field.fieldName] || ""}
//                                             onChange={(e) => handleDynamicChange(e, field.fieldName)}
//                                             isInvalid={!!errors[field.fieldName]}
//                                         // required={field.isRequired}
//                                         />

//                                     )}
//                                     {field.fieldType === "number" && (
//                                         <Form.Control
//                                             type="number"
//                                             name={field.fieldName}
//                                             value={formData.dynamicFields[field.fieldName] || ""}
//                                             onChange={(e) => handleDynamicChange(e, field.fieldName)}
//                                             isInvalid={!!errors[field.fieldName]}
//                                         // required={field.isRequired}
//                                         />
//                                     )}
//                                     {field.fieldType === "email" && (
//                                         <Form.Control
//                                             type="email"
//                                             name={field.fieldName}
//                                             value={formData.dynamicFields[field.fieldName] || ""}
//                                             onChange={(e) => handleDynamicChange(e, field.fieldName)}
//                                             isInvalid={!!errors[field.fieldName]}
//                                         // required={field.isRequired}
//                                         />
//                                     )}
//                                     {field.fieldType === "checkbox" && (
//                                         <Form.Check
//                                             type="switch"
//                                             id={field.fieldName}
//                                             name={field.fieldName}
//                                             checked={!!formData.dynamicFields[field.fieldName]} // Ensure boolean default
//                                             onChange={(e) => handleDynamicChange(e, field.fieldName)}
//                                             className="m-2"
//                                         />

//                                     )}
//                                     {field.fieldType === "date" && (
//                                         <Form.Control
//                                             type="date"
//                                             name={field.fieldName}
//                                             value={formData.dynamicFields[field.fieldName] || ""}
//                                             onChange={(e) => handleDynamicChange(e, field.fieldName)}
//                                         />
//                                     )}
//                                     <Form.Control.Feedback type="invalid">{errors[field.fieldName]}</Form.Control.Feedback>
//                                 </Form.Group>
//                             ))}

//                             <Button type="submit" className="mt-3 btn-primary" disabled={loading}>
//                                 {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
//                             </Button>
//                         </Form>
//                     </div>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default ClientForm;




/* ========================= */
/* updateModel.jsx */
/* ========================= */
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getCustomFields, updateCustomer } from "../redux/actions/customerActions";
// import { Modal, Button, Form, Spinner } from "react-bootstrap";

// const UpdateCustomerModal = ({ show, handleClose, customerData }) => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.customer || []);
//   const { customFields } = useSelector((state) => state.customField) || { customFields: [] };;
//   // console.log(customFields);

//   const [formData, setFormData] = useState({});

//   // useEffect(() => {
//   //   if (customerData) {
//   //     setFormData(customerData);
//   //     setFormData({
//   //       ...customerData,
//   //       dynamicFields: customerData.dynamicFields || {}
//   //     });
//   //   }
//   //   dispatch(getCustomFields());
//   // }, [customerData, dispatch]);
//   useEffect(() => {
//     if (customerData) {
//       setFormData({
//         ...customerData,
//         blacklisted: customerData.blacklisted ?? false, // Ensure boolean
//         prime: customerData.prime ?? false, // Ensure boolean
//         dynamicFields: customerData.dynamicFields || {},
//       });
//     }
//     dispatch(getCustomFields());
//   }, [customerData, dispatch]);


//   // const handleChange = (e) => {
//   //   setFormData({ ...formData, [e.target.name]: e.target.value });
//   // };

//   // const handleChange = (e) => {
//   //   const { name, type, checked, value } = e.target;

//   //   setFormData((prevFormData) => ({
//   //     ...prevFormData,
//   //     [name]: type === "checkbox" ? checked : value, // Ensure checkboxes store boolean values
//   //   }));
//   // };
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name === "blacklisted" && checked) {
//       setFormData({
//         ...formData,
//         blacklisted: true,
//         prime: false, // Automatically deselect Prime
//       });
//     } else if (name === "prime" && checked) {
//       setFormData({
//         ...formData,
//         blacklisted: false, // Automatically deselect Blacklisted
//         prime: true,
//       });
//     } else {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: type === "checkbox" ? checked : value, // Ensure checkboxes store boolean values
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // console.log(formData);

//     dispatch(updateCustomer(customerData._id, formData)).then(() => {
//       handleClose();
//     });
//   };

//   // const handleDynamicChange = (e, fieldName) => {
//   //   setFormData((prevFormData) => ({
//   //     ...prevFormData,
//   //     dynamicFields: {
//   //       ...prevFormData.dynamicFields,
//   //       [fieldName]: e.target.value
//   //     }
//   //   }));
//   // };
//   const handleDynamicChange = (e, fieldName) => {
//     const { target } = e;
//     const { type, checked, value } = target;

//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       dynamicFields: {
//         ...prevFormData.dynamicFields,
//         [fieldName]: type === "checkbox" ? checked : value, // Ensure checkboxes store boolean values
//       },
//     }));
//   };


//   return (
//     <Modal show={show} onHide={handleClose} className="mt-5">
//       <Modal.Header closeButton>
//         <Modal.Title>Update Customer</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group>
//             <Form.Label>Company Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="companyName"
//               value={formData.companyName || ""}
//               onChange={handleChange}

//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Contact Person</Form.Label>
//             <Form.Control
//               type="text"
//               name="contactPerson"
//               value={formData.contactPerson || ""}
//               onChange={handleChange}

//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Mobile Number</Form.Label>
//             <Form.Control
//               type="text"
//               name="mobileNumber"
//               value={formData.mobileNumber || ""}
//               onChange={handleChange}

//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               value={formData.email || ""}
//               onChange={handleChange}

//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Tally Serial No.</Form.Label>
//             <Form.Control
//               type="number"
//               name="tallySerialNo"
//               value={formData.tallySerialNo || ""}
//               onChange={handleChange}

//             />
//           </Form.Group>

//           <div className="d-flex align-items-center gap-4">
//             <Form.Group controlId="blacklisted" className="d-flex align-items-baseline">
//               <Form.Label className="me-2">Blacklisted</Form.Label>
//               <Form.Check
//                 type="switch"
//                 id="blacklisted-switch"
//                 name="blacklisted"
//                 checked={!!formData.blacklisted}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="prime" className="d-flex align-items-baseline">
//               <Form.Label className="me-2">Prime</Form.Label>
//               <Form.Check
//                 type="switch"
//                 id="prime-switch"
//                 label=""
//                 name="prime"
//                 checked={!!formData.prime}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </div>

//           <Form.Group>

//             <Form.Label>Remark</Form.Label>
//             <Form.Control
//               type="text"
//               name="remark"
//               value={formData.remark || ""}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           {/* Dynamic Custom Fields */}
//           {customFields.map((field) => (
//             <Form.Group key={field._id} className="dynamic-field-group">
//               <Form.Label>{field.fieldName}</Form.Label>

//               {field.fieldType === "text" && (
//                 <Form.Control
//                   type="text"
//                   name={field.fieldName}
//                   value={formData.dynamicFields?.[field.fieldName] || ""}
//                   onChange={(e) => handleDynamicChange(e, field.fieldName)}
//                   required={field.isRequired}
//                 />
//               )}

//               {field.fieldType === "number" && (
//                 <Form.Control
//                   type="number"
//                   name={field.fieldName}
//                   value={formData.dynamicFields?.[field.fieldName] || ""}
//                   onChange={(e) => handleDynamicChange(e, field.fieldName)}
//                   required={field.isRequired}
//                 />
//               )}

//               {field.fieldType === "email" && (
//                 <Form.Control
//                   type="email"
//                   name={field.fieldName}
//                   value={formData.dynamicFields?.[field.fieldName] || ""}
//                   onChange={(e) => handleDynamicChange(e, field.fieldName)}
//                   required={field.isRequired}
//                 />
//               )}

//               {field.fieldType === "checkbox" && (
//                 <Form.Check
//                   type="switch"
//                   id={field.fieldName}
//                   name={field.fieldName}
//                   checked={!!formData.dynamicFields?.[field.fieldName]} // Ensures boolean value
//                   onChange={(e) => handleDynamicChange(e, field.fieldName)}
//                   required={field.isRequired}
//                   className="m-2"
//                 />

//               )}

//               {field.fieldType === "date" && (
//                 <Form.Control
//                   type="date"
//                   name={field.fieldName}
//                   value={formData.dynamicFields?.[field.fieldName] || ""}
//                   onChange={(e) => handleDynamicChange(e, field.fieldName)}
//                 />
//               )}
//             </Form.Group>
//           ))}


//           <Button type="submit" className="mt-3 btn-primary" disabled={loading}>
//             {loading ? <Spinner animation="border" size="sm" /> : "Update"}
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default UpdateCustomerModal;





// ===========================
// || CustomerDetailModel.jsx ||
// ===========================




// import React from "react";
// import { Modal, Button, Table } from "react-bootstrap";
// import "../../assets/css/index.css"; // Import the CSS file

// const CustomerDetailModal = ({ show, onHide, customer }) => {
//   return (
//     <Modal show={show} onHide={onHide} size="lg" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Customer Details</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Table striped bordered hover className="customer-detail-table">
//           <tbody>
//             <tr>
//               <td><strong>Company Name:</strong></td>
//               <td>{customer.companyName}</td>
//             </tr>
//             <tr>
//               <td><strong>Contact Person:</strong></td>
//               <td>{customer.contactPerson}</td>
//             </tr>
//             <tr>
//               <td><strong>Mobile Number :</strong></td>
//               <td>{customer.mobileNumber}</td>
//             </tr>
//             <tr>
//               <td><strong>Email:</strong></td>
//               <td>{customer.email}</td>
//             </tr>
//             <tr>
//               <td><strong>Tally Serial Number:</strong></td>
//               <td>{customer.tallySerialNo}</td>
//             </tr>
//             <tr>
//               <td><strong>Prime:</strong></td>
//               <td>{customer.prime ? "✔ Yes" : "❌ No"}</td>
//             </tr>
//             <tr>
//               <td><strong>Blacklisted:</strong></td>
//               <td>{customer.blacklisted ? "✔ Yes" : "❌ No"}</td>
//             </tr>

//             <tr>
//               <td><strong>Remark:</strong></td>
//               <td>{customer.remark || "N/A"}</td>
//             </tr>

//             {/* Dynamic Fields */}
//             {Object.keys(customer?.dynamicFields).map((key) => {
//               const value = customer?.dynamicFields[key];

//               let displayValue;

//               if (typeof value === "boolean") {
//                 displayValue = value ? "✔ Yes" : "❌ No";
//               } else if (Array.isArray(value)) {
//                 // Handle multi-select dropdowns and array values
//                 displayValue = value.map((item) => item.label || item.value || item).join(", ");
//               } else if (typeof value === "object" && value !== null) {
//                 // Handle object values
//                 displayValue = value.label || value.value || JSON.stringify(value);
//               } else if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
//                 // Handle date formatting
//                 const [year, month, day] = value.split("-");
//                 displayValue = `${day}/${month}/${year}`;
//               } else {
//                 displayValue = value;
//               }

//               return (
//                 <tr key={key}>
//                   <td><strong>{key}:</strong></td>
//                   <td>{displayValue}</td>
//                 </tr>
//               );
//             })}


//             {/* {Object.keys(customer.dynamicFields).map((key) => {
//               const value = customer.dynamicFields[key];

//               let displayValue;
//               if (typeof value === "boolean") {
//                 displayValue = value ? "✔ Yes" : "❌ No";
//               } else if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
//                 const [year, month, day] = value.split("-");
//                 displayValue = `${day}/${month}/${year}`;
//               } else {
//                 displayValue = value;
//               }

//               return (
//                 <tr key={key}>
//                   <td><strong>{key}:</strong></td>
//                   <td>{displayValue}</td>
//                 </tr>
//               );
//             })} */}

//             {/* {Object.keys(customer.dynamicFields).map((key) => {
//               const value = customer.dynamicFields[key];

//               let displayValue;
//               let rowClass = ""; // Default row class

//               if (typeof value === "boolean") {
//                 displayValue = value ? "✔ Yes" : "❌ No";
//                 rowClass = value ? "status-red" : "status-green"; // Apply conditional styling
//               } else if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
//                 const [year, month, day] = value.split("-");
//                 displayValue = `${day}/${month}/${year}`;
//               } else {
//                 displayValue = value;
//               }

//               return (
//                 <tr key={key} className={rowClass}>
//                   <td><strong>{key}:</strong></td>
//                   <td>{displayValue}</td>
//                 </tr>
//               );
//             })} */}

//           </tbody>
//         </Table>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default CustomerDetailModal;




/////////////////////////////////
//      axiosInstance.jsx      //
/////////////////////////////////

// import axios from "axios";
// import { logoutUser } from "../redux/actions/authActions";
// import { toast } from "react-toastify";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8052/api",
//   // baseURL: "https://cpm-api.vercel.app/api", //
// });

// // Request Interceptor (Attach token automatically)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("userToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor (Handle Token Expiry)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       // const  store  = await import("../redux/store"); // <-- Dynamically import store
//       // store.dispatch(logoutUser());
//       toast.error("session expired");
//       const reduxStoreModule = await import("../redux/store");
//       const store = reduxStoreModule.default; // Get the default export

//       if (store && typeof store.dispatch === "function") {
//         store.dispatch(logoutUser());
//       } else {
//         console.error("Redux store is not available or dispatch is not a function.");
//       }

//       localStorage.removeItem("userToken");
//       localStorage.removeItem("userData");

//       delete axiosInstance.defaults.headers.common["Authorization"];

//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;