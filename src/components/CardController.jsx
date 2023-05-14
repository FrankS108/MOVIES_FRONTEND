import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card } from './Card'

export const CardController = () => {

    //Vamos a tener multiples objetos
    const [movieLocal, setMovieLocal] = useState([]);
    

    const handleMovies = async() => {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL_LOCAL}/api/movies`)
        .then((response) => {
            setMovieLocal(response.data);
        });
    }

    useEffect(() => {
        handleMovies();
    }, [])
    

    return (
        <div className='movie__block contenedor'>
            {
                movieLocal.map((element, index) => (
                    <Card key={index} movie={element}/>
                ))
            }
        </div>
    )
}
