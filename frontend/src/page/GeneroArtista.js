import '../cs/ListaGenero.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '../component/Menu';
import Button from 'react-bootstrap/Button';
const GeneroArtista = (props) => {
    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();

    const [lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(false);

    
    useEffect(() => {
        if (id === 0) {
            return;
        }
        obtenerListaGenero(id);
    }, [id]);

    const obtenerListaGenero = (id) => {
        setCargando(true);
        axios.get('http://127.0.0.1:8000/api/artista/genero/' + id)
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
    const ArtistaCanciones = (id) => {
        history.push('/artista/canciones/'+ id);
    }
    const FormEdit = (id) => {
        history.push('/artista/edit/'+ id);
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
                    <Button variant="success" onClick={() => {FormEdit(item.id)}}>Editar</Button>
                    <Button variant="danger" onClick={() => { ArtistaCanciones(item.id) }}>Ver Canciones</Button>
                
                </div>
                )}
        </div>
        }
        </div>);
}
export default GeneroArtista;