import { Modal, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style/form.module.css'
import React, { useState, useEffect } from "react";
import { API } from '../config/api'
import { useNavigate } from 'react-router-dom';

function Forminput(props) {

    
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);

    const [form, setForm] = useState({
        image: "",
        namabarang: "",
        haragbeli: "",
        hargajual: "",
        stock: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });

        // Create image url for preview
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            // Create Configuration Content-type here ...
            // Content-type: multipart/form-data
            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }

            const formData = new FormData()
            formData.set("image", form.image[0], form.image[0].name)
            formData.set("namabarang", form.namabarang)
            formData.set("hargabeli", form.hargabeli)
            formData.set("hargajual", form.hargajual)
            formData.set("stock", form.stock)
            
            const response = await API.post('/item', formData, config)

            console.log(response);

            const alert = (
                <Alert variant="success" className="py-1">
                    Success
                </Alert>
            );
            setMessage(alert);
            navigate('/home');

        
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    failed<br />
                    check the file size max 100 kb or name of the item already exists
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    };

    // function refreshPage() {
    //     window.location.reload();
    // }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {preview && (
                    <img src={preview} style={{ borderRadius: '10%', width: '80px' }} alt="preview" />
                )}
                {message && message}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file"
                            name="image"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control type="text"
                            name="namabarang"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Purchase Price</Form.Label>
                        <Form.Control type="number"
                            name="hargabeli"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Selling Price</Form.Label>
                        <Form.Control type="number"
                            name="hargajual"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="number"
                            name="stock"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className={style.button}>
                        Add
                    </Button>

                    <Button variant="primary" onClick={() => navigate('/home')} className={style.button1}>
                        Back
                    </Button>
                </Form>
                
            </Modal.Body>
        </Modal>
    );
}
export default Forminput; 