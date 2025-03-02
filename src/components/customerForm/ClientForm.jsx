// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addCustomer, getCustomFields } from "../../redux/actions/customer/customerActions";
// import { fetchUser } from "../../redux/actions/auth/adminActions"
// import { Form, Button, Container, Row, Col, Spinner, Card } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AddCustomFieldButton from "./AddCustomFieldButton";
// import FileUploadButton from "./FileUploadButton"
// import Select from "react-select";
// import "../../assets/css/index.css";

// const ClientForm = () => {
//     const dispatch = useDispatch();
//     const { loading } = useSelector((state) => state.customer || []);
//     const { customFields } = useSelector((state) => state.customField) || { customFields: [] };
//     const { subadmins } = useSelector((state) => state.user) || { subadmins: [] };
//     const [errors, setErrors] = useState({});
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
//         products: [],
//     });
//     const ProductName = [
//         { value: "Tally Renewal", label: "Tally Renewal" },
//         { value: "Tally Prime", label: "Tally Prime" },
//         { value: "Tally Customization", label: "Tally Customization" },
//         { value: "Tally on cloud", label: "Tally on Cloud" }
//     ];

//     useEffect(() => {
//         dispatch(getCustomFields());
//         dispatch(fetchUser());
//     }, [dispatch]);

//     const validateForm = () => {
//         let newErrors = {};

//         if (!formData.companyName.trim()) newErrors.companyName = "Company name is required.";
//         if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required.";
//         if (!formData.mobileNumber.match(/^[0-9]{10}$/)) newErrors.mobileNumber = "Mobile number must be 10 digits.";
//         if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
//             newErrors.email = "Invalid email format.";
//         }
//         if (!formData.tallySerialNo?.match(/^\d{9}$/)) {
//             newErrors.tallySerialNo = "Tally Serial Number must be exactly 9 digits.";
//         }        

//         customFields.forEach((field) => {
//             if (field.isRequired && !formData.dynamicFields[field.fieldName]?.trim()) {
//                 newErrors[field.fieldName] = `${field.fieldName} is required.`;
//             }
//         });

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
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
//             setFormData({
//                 ...formData,
//                 [name]: type === "checkbox" ? checked : value,
//             });
//         }
//     };

//     const handleProductChange = (index, field, value) => {
//         // console.log("\n",index, "\n",field, "\n",value);
//         const updatedProducts = [...formData.products];
//         if (field.includes('.')) {
//             const [parentField, childField] = field.split('.');
//             updatedProducts[index][parentField] = {
//                 ...updatedProducts[index][parentField],
//                 [childField]: value
//             };
//         } else {
//             updatedProducts[index][field] = value;
//         }
//         setFormData({ ...formData, products: updatedProducts });
//         // console.log("setFormData\n", formData);
//     };

//     const addProduct = () => {
//         setFormData({
//             ...formData,
//             products: [...formData.products, {
//                 productName: "",
//                 purchaseDate: "",
//                 renewalDate: "",
//                 details: "",
//                 reference: false,
//                 referenceDetail: {}
//             }],
//         });
//         // console.log("Add Product FormData\n", formData);
//     };

//     const removeProduct = (index) => {
//         const updatedProducts = formData.products.filter((_, i) => i !== index);
//         setFormData({ ...formData, products: updatedProducts });
//     };

//     const ReferenceSelector = ({ product, index }) => {
//         const options = [
//             ...subadmins.map(subadmin => ({
//                 label: subadmin.username,
//                 value: subadmin._id
//             })),
//             { label: "Other", value: "other" }
//         ];

//         const getSelectedValue = () => {
//             if (product.referenceDetail?.referenceId) {
//                 return options.find(opt => opt.value === product.referenceDetail.referenceId);
//             }
//             if (product.referenceDetail?.referenceName !== undefined) {
//                 return options.find(opt => opt.value === "other");
//             }
//             return null;
//         };

//         return (
//             <div className="mt-3">
//                 <Form.Label>Reference Selection</Form.Label>
//                 <Select
//                     options={options}
//                     value={getSelectedValue()}
//                     onChange={(selectedOption) => {
//                         if (selectedOption.value === "other") {
//                             handleProductChange(index, "referenceDetail", {
//                                 referenceName: "",
//                                 referenceContact: ""
//                             });
//                         } else {
//                             handleProductChange(index, "referenceDetail", {
//                                 referenceId: selectedOption.value
//                             });
//                         }
//                     }}
//                     placeholder="Select reference..."
//                 />
//             </div>
//         );
//     };

//     const handleDynamicChange = (field, value) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             dynamicFields: {
//                 ...prevData.dynamicFields,
//                 [field]: value,
//             },
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // console.log("Submit formData", formData);

//         if (validateForm()) {
//             dispatch(addCustomer(formData))
//                 .then(() => {
//                     // toast.success("Customer added successfully");
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
//                         products: [],
//                     });
//                 })
//             // .catch(() => toast.error("Failed to add customer."));
//         }
//     };

//     return (
//         <Container>
//             <ToastContainer position="top-right" autoClose={3000} />
//             <div className="mt-1 d-flex flex-wrap  justify-content-between">
//             <AddCustomFieldButton />
//             <FileUploadButton  />
//             </div>
//             <Row className="justify-content-md-center">
//                 <Col md={8}>
//                     <div className="client-form-container">
//                         <h2 className="text-center my-4">Add Customer</h2>
//                         <Form onSubmit={handleSubmit} className="client-form">
//                             {/* Standard Fields */}
//                             <Row >
//                                 {[
//                                     { label: "Company Name", name: "companyName", type: "text" },
//                                     { label: "Contact Person", name: "contactPerson", type: "text" },
//                                     { label: "Mobile Number", name: "mobileNumber", type: "tel" },
//                                     { label: "Email", name: "email", type: "email" },
//                                     { label: "Tally Serial Number", name: "tallySerialNo", type: "number" },
//                                 ].map(({ label, name, type }, index) => (
//                                     <Col md={6} key={name}> {/* Two columns in medium and larger screens */}
//                                         <Form.Group>
//                                             <Form.Label>{label}</Form.Label>
//                                             <Form.Control
//                                                 type={type}
//                                                 name={name}
//                                                 value={formData[name] || ""}
//                                                 onChange={handleChange}
//                                                 isInvalid={!!errors[name]}
//                                             />
//                                             <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
//                                         </Form.Group>
//                                     </Col>
//                                 ))}

//                                 <Col md={6}>
//                                     <Form.Group>
//                                         <Form.Label>Remark</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             name="remark"
//                                             onChange={handleChange}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                             <div className="d-flex flex-wrap ">
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

//                             {/* Product Fields */}
//                             <div className="mb-4">
//                                 {/* <h4>Products</h4> */}
//                                 {formData.products.map((product, index) => (
//                                     <Card key={index} className="mb-3">
//                                         <Card.Body>
//                                             <div className="d-flex justify-content-between align-items-center mb-3">
//                                                 <h5>Product #{index + 1}</h5>
//                                                 <Button
//                                                     variant="danger"
//                                                     size="sm"
//                                                     onClick={() => removeProduct(index)}
//                                                 >
//                                                     Remove
//                                                 </Button>
//                                             </div>

//                                             <Form.Group className="mb-3">
//                                                 <Form.Label>Product Name *</Form.Label>
//                                                 <Select
//                                                     options={ProductName}
//                                                     value={ProductName.find((p) => p.value === product.productName)} // Set selected value
//                                                     onChange={(selectedOption) =>
//                                                         handleProductChange(index, "productName", selectedOption.value)
//                                                     }
//                                                 />
//                                             </Form.Group>

//                                             <Form.Group className="mb-3">
//                                                 <Form.Label>Purchase Date *</Form.Label>
//                                                 <Form.Control
//                                                     type="date"
//                                                     value={product.purchaseDate}
//                                                     onChange={(e) =>
//                                                         handleProductChange(index, "purchaseDate", e.target.value)
//                                                     }
//                                                     required
//                                                 />
//                                             </Form.Group>

//                                             <Form.Group className="mb-3">
//                                                 <Form.Label>Renewal Date *</Form.Label>
//                                                 <Form.Control
//                                                     type="date"
//                                                     value={product.renewalDate}
//                                                     onChange={(e) =>
//                                                         handleProductChange(index, "renewalDate", e.target.value)
//                                                     }
//                                                     required
//                                                 />
//                                             </Form.Group>

//                                             <Form.Group className="mb-3">
//                                                 <Form.Label>Details</Form.Label>
//                                                 <Form.Control
//                                                     type="text"
//                                                     value={product.details}
//                                                     onChange={(e) =>
//                                                         handleProductChange(index, "details", e.target.value)
//                                                     }
//                                                 />
//                                             </Form.Group>

//                                             <Form.Group className="mb-3">
//                                                 <div className="d-flex align-items-center">
//                                                     <Form.Label className="me-3">Add Reference?</Form.Label>
//                                                     <Form.Check
//                                                         type="switch"
//                                                         checked={product.reference}
//                                                         onChange={(e) =>
//                                                             handleProductChange(index, "reference", e.target.checked)
//                                                         }
//                                                     />
//                                                 </div>
//                                             </Form.Group>

//                                             {product.reference && (
//                                                 <>
//                                                     <ReferenceSelector product={product} index={index} />

//                                                     {product.referenceDetail?.referenceName !== undefined && (
//                                                         <div className="mt-3">
//                                                             <Row>
//                                                                 <Col md={6}>
//                                                                     <Form.Group>
//                                                                         <Form.Label>Reference Name *</Form.Label>
//                                                                         <Form.Control
//                                                                             type="text"
//                                                                             value={product.referenceDetail.referenceName || ""}
//                                                                             onChange={(e) =>
//                                                                                 handleProductChange(
//                                                                                     index,
//                                                                                     "referenceDetail.referenceName",
//                                                                                     e.target.value
//                                                                                 )
//                                                                             }
//                                                                             required
//                                                                         />
//                                                                     </Form.Group>
//                                                                 </Col>
//                                                                 <Col md={6}>
//                                                                     <Form.Group>
//                                                                         <Form.Label>Reference Contact *</Form.Label>
//                                                                         <Form.Control
//                                                                             type="text"
//                                                                             value={product.referenceDetail.referenceContact || ""}
//                                                                             onChange={(e) =>
//                                                                                 handleProductChange(
//                                                                                     index,
//                                                                                     "referenceDetail.referenceContact",
//                                                                                     e.target.value
//                                                                                 )
//                                                                             }
//                                                                             required
//                                                                         />
//                                                                     </Form.Group>
//                                                                 </Col>
//                                                             </Row>
//                                                         </div>
//                                                     )}
//                                                 </>
//                                             )}
//                                         </Card.Body>
//                                     </Card>
//                                 ))}

//                                 <Button
//                                     variant="outline-primary"
//                                     onClick={addProduct}
//                                     className="text-cstm bdr text-hover"
//                                 >
//                                     Add Product
//                                 </Button>
//                             </div>
//                             {/* Product Fields */}
//                             <Row>
//                             {/* Dynamic Custom Fields */}
//                             {customFields.map((field) => (
//                                 <Col md={6}>
//                                 <Form.Group key={field._id}>
//                                     <Form.Label>{field.fieldName}</Form.Label>
//                                     {field.fieldType === "dropdown" && (
//                                         <Select
//                                             options={field.options.map((opt) => ({ value: opt, label: opt }))}
//                                             isMulti={field.isMultiSelect}
//                                             name={field.fieldName}
//                                             value={field.isMultiSelect
//                                                 ? formData.dynamicFields[field.fieldName] || []
//                                                 : formData.dynamicFields[field.fieldName] || ""}
//                                             onChange={(selected) => handleDynamicChange(field.fieldName, field.isMultiSelect ? selected : selected.value)}
//                                         />
//                                     )}
//                                     {["text", "number", "email", "date"].includes(field.fieldType) && (
//                                         <Form.Control
//                                             type={field.fieldType}
//                                             name={field.fieldName}
//                                             value={formData.dynamicFields[field.fieldName] || ""}
//                                             onChange={(e) => handleDynamicChange(field.fieldName, e.target.value)}
//                                             isInvalid={!!errors[field.fieldName]}
//                                         />
//                                     )}
//                                     {field.fieldType === "checkbox" && (
//                                         <Form.Check
//                                             type="switch"
//                                             id={field.fieldName}
//                                             name={field.fieldName}
//                                             checked={!!formData.dynamicFields[field.fieldName]}
//                                             onChange={(e) => handleDynamicChange(field.fieldName, e.target.checked)}
//                                         />
//                                     )}
//                                     <Form.Control.Feedback type="invalid">{errors[field.fieldName]}</Form.Control.Feedback>
//                                 </Form.Group>
//                                 </Col>
//                             ))}
//                             </Row>

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


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer, getCustomFields } from "../../redux/actions/customer/customerActions";
import { fetchUser } from "../../redux/actions/auth/adminActions";
import { listProductDetails } from "../../redux/actions/product/productActions.js"; // New action to fetch product details
import { Form, Button, Container, Row, Col, Spinner, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCustomFieldButton from "./AddCustomFieldButton";
import FileUploadButton from "./FileUploadButton";
import Select from "react-select";
import "../../assets/css/index.css";

const ClientForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.customer || {});
  const { customFields } = useSelector((state) => state.customField) || { customFields: [] };
  const { subadmins } = useSelector((state) => state.user) || { subadmins: [] };
  // Get product details from Redux store (fetched from the backend)
  const { productDetails } = useSelector((state) => state.product) || { productDetails: [] };

  // Local state to manage search term for products
  const [productSearch, setProductSearch] = useState("");

  // Initial form state, including a new "hasReference" field to toggle reference details.
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
    hasReference: false,       // New field to toggle reference input
    referenceDetail: {},       // Reference details when hasReference is true
    products: [],
  });

  useEffect(() => {
    dispatch(getCustomFields());
    dispatch(fetchUser());
    // Fetch product details with an optional search term.
    dispatch(listProductDetails(productSearch));
  }, [dispatch, productSearch]);

  // Map fetched product details to options for the Select component.
  const productOptions = productDetails.map((prod) => ({
    value: prod._id,
    label: prod.name,
  }));

  // Reference options from subadmins plus "Other"
  const referenceOptions = [
    ...subadmins.map((subadmin) => ({
      label: subadmin.username,
      value: subadmin._id,
    })),
    { label: "Other", value: "other" },
  ];

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required.";
    if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required.";
    if (!formData.mobileNumber.match(/^[0-9]{10}$/))
      newErrors.mobileNumber = "Mobile number must be 10 digits.";
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.tallySerialNo?.match(/^\d{9}$/)) {
      newErrors.tallySerialNo = "Tally Serial Number must be exactly 9 digits.";
    }

    customFields.forEach((field) => {
      if (field.isRequired && !formData.dynamicFields[field.fieldName]?.toString().trim()) {
        newErrors[field.fieldName] = `${field.fieldName} is required.`;
      }
    });

    // If reference is enabled, check required fields for reference details.
    if (formData.hasReference) {
      if (
        !formData.referenceDetail.referenceId &&
        (!formData.referenceDetail.referenceName || !formData.referenceDetail.referenceContact)
      ) {
        newErrors.referenceDetail = "Provide a valid reference selection or both reference name and contact.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "blacklisted" && checked) {
      setFormData({
        ...formData,
        blacklisted: true,
        prime: false, // Automatically deselect Prime
      });
    } else if (name === "prime" && checked) {
      setFormData({
        ...formData,
        blacklisted: false, // Automatically deselect Blacklisted
        prime: true,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    // For nested fields (if any), you can split by dot.
    if (field.includes(".")) {
      const [parentField, childField] = field.split(".");
      updatedProducts[index][parentField] = {
        ...updatedProducts[index][parentField],
        [childField]: value,
      };
    } else {
      updatedProducts[index][field] = value;
    }
    setFormData({ ...formData, products: updatedProducts });
  };

  const addProduct = () => {
    // New product template with productDetailId and no reference info.
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        {
          productDetailId: "",
          purchaseDate: "",
          renewalDate: "",
          details: "",
        },
      ],
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  // Top-level Reference Details component (renders only if "hasReference" is true)
  const renderReferenceDetail = () => {
    const getSelectedReference = () => {
      if (formData.referenceDetail?.referenceId) {
        return referenceOptions.find(
          (opt) => opt.value === formData.referenceDetail.referenceId
        );
      }
      if (formData.referenceDetail?.referenceName !== undefined) {
        return referenceOptions.find((opt) => opt.value === "other");
      }
      return null;
    };

    return (
      <div className="mb-4">
        <h4>Reference Details</h4>
        <Form.Group>
          <Form.Label>Reference Selection</Form.Label>
          <Select
            options={referenceOptions}
            value={getSelectedReference()}
            onChange={(selectedOption) => {
              if (selectedOption.value === "other") {
                setFormData({
                  ...formData,
                  referenceDetail: { referenceName: "", referenceContact: "" },
                });
              } else {
                setFormData({
                  ...formData,
                  referenceDetail: { referenceId: selectedOption.value },
                });
              }
            }}
            placeholder="Select reference..."
          />
        </Form.Group>
        {formData.referenceDetail &&
          formData.referenceDetail.referenceName !== undefined && (
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Reference Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.referenceDetail.referenceName || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        referenceDetail: {
                          ...formData.referenceDetail,
                          referenceName: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Reference Contact *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.referenceDetail.referenceContact || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        referenceDetail: {
                          ...formData.referenceDetail,
                          referenceContact: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          )}
      </div>
    );
  };

  const handleDynamicChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      dynamicFields: {
        ...prevData.dynamicFields,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(addCustomer(formData)).then(() => {
        // Reset form on successful submission.
        setFormData({
          companyName: "",
          contactPerson: "",
          mobileNumber: "",
          email: "",
          tallySerialNo: "",
          prime: false,
          blacklisted: false,
          remark: "",
          dynamicFields: {},
          hasReference: false,
          referenceDetail: {},
          products: [],
        });
      });
    }
  };

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="mt-1 d-flex flex-wrap justify-content-between">
        <AddCustomFieldButton />
        <FileUploadButton />
      </div>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="client-form-container">
            <h2 className="text-center my-4">Add Customer</h2>
            <Form onSubmit={handleSubmit} className="client-form">
              {/* Standard Fields */}
              <Row>
                {[
                  { label: "Company Name", name: "companyName", type: "text" },
                  { label: "Contact Person", name: "contactPerson", type: "text" },
                  { label: "Mobile Number", name: "mobileNumber", type: "tel" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Tally Serial Number", name: "tallySerialNo", type: "number" },
                ].map(({ label, name, type }) => (
                  <Col md={6} key={name}>
                    <Form.Group>
                      <Form.Label>{label}</Form.Label>
                      <Form.Control
                        type={type}
                        name={name}
                        value={formData[name] || ""}
                        onChange={handleChange}
                        isInvalid={!!errors[name]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors[name]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                ))}
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Remark</Form.Label>
                    <Form.Control type="text" name="remark" onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              {/* Blacklisted and Prime Switches */}
              <div className="d-flex flex-wrap">
                <Form.Group controlId="blacklisted" className="d-flex align-items-baseline">
                  <Form.Label className="me-2">Blacklisted</Form.Label>
                  <Form.Check
                    type="switch"
                    id="blacklisted-switch"
                    name="blacklisted"
                    checked={!!formData.blacklisted}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="prime" className="d-flex align-items-baseline">
                  <Form.Label className="me-2">Prime</Form.Label>
                  <Form.Check
                    type="switch"
                    id="prime-switch"
                    name="prime"
                    checked={!!formData.prime}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>

              {/* Reference Toggle Checkbox */}
              <Form.Group className="my-3">
                <Form.Check
                  type="switch"
                  id="hasReference-switch"
                  name="hasReference"
                  label="Add Reference"
                  checked={formData.hasReference}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hasReference: e.target.checked,
                      // Clear reference details if unchecked
                      referenceDetail: e.target.checked ? formData.referenceDetail : {},
                    })
                  }
                />
              </Form.Group>

              {/* Conditionally render Reference Details if checkbox is checked */}
              {formData.hasReference && renderReferenceDetail()}

              {/* Product Details Section */}
              <div className="mb-4">
                {/* Product search input */}
                {/* <Form.Group className="mb-3">
                  <Form.Label>Search Product</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search for product details..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </Form.Group> */}
                {formData.products.map((product, index) => (
                  <Card key={index} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5>Product #{index + 1}</h5>
                        <Button variant="danger" size="sm" onClick={() => removeProduct(index)}>
                          Remove
                        </Button>
                      </div>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Detail *</Form.Label>
                        <Select
                          options={productOptions}
                          value={productOptions.find(
                            (opt) => opt.value === product.productDetailId
                          )}
                          onChange={(selectedOption) =>
                            handleProductChange(index, "productDetailId", selectedOption.value)
                          }
                          placeholder="Select product detail..."
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Purchase Date *</Form.Label>
                        <Form.Control
                          type="date"
                          value={product.purchaseDate}
                          onChange={(e) =>
                            handleProductChange(index, "purchaseDate", e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Renewal Date *</Form.Label>
                        <Form.Control
                          type="date"
                          value={product.renewalDate}
                          onChange={(e) =>
                            handleProductChange(index, "renewalDate", e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Details</Form.Label>
                        <Form.Control
                          type="text"
                          value={product.details}
                          onChange={(e) =>
                            handleProductChange(index, "details", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Card.Body>
                  </Card>
                ))}
                <Button variant="outline-primary" onClick={addProduct} className="text-cstm bdr text-hover">
                  Add Product
                </Button>
              </div>

              {/* Dynamic Custom Fields */}
              <Row>
                {customFields.map((field) => (
                  <Col md={6} key={field._id}>
                    <Form.Group>
                      <Form.Label>{field.fieldName}</Form.Label>
                      {field.fieldType === "dropdown" && (
                        <Select
                          options={field.options.map((opt) => ({ value: opt, label: opt }))}
                          isMulti={field.isMultiSelect}
                          name={field.fieldName}
                          value={
                            field.isMultiSelect
                              ? formData.dynamicFields[field.fieldName] || []
                              : formData.dynamicFields[field.fieldName] || ""
                          }
                          onChange={(selected) =>
                            handleDynamicChange(
                              field.fieldName,
                              field.isMultiSelect ? selected : selected.value
                            )
                          }
                        />
                      )}
                      {["text", "number", "email", "date"].includes(field.fieldType) && (
                        <Form.Control
                          type={field.fieldType}
                          name={field.fieldName}
                          value={formData.dynamicFields[field.fieldName] || ""}
                          onChange={(e) => handleDynamicChange(field.fieldName, e.target.value)}
                          isInvalid={!!errors[field.fieldName]}
                        />
                      )}
                      {field.fieldType === "checkbox" && (
                        <Form.Check
                          type="switch"
                          id={field.fieldName}
                          name={field.fieldName}
                          checked={!!formData.dynamicFields[field.fieldName]}
                          onChange={(e) => handleDynamicChange(field.fieldName, e.target.checked)}
                        />
                      )}
                      <Form.Control.Feedback type="invalid">
                        {errors[field.fieldName]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                ))}
              </Row>

              <Button type="submit" className="mt-3 btn-primary" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientForm;

