import { useEffect, useState } from "react";
import axios from 'axios';
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const FormGenero = (props) => {
    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();

    const [nombres, setNombres] = useState('');

    useEffect(() => {
        if (id === 0) {
            return;
        }
        fetchDatosGenero(id);
        
    }, [id]);
    const fetchDatosGenero = (id) => {

        const url = 'http://127.0.0.1:8000/api/genero/show/' + id + '/';
        axios.get(url)
            .then((response) => {
                console.log('fetchDatosGenero', response);
                const objGenero = response.data;
                setNombres(objGenero.nombre);
            }).catch(error => {
                // console.log('error', error);
                if (error.response.status === 401) {
                    history.push('/');
                }
            });
    }

    const enviarDatos = () => {

        const params = {
            "nombre": nombres
        };
        if (id === 0) {
            insertarGenero(params);
        } else {
            actualizarGenero(params);
        }
    }
    const insertarGenero = (params) => {
        const url = 'http://127.0.0.1:8000/api/genero/store';
        axios.post(url, params, {
        }).then(response => {
            console.log('recibido', response.data);
            history.push('/genero');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                history.push('/');
            }
        });
    }
    const actualizarGenero = (params) => {
        const url = 'http://127.0.0.1:8000/api/genero/update/' + id + '/';
        axios.put(url, params, {
        }).then(response => {
            console.log('recibido', response.data);
            history.push('/genero');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                history.push('/');
            }
        });
    }
    return (<Row className="mt-3">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="mt-3">

                        <Card.Body>
                            <Card.Title>Formulario de Genero</Card.Title>

                            <div><label>Nombres:</label></div>
                            <div><input className="form-control" type="text" value={nombres} onChange={(e) => {
                                setNombres(e.target.value);
                            }} /></div>
                            <div>
                                {nombres.length} caracteres
                            </div>
                            <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                                Guardar
                            </button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> );
}

export default FormGenero;