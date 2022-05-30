import { Button, Navbar, Container } from "react-bootstrap";
import style from '../style/navbar.module.css'
import React, {useContext} from "react";
import Forminput from "../components/form";
import { useNavigate } from "react-router-dom";
import {UserContext} from '../contex/userContext'


function MenuBar() {

    const navigasi = useNavigate();
    const [,dispatch] = useContext(UserContext);

    const handleOut = () => {
        dispatch({
            type:'logout',
        })
        navigasi('/')
    }
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className={style.nav1}>
            <Navbar>
                <Container>
                    <Navbar.Brand href="/Home" className={style.Brand}>Merchandise Data App</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button className={style.navbutt1} onClick={() => setModalShow(true)}>
                            Add Data
                        </Button>
                        <Button onClick={handleOut} className={style.navbutt2}>
                            Logout
                        </Button>
                    </Navbar.Collapse>
                </Container>
                <Forminput
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Navbar>
        </div>
    );
}

export default MenuBar;