import React from 'react';
import { Link } from 'react-router-dom';
import estilo from './Home/Home.module.css'

export default function LandingPage(){
    const imagen = "https://i.pinimg.com/originals/f1/dd/40/f1dd40d36b17542578727c3d6e863903.jpg"
    return(
        <div className={estilo.fondo1}>
            <Link to = '/home'>
            <button className={estilo.load} style={{marginTop:'20%', marginLeft:'50%'}}>
            Ingresar
            </button>
            </Link>
        </div>
    )
}