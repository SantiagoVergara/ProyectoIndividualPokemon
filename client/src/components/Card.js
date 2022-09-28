import React from "react";
import { Link } from 'react-router-dom'
import card from "./Card/Card.module.css"

export default function Card({ id, name, image, types, likes }){
    return (
        <Link to={`/home/` + id} style={{ textDecoration: 'none' }}>
            <div className={`${card.card}`}>
                <div className={`${card.cardname}`}>
                    <h2>{name.toUpperCase()}</h2>
                </div>
                <div className={`${card.cardimage}`}>
                    <img src={image} alt="img not found"/>
                </div>
                <div className={`${card.cardtypes}`}>
                    <h2>{types?.map((types, index) => (<p key={index}>{types}</p>))}</h2>
                </div>
                <div>
                    <h2>Likes: {likes}</h2>
                </div>

            </div>
        </Link>
    )
}
/*
{types.map((e) => e.nombre+' ')}
*/