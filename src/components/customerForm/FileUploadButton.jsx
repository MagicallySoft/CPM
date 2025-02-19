import React, { useRef, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { importCustomersAction } from "../../redux/actions/customer/customerActions";
import { FaUpload } from "react-icons/fa";
import "../../assets/css/FileUploadButton.css"; // Custom CSS for animations

const FileUploadButton = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setFileName(file.name);
    setIsUploading(true);

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Dispatch the action to upload customers.
      // Your action should use axios or fetch to post the FormData.
      await dispatch(importCustomersAction(formData));
    } catch (error) {
      console.error("Error uploading file", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    // Trigger the hidden file input when the button is clicked
    fileInputRef.current.click();
  };

  return (
    <div className="file-upload-container">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv,.xlsx,.xls"
        style={{ display: "none" }}
      />
      <Button
        variant="primary"
        onClick={handleClick}
        className="file-upload-btn"
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
            Uploading...
          </>
        ) : (
          <>
            <FaUpload className="me-2" />
            Upload File {fileName && `(${fileName})`}
          </>
        )}
      </Button>
    </div>
  );
};

export default FileUploadButton;
