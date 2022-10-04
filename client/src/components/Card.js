import React from "react";
import { Link } from 'react-router-dom'
import card from "./Card/Card.module.css"

export default function Card({ id, name, image, types }){
    console.log(types.map((e) => e.nombre+' '));
    return (
        <Link to={`/home/` + id} style={{ textDecoration: 'none' }}>
            <div className={`${card.card}`}>
                <div className={`${card.cardname}`}>
                    <h2>{name.toUpperCase()}</h2>
                </div>
                <div className={`${card.cardimage}`}>
                    <img src={image} alt="img not found"/>
                </div>
                <div >
                        {types.map((e) => {return (<button className={`${card.btn}`}>
                        {e.toUpperCase()+' '}
                        </button>)})}
                </div>

            </div>
        </Link>
    )
}
/*
{types.map((e) => e.nombre+' ')}
*/