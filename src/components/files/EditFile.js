import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';

function EditFile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fileId, userId } = location.state;
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch the file content using fileId
  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_FILE_MANAGEMENT_API}/files/${fileId}`, {
          params: { userId }
        });
        if (response.status === 200) {
          setContent(response.data);
        }
      } catch (error) {
        console.error('Error fetching file content', error);
      }
    };

    fetchFileContent();
  }, [fileId, userId]);

  // Enable editing mode when Edit button is clicked
  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  //Saving the overwritten content
  const handleSaveClick = async () => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_FILE_MANAGEMENT_API}/files/${fileId}`, {
        content: content, 
        userId: userId
      });
   
      if (response.status === 200) {
        setIsEditing(false);
        alert('File updated successfully!');
        navigate(-1);
      }
    } catch (error) {
      console.error('Error updating file content', error);
      alert('Failed to update the file.');
    }
  };

return (
    <Container fluid className="p-4 d-flex flex-column" style={{ height: '100vh' }}>
      <Row className="mb-3">
        <Col className="d-flex justify-content-end">
          {!isEditing && (
            <Button variant="primary" onClick={handleEditClick}>
              Edit
            </Button>
          )}
        </Col>
      </Row>
      <Row className="flex-fill position-relative">
        <Col xs={12} md={10} lg={8} className="mx-auto">
          <Form.Control
            as="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={23}
            style={{ width: '100%', boxSizing: 'border-box', padding: '10px', border: '1px solid #ced4da', borderRadius: '4px' }}
            disabled={!isEditing}
          />
          {isEditing && (
            <div className="d-flex justify-content-end mt-3">
              <Button
                variant="primary"
                onClick={handleSaveClick}
                style={{ width: 'auto' }}>
                Save
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default EditFile;


