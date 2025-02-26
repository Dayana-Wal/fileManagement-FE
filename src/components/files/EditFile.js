import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Row, Col, Form, Spinner } from 'react-bootstrap';

function EditFile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fileId, userId, fileName, fileType } = location.state;
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const isImage = fileType.split('/')[0] === 'image' ? true : false

  const fetchFileContent = async () => {
    try {
      let url = `${process.env.REACT_APP_FILE_MANAGEMENT_API}/files`
      if(isImage){
          url =`${url}/images`
      }
      const response = await axios.get(`${url}/${fileId}`, {
          params: { userId }
      });
      if (response.status === 200) {
        setContent(response.data)
        }
    }catch (error) {
      console.error('Error fetching file content', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the file content using fileId
  useEffect(() => {
    fetchFileContent();
  }, []);

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
      {
       isImage
        ? <img src= {content} alt="File content"></img>
        : <><Row className="mb-3">
          <Col className="d-flex justify-content-end">
            {!isEditing && (
              <Button variant="primary" onClick={handleEditClick}>
                Edit
              </Button>
            )}
          </Col>
        </Row><Row className="flex-fill position-relative">
            <Col xs={12} md={10} lg={8} className="mx-auto">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                  <Spinner animation="border" />
                </div>
              ) : (
                <>
                  <Form.Control
                    as="textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={23}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px', border: '1px solid #ced4da', borderRadius: '4px' }}
                    disabled={!isEditing} />
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
                </>
              )}
            </Col>
          </Row></>
      }
    </Container>
  );
}

export default EditFile;


