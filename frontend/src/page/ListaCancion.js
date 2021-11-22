import '../cs/ListaGenero.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ListaCancion = () => {
    const history = useHistory();

    const [lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(false);

    
    useEffect(() => {
        obtenerListaCancion();
    }, []);

    const obtenerListaCancion = () => {
        setCargando(true);
        axios.get('http://127.0.0.1:8000/api/biblioteca/index')
        .then(response => {
            console.log('response', response.data);
            setLista(response.data);
            setCargando(false);
        }).catch(error => {
            // console.log('error', error);
            if (error.response.status === 401) {
                history.push('/');
            }
        });
    }
    const eliminarCancion = (id) => {
        const confirmation = window.confirm('¿Está seguro que desea eliminar?');
        if (!confirmation) {
            return;
        }
        const url = 'http://127.0.0.1:8000/api/biblioteca/destroy/' + id + '/';
        axios.delete(url, {
        }).then((response) => {
            obtenerListaCancion();
        }).catch(error => {
            console.log(error);
        });
    }
    const CambiarCancion = (id) =>{
        history.push('/cancion/subir/' + id);
    }
    return ( <div>
        {cargando === true && <h1>Cargando..</h1>}
        {cargando === false && 
        <div className="wrapper">
            {lista.map(item => 
                <div className="album">
                    <div>
                        {item.titulo_cancion}
                    </div>
                    <div>
                        <audio controls>
                            <source src={"http://127.0.0.1:8000/music/"+ item.id + ".mp3"} type="audio/mp3"/>
                        </audio> 
                    </div>
                    <Button variant="danger" onClick={() => { eliminarCancion(item.id) }}>Eliminar</Button>
                    <Button variant="primary" onClick={() => { CambiarCancion(item.id) }}>Cambiar Cancion</Button>
                </div>
                )}
        </div>
        }
        </div>
    );
}

export default ListaCancion;