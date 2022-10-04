import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemon } from '../actions';
import styles from '../components/SearchBar/SearchBar.module.css';

export default function SearchBar(){

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNamePokemon(name))
    }

    return (
        <div>
        <div>
            <input className={styles.create}
            type = 'text'
            placeholder='Buscar por nombre exacto...'
            onChange={(e) => handleInputChange(e)}
            />
            <button className={styles.go}  type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>

          </div>
    )

}