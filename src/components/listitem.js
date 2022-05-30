import { Button, Container, Card } from "react-bootstrap";
import style from '../style/listitem.module.css'
import React from "react";
import sofa1 from '../assets/sofa6.jpg'
import Formedit from "./formedit";
import Delete from "./delete-popup";

function Listitem() {

    const [modalShow, setModalShow] = React.useState(false)
    const [tampilShow, setTampilShow] = React.useState(false)

    return (
        <>
            <Card style={{ width: '30rem', height: '35rem', marginLeft: "110px", marginTop:"80px", marginBottom:"150px", border: 'none', borderRadius: '20px', padding:'30px'}}>
                <Card.Img variant="top" src={sofa1} alt=":'(" className={style.imgitm} />
                <Card.Body>
                    <Card.Title className={style.title}>Sofa</Card.Title>
                    <Card.Text className={style.text}>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <div className={style.card}>
                        <Card.Text className={style.text1}>
                            Purchase Price
                            <p className={style.subtxt1}>Rp. 20.000.000</p>
                        </Card.Text>

                        <Card.Text className={style.text2}>
                            Sell Price
                            <p className={style.subtxt2}>Rp. 25.000.000</p>
                        </Card.Text>

                        <Card.Text className={style.text3}>
                            Stock
                            <p className={style.subtxt3}>Qty. 5</p>
                        </Card.Text>
                    </div>
                    <Button className={style.butt1} onClick={() => setModalShow(true)}>Edit</Button>
                    <Button className={style.butt2} onClick={() => setTampilShow(true)}>Delete</Button>
                </Card.Body>

                <Formedit
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <Delete
                    show={tampilShow}
                    onHide={() => setTampilShow(false)}
                />
            </Card>

            
        </>
    )
}

export default Listitem;