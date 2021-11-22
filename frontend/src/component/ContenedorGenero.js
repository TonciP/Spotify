import { Col, Container, Row, Nav, Form, FormControl, Button, Image, Navbar, NavDropdown } from "react-bootstrap";
import moduleName from 'module'
import '../cs/Body.css';
import ListaGenero from "../page/ListaGenero";
import Menu from "./Menu";
const ContenedorGenero = () => {
    return ( 
            <Row>
                <Menu></Menu>
                <Col sm={10} bg="secondary" >
                <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand href="/genero">Genero</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavDropdown title="Crear" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/genero/create">Genero</NavDropdown.Item>
                        <NavDropdown.Item href="/artista/create">Cancion</NavDropdown.Item>
                        <NavDropdown.Item href="/cancion/create">Artista</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Container>
                </Navbar>
                    <ListaGenero></ListaGenero>
                </Col>
            </Row>

    );
}

export default ContenedorGenero;