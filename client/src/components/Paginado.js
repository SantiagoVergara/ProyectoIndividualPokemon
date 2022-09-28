import React from "react";
import style from "./Paginado/Paginado.module.css"

export default function Paginado({pokemonsPerPage, allPokemons, paginado}){
    const pageNumber = []
    
    for(let i=0; i<=Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumber.push(i+1);
    }
    pageNumber.pop();

    return (
        <nav>
            <div className={`${style.pagination}`}>
                {pageNumber && pageNumber.map(number => (
                       <button onClick={() => paginado(number)}>{number}</button>
                ))}
            </div>
        </nav>
    )
}