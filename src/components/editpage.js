import { Row, Button, Form, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style/edit.module.css'
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../config/api'

function Formedit(props) {

    const [message, setMessage] = useState(null);
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

    const {namabarang,hargabeli,hargajual,stock} = form

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

    const navigasi = useNavigate()
    const handleHome = () => {
        navigasi("/home")
    }

    return (
        <Row className={style.latar}>
            <Col className={style.subjudul}>
                Edit Item
            </Col>
            
            
            {preview && (
                <img src={preview} style={{ borderRadius: '10%', width: '180px', marginLeft:'820px' }} alt="preview" />
            )}

            <Form onSubmit={handleSubmit} className={style.forminti}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={style.label1}>Image</Form.Label>
                    <Form.Control type="file"
                        name="image"
                        onChange={handleChange}
                        className={style.control}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={style.label1}>Item Name</Form.Label>
                    <Form.Control type="text"
                        name="namabarang"
                        value={namabarang}
                        onChange={handleChange}
                        className={style.control}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={style.label1}>Purchase Price</Form.Label>
                    <Form.Control type="number"
                        name="hargabeli"
                        value={hargabeli}
                        onChange={handleChange}
                        className={style.control}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={style.label1}>Selling Price</Form.Label>
                    <Form.Control type="number"
                        name="hargajual"
                        value={hargajual}
                        onChange={handleChange}
                        className={style.control}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={style.label1}>Stock</Form.Label>
                    <Form.Control type="number"
                        name="stock"
                        value={stock}
                        onChange={handleChange}
                        className={style.control}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className={style.button}>
                    Save
                </Button>
                <Button variant="primary" className={style.button1} onClick={handleHome}>
                    Cancel
                </Button>
                {message && message}
            </Form>
        </Row>
    );
}
export default Formedit; 