// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getCustomFields, updateCustomer } from "../../redux/actions/customer/customerActions";
// import { Modal, Button, Form, Spinner, Row, Col, Card } from "react-bootstrap";
// import { listProductDetails } from "../../redux/actions/product/productActions.js";
// import Select from "react-select";

// const UpdateCustomerModal = ({ show, handleClose, customerData }) => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.customer || []);
//   const { customFields } = useSelector((state) => state.customField) || { customFields: [] };
//   const { subadmins } = useSelector((state) => state.user) || { subadmins: [] };
//   const { productDetails } = useSelector((state) => state.product) || { productDetails: [] };

//   const [formData, setFormData] = useState({});

//   const ProductName = productDetails.map((prod) => ({
//     value: prod._id,
//     label: prod.name,
//   }));

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
//     dispatch(listProductDetails());
//   }, [customerData, dispatch]);

//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     let newErrors = {};

//     if (!formData.companyName?.trim()) {
//       newErrors.companyName = "Company name is required.";
//     }
//     if (!formData.contactPerson?.trim()) {
//       newErrors.contactPerson = "Contact person is required.";
//     }
//     if (!formData.mobileNumber?.match(/^[0-9]{10}$/)) {
//       newErrors.mobileNumber = "Mobile number must be 10 digits.";
//     }
//     if (!formData.email?.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
//       newErrors.email = "Invalid email format.";
//     }
//     if (!formData.tallySerialNo?.match(/^\d{9}$/)) {
//       newErrors.tallySerialNo = "Tally Serial Number must be exactly 9 digits.";
//     }


//     // Validate dynamic custom fields
//     customFields.forEach((field) => {
//       const value = formData.dynamicFields?.[field.fieldName];

//       if (field.isRequired && (!value || (Array.isArray(value) && value.length === 0))) {
//         newErrors[field.fieldName] = `${field.fieldName} is required.`;
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleProductChange = (index, field, value) => {
//     // console.log("\n",index, "\n",field, "\n",value);
//     const updatedProducts = [...formData.products];
//     if (field.includes('.')) {
//       const [parentField, childField] = field.split('.');
//       updatedProducts[index][parentField] = {
//         ...updatedProducts[index][parentField],
//         [childField]: value
//       };
//     } else {
//       updatedProducts[index][field] = value;
//     }
//     setFormData({ ...formData, products: updatedProducts });
//     // console.log("setFormData\n", formData);
//   };

//   const addProduct = () => {
//     setFormData({
//       ...formData,
//       products: [
//         ...(formData.products || []),
//         {
//           productName: "",
//           purchaseDate: "",
//           renewalDate: "",
//           details: "",
//           reference: false,
//           referenceDetail: {},
//         },
//       ],
//     });
//     console.log("Add Product FormData\n", formData);
//   };

//   const removeProduct = (index) => {
//     const updatedProducts = formData.products.filter((_, i) => i !== index);
//     setFormData({ ...formData, products: updatedProducts });
//   };

//   const ReferenceSelector = ({ product, index }) => {
//     const options = [
//       ...subadmins.map(subadmin => ({
//         label: subadmin.username,
//         value: subadmin._id
//       })),
//       { label: "Other", value: "other" }
//     ];

//     const getSelectedValue = () => {
//       if (product.referenceDetail?.referenceId) {
//         return options.find(opt => opt.value === product.referenceDetail.referenceId);
//       }
//       if (product.referenceDetail?.referenceName !== undefined) {
//         return options.find(opt => opt.value === "other");
//       }
//       return null;
//     };

//     return (
//       <div className="mt-3">
//         <Form.Label>Reference Selection</Form.Label>
//         <Select
//           options={options}
//           value={getSelectedValue()}
//           onChange={(selectedOption) => {
//             if (selectedOption.value === "other") {
//               handleProductChange(index, "referenceDetail", {
//                 referenceName: "",
//                 referenceContact: ""
//               });
//             } else {
//               handleProductChange(index, "referenceDetail", {
//                 referenceId: selectedOption.value
//               });
//             }
//           }}
//           placeholder="Select reference..."
//         />
//       </div>
//     );
//   };

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
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   const handleDynamicChange = (fieldName, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       dynamicFields: {
//         ...prevFormData.dynamicFields,
//         [fieldName]: value,
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     dispatch(updateCustomer(customerData._id, formData)).then(() => {
//       handleClose();
//     });
//   };

//   return (
//     <Modal show={show} onHide={handleClose} className="mt-5">
//       <Modal.Header closeButton>
//         <Modal.Title>Update Customer</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Row className="justify-content-md-center">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Company Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="companyName"
//                   value={formData.companyName || ""}
//                   onChange={handleChange}
//                   isInvalid={!!errors.companyName}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.companyName}</Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Contact Person</Form.Label>
//                 <Form.Control type="text" name="contactPerson" value={formData.contactPerson || ""} onChange={handleChange} isInvalid={!!errors.contactPerson}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.contactPerson}</Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Mobile Number</Form.Label>
//                 <Form.Control type="text" name="mobileNumber" value={formData.mobileNumber || ""} onChange={handleChange} isInvalid={!!errors.mobileNumber}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.mobileNumber}</Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control type="email" name="email" value={formData.email || ""} onChange={handleChange} isInvalid={!!errors.email}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Tally Serial No.</Form.Label>
//                 <Form.Control type="number" name="tallySerialNo" value={formData.tallySerialNo || ""} onChange={handleChange} isInvalid={!!errors.tallySerialNo}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.tallySerialNo}</Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Remark</Form.Label>
//                 <Form.Control type="text" name="remark" value={formData.remark || ""} onChange={handleChange} />
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group controlId="blacklisted" className="d-flex align-items-baseline">
//                 <Form.Label className="me-2">Blacklisted</Form.Label>
//                 <Form.Check type="switch" name="blacklisted" checked={!!formData.blacklisted} onChange={handleChange} />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group controlId="prime" className="d-flex align-items-baseline">
//                 <Form.Label className="me-2">Prime</Form.Label>
//                 <Form.Check type="switch" name="prime" checked={!!formData.prime} onChange={handleChange} />
//               </Form.Group>
//             </Col>

//           </Row>
//           {/* Product Fields */}
//           <div className="mb-4">
//             {formData?.products?.map((product, index) => (
//               <Card key={index} className="mb-3">
//                 <Card.Body>
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <h5>Product #{index + 1}</h5>
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => removeProduct(index)}
//                     >
//                       Remove
//                     </Button>
//                   </div>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Product Name *</Form.Label>
//                     <Select
//                       options={ProductName}
//                       value={ProductName.find((p) => p.value === product.productName)} // Set selected value
//                       onChange={(selectedOption) =>
//                         handleProductChange(index, "productName", selectedOption.value)
//                       }
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Purchase Date *</Form.Label>
//                     <Form.Control
//                       type="date"
//                       value={product.purchaseDate}
//                       onChange={(e) =>
//                         handleProductChange(index, "purchaseDate", e.target.value)
//                       }
//                       required
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Renewal Date *</Form.Label>
//                     <Form.Control
//                       type="date"
//                       value={product.renewalDate}
//                       onChange={(e) =>
//                         handleProductChange(index, "renewalDate", e.target.value)
//                       }
//                       required
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Details</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={product.details}
//                       onChange={(e) =>
//                         handleProductChange(index, "details", e.target.value)
//                       }
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <div className="d-flex align-items-center">
//                       <Form.Label className="me-3">Add Reference?</Form.Label>
//                       <Form.Check
//                         type="switch"
//                         checked={product.reference}
//                         onChange={(e) =>
//                           handleProductChange(index, "reference", e.target.checked)
//                         }
//                       />
//                     </div>
//                   </Form.Group>

//                   {product.reference && (
//                     <>
//                       <ReferenceSelector product={product} index={index} />

//                       {product.referenceDetail?.referenceName !== undefined && (
//                         <div className="mt-3">
//                           <Row>
//                             <Col md={6}>
//                               <Form.Group>
//                                 <Form.Label>Reference Name *</Form.Label>
//                                 <Form.Control
//                                   type="text"
//                                   value={product.referenceDetail.referenceName || ""}
//                                   onChange={(e) =>
//                                     handleProductChange(
//                                       index,
//                                       "referenceDetail.referenceName",
//                                       e.target.value
//                                     )
//                                   }
//                                   required
//                                 />
//                               </Form.Group>
//                             </Col>
//                             <Col md={6}>
//                               <Form.Group>
//                                 <Form.Label>Reference Contact *</Form.Label>
//                                 <Form.Control
//                                   type="text"
//                                   value={product.referenceDetail.referenceContact || ""}
//                                   onChange={(e) =>
//                                     handleProductChange(
//                                       index,
//                                       "referenceDetail.referenceContact",
//                                       e.target.value
//                                     )
//                                   }
//                                   required
//                                 />
//                               </Form.Group>
//                             </Col>
//                           </Row>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </Card.Body>
//               </Card>
//             ))}

//             <Button
//               variant="outline-primary"
//               onClick={addProduct}
//               className="text-cstm bdr text-hover"
//             >
//               Add Product
//             </Button>
//           </div>
//           {/* Product Fields */}

//           <Row>
//             {/* Dynamic Custom Fields */}
//             {Array.isArray(customFields) && customFields.map((field) => {
//               const dynamicFieldValue = Array.isArray(formData?.dynamicFields?.[field.fieldName])
//                 ? formData.dynamicFields[field.fieldName]
//                 : field.isMultiSelect
//                   ? []
//                   : formData?.dynamicFields?.[field.fieldName] || "";
//               return (
//                 <Col md={6}>
//                   <Form.Group key={field._id}>
//                     <Form.Label>{field.fieldName}</Form.Label>

//                     {/* Dropdown Select */}
//                     {field.fieldType === "dropdown" && (
//                       <Select
//                         options={Array.isArray(field.options) ? field.options.map((opt) => ({ value: opt, label: opt })) : []}
//                         isMulti={field.isMultiSelect}
//                         name={field.fieldName}
//                         value={
//                           field.isMultiSelect
//                             ? dynamicFieldValue.map((opt) =>
//                               typeof opt === "object" ? opt : { value: opt, label: opt }
//                             )
//                             : dynamicFieldValue
//                               ? { value: dynamicFieldValue, label: dynamicFieldValue }
//                               : null
//                         }
//                         onChange={(selected) =>
//                           handleDynamicChange(
//                             field.fieldName,
//                             field.isMultiSelect ? selected.map((opt) => opt.value) : selected?.value || ""
//                           )
//                         }
//                       />
//                     )}

//                     {/* Text, Number, Email, Date Fields */}
//                     {["text", "number", "email", "date"].includes(field.fieldType) && (
//                       <Form.Control
//                         type={field.fieldType}
//                         name={field.fieldName}
//                         value={dynamicFieldValue}
//                         onChange={(e) => handleDynamicChange(field.fieldName, e.target.value)}
//                         isInvalid={!!errors[field.fieldName]}
//                       />
//                     )}

//                     {/* Checkbox */}
//                     {field.fieldType === "checkbox" && (
//                       <Form.Check
//                         type="switch"
//                         id={field.fieldName}
//                         name={field.fieldName}
//                         checked={!!dynamicFieldValue}
//                         onChange={(e) => handleDynamicChange(field.fieldName, e.target.checked)}
//                       />
//                     )}

//                     <Form.Control.Feedback type="invalid">{errors[field.fieldName]}</Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//               );
//             })}
//           </Row>
//           <Button type="submit" className="mt-3 btn-primary" disabled={loading}>
//             {loading ? <Spinner animation="border" size="sm" /> : "Update"}
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default UpdateCustomerModal;



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getCustomFields, updateCustomer } from "../../redux/actions/customer/customerActions";
// import { deleteProduct, updateProduct, getProducts } from "../../redux/actions/product/productActions";
// import { Modal, Button, Form, Spinner, Row, Col, Card } from "react-bootstrap";
// import { listProductDetails } from "../../redux/actions/product/productActions";
// import Select from "react-select";

// const UpdateCustomerModal = ({ show, handleClose, customerData }) => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.customer);
//   const { customFields } = useSelector((state) => state.customField) || { customFields: [] };
//   const { productDetails, products } = useSelector((state) => state.product) || { productDetails: [] };

//   // Map product details to dropdown options.
//   const productOptions = productDetails.map((prod) => ({
//     value: prod._id,
//     label: prod.name,
//   }));
// // console.log("productOptions", productOptions);

//   // Separate state for customer data and new products only.
//   const [formData, setFormData] = useState({
//     companyName: "",
//     contactPerson: "",
//     mobileNumber: "",
//     email: "",
//     tallySerialNo: "",
//     prime: false,
//     blacklisted: false,
//     remark: "",
//     dynamicFields: {},
//   });

//   // We keep the list of existing products and new products separate.
//   const [existingProducts, setExistingProducts] = useState([]);
//   const [newProducts, setNewProducts] = useState([]);

//   useEffect(() => {
//     if (customerData) {
//       setFormData({
//         companyName: customerData.companyName || "",
//         contactPerson: customerData.contactPerson || "",
//         mobileNumber: customerData.mobileNumber || "",
//         email: customerData.email || "",
//         tallySerialNo: customerData.tallySerialNo || "",
//         prime: customerData.prime ?? false,
//         blacklisted: customerData.blacklisted ?? false,
//         remark: customerData.remark || "",
//         dynamicFields: customerData.dynamicFields || {},
//       });
//       // Existing products are those that already exist.
//       setExistingProducts(customerData.products || []);
//       // New products array starts empty.
//       setNewProducts([]);
//     }
//     dispatch(getCustomFields());
//     dispatch(listProductDetails());
//     dispatch(getProducts());
//   }, [customerData, dispatch]);

//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     let newErrors = {};

//     if (!formData.companyName?.trim()) {
//       newErrors.companyName = "Company name is required.";
//     }
//     if (!formData.contactPerson?.trim()) {
//       newErrors.contactPerson = "Contact person is required.";
//     }
//     if (!formData.mobileNumber?.match(/^[0-9]{10}$/)) {
//       newErrors.mobileNumber = "Mobile number must be 10 digits.";
//     }
//     if (!formData.email?.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
//       newErrors.email = "Invalid email format.";
//     }
//     if (!formData.tallySerialNo?.match(/^\d{9}$/)) {
//       newErrors.tallySerialNo = "Tally Serial Number must be exactly 9 digits.";
//     }

//     // Validate dynamic custom fields.
//     customFields.forEach((field) => {
//       const value = formData.dynamicFields?.[field.fieldName];
//       if (field.isRequired && (!value || (Array.isArray(value) && value.length === 0))) {
//         newErrors[field.fieldName] = `${field.fieldName} is required.`;
//       }
//     });

//     // Validate new products fields.
//     newProducts.forEach((prod, index) => {
//       if (!prod.productDetailId) {
//         newErrors[`newProduct_${index}_productDetailId`] = "Product detail is required.";
//       }
//       if (!prod.purchaseDate) {
//         newErrors[`newProduct_${index}_purchaseDate`] = "Purchase date is required.";
//       }
//       if (!prod.renewalDate) {
//         newErrors[`newProduct_${index}_renewalDate`] = "Renewal date is required.";
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle changes in top-level customer fields.
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name === "blacklisted" && checked) {
//       setFormData((prev) => ({ ...prev, blacklisted: true, prime: false }));
//     } else if (name === "prime" && checked) {
//       setFormData((prev) => ({ ...prev, prime: true, blacklisted: false }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//     }
//   };

//   // Handle changes for existing products (only renewal fields).
//   const handleExistingProductChange = (index, field, value) => {
//     const updated = [...existingProducts];
//     updated[index] = { ...updated[index], [field]: value };
//     setExistingProducts(updated);
//   };

//   // Handle changes for new products (full details).
//   const handleNewProductChange = (index, field, value) => {
//     const updated = [...newProducts];
//     updated[index] = { ...updated[index], [field]: value };
//     setNewProducts(updated);
//   };

//   // For existing products, update using separate API call.
//   // Here we send only renewalDate and renewalCancelled.
//   const updateExistingProduct = (index) => {
//     const product = existingProducts[index];
//     if (!product._id) return;
//     const updatePayload = {
//       renewalDate: product.renewalDate,
//       renewalCancelled: product.renewalCancelled || false,
//     };
//     dispatch(updateProduct(product._id, updatePayload))
//       .then((response) => {
//         // Update local state with response (assumed to be in response.data.data)
//         const updatedProduct = response.data.data;
//         const updatedList = [...existingProducts];
//         updatedList[index] = updatedProduct;
//         setExistingProducts(updatedList);
//       })
//       .catch((err) => console.error("Error updating product", err));
//   };

//   // Add new product entry (only to newProducts state).
//   const addNewProduct = () => {
//     setNewProducts((prev) => [
//       ...prev,
//       {
//         productDetailId: "",
//         purchaseDate: "",
//         renewalDate: "",
//         details: "",
//       },
//     ]);
//   };

//   // Remove a new product entry from newProducts.
//   const removeNewProduct = (index) => {
//     setNewProducts((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Remove an existing product (call delete API).
//   const removeExistingProduct = (index) => {
//     const product = existingProducts[index];
//     if (product._id) {
//       dispatch(deleteProduct(product._id))
//         .then(() => {
//           setExistingProducts((prev) => prev.filter((_, i) => i !== index));
//         })
//         .catch((err) => console.error("Error deleting product", err));
//     }
//   };

//   // Handle dynamic custom field changes.
//   const handleDynamicChange = (fieldName, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       dynamicFields: { ...prev.dynamicFields, [fieldName]: value },
//     }));
//   };

//   // On submit, update the customer with new products only.
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     const payload = { ...formData, products: newProducts };
//     dispatch(updateCustomer(customerData._id, payload))
//       .then(() => handleClose())
//       .catch((err) => console.error("Update customer error", err));
//   };
//   console.log("newProducts", newProducts)
//   return (
//     <Modal show={show} onHide={handleClose} className="mt-5" size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>Update Customer</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           {/* Customer Information */}
//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Company Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="companyName"
//                   value={formData.companyName}
//                   onChange={handleChange}
//                   isInvalid={!!errors.companyName}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.companyName}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Contact Person</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="contactPerson"
//                   value={formData.contactPerson}
//                   onChange={handleChange}
//                   isInvalid={!!errors.contactPerson}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.contactPerson}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Mobile Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="mobileNumber"
//                   value={formData.mobileNumber}
//                   onChange={handleChange}
//                   isInvalid={!!errors.mobileNumber}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.mobileNumber}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   isInvalid={!!errors.email}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.email}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Tally Serial No.</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="tallySerialNo"
//                   value={formData.tallySerialNo}
//                   onChange={handleChange}
//                   isInvalid={!!errors.tallySerialNo}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.tallySerialNo}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Remark</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="remark"
//                   value={formData.remark}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group className="d-flex align-items-center">
//                 <Form.Label className="me-2">Blacklisted</Form.Label>
//                 <Form.Check
//                   type="switch"
//                   name="blacklisted"
//                   checked={formData.blacklisted}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group className="d-flex align-items-center">
//                 <Form.Label className="me-2">Prime</Form.Label>
//                 <Form.Check
//                   type="switch"
//                   name="prime"
//                   checked={formData.prime}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Existing Products Section */}
//           <h5>Existing Products</h5>
//           <Row className="mb-4">
//             {existingProducts.map((product, index) => (
//               <Col key={product?._id} md={6} className="mb-3">
//                 <Card>
//                   <Card.Header className="d-flex justify-content-between align-items-center">
//                     <h5 className="mb-0">{product?.productDetailId?.name}</h5>
//                     <div>
//                       <Button
//                         variant="primary"
//                         size="sm"
//                         onClick={() => updateExistingProduct(index)}
//                       >
//                         Update
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => removeExistingProduct(index)}
//                         className="ms-2"
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   </Card.Header>
//                   <Card.Body>
//                     <Form.Group className="mb-2">
//                       <Form.Label>Renewal Date</Form.Label>
//                       <Form.Control
//                         type="date"
//                         value={product?.renewalDate ? product.renewalDate?.split("T")[0] : ""}
//                         onChange={(e) =>
//                           handleExistingProductChange(index, "renewalDate", e.target.value)
//                         }
//                       />
//                     </Form.Group>
//                     <Form.Group className="d-flex align-items-center">
//                       <Form.Label className="me-2">Cancel Renewal</Form.Label>
//                       <Form.Check
//                         type="switch"
//                         checked={!!product?.renewalCancelled}
//                         onChange={(e) =>
//                           handleExistingProductChange(index, "renewalCancelled", e.target.checked)
//                         }
//                       />
//                     </Form.Group>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>

//           {/* New Products Section */}
//           <h5>New Products</h5>
//           <Row className="mb-3">
//             {newProducts.map((product, index) => (
//               <Col key={index} md={6} className="mb-3">
//                 <Card>
//                   <Card.Body>
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                       <h6>New Product #{index + 1}</h6>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => removeNewProduct(index)}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                     <Form.Group className="mb-2">
//                       <Form.Label>Product Detail *</Form.Label>
//                       <Select
//                         options={productOptions}
//                         value={
//                           productOptions.find((opt) => opt.value === product.productDetailId) ||
//                           null
//                         }
//                         onChange={(selectedOption) =>
//                           handleNewProductChange(index, "productDetailId", selectedOption.value)
//                         }
//                         placeholder="Select product detail..."
//                       />
//                       {errors[`newProduct_${index}_productDetailId`] && (
//                         <Form.Text className="text-danger">
//                           {errors[`newProduct_${index}_productDetailId`]}
//                         </Form.Text>
//                       )}
//                     </Form.Group>
//                     <Form.Group className="mb-2">
//                       <Form.Label>Purchase Date *</Form.Label>
//                       <Form.Control
//                         type="date"
//                         value={product.purchaseDate || ""}
//                         onChange={(e) =>
//                           handleNewProductChange(index, "purchaseDate", e.target.value)
//                         }
//                       />
//                       {errors[`newProduct_${index}_purchaseDate`] && (
//                         <Form.Text className="text-danger">
//                           {errors[`newProduct_${index}_purchaseDate`]}
//                         </Form.Text>
//                       )}
//                     </Form.Group>
//                     <Form.Group className="mb-2">
//                       <Form.Label>Renewal Date *</Form.Label>
//                       <Form.Control
//                         type="date"
//                         value={product.renewalDate || ""}
//                         onChange={(e) =>
//                           handleNewProductChange(index, "renewalDate", e.target.value)
//                         }
//                       />
//                       {errors[`newProduct_${index}_renewalDate`] && (
//                         <Form.Text className="text-danger">
//                           {errors[`newProduct_${index}_renewalDate`]}
//                         </Form.Text>
//                       )}
//                     </Form.Group>
//                     <Form.Group>
//                       <Form.Label>Details</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={product.details || ""}
//                         onChange={(e) =>
//                           handleNewProductChange(index, "details", e.target.value)
//                         }
//                       />
//                     </Form.Group>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//           <Button variant="outline-primary" onClick={addNewProduct} className="mb-3">
//             Add New Product
//           </Button>

//           {/* Dynamic Custom Fields */}
//           <Row>
//             {Array.isArray(customFields) &&
//               customFields.map((field) => {
//                 const dynamicValue =
//                   formData.dynamicFields?.[field.fieldName] ||
//                   (field.isMultiSelect ? [] : "");
//                 return (
//                   <Col md={6} key={field._id} className="mb-3">
//                     <Form.Group>
//                       <Form.Label>{field.fieldName}</Form.Label>
//                       {field.fieldType === "dropdown" && (
//                         <Select
//                           options={
//                             Array.isArray(field.options)
//                               ? field.options.map((opt) => ({ value: opt, label: opt }))
//                               : []
//                           }
//                           isMulti={field.isMultiSelect}
//                           name={field.fieldName}
//                           value={
//                             field.isMultiSelect
//                               ? dynamicValue.map((opt) =>
//                                   typeof opt === "object" ? opt : { value: opt, label: opt }
//                                 )
//                               : dynamicValue
//                               ? { value: dynamicValue, label: dynamicValue }
//                               : null
//                           }
//                           onChange={(selected) =>
//                             handleDynamicChange(
//                               field.fieldName,
//                               field.isMultiSelect
//                                 ? selected.map((opt) => opt.value)
//                                 : selected?.value || ""
//                             )
//                           }
//                         />
//                       )}
//                       {["text", "number", "email", "date"].includes(field.fieldType) && (
//                         <Form.Control
//                           type={field.fieldType}
//                           name={field.fieldName}
//                           value={dynamicValue}
//                           onChange={(e) => handleDynamicChange(field.fieldName, e.target.value)}
//                           isInvalid={!!errors[field.fieldName]}
//                         />
//                       )}
//                       {field.fieldType === "checkbox" && (
//                         <Form.Check
//                           type="switch"
//                           id={field.fieldName}
//                           name={field.fieldName}
//                           checked={!!dynamicValue}
//                           onChange={(e) => handleDynamicChange(field.fieldName, e.target.checked)}
//                         />
//                       )}
//                       <Form.Control.Feedback type="invalid">
//                         {errors[field.fieldName]}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                 );
//               })}
//           </Row>

//           <Button type="submit" className="mt-3 btn-primary" disabled={loading}>
//             {loading ? <Spinner animation="border" size="sm" /> : "Update Customer"}
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default UpdateCustomerModal;










import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomFields, updateCustomer } from "../../redux/actions/customer/customerActions";
import { deleteProduct, updateProduct, getProducts, listProductDetails } from "../../redux/actions/product/productActions";
import { Modal, Button, Form, Spinner, Row, Col, Card } from "react-bootstrap";
import Select from "react-select";

const UpdateCustomerModal = ({ show, handleClose, customerData }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.customer);
  const { customFields } = useSelector((state) => state.customField) || { customFields: [] };
  const { productDetails, products } = useSelector((state) => state.product) || { productDetails: [] };

  // Map product details to dropdown options.
  const productOptions = productDetails.map((prod) => ({
    value: prod._id,
    label: prod.name,
  }));

  // Top-level customer data (without products)
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    mobileNumber: "",
    email: "",
    tallySerialNo: "",
    prime: false,
    blacklisted: false,
    remark: "",
    dynamicFields: {},
  });

  // Separate states for existing products and new products.
  const [existingProducts, setExistingProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    if (customerData) {
      setFormData({
        companyName: customerData.companyName || "",
        contactPerson: customerData.contactPerson || "",
        mobileNumber: customerData.mobileNumber || "",
        email: customerData.email || "",
        tallySerialNo: customerData.tallySerialNo || "",
        prime: customerData.prime ?? false,
        blacklisted: customerData.blacklisted ?? false,
        remark: customerData.remark || "",
        dynamicFields: customerData.dynamicFields || {},
      });
      // Use customerData.products as initial existing products.
      setExistingProducts(customerData.products || []);
      // New products start empty.
      setNewProducts([]);
    }
    dispatch(getCustomFields());
    dispatch(listProductDetails());
    dispatch(getProducts());
  }, [customerData, dispatch]);

  // Update existing products state when global products change.
  useEffect(() => {
    if (products && products.length > 0) {
      setExistingProducts(products);
    }
  }, [products]);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.companyName?.trim()) {
      newErrors.companyName = "Company name is required.";
    }
    if (!formData.contactPerson?.trim()) {
      newErrors.contactPerson = "Contact person is required.";
    }
    if (!formData.mobileNumber?.match(/^[0-9]{10}$/)) {
      newErrors.mobileNumber = "Mobile number must be 10 digits.";
    }
    if (!formData.email?.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.tallySerialNo?.match(/^\d{9}$/)) {
      newErrors.tallySerialNo = "Tally Serial Number must be exactly 9 digits.";
    }

    // Validate dynamic custom fields.
    customFields.forEach((field) => {
      const value = formData.dynamicFields?.[field.fieldName];
      if (field.isRequired && (!value || (Array.isArray(value) && value.length === 0))) {
        newErrors[field.fieldName] = `${field.fieldName} is required.`;
      }
    });

    // Validate new products.
    newProducts.forEach((prod, index) => {
      if (!prod.productDetailId) {
        newErrors[`newProduct_${index}_productDetailId`] = "Product detail is required.";
      }
      if (!prod.purchaseDate) {
        newErrors[`newProduct_${index}_purchaseDate`] = "Purchase date is required.";
      }
      if (!prod.renewalDate) {
        newErrors[`newProduct_${index}_renewalDate`] = "Renewal date is required.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle changes in customer fields.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "blacklisted" && checked) {
      setFormData((prev) => ({ ...prev, blacklisted: true, prime: false }));
    } else if (name === "prime" && checked) {
      setFormData((prev) => ({ ...prev, prime: true, blacklisted: false }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  // Handle changes for existing products (e.g. updating renewal info).
  const handleExistingProductChange = (index, field, value) => {
    const updated = [...existingProducts];
    updated[index] = { ...updated[index], [field]: value };
    setExistingProducts(updated);
  };

  // Handle changes for new products.
  const handleNewProductChange = (index, field, value) => {
    const updated = [...newProducts];
    updated[index] = { ...updated[index], [field]: value };
    setNewProducts(updated);
  };

  // Update an existing product using the separate API.
  const updateExistingProduct = (index) => {
    const product = existingProducts[index];
    if (!product._id) return;
    const updatePayload = {
      renewalDate: product.renewalDate,
      renewalCancelled: product.renewalCancelled || false,
    };
    dispatch(updateProduct(product._id, updatePayload))
      .then((response) => {
        // Update the local state with the updated product.
        const updatedProduct = { ...product, ...response.data.data };
        const updatedList = [...existingProducts];
        updatedList[index] = updatedProduct;
        setExistingProducts(updatedList);
      })
      .catch((err) => console.error("Error updating product", err));
  };

  // Add a new product entry.
  const addNewProduct = () => {
    setNewProducts((prev) => [
      ...prev,
      { productDetailId: "", purchaseDate: "", renewalDate: "", details: "" },
    ]);
  };

  // Remove a new product entry.
  const removeNewProduct = (index) => {
    setNewProducts((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove an existing product.
  const removeExistingProduct = (index) => {
    const product = existingProducts[index];
    if (product._id) {
      dispatch(deleteProduct(product._id))
        .then(() => {
          setExistingProducts((prev) => prev.filter((_, i) => i !== index));
        })
        .catch((err) => console.error("Error deleting product", err));
    }
  };

  // Handle dynamic custom field changes.
  const handleDynamicChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      dynamicFields: { ...prev.dynamicFields, [fieldName]: value },
    }));
  };

  // On submit, update the customer with new products only.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const payload = { ...formData, products: newProducts };
    dispatch(updateCustomer(customerData._id, payload))
      .then(() => handleClose())
      .catch((err) => console.error("Update customer error", err));
  };

  return (
    <Modal show={show} onHide={handleClose} className="mt-5" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Update Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Customer Information */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  isInvalid={!!errors.companyName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.companyName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Contact Person</Form.Label>
                <Form.Control
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  isInvalid={!!errors.contactPerson}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contactPerson}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.mobileNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mobileNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Tally Serial No.</Form.Label>
                <Form.Control
                  type="number"
                  name="tallySerialNo"
                  value={formData.tallySerialNo}
                  onChange={handleChange}
                  isInvalid={!!errors.tallySerialNo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.tallySerialNo}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Remark</Form.Label>
                <Form.Control
                  type="text"
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="me-2">Blacklisted</Form.Label>
                <Form.Check
                  type="switch"
                  name="blacklisted"
                  checked={formData.blacklisted}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="me-2">Prime</Form.Label>
                <Form.Check
                  type="switch"
                  name="prime"
                  checked={formData.prime}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Existing Products Section */}
          <h5>Existing Products</h5>
          <Row className="mb-4">
            {existingProducts.map((product, index) => (
              <Col key={product?._id} md={6} className="mb-3">
                <Card>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{product?.productDetailId?.name}</h5>
                    <div>
                      <Button variant="primary" size="sm" onClick={() => updateExistingProduct(index)}>Update</Button>
                      <Button variant="danger" size="sm" onClick={() => removeExistingProduct(index)} className="ms-2">Delete</Button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-2">
                      <Form.Label>Renewal Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={product?.renewalDate ? new Date(product.renewalDate).toISOString().split("T")[0] : ""}
                        onChange={(e) => handleExistingProductChange(index, "renewalDate", e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="d-flex align-items-center">
                      <Form.Label className="me-2">Cancel Renewal</Form.Label>
                      <Form.Check
                        type="switch"
                        checked={!!product?.renewalCancelled}
                        onChange={(e) => handleExistingProductChange(index, "renewalCancelled", e.target.checked)}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {/* New Products Section */}
          <h5>New Products</h5>
          <Row className="mb-3">
            {newProducts.map((product, index) => (
              <Col key={index} md={6} className="mb-3">
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6>New Product #{index + 1}</h6>
                      <Button variant="danger" size="sm" onClick={() => removeNewProduct(index)}>Remove</Button>
                    </div>
                    <Form.Group className="mb-2">
                      <Form.Label>Product Detail *</Form.Label>
                      <Select
                        options={productOptions}
                        value={productOptions.find((opt) => opt.value === product.productDetailId) || null}
                        onChange={(selectedOption) =>
                          handleNewProductChange(index, "productDetailId", selectedOption.value)
                        }
                        placeholder="Select product detail..."
                      />
                      {errors[`newProduct_${index}_productDetailId`] && (
                        <Form.Text className="text-danger">
                          {errors[`newProduct_${index}_productDetailId`]}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Purchase Date *</Form.Label>
                      <Form.Control
                        type="date"
                        value={product.purchaseDate || ""}
                        onChange={(e) => handleNewProductChange(index, "purchaseDate", e.target.value)}
                      />
                      {errors[`newProduct_${index}_purchaseDate`] && (
                        <Form.Text className="text-danger">
                          {errors[`newProduct_${index}_purchaseDate`]}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Renewal Date *</Form.Label>
                      <Form.Control
                        type="date"
                        value={product.renewalDate || ""}
                        onChange={(e) => handleNewProductChange(index, "renewalDate", e.target.value)}
                      />
                      {errors[`newProduct_${index}_renewalDate`] && (
                        <Form.Text className="text-danger">
                          {errors[`newProduct_${index}_renewalDate`]}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Details</Form.Label>
                      <Form.Control
                        type="text"
                        value={product.details || ""}
                        onChange={(e) => handleNewProductChange(index, "details", e.target.value)}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Button variant="outline-primary" onClick={addNewProduct} className="mb-3">
            Add New Product
          </Button>
          {/* Dynamic Custom Fields */}
          <Row>
            {Array.isArray(customFields) &&
              customFields.map((field) => {
                const dynamicValue = formData.dynamicFields?.[field.fieldName] || (field.isMultiSelect ? [] : "");
                return (
                  <Col md={6} key={field._id} className="mb-3">
                    <Form.Group>
                      <Form.Label>{field.fieldName}</Form.Label>
                      {field.fieldType === "dropdown" && (
                        <Select
                          options={Array.isArray(field.options) ? field.options.map((opt) => ({ value: opt, label: opt })) : []}
                          isMulti={field.isMultiSelect}
                          name={field.fieldName}
                          value={
                            field.isMultiSelect
                              ? dynamicValue.map((opt) =>
                                  typeof opt === "object" ? opt : { value: opt, label: opt }
                                )
                              : dynamicValue
                              ? { value: dynamicValue, label: dynamicValue }
                              : null
                          }
                          onChange={(selected) =>
                            handleDynamicChange(
                              field.fieldName,
                              field.isMultiSelect
                                ? selected.map((opt) => opt.value)
                                : selected?.value || ""
                            )
                          }
                        />
                      )}
                      {["text", "number", "email", "date"].includes(field.fieldType) && (
                        <Form.Control
                          type={field.fieldType}
                          name={field.fieldName}
                          value={dynamicValue}
                          onChange={(e) => handleDynamicChange(field.fieldName, e.target.value)}
                          isInvalid={!!errors[field.fieldName]}
                        />
                      )}
                      {field.fieldType === "checkbox" && (
                        <Form.Check
                          type="switch"
                          id={field.fieldName}
                          name={field.fieldName}
                          checked={!!dynamicValue}
                          onChange={(e) => handleDynamicChange(field.fieldName, e.target.checked)}
                        />
                      )}
                      <Form.Control.Feedback type="invalid">
                        {errors[field.fieldName]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                );
              })}
          </Row>
          <Button type="submit" className="mt-3 btn-primary" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Update Customer"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateCustomerModal;

