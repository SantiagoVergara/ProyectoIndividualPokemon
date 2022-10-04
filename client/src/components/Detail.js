import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import fondo from './Home/Home.module.css'
import card from "./Card/Card.module.css"
import detailStyles from "./Detail/Detail.module.css"

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
    const imagen = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png'
    return (
        <div>

  <div style={{height:'86px', backgroundColor: 'rgb(39, 39, 39)'}}>
    <div style={{marginLeft: '-80%', height:'70px'}}>
                <img style={{marginTop:'0.2%'}} src={imagen}></img >
    </div>
    <div style={{marginTop: '-4%', marginLeft: '-50%'}}>
    <Link to='/home'>

    <button className={fondo.load} onClick={e => {handleClick(e)}}>
    Volver atras
                </button>
                </Link>

    </div>

  </div>

        <div className={`${fondo.fondo}`}>
            {
                myPokemon.length>0 ? (
                    <div>
                        <div className={`${fondo.izquierda}`} style={{fontSize:'30px',  color: 'rgb(39, 39, 39)', marginTop:'3%' ,marginLeft:'5%'}}>
                            <h1>{myPokemon[0].name.toUpperCase()}</h1>
                            <div >
                        {myPokemon[0].types.map((e) => {return (<button className={`${card.btn}`}>
                        {e.toUpperCase()+' '}
                        </button>)})}
                </div>
                <br></br><br></br><br></br>

                        </div>
                        <div className={`${fondo.izquierda}`} style={{marginLeft:'-5%'}}>
                            <div style={{marginTop:'4%'  ,height: '400px'}}>
                            <img src = {myPokemon[0].img? myPokemon[0].img : myPokemon[0].image} alt="img not found" width="300px" height="300px"/>
                            </div>
                        </div>
                        <div className={`${fondo.izquierda}`}>
                        <div className={`${card.btnwhite}`} style ={{float: 'left', display: 'flex', alignItems: 'center'}}>
                                    <div style ={{float: 'left', marginRight:'5%'}}>
                                    <h1>Vida</h1>
                                    </div>
                                    <div style ={{float: 'left', marginRight:'5%'}}>
                                    <progress style={{padding: '15%'}} id="Vida" max="120" value={myPokemon[0].hp}/>
                                    </div>
                                    <div style ={{float: 'left'}}>
                                    <h1>{myPokemon[0].hp}</h1>
                                    </div>
                                </div>
                                <div className={`${card.btnwhite}`} style ={{float: 'left', display: 'flex', alignItems: 'center'}}>
                                    <div style ={{float: 'left', marginRight:'5%'}}>
                                    <h1>Ataque</h1>
                                    </div>
                                    <div style ={{float: 'left', marginRight:'5%'}}>
                                    <progress style={{padding: '15%'}} id="Vida" max="120" value={myPokemon[0].attack}/>
                                    </div>
                                    <div style ={{float: 'left'}}>
                                    <h1>{myPokemon[0].attack}</h1>
                                    </div>
                                </div>

                                <div className={`${card.btnwhite}`} style ={{float: 'left', display: 'flex', alignItems: 'center'}}>
                                    <div style ={{float: 'left', marginRight:'5%'}}>
                                    <h1>Defensa</h1>
                                    </div>
                                    <div style ={{float: 'left', marginRight:'5%'}}>
                                    <progress style={{padding: '15%'}} id="Vida" max="120" value={myPokemon[0].defense}/>
                                    </div>
                                    <div style ={{float: 'left'}}>
                                    <h1>{myPokemon[0].defense}</h1>
                                    </div>
                                </div>
                                <div className={`${card.btnwhite}`} style ={{float: 'left', display: 'flex', alignItems: 'center'}}>
                                    <div style ={{float: 'left', marginRight:'5%'}}>
                                    <h1>Velocidad</h1>
                                    </div>
                                    <div style ={{float: 'left', marginRight:'5%'}}>
                                    <progress style={{padding: '15%'}} id="Vida" max="120" value={myPokemon[0].speed}/>
                                    </div>
                                    <div style ={{float: 'left'}}>
                                    <h1>{myPokemon[0].speed}</h1>
                                    </div>
                                </div>
                                <div className={`${card.btnwhite}`} style ={{float: 'left', display: 'flex', alignItems: 'center'}}>
                                    <div style ={{float: 'left', marginRight:'5%'}}>
                                    <h1>Altura</h1>
                                    </div>
                                    <div style ={{float: 'left', marginRight:'5%'}}>
                                    <progress style={{padding: '15%'}} id="Vida" max="120" value={myPokemon[0].height}/>
                                    </div>
                                    <div style ={{float: 'left'}}>
                                    <h1>{myPokemon[0].height}</h1>
                                    </div>
                                </div>
                                <div className={`${card.btnwhite}`} style ={{float: 'left', display: 'flex', alignItems: 'center'}}>
                                    <div style ={{float: 'left', marginRight:'5%'}}>
                                    <h1>Peso</h1>
                                    </div>
                                    <div style ={{float: 'left', marginRight:'5%'}}>
                                    <progress style={{padding: '15%'}} id="Vida" max="120" value={myPokemon[0].weight}/>
                                    </div>
                                    <div style ={{float: 'left'}}>
                                    <h1>{myPokemon[0].weight}</h1>
                                    </div>
                                </div>
                        </div>
                    </div>
                ) : <p>Loading</p>
            }

        </div>
    </div>
    )
}
