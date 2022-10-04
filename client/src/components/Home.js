import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getPokemonsTypes, filterPokemonsByTypes, orderByName, orderByAttack, filterCreated } from '../actions';
import { Link } from 'react-router-dom'
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import fondo from './Home/Home.module.css'
import NavBar from './NavBar';

export default function Home(){


    return (
        <div >
            <NavBar></NavBar>


        </div>
    )
    //                            <Link to={"/home/" + p.id}>
}
