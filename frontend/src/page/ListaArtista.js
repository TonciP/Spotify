import '../cs/ListaGenero.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
const ListaArtista = () => {
    debugger;
    const history = useHistory();

    const [lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(false);

    
    useEffect(() => {
        obtenerListaPersonas();
    }, []);

    const obtenerListaPersonas = () => {
        setCargando(true);
        axios.get('http://127.0.0.1:8000/api/artista/index')
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
    const eliminarArtista = (id) => {
        const confirmation = window.confirm('¿Está seguro que desea eliminar?');
        if (!confirmation) {
            return;
        }
        const url = 'http://127.0.0.1:8000/api/artista/destroy/' + id + '/';
        axios.delete(url, {
        }).then((response) => {
            obtenerListaPersonas();
        }).catch(error => {
            console.log(error);
        });
    }
    const FormEdit = (id) => {
        history.push('/artista/edit/'+ id);
    }
    const CambiarFotoArtista = (id) => {
        history.push('/artista/photo/'+ id);
    }
    return ( <div>
        {cargando === true && <h1>Cargando..</h1>}
        {cargando === false && 
        <div className="wrapper">
            {lista.map(item => 
                <div className="album">
                    <img className="imggenero" src={"http://127.0.0.1:8000/images/artista/" + item.id + ".png"} alt="album"/>
                    <div>{item.nombre}</div>
                    <Button variant="success" onClick={() => {FormEdit(item.id)}}>Editar</Button>
                    <Button variant="danger" onClick={() => { eliminarArtista(item.id) }}>Eliminar</Button>
                    <Button variant="primary" onClick={() => { CambiarFotoArtista(item.id) }}>Cambiar Photo</Button>
                </div>
                )}
        </div>
        }
        </div>
    );
}

export default ListaArtista;