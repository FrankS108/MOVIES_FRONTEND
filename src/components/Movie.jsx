import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from "axios";
import '../movie.css'

export const Movie = () => {
    //Local
    const [movie, setMovie] = useState({});

    //Compañeros
    const [names, setNames] = useState([]);
    const [rate, setRate] = useState(0);
    const [average, setAverage] = useState(0);

    const params = useParams();
    const id = params.id;

    const handleMovie = async() => {
        const id = params.id;
        await axios.get(`${import.meta.env.VITE_BACKEND_URL_LOCAL}/api/movies/${id}`)
        .then((response) => {
            setMovie(response.data);
        });
    }

    const handleRate = async(e) => {
        const id = params.id;
        await axios.post(`${import.meta.env.VITE_BACKEND_URL_LOCAL}/api/movies/${id}`, {rate});
        setRate(0);
    }

    /* Obtener ratings de compañeros */
    const handleRatingAll = async() => {
        let values = []
        let names = []
        //Jorge
        await axios.get( `${import.meta.env.VITE_BACKEND_URL_JORGE}/api/movies/rating/${id}`).then((response) => {
            let value = Number(response.data.finalRating);
            values.push(value);
        }).catch(function(error){
            console.log(error);
        });

        //Carlos
        await axios.get(`${import.meta.env.VITE_BACKEND_URL_CARLOS}/${id}`).then((response) => {
            let value = response.data.local_rating;
            values.push(value);
        }).catch(function(error){
            console.log(error);
        });

        //Carlo
        await axios.get(`${import.meta.env.VITE_BACKEND_URL_CARLO}/movies/${id}`).then((response) => {
            let value = response.data.rating;
            values.push(value);
        }).catch(function(error){
            console.log(error);
        });

        //Cesar
        await axios.get( `${import.meta.env.VITE_BACKEND_URL_CESAR}/api/films/${id}`).then((response) => {
            let value = scaleValue(response.data.ratingAverage.$numberDecimal, [1, 10], [0, 5]);
            values.push(value);
        }).catch(function(error){
            console.log(error);
        });

        //Edgar
        await axios.get( `${import.meta.env.VITE_BACKEND_URL_EDGAR}/reviews/movie/${id}`).then((response) => {
            let value = response.data.avgScore;
            values.push(value);
        }).catch(function(error){
            console.log(error);
        });

        setNames(names);
        setRatingAll(values)
        let sum = values.reduce(function(a,b){
            return a + b;
        })
        let averageAll = sum / values.length;
        console.log(averageAll)
        setAverage(averageAll);
    }

    function scaleValue(value, from, to) {
        var scale = (to[1] - to[0]) / (from[1] - from[0]);
        var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
        return ~~(capped * scale + to[0]);
    }


    useEffect(() => {
        handleRatingAll(); 
        handleMovie();
    }, [])


    return (
        <div className="movie__block--movie contenedor">
            <div className="movie__information--movie">
                <p className="movie__title--movie">{movie.title}</p>
                <p className="movie__year--movie">{movie.released}</p>
                <img className='movie__picture' src={movie.imageurl} alt="" />
                <div className="card__information--movie">
                    <Rating
                            name='size-large'
                            value={(movie.rate) ?? 0}
                            readOnly
                            size="large"
                            emptyIcon={<StarIcon style={{ opacity: 0.55, color: "white"}} fontSize="inherit" />}
                            sx={{fontSize: "3rem"}}
                    />
                    <div className='movie__detail--movie'>
                        {
                            movie.genre?.map((element, index) => (
                                <p key={index} className="movie__genre--movie">{element}</p>
                            ))
                        }
                    </div>
                    <p className="movie__description--movie">{movie.synopsis}</p>
                </div>
            </div>
            <div className="others__rate--movie">
                <div className="other__rate--movie">
                            <p className="">Calificación Promedio</p>
                            <Rating
                                name='size-large'
                                value={average ?? 0}
                                readOnly
                                size="large"
                                emptyIcon={<StarIcon style={{ opacity: 0.55, color: "white" }} fontSize="inherit" />}
                                sx={{fontSize: "3.5rem"}}
                            />
                </div>
            </div>
            
            <h3 className='rate__title'>CALIFICA LA PELICULA</h3>
            <div className='rate__movie'>
                
                <Rating
                    name='size-large'
                    value={rate}
                    onChange={(e) => {
                        if(e.target.value === rate.toString()) setRate(0);
                        else setRate(Number(e.target.value));
                    }}
                    size="large"
                    emptyIcon={<StarIcon style={{ opacity: 0.55, color: "white" }} fontSize="inherit"/>}
                    sx={{fontSize: "4rem"}}
                />
                <button type='submit' className="movie__link--movie" onClick={handleRate}>ENVIAR <ArrowForwardIosIcon sx={{fontSize: "2rem"}}/></button>
            </div>
            
        </div>
    )
}
