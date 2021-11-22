import { useEffect, useState } from "react";
import axios from 'axios';
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const FormArtista = (props) => {
    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();
    const [lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [nombres, setNombres] = useState('');
    const [genero, setgenero] = useState('');

    useEffect(() => {
        if (id === 0) {
            obtenerListaGenero();
            return;
        }
        obtenerListaGenero();
        fetchDatosArtista(id);
    }, [id]);
    const fetchDatosArtista = (id) => {

        const url = 'http://127.0.0.1:8000/api/artista/show/' + id + '/';
        axios.get(url)
            .then((response) => {
                console.log('fetchDatosPersona', response);
                const objPersona = response.data;
                setNombres(objPersona.nombre);
            }).catch(error => {
                // console.log('error', error);
                if (error.response.status === 401) {
                    history.push('/');
                }
            });
    }
    const obtenerListaGenero = () => {
        setCargando(true);
        axios.get('http://127.0.0.1:8000/api/genero/index')
        .then(response => {
            console.log('response', response.data);
            setLista(response.data);
            setCargando(false);
        }).catch(error => {
            // console.log('error', error);
            if (error.response.status === 401) {
                history.push('/genero');
            }
        });
    }
    const enviarDatos = () => {

        const params = {
            "nombre": nombres,
            "genero_id": genero
        };
        if (id === 0) {
            insertarArtista(params);
        } else {
            actualizarArtista(params);
        }
    }
    const insertarArtista = (params) => {
        const url = 'http://127.0.0.1:8000/api/artista/store';
        axios.post(url, params, {
        }).then(response => {
            console.log('recibido', response.data);
            history.push('/artista');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                history.push('/');
            }
        });
    }
    const actualizarArtista = (params) => {
        const url = 'http://127.0.0.1:8000/api/artista/update/' + id + '/';
        console.log(genero);
        axios.put(url, params, {
        }).then(response => {
            console.log('recibido', response.data);
            history.push('/artista');
        }).catch(error => {
            console.log(error);
            //if (error.response.status === 401) {
            //    history.push('/');
            //}
        });
    }
    return (<Row className="mt-3">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="mt-3">

                        <Card.Body>
                            <Card.Title>Formulario de Artista</Card.Title>

                            <div><label>Nombres:</label></div>
                            <div><input className="form-control" type="text" value={nombres} onChange={(e) => {
                                setNombres(e.target.value);
                            }} /></div>
                            <div>
                                {nombres.length} caracteres
                            </div>
                            <div>
                                <select className="form-select" value={genero} onChange={(e) => {
                                setgenero(e.currentTarget.value);
                                    }}>
                                    {lista.map(item =>
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

export default FormArtista;