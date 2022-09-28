import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import fondo from './Home/Home.module.css'

export default function Detail(props){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch])

    let myPokemon = useSelector ((state) => state.detail)
    console.log(myPokemon)

    function handleClick(e){
        console.log('qe se yo')
    }

    return (
        <div>
        <div className={`${fondo.fondo}`}>
            {
                myPokemon.length>0 ? (
                    <div>
                        <br></br><br></br><br></br><br></br><br></br>
                        <div className={`${fondo.izquierda}`}>
                            <h1>{myPokemon[0].name.toUpperCase()}</h1>
                            <h1>{myPokemon[0].id}</h1>
                            <h1>{myPokemon[0].types[0].nombre}</h1>
                            <h1>{myPokemon[0].types[1].nombre}</h1>
                        </div>
                        <div className={`${fondo.izquierda}`}>
                            <div style={{height: '350px'}}>
                            <img src = {myPokemon[0].img? myPokemon[0].img : myPokemon[0].image} alt="img not found" width="300px" height="300px"/>
                            </div>
                        </div>
                        <div className={`${fondo.izquierda}`}>
                            <h1>Vida: {myPokemon[0].hp}</h1>
                            <h1>Ataque: {myPokemon[0].attack}</h1>
                            <h1>Defensa: {myPokemon[0].defense}</h1>
                            <h1>Velocidad: {myPokemon[0].speed}</h1>
                            <h1>Altura: {myPokemon[0].height}</h1>
                            <h1>Peso: {myPokemon[0].weight}</h1>
                        </div>
                    </div>
                ) : <p>Loading</p>
            }
            <Link to='/home'>
                <button onClick={e => {handleClick(e)}}>Volver</button>
            </Link>
        </div>
    </div>
    )
}