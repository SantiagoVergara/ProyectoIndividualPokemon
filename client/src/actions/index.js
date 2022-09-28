import axios from 'axios';

export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get("https://pi-pokemon-back.onrender.com/pokemons",{});
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

export function getPokemonsTypes(){
    return async function(dispatch){
        var json = await axios.get("https://pi-pokemon-back.onrender.com/tipos",{});
        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        })
    }
}

export function filterPokemonsByTypes(payload){
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByAttack(payload){
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
}

export function getNamePokemon(name){
    return async function (dispatch){
        try {
            var json = await axios.get("https://pi-pokemon-back.onrender.com/pokemons?name="+name);
            return dispatch({
                type: 'GET_NAME_POKEMON',
                payload: json.data
            })
        } catch (error) {
            alert(`no encontramos el pokemon: ${name}`)
        }
    }
}

export function getDetail(id){
    return async function (dispatch){
        try{
            var json = await axios.get("https://pi-pokemon-back.onrender.com/pokemons/"+id);
            return dispatch ({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch(error){
            console.log(error);
        }
    }
}

export function postPokemon(payload){
    return async function (dispatch){
        const json = await axios.post("https://pi-pokemon-back.onrender.com/pokemons/",payload);
        console.log(json);
        return json;
    }
}

// pi listado   https://docs.google.com/spreadsheets/d/1GNtPP8DX3ZY_k-fARFZlLsNqeVxVi0R0S3kr9F6ehrc/edit#gid=0
// inscripcion   https://docs.google.com/forms/d/e/1FAIpQLSfSdiXGveOB1rNGZfslltkPLPEqfsuXq41B4YLZ1ReMmgr7yA/viewform