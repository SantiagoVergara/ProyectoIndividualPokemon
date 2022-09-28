import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getPokemonsTypes, filterPokemonsByTypes, orderByName, orderByAttack, filterCreated } from '../actions';
import { Link } from 'react-router-dom'
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import fondo from './Home/Home.module.css'

export default function Home(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const allTypes = useSelector((state) => state.tipos)

    //paginado
    const [orden, setOrden] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const [pokemonsPerPage,setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokeom = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokeom,indexOfLastPokemon)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {       //reemplaza el mapdispatchToProps y mapState
        dispatch(getPokemons());
        dispatch(getPokemonsTypes());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterByTypes(e){
        e.preventDefault();
        dispatch(filterPokemonsByTypes(e.target.value))
        paginado(1);
    }

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        paginado(1);
    }

    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleOrderByAttack(e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <div className={`${fondo.navbar}`}>
                <br></br>
                <div className={`${fondo.izquierda}`}>
                    <Link to='/crearPokemon'><button>Crear Pokemon</button></Link>
                    <button onClick={e => {handleClick(e)}}>
                        Recargar Pokemons
                    </button>
                </div>
                <div className={`${fondo.izquierda}`}>
                    <select onChange={e => handleFilterByTypes(e)}>
                        <option value = "All">Todos</option>
                        {allTypes?.map((t) => {
                            return (<option value = {t.nombre}>{t.nombre}</option>)
                        })}
                    </select>
                    <select onChange={e => handleFilterCreated(e)}>
                        <option value = "todos">Todos</option>
                        <option value = "api">Pokemons existentes</option>
                        <option value = "db">Pokemons creados</option>
                    </select>
                    <select onChange={e => handleOrderByAttack(e)}>
                        <option value = "aasc">Ataque asc</option>
                        <option value = "ades">Ataque desc</option>
                    </select>
                    <select onChange={e => handleOrderByName(e)}>
                        <option value = "nasc">Nombre asc</option>
                        <option value = "ndes">Nombre desc</option>
                    </select>
                </div>
                <div className={`${fondo.izquierda}`}>
                <SearchBar></SearchBar>

                </div>

                <Paginado
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    paginado = {paginado}
                />

            </div>
            
            <div className={`${fondo.fondo}`}>

            {
                currentPokemons?.map((p) => {
                    return(
                        <>
                        <Card id={p.id} name={p.name} image={p.image} types={p.types} likes={p.likes}/>
                        </>
                    )
                })
            }
            </div>

        </div>
    )
    //                            <Link to={"/home/" + p.id}>
}
