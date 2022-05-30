import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style/form.module.css'
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../config/api'

function Formedit(props) {

    const { id } = useParams();
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
    const [item, setItem] = useState({});
    const [form, setForm] = useState({
        image: "",
        namabarang: "",
        hargabeli: "",
        hargajual: "",
        stock: ""
    });

    const handleItem = async () => {
        try {
            const response = await API.get(`/getItem/${id}`);
            // setPreview(response.data.data.image);
            // setForm({
            //     ...form,
            //     namabarang: response.data.data.namabarang,
            //     hargabeli: response.data.data.hargabeli,
            //     hargajual: response.data.data.hargajual,
            //     stock: response.data.data.stock,
            // });
            setForm(response.data.data.item);
            console.log(response.data.data.item)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleItem();
    }, []);

    const { namabarang, hargabeli, hargajual, stock } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // Create Configuration Content-type here ...
            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }

            const formData = new FormData();

            formData.append("image", form.image[0], form.image[0].name);

            formData.append("namabarang", form.namabarang);
            formData.append("hargabeli", form.hargabeli);
            formData.append("hargajual", form.hargajual);
            formData.append("stock", form.stock);

            const response = await API.patch(`/updateItem/${id}`, formData, config)
            console.log(response);
            navigate('/Home');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {preview && (
                    <img src={preview} style={{ borderRadius: '10%', width: '80px' }} alt="preview" />
                )}
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
                            value={form.namabarang}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Purchase Price</Form.Label>
                        <Form.Control type="number"
                            name="hargabeli"
                            value={form.hargabeli}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Selling Price</Form.Label>
                        <Form.Control type="number"
                            name="hargajual"
                            value={form.hargajual}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit} className={style.button}>
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
export default Formedit; 