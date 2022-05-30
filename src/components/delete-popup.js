import styleCss from "../style/delete.module.css";
import React from 'react';
import { Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function Delete({ show, handleClose, setConfirmDelete}) {

    const handleDelete = () => {
        setConfirmDelete(true)
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="xl"
            centered
        >
            <div>
                <p className={styleCss.page2}>you are sure you wont to remove this item</p>
                <div className={styleCss.button}>
                    <button onClick={handleDelete} className={styleCss.yes}>Yes</button>
                    <button onClick={handleClose} className={styleCss.no}>No</button>
                </div>
               
            </div>
        </Modal>
    );
}

export default Delete;