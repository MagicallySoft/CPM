import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/index.css";
import { fetchUser } from "../../redux/actions/auth/adminActions"

const CustomerDetailModal = ({ show, onHide, customer }) => {
  // console.log(customer);

  const dispatch = useDispatch();
  const { subadmins } = useSelector((state) => state.user) || { subadmins: [] };
  // console.log("SubAdmins\n", subadmins);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productModalShow, setProductModalShow] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setProductModalShow(true);
  };

  // Find subadmin details if product has a referenceId
  const getSubadminDetails = (referenceId) => {
    // console.log("ID", referenceId);

    // console.log(subadmins.find((admin) => admin._id === referenceId));

    return subadmins.find((admin) => admin._id === referenceId);
  };
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      {/* Customer Details Modal */}
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Table striped bordered hover className="customer-detail-table align-middle mb-0"> */}
          <Table className="align-middle mb-0">
            <tbody>
              <tr>
                <td><strong>Company Name:</strong></td>
                <td>{customer.companyName}</td>
              </tr>
              <tr>
                <td><strong>Contact Person:</strong></td>
                <td>{customer.contactPerson}</td>
              </tr>
              <tr>
                <td><strong>Mobile Number:</strong></td>
                <td>{customer.mobileNumber}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{customer.email}</td>
              </tr>
              <tr>
                <td><strong>Tally Serial Number:</strong></td>
                <td>{customer.tallySerialNo}</td>
              </tr>
              <tr>
                <td><strong>Prime:</strong></td>
                <td>{customer.prime ? "✔ Yes" : "❌ No"}</td>
              </tr>
              <tr>
                <td><strong>Blacklisted:</strong></td>
                <td>{customer.blacklisted ? "✔ Yes" : "❌ No"}</td>
              </tr>
              <tr>
                <td><strong>Remark:</strong></td>
                <td>{customer.remark || "N/A"}</td>
              </tr>
              {/* Products Section */}
              <tr>
                <td><strong>Products:</strong></td>
                <td>
                  {customer.products?.length > 0 ? (
                    <div className="d-flex justify-content-between" >
                      {customer.products.map((product, index) => (
                        // <li key={index}>
                        <Button
                          // variant="link"
                          key={index}
                          className="bg-btn"
                          onClick={() => handleProductClick(product)}
                        >
                          {product.productName}
                        </Button>
                        // </li>
                      ))}
                    </div>
                  ) : (
                    "No products found"
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal >

      {/* Product Details Modal */}
      < Modal show={productModalShow} onHide={() => setProductModalShow(false)} >
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Table bordered>
              <tbody>
                <tr>
                  <td><strong>Product Name:</strong></td>
                  <td>{selectedProduct.productName}</td>
                </tr>
                <tr>
                  <td><strong>Purchase Date:</strong></td>
                  {/* <td>{new Date(selectedProduct.purchaseDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td> */}
                  <td>
                    {new Date(selectedProduct.purchaseDate)
                      .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </td>
                </tr>
                <tr>
                  <td><strong>Renewal Date:</strong></td>
                  <td>
                    {new Date(selectedProduct.renewalDate)
                      .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </td>
                </tr>
                <tr>
                  <td><strong>Details:</strong></td>
                  <td>{selectedProduct.details}</td>
                </tr>
                {/* Reference Details */}
                {selectedProduct.reference && (
                  <>
                    <tr>
                      <td><strong>Reference:</strong></td>
                      <td>
                        {selectedProduct.referenceDetail.referenceId ? (
                          getSubadminDetails(selectedProduct.referenceDetail.referenceId) ? (
                            <>
                              <p><strong>Subadmin Name:</strong> {getSubadminDetails(selectedProduct.referenceDetail.referenceId).username}</p>
                              <p><strong>Subadmin Email:</strong> {getSubadminDetails(selectedProduct.referenceDetail.referenceId).email}</p>
                            </>
                          ) : (
                            "Reference subadmin not found"
                          )
                        ) : (
                          <>
                            <p><strong>Reference Name:</strong> {selectedProduct.referenceDetail.referenceName}</p>
                            <p><strong>Reference Contact:</strong> {selectedProduct.referenceDetail.referenceContact}</p>
                          </>
                        )}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setProductModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
};

export default CustomerDetailModal;
