import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getPokemonsTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import fondo from './Home/Home.module.css'

export default function PokemonCreator(){
    const dispatch = useDispatch()
    const history = useHistory();
    const allTypes = useSelector((state) => state.tipos)

    const [input, setInput] = useState({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types:[]
    })

    useEffect(() => {
        dispatch(getPokemonsTypes());
    }, [])

    function selectTypes(e){
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
        console.log(input)
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postPokemon(input));
        alert("Pokemon creado");
        setInput({
            name: "",
            image: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            types:[]        
        })
        history.push('/home')
    }
    

    return (
        <div className={`${fondo.fondo}`}>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu pokemon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input type="text" value={input.name} name="name" onChange={handleChange}/>
                </div>
                <div>
                    <label>Imagen: </label>
                    <input type="text" value={input.image} name="image" onChange={handleChange}/>
                </div>
                <div>
                    <label>Vida: </label>
                    <input type="number" value={input.hp} name="hp" onChange={handleChange}/>
                </div>
                <div>
                    <label>Ataque: </label>
                    <input type="number" value={input.attack} name="attack" onChange={handleChange}/>
                </div>
                <div>
                    <label>Defensa: </label>
                    <input type="number" value={input.defense} name="defense" onChange={handleChange}/>
                </div>
                <div>
                    <label>Velocidad: </label>
                    <input type="number" value={input.speed} name="speed" onChange={handleChange}/>
                </div>
                <div>
                    <label>Altura: </label>
                    <input type="number" value={input.height} name="height" onChange={handleChange}/>
                </div>
                <div>
                    <label>Peso: </label>
                    <input type="number" value={input.weight} name="weight" onChange={handleChange}/>
                </div>
                <div>
                    <label>Likes: </label>
                    <input type="number" value={input.likes} name="likes" onChange={handleChange}/>
                </div>
                <div>
                    <label>Tipos: </label>
                    <select onChange={e => selectTypes(e)}>
                        <option value = "todos"></option>
                        {allTypes?.map((t) => {
                            return (<option value = {t.nombre}>{t.nombre}</option>)
                        })}
                    </select>
                </div>

                        <div>
                            <label>Selected Types:</label>
                            <ul>
                                <li>{input.types.map(el => el + " ,")}</li>
                            </ul>
                        </div>
                <button type='submit'>Crear Pokemon</button>
            </form>
        </div>
    )

}