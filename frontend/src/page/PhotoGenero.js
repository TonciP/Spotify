import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
const PhotoGenero = (props) => {


    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();

    const [archivo, setArchivo] = useState('');
    const enviarDatos = () => {
        const url = `http://127.0.0.1:8000/api/genero/${id}/subirImagen`;
        const data = new FormData();
        data.append("imagen", archivo);
        axios.post(url, data)
        .then(res => {
            history.push('/genero');
        }).catch(error => {
            console.log(error);
        });;
    }
    return (
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">

                    <Card.Body>
                        <Card.Title>Subir foto de perfil</Card.Title>
                        <input className="form-control" type="file" onChange={(e) => {
                            // console.log(e.target.files[0])
                            setArchivo(e.target.files[0]);
                        }} />
                        <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                            Guardar
                        </button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    );
}

export default PhotoGenero;