import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomFields, updateCustomer } from "../../redux/actions/customer/customerActions";
import { Modal, Button, Form, Spinner, Row, Col, Card } from "react-bootstrap";
import Select from "react-select";

const UpdateCustomerModal = ({ show, handleClose, customerData }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.customer || []);
  const { customFields } = useSelector((state) => state.customField) || { customFields: [] };
  const { subadmins } = useSelector((state) => state.user) || { subadmins: [] };
  // console.log(subadmins);
  
  const [formData, setFormData] = useState({});

  const ProductName = [
    { value: "Tally Renewal", label: "Tally Renewal" },
    { value: "Tally Prime", label: "Tally Prime" },
    { value: "Tally Customization", label: "Tally Customization" },
    { value: "Tally on cloud", label: "Tally on Cloud" }
  ];

  useEffect(() => {
    if (customerData) {
      setFormData({
        ...customerData,
        blacklisted: customerData.blacklisted ?? false, // Ensure boolean
        prime: customerData.prime ?? false, // Ensure boolean
        dynamicFields: customerData.dynamicFields || {},
      });
    }
    dispatch(getCustomFields());
  }, [customerData, dispatch]);

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


    // Validate dynamic custom fields
    customFields.forEach((field) => {
      const value = formData.dynamicFields?.[field.fieldName];

      if (field.isRequired && (!value || (Array.isArray(value) && value.length === 0))) {
        newErrors[field.fieldName] = `${field.fieldName} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleProductChange = (index, field, value) => {
    // console.log("\n",index, "\n",field, "\n",value);
    const updatedProducts = [...formData.products];
    if (field.includes('.')) {
      const [parentField, childField] = field.split('.');
      updatedProducts[index][parentField] = {
        ...updatedProducts[index][parentField],
        [childField]: value
      };
    } else {
      updatedProducts[index][field] = value;
    }
    setFormData({ ...formData, products: updatedProducts });
    // console.log("setFormData\n", formData);
  };

  // const addProduct = () => {
  //   // console.log("Done", formData);
    
  //   setFormData({
  //     ...formData,
  //     products: [...formData.products, {
  //         productName: "",
  //         purchaseDate: "",
  //         renewalDate: "",
  //         details: "",
  //         reference: false,
  //         referenceDetail: {}
  //     }],
  // });
  //   console.log("Add Product FormData\n", formData);
  // };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [
        ...(formData.products || []),
        {
          productName: "",
          purchaseDate: "",
          renewalDate: "",
          details: "",
          reference: false,
          referenceDetail: {},
        },
      ],
    });
    console.log("Add Product FormData\n", formData);
  };
  

  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  const ReferenceSelector = ({ product, index }) => {
    const options = [
      ...subadmins.map(subadmin => ({
        label: subadmin.username,
        value: subadmin._id
      })),
      { label: "Other", value: "other" }
    ];

    const getSelectedValue = () => {
      if (product.referenceDetail?.referenceId) {
        return options.find(opt => opt.value === product.referenceDetail.referenceId);
      }
      if (product.referenceDetail?.referenceName !== undefined) {
        return options.find(opt => opt.value === "other");
      }
      return null;
    };

    return (
      <div className="mt-3">
        <Form.Label>Reference Selection</Form.Label>
        <Select
          options={options}
          value={getSelectedValue()}
          onChange={(selectedOption) => {
            if (selectedOption.value === "other") {
              handleProductChange(index, "referenceDetail", {
                referenceName: "",
                referenceContact: ""
              });
            } else {
              handleProductChange(index, "referenceDetail", {
                referenceId: selectedOption.value
              });
            }
          }}
          placeholder="Select reference..."
        />
      </div>
    );
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
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleDynamicChange = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dynamicFields: {
        ...prevFormData.dynamicFields,
        [fieldName]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(updateCustomer(customerData._id, formData)).then(() => {
      handleClose();
    });
  };

  return (
    <Modal show={show} onHide={handleClose} className="mt-5">
      <Modal.Header closeButton>
        <Modal.Title>Update Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={formData.companyName || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.companyName}
                />
                <Form.Control.Feedback type="invalid">{errors.companyName}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Contact Person</Form.Label>
                <Form.Control type="text" name="contactPerson" value={formData.contactPerson || ""} onChange={handleChange} isInvalid={!!errors.contactPerson}
                />
                <Form.Control.Feedback type="invalid">{errors.contactPerson}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="text" name="mobileNumber" value={formData.mobileNumber || ""} onChange={handleChange} isInvalid={!!errors.mobileNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.mobileNumber}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email || ""} onChange={handleChange} isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Tally Serial No.</Form.Label>
                <Form.Control type="number" name="tallySerialNo" value={formData.tallySerialNo || ""} onChange={handleChange} isInvalid={!!errors.tallySerialNo}
                />
                <Form.Control.Feedback type="invalid">{errors.tallySerialNo}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Remark</Form.Label>
                <Form.Control type="text" name="remark" value={formData.remark || ""} onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="blacklisted" className="d-flex align-items-baseline">
                <Form.Label className="me-2">Blacklisted</Form.Label>
                <Form.Check type="switch" name="blacklisted" checked={!!formData.blacklisted} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="prime" className="d-flex align-items-baseline">
                <Form.Label className="me-2">Prime</Form.Label>
                <Form.Check type="switch" name="prime" checked={!!formData.prime} onChange={handleChange} />
              </Form.Group>
            </Col>

          </Row>
          {/* Product Fields */}
          <div className="mb-4">
            {/* <h4>Products</h4> */}
            {formData?.products?.map((product, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5>Product #{index + 1}</h5>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeProduct(index)}
                    >
                      Remove
                    </Button>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Product Name *</Form.Label>
                    <Select
                      options={ProductName}
                      value={ProductName.find((p) => p.value === product.productName)} // Set selected value
                      onChange={(selectedOption) =>
                        handleProductChange(index, "productName", selectedOption.value)
                      }
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

                  <Form.Group className="mb-3">
                    <div className="d-flex align-items-center">
                      <Form.Label className="me-3">Add Reference?</Form.Label>
                      <Form.Check
                        type="switch"
                        checked={product.reference}
                        onChange={(e) =>
                          handleProductChange(index, "reference", e.target.checked)
                        }
                      />
                    </div>
                  </Form.Group>

                  {product.reference && (
                    <>
                      <ReferenceSelector product={product} index={index} />

                      {product.referenceDetail?.referenceName !== undefined && (
                        <div className="mt-3">
                          <Row>
                            <Col md={6}>
                              <Form.Group>
                                <Form.Label>Reference Name *</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={product.referenceDetail.referenceName || ""}
                                  onChange={(e) =>
                                    handleProductChange(
                                      index,
                                      "referenceDetail.referenceName",
                                      e.target.value
                                    )
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
                                  value={product.referenceDetail.referenceContact || ""}
                                  onChange={(e) =>
                                    handleProductChange(
                                      index,
                                      "referenceDetail.referenceContact",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            ))}

            <Button
              variant="outline-primary"
              onClick={addProduct}
              className="text-cstm bdr text-hover"
            >
              Add Product
            </Button>
          </div>
          {/* Product Fields */}

          <Row>
            {/* Dynamic Custom Fields */}
            {Array.isArray(customFields) && customFields.map((field) => {
              const dynamicFieldValue = Array.isArray(formData?.dynamicFields?.[field.fieldName])
                ? formData.dynamicFields[field.fieldName]
                : field.isMultiSelect
                  ? []
                  : formData?.dynamicFields?.[field.fieldName] || "";
              return (
                <Col md={6}>
                  <Form.Group key={field._id}>
                    <Form.Label>{field.fieldName}</Form.Label>

                    {/* Dropdown Select */}
                    {field.fieldType === "dropdown" && (
                      <Select
                        options={Array.isArray(field.options) ? field.options.map((opt) => ({ value: opt, label: opt })) : []}
                        isMulti={field.isMultiSelect}
                        name={field.fieldName}
                        value={
                          field.isMultiSelect
                            ? dynamicFieldValue.map((opt) =>
                              typeof opt === "object" ? opt : { value: opt, label: opt }
                            )
                            : dynamicFieldValue
                              ? { value: dynamicFieldValue, label: dynamicFieldValue }
                              : null
                        }
                        onChange={(selected) =>
                          handleDynamicChange(
                            field.fieldName,
                            field.isMultiSelect ? selected.map((opt) => opt.value) : selected?.value || ""
                          )
                        }
                      />
                    )}

                    {/* Text, Number, Email, Date Fields */}
                    {["text", "number", "email", "date"].includes(field.fieldType) && (
                      <Form.Control
                        type={field.fieldType}
                        name={field.fieldName}
                        value={dynamicFieldValue}
                        onChange={(e) => handleDynamicChange(field.fieldName, e.target.value)}
                        isInvalid={!!errors[field.fieldName]}
                      />
                    )}

                    {/* Checkbox */}
                    {field.fieldType === "checkbox" && (
                      <Form.Check
                        type="switch"
                        id={field.fieldName}
                        name={field.fieldName}
                        checked={!!dynamicFieldValue}
                        onChange={(e) => handleDynamicChange(field.fieldName, e.target.checked)}
                      />
                    )}

                    <Form.Control.Feedback type="invalid">{errors[field.fieldName]}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              );
            })}
          </Row>
          <Button type="submit" className="mt-3 btn-primary" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Update"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateCustomerModal;
