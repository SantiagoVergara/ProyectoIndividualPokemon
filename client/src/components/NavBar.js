import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getPokemonsTypes, filterPokemonsByTypes, orderByName, orderByAttack, filterCreated } from '../actions';
import { Link } from 'react-router-dom'
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import fondo from './Home/Home.module.css'
import Card from './Card';

export default function Navbar(){
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

    function handleOrder(e){
        if(e.target.value === 'nasc' || e.target.value === 'ndes'){
            handleOrderByName(e)
        } else if(e.target.value === 'aasc' || e.target.value === 'ades'){
            handleOrderByAttack(e)

        }
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      function dameCurrentPokemons(){
        return currentPokemons
      }
    const imagen = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png'
    return (
        <div >
            <div className={fondo.filters}>
            <div style={{height:'70px', margin:'-1%', marginRight:'2%'}}>
                <img src={imagen}></img>
            </div>
                <select className={fondo.orderby} onChange={e => handleOrder(e)} >
                    <option value='All'>Ordenar por</option>
                    <option value='nasc'>Nombre Asc / A-Z</option>
                    <option value='ndes'>Nombre Desc / Z-A</option>
                    <option value = "ades">Mas fuertes</option>
                    <option value = "aasc">Mas debiles</option>
                </select>
                    <select className={fondo.type}onChange={e => handleFilterByTypes(e)}>
                        <option value = "All">Tipos</option>
                        {allTypes?.map((t) => {
                            return (<option value = {t.nombre}>{capitalizeFirstLetter(t.nombre)}</option>)
                        })}
                    </select>

                <select className={fondo.origin} onChange={e => handleFilterCreated(e)}>
                <option value = "todos">Todos</option>
                        <option value = "api">Pokemons existentes</option>
                        <option value = "db">Pokemons creados</option>
                </select>
                <button className={fondo.load} onClick={e => {handleClick(e)}}>
                    Recargar
                </button>
                <button className={fondo.load}  >
                                <Link to='/crearPokemon' style={{color: 'inherit' ,textDecoration: 'none'}}>Crear Pokemon
                </Link>

                </button>
                
                <SearchBar></SearchBar>

            </div>
            <div className={fondo.filters}>
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
                        <Card id={p.id} name={p.name} image={p.image} types={p.types} />
                        </>
                    )
                })
            }
            </div>
        </div>
    )
    //                            <Link to={"/home/" + p.id}>
}
