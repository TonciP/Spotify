import React from 'react'
import { Route, Switch } from 'react-router-dom';
import ContenedorArtista from '../component/ContenedorArtista';
import ContenedorCancion from '../component/ContenedorCancion';
import ContenedorGenero from '../component/ContenedorGenero';
import Menu from '../component/Menu';
import ArtistaCanciones from '../page/ArtistaCanciones';
import FormArtista from '../page/FormArtitsta';
import FormCancion from '../page/FormCancion';
import FormGenero from '../page/FormGenero';
import GeneroArtista from '../page/GeneroArtista';
import PhotoArtista from '../page/PhotoArtista';
import PhotoGenero from '../page/PhotoGenero';
import SubirCancion from '../page/SubirCancion';

const RouterConfig = () => {
    return ( 
        <Switch>
            <Route exact path="/genero/create">
                <FormGenero />
            </Route>
            <Route exact path="/cancion/create">
                <FormArtista />
            </Route>
            <Route path="/artista/create">
                <FormCancion />
            </Route>

            <Route path="/genero/edit/:id" component={FormGenero}>
            </Route>
            <Route path="/cancion/edit/:id" component={FormCancion}>
            </Route>
            <Route path="/artista/edit/:id" component={FormArtista}>
            </Route>

            <Route  path="/genero/photo/:id" component={PhotoGenero}>
            </Route>
            <Route  path="/artista/photo/:id" component={PhotoArtista}>
            </Route>
            <Route  path="/cancion/subir/:id" component={SubirCancion}>
            </Route>

            <Route path="/genero/artista/:id" component={GeneroArtista}>
            </Route>

            <Route path="/artista/canciones/:id" component={ArtistaCanciones}>
            </Route>

            <Route exact path="/">
                <ContenedorGenero />
            </Route>
            <Route exact path="/genero" >
                <ContenedorGenero />
            </Route>
            <Route exact path="/cancion" >
                <ContenedorCancion />
            </Route>
            <Route exact path="/artista" >
                <ContenedorArtista />
            </Route>
        </Switch>

        );
}

export default RouterConfig;