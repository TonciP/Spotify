import { useEffect, useState } from "react";
import axios from 'axios';
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const FormCancion = (props) => {
    debugger;
    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();

    const [titulo_cancion, settitulo_cancion] = useState('');
    const [artista, setArtis] = useState('');
    const [Listartista, setArtista] = useState([]);

    useEffect(() => {
        if (id === 0) {
            obtenerListaArtista();
            return;
        }
        obtenerListaArtista();
        fetchDatosCancion(id);
    }, [id]);
    const fetchDatosCancion = (id) => {

        const url = 'http://127.0.0.1:8000/api/biblioteca/show/' + id + '/';
        axios.get(url)
            .then((response) => {
                console.log('fetchDatosCancion', response);
                const objCancion = response.data;
                settitulo_cancion(objCancion.titulo_cancion);
            }).catch(error => {
                // console.log('error', error);
                if (error.response.status === 401) {
                    history.push('/');
                }
            });
    }
    const obtenerListaArtista = () => {
        axios.get('http://127.0.0.1:8000/api/artista/index')
        .then(response => {
            console.log('response', response.data);
            setArtista(response.data);
        }).catch(error => {
            // console.log('error', error);
            if (error.response.status === 401) {
                history.push('/');
            }
        });
    }

    const enviarDatos = () => {

        const params = {
            "titulo_cancion": titulo_cancion,
            "artista_id": artista
        };
        if (id === 0) {
            insertarCancion(params);
        } else {
            actualizarCancion(params);
        }
    }
    const insertarCancion = (params) => {
        const url = 'http://127.0.0.1:8000/api/biblioteca/store';
        axios.post(url, params, {
        }).then(response => {
            console.log('recibido', response.data);
            history.push('/cancion');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                history.push('/');
            }
        });
    }
    const actualizarCancion = (params) => {
        const url = 'http://127.0.0.1:8000/api/biblioteca/update/' + id + '/';
        axios.put(url, params, {
        }).then(response => {
            console.log('recibido', response.data);
            history.push('/cancion');
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
                            <Card.Title>Formulario de Cancion</Card.Title>

                            <div><label>titulo_cancion:</label></div>
                            <div><input className="form-control" type="text" value={titulo_cancion} onChange={(e) => {
                                settitulo_cancion(e.target.value);
                            }} /></div>
                            <div>
                                {titulo_cancion.length} caracteres
                            </div>
                            <div>
                                <select className="form-select" value={artista} onChange={(e) => {
                                setArtis(e.currentTarget.value);
                                    }}>
                                    {Listartista.map(item =>
                                        <option value={item.id}>
                                            {item.nombre}
                                        </option>
                                    )}
                                </select>

                            </div>
                            <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                                Guardar
                            </button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> );
}

export default FormCancion;