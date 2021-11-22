import '../cs/ListaGenero.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
const ArtistaCanciones = (props) => {
    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();

    const [lista, setLista] = useState([]);
    const [listapathmusic, setPathListaMusic] = useState([]);
    const [cargando, setCargando] = useState(false);

    
    useEffect(() => {
        if (id === 0) {
            return;
        }
        obtenerListaCaciones(id);
        obtenerPathCanciones(id);
    }, []);

    const obtenerListaCaciones = (id) => {
        setCargando(true);
        axios.get('http://127.0.0.1:8000/api/biblioteca/artista/' + id)
        .then(response => {
            console.log('response', response.data);
            setLista(response.data);
            setCargando(false);
        }).catch(error => {
            console.log('error', error);
            if (error.response.status === 401) {
                history.push('/genero');
        }
        });
    }
    const obtenerPathCanciones = (id) => {
        setCargando(true);
        const data = id;
        axios.post('http://127.0.0.1:8000/api/directorio',data)
        .then(response => {
            console.log('response', response.data);
            setPathListaMusic(response.data);
        }).catch(error => {
            // console.log('error', error);
            if (error.response.status === 401) {
                history.push('/');
            }
        });
        /// cancion/subir/
    }
    const CambiarCancion = (id) =>{
        history.push('/cancion/subir/' + id);
    }
    const eliminarCancion = (id) =>{
        history.push('');
    }
    return ( 
    <div>
        {cargando === true && <h1>Cargando..</h1>}
        {cargando === false &&
        <div className="wrapper">
            {lista.map(item => 
                <div className="album" key={"item-" + item.id}>
                    <img className="imggenero" src={"http://127.0.0.1:8000/images/artista/" + item.id + ".png"} alt="album"/>
                    <div>{item.nombre}</div>
                    <div>{item.genero.nombre}</div>
                    {item.canciones.map(item =>
                    <div>
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
                )}
        </div>
        }
        </div>);
}
export default ArtistaCanciones;