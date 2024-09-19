import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from "axios";
import { useLocation } from "react-router-dom";
import './Thumbnail.css';

function ViewThumbnails() {
    const [thumbnails, setThumbnails] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { fileId } = location.state;

    const fetchThumbnails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_FILE_MANAGEMENT_API}/files/thumbnails/${fileId}`);
            if(response.status === 200) {
                setThumbnails(response.data);
            }
        } catch (error) {
            console.error('Error fetching thumbnails', error);
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchThumbnails();
    }, []);

    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100">
            {loading ? (
                <Spinner animation="border" variant="primary" />
            ) : (
                <div>
                    <Row className="d-flex justify-content-center">
                        <Col xs="auto" className="mb-4">
                            <Card className="thumbnail-card">
                                <Card.Img
                                    key={`small-${thumbnails[0]}`}
                                    variant="top"
                                    src={thumbnails[0]}
                                    alt="Small Thumbnail"
                                    className="small-thumbnail thumbnail-img"
                                />
                            </Card>
                        </Col>
                        <Col xs="auto" className="mb-4">
                            <Card className="thumbnail-card">
                                <Card.Img
                                    key={`medium-${thumbnails[1]}`}
                                    variant="top"
                                    src={thumbnails[1]}
                                    alt="Medium Thumbnail"
                                    className="medium-thumbnail thumbnail-img"
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Col xs="auto" className="mb-4">
                            <Card className="thumbnail-card">
                                <Card.Img
                                    key={`large-${thumbnails[2]}`}
                                    variant="top"
                                    src={thumbnails[2]}
                                    alt="Large Thumbnail"
                                    className="large-thumbnail thumbnail-img"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    );
}

export default ViewThumbnails;








