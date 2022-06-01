import MenuBar from "../components/navbar";
import React, {useState, useEffect} from "react";
import { Col, Button, Card } from 'react-bootstrap';
import style from '../style/home.module.css'
import sofa1 from '../assets/sofa6.jpg'
// import Formedit from "../components/formedit";
import Delete from "../components/delete-popup";
import styles from '../style/listitem.module.css'
import { API } from '../config/api'
import { useNavigate, Link } from "react-router-dom";

function Home() {

    const [item, setItem] = useState([]);
    const loadItem = async () => {
        try {
            const response = await API.get("/getItems");
            setItem(response.data.data.items);
            console.log(response.data.data.items)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        loadItem();
    }, []);

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };
    const deleteById = async (id) => {
        try {
            await API.delete(`/item/${id}`);
            loadItem();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (confirmDelete) {
            // Close modal confirm delete data
            handleClose();
            // execute delete data by id function
            deleteById(idDelete);
            setConfirmDelete(null);
        }
    }, [confirmDelete]);

    // const [modalShow, setModalShow] = React.useState(false)

    // const navigasi = useNavigate()
    // const handleLog = () => {
    //     navigasi("/edit")
    // }


    return (
        <div className={style.latar}>
            <Col>
                <MenuBar />
            </Col>
            {item.map((data) => (
                <Col style={{ display: 'inline-grid'}} key={data.id}>
                    <Card style={{ width: '30rem', height: 'max-content', marginLeft: "110px", marginTop: "80px", marginBottom: "50px", border: 'none', borderRadius: '20px', padding: '30px' }}>
                        <Card.Img variant="top" src={data.image} alt=":'(" className={styles.imgitm} />
                        <Card.Body>
                            <Card.Title className={styles.title}>{data.namabarang}</Card.Title>
                            <Card.Text className={styles.text}>
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim."
                            </Card.Text>
                            <div className={styles.card}>
                                <Card.Text className={styles.text1}>
                                    Purchase Price
                                    <p className={styles.subtxt1}>Rp. {data.hargabeli}</p>
                                </Card.Text>

                                <Card.Text className={styles.text2}>
                                    Sell Price
                                    <p className={styles.subtxt2}>Rp. {data.hargajual}</p>
                                </Card.Text>

                                <Card.Text className={styles.text3}>
                                    Stock
                                    <p className={styles.subtxt3}>Qty : {data.stock}</p>
                                </Card.Text>
                            </div>
                            <Link to={`/edit/${data.id}`}>
                                <Button className={styles.butt1} >Edit</Button>
                            </Link>
                            
                            <Button className={styles.butt2} onClick={() => {handleDelete(data.id)}}>Delete</Button>
                        </Card.Body>

                        {/* <Formedit
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        /> */}
                        <Delete
                            setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} />
                    </Card>
                </Col>
            ))}
            
            
        </div>
    )
}

export default Home;