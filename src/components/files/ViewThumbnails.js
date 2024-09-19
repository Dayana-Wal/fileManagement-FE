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
                <div className='row'>
                    <div className="thumbnail-card">
                        <img src={thumbnails[0]}  alt = "small-imag" className="thumbnail-img" ></img>
                    </div>
                    <div className="thumbnail-card">
                        <img src={thumbnails[1]}  alt = "medium-imag" className="thumbnail-img"></img>
                    </div>
                    <div className="thumbnail-card">
                        <img src={thumbnails[2]}  alt = "large-imag" className="thumbnail-img"></img>
                    </div>
                </div>
                    
            )}
        </Container>
    );
}

export default ViewThumbnails;








