import Button from "@restart/ui/esm/Button";
import { Col, Form, FormControl, Image, Nav } from "react-bootstrap";

const Menu = () => {
    return ( 
        <Col sm={2} className="col1" >
        <Nav defaultActiveKey="/home" className="flex-column">
            <Col xs={6} md={4}>
                <Image className="imgspotify" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1280px-Spotify_logo_with_text.svg.png" rounded />
            </Col>
            <Form className="d-flex">
                <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            <Nav.Link href="/genero">Generos</Nav.Link>
            <Nav.Link href="/cancion">Biblioteca</Nav.Link>
            <Nav.Link href="/artista">Artistas</Nav.Link>
        </Nav>
    </Col>
    );
}

export default Menu;