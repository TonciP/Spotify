import '../cs/ListaGenero.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const ListaGenero = () => {
    const history = useHistory();

    const [lista, setLista] = useState([]);
    const [listafilter, setfilter] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    
    useEffect(() => {
        obtenerListaGenero();
    }, []);

    const obtenerListaGenero = () => {
        setCargando(true);
        axios.get('http://127.0.0.1:8000/api/genero/index')
        .then(response => {
            console.log('response', response.data);
            setLista(response.data);
            setfilter(response.data);
            setCargando(false);
        }).catch(error => {
            console.log('error', error);
            //if (error.response.status === 401) {
             //   history.push('/genero');
            //}
        });
    }
    const eliminarGenero = (id) => {
        const confirmation = window.confirm('¿Está seguro que desea eliminar?');
        if (!confirmation) {
            return;
        }
        const url = 'http://127.0.0.1:8000/api/genero/destroy/' + id + '/';
        axios.delete(url, {
        }).then((response) => {
            obtenerListaGenero();
        }).catch(error => {
            console.log(error);
        });
    }
    const FormEdit = (id) => {
        history.push('/genero/edit/'+ id);
    }
    const mostrarArtista = (id) => {
        history.push('/genero/artista/' + id);
    }
    const CambiarFotoGenero = (id) => {
        history.push("/genero/photo/" + id);
    }
    const handleChange = e =>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }
    const filtrar = (terminoBusqueda) =>{
        var resultadosBusqueda = listafilter.filter((elemento)=>{
            if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
                return elemento;
            }
        });
        setLista(resultadosBusqueda);
    }
    return ( <div>
        <div className="containerInput">
            <input
            className="form-control inputBuscar"
            value={busqueda}
            placeholder="Busqueda por nombre"
            onChange={handleChange}
            />
            <button className="btn btn-success">
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </button>
        </div>
        {cargando === true && <h1>Cargando..</h1>}
        {cargando === false && 
        <div className="wrapper">
            {lista.map(item => 
                <div className="album" key={"item-" + item.id}>
                    <img className="imggenero" src={"http://127.0.0.1:8000/images/genero/" + item.id + ".png"} alt="album"/>
                    <div>{item.nombre}</div>
                    <Button variant="success" onClick={() => {FormEdit(item.id)}}>Editar</Button>
                    <Button variant="danger" onClick={() => { eliminarGenero(item.id) }}>Eliminar</Button>
                    <Button variant="dark" onClick={() => { mostrarArtista(item.id) }}>Ver Artista</Button>
                    <Button variant="primary" onClick={() => { CambiarFotoGenero(item.id) }}>Cambiar Photo</Button>
                </div>
                )}
        </div>
        }
        </div>
    );
}

export default ListaGenero;